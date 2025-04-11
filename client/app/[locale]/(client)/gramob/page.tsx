import React, {FC} from "react";
import Title from "@/UI/Title";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import Link from "next/link";

type Props = {
    params: {
        locale: string;
    };
};

export async function generateMetadata({params: {locale}}: Props): Promise<Metadata> {
    const t = await getTranslations({locale: locale, namespace: 'Page'});
    try {
        return {
            title: t('gramob'),
            openGraph: {
                url: "/gramob/",
            },
        };
    } catch (e) {
        return {
            title: t('gramob'),
            openGraph: {
                title: t('gramob'),
                url: `/gramob/`,
            },
        };
    }
}

const Gramob: FC<Props> = async ({params: {locale}}) => {
    const titlePage = await getTranslations('Page');
    const utilities = await getTranslations('Utilities');

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-6 max-sm:gap-8">
                <Title
                    text={titlePage('gramob')}
                    style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
                />
                <Link href={"https://inter.ontu.edu.ua/"} className="flex gap-4 max-sm:gap-3 text-xl">
                    <span>{utilities('site')}</span>
                    <span className="bg-[#2E2C39] rounded-full">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.393 9.46484L11.877 11.3909L19.5044 13.442L8.96484 19.527L9.96484 21.2591L20.5044 15.1741L18.467 22.8052L20.393 23.3212L23.3212 12.393L12.393 9.46484Z"
                                        fill="#FDFDFD"/>
                                </svg>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Gramob;
