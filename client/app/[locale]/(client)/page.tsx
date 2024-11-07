import LinkList from "@/components/LinkList";
import CellItem, {ICellItem} from "@/components/Cell/CellItem";
import React, {Suspense} from "react";
import Partners from "@/components/Partners";
import Feedback from "@/components/Feedback";
import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';

const cellItemsRow: ICellItem[] = [
    {
        text: 'Міжнародний конкурс Black Sea Science 2024',
        image: '/image/manCell.png',
        link: '/'
    },
    {
        text: 'Конференції, семінари та конкурси',
        image: '/image/womanCell.png',
        link: '/conference'
    },
    {
        text: 'Напрямки для співпраці',
        image: '/image/wmCell.png',
        link: '/cooperation'
    }
]

type Props = {
  params: { locale: string }
}


export default function Home({params: {locale}}:Props) {

  setRequestLocale(locale);

  // const t = useTranslations('HomePage');

    return (
        <>
            <div className="xl:container mx-auto my-4 px-8 max-md:px-4">
              {/*{t('title')}*/}
                <div className="mt-6 flex flex-col gap-20">
                    {/*<Cell style={"w-full flex flex-row max-sm:flex-col 2xl:gap-x-56 max-2xl:gap-x-40 max-xl:gap-x-12 max-md:gap-x-4"}/>*/}
                    <LinkList/>
                </div>
            </div>
            <div
                className="grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:grid-rows-3 px-24 max-2xl:px-12 max-xl:px-8 mt-20 gap-12">
                {cellItemsRow.map((item, index) =>
                    <CellItem key={index} text={item.text} image={item.image} link={item.link} styleImage/>
                )}
            </div>
            <div className="xl:container mx-auto my-4 px-8 max-md:px-4">
                <Partners/>
            </div>
            <Suspense>
                <Feedback apiKey={process.env.GOOGLE_MAPS_API_KEY || ''}/>
            </Suspense>
        </>
    );
}
