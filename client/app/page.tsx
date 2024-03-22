import Cell from "@/components/Cell";
import LinkList from "@/components/LinkList";
import CellItem, {ICellItem} from "@/components/Cell/CellItem";
import React from "react";

const cellItemsRow: ICellItem[] = [
    {
        text: 'Міжнародний конкурс Black Sea Science 2024',
        image: '/image/manCell.png',

        link: '/'
    },
    {
        text: 'Конференції, семінари та конкурси',
        image: '/image/womanCell.png',
        link: '/'
    },
    {
        text: 'Напрямки для співпраці',
        image: '/image/wmCell.png',
        link: '/'
    }
]

export default function Home() {
    return (
        <div className="xl:container mx-auto my-4 px-8 max-md:px-4">
            <div className="mt-6 flex flex-col gap-20">
                <Cell
                    style={"w-full flex flex-row max-sm:flex-col 2xl:gap-x-56 max-2xl:gap-x-40 max-xl:gap-x-12 max-md:gap-x-4"}/>
                <LinkList/>
                <div className="flex flex-row gap-8">
                    {cellItemsRow.map((item, index) =>
                        <CellItem key={index} text={item.text} image={item.image} link={item.link}/>
                    )}
                </div>
            </div>
        </div>
    );
}
