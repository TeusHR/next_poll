import React from "react";
import Title from "@/UI/Title";
import {AcademicCouncilService} from "@/services/client.service";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import TabsPage, {TabItem} from "@/components/TabsPage";
import {IAcademicCouncil} from "@/types/AcademicCouncil";


export async function generateMetadata(
    {params}: { params: { locale: string } }
): Promise<Metadata> {
    const t = await getTranslations({locale: params.locale, namespace: 'Page'});

    return {
        title: t('academicCouncil'),
        openGraph: {
            url: "/academic-council/",
        },
    };
}

type Props = {
    params: {
        locale: string;
    };
};

const AcademicCouncil = async ({params: {locale}}: Props) => {
    const academicCouncil = await AcademicCouncilService.getAll(locale.toUpperCase());
    const titlePage = await getTranslations('Page');

    function generateTabs<T extends IAcademicCouncil>(data: T[]): TabItem[] {
        return data.map(item => ({
            key: item.id,
            title: item.title,
            content: <div dangerouslySetInnerHTML={{ __html: item.text }} />,
        }));
    }

    const tabsPage = generateTabs(academicCouncil || [])

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <Title
                    text={titlePage('academicCouncil')}
                    style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
                />
                <TabsPage tabs={tabsPage}/>
            </div>
        </div>
    );
};

export default AcademicCouncil;
