import React from "react";
import Title from "@/UI/Title";
import {PublicInformationService} from "@/services/client.service";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import TabsPage, {TabItem} from "@/components/TabsPage";
import Folder, {FolderItem} from "@/components/Folder";
import {IPage, IPublicInformation} from "@/types/PublicInformation";
import Document from "@/components/Document";


export async function generateMetadata(
    {params}: { params: { locale: string } }
): Promise<Metadata> {
    const t = await getTranslations({locale: params.locale, namespace: 'Page'});

    return {
        title: t('publicInformation'),
        openGraph: {
            url: "/public-information/",
        },
    };
}

type Props = {
    params: {
        locale: string;
    };
    searchParams?: { page?: string };
};

const PublicInformation = async ({params: {locale}, searchParams}: Props) => {
    const publicInformation = await PublicInformationService.getAll(locale.toUpperCase());
    const titlePage = await getTranslations('Page');

    function generateTabs<T extends IPublicInformation>(data: T[]): TabItem[] {
        return data.map(item => ({
            key: item.id,
            title: item.title,
            content: <Folder items={generateFolder(item.pages)} />,
            bottomContent: item.files.map((file, idx) => <Document key={`${item.id}-${idx}`} link={file} title={file} className="underline"/>)
        }));
    }

    function generateFolder<T extends IPage>(data: T[]): FolderItem[] {
        return data.map(page => ({
            title: page.title,
            content: page.files.map((file, index) => <Document key={index} link={file} title={file} className="underline"/>)
        }));
    }

    const tabsPage = generateTabs(publicInformation || [])

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <Title
                    text={titlePage('publicInformation')}
                    style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
                />
                <TabsPage tabs={tabsPage}/>
            </div>
        </div>
    );
};

export default PublicInformation;
