import React from "react";
import Title from "components/UI/Title";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import InnovationsWrapper from "./components/InnovationsWrapper";

export async function generateMetadata(
    {params}: { params: { locale: string } }
): Promise<Metadata> {
    const t = await getTranslations({locale: params.locale, namespace: 'Page'});

    return {
        title: t('innovations'),
        openGraph: {
            url: "/innovations/",
        },
    };
}

const Innovations = async () => {
    const titlePage = await getTranslations('Page');

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-6 max-sm:gap-4">
                <Title
                    text={titlePage('innovations')}
                    style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
                />
                <InnovationsWrapper/>
            </div>
        </div>
    );
};

export default Innovations;
