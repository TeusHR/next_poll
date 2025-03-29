import React from "react";
import Title from "@/UI/Title";
import { Metadata } from "next";
import {getTranslations} from "next-intl/server";
import CellItem, {ICellItem} from "@/components/Cell/CellItem";


export async function generateMetadata(
    {params}: { params: { locale: string } }
): Promise<Metadata> {
    const t = await getTranslations({locale:params.locale, namespace: 'Page'});

    return {
        title: t('scienceNews'),
        openGraph: {
            url: "/science-news/",
        },
    };
}

const cellItemsRow: ICellItem[] = [
    {
        text: 'automation',
        image: '/image/automation.svg',
        link: 'https://atbp.ontu.edu.ua/'
    },
    {
        text: 'economics',
        image: '/image/economics.png',
        link: 'https://fie.ontu.edu.ua/'
    },
    {
        text: 'grain',
        image: '/image/grain.svg',
        link: 'https://grain-feed.ontu.edu.ua/'
    },
    {
        text: 'scientific',
        image: '/image/scientific.svg',
        link: 'https://sciworks.ontu.edu.ua/'
    },
    {
        text: 'geometric',
        image: '/image/geometric.svg',
        link: 'https://geom-center.ontu.edu.ua/'
    },
    {
        text: 'foodScience',
        image: '/image/foodScience.svg',
        link: 'https://fst.ontu.edu.ua/'
    },
    {
        text: 'refrigeration',
        image: '/image/refrigeration.svg',
        link: 'https://reftech.ontu.edu.ua/'
    }
]

const ScienceNews = async () => {
    const titlePage = await getTranslations('Page');
    const translateCarts = await getTranslations('Main');

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <Title text={titlePage('scienceNews')} style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold" />
                <div
                    className="grid grid-cols-2 max-sm:grid-cols-1 max-sm:grid-rows-3 gap-y-10 gap-x-28 max-xl:gap-x-20 max-lg:gap-x-12 max-md:gap-x-8">
                    {cellItemsRow.map((item, index) =>
                        <CellItem key={index}
                                  text={translateCarts(`cartsScience.${item.text}`)}
                                  readMore={translateCarts(`carts.readMore`)}
                                  linkClassName="max-w-[625px] max-h-[300px]"
                                  textClassName="text-2xl max-lg:text-xl text-start"
                                  wrapperTextClassName={'pr-40 max-2xl:pr-20 max-sm:pr-28'}
                                  imageClassName="object-fill"
                                  image={item.image}
                                  link={item.link}
                                  styleImage={'absolute right-0 bottom-0 top-0 my-auto max-2xl:max-w-[175px] max-xl:max-w-[140px] max-sm:max-w-[175px] max-te:max-w-[140px]'}
                                  wrapperStyle={`h-full ${index === cellItemsRow.length - 1 ? 'w-[250px]' : 'w-[180px]'} !max-w-full`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScienceNews;
