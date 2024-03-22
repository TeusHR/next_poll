import React from 'react'
import Link from "next/link";

interface ILinkListItemLeft {
    text: string,
    link: string
}

const ILinkListItemLeft: ILinkListItemLeft[] = [
    {
        text: 'НАУКОВО-ДОСЛІДНИЙ ІНСТИТУТ',
        link: ''
    },
    {
        text: 'КОНСАЛТИНГОВИЙ ЦЕНТР',
        link: ''
    },
    {
        text: 'НАУКОВО-ДОСЛІДНІ ЛАБОРАТОРІЇ',
        link: ''
    },
    {
        text: 'НАУКОВІ ШКОЛИ',
        link: ''
    },
    {
        text: 'СТУДЕНТСЬКА НАУКА',
        link: ''
    },
    {
        text: 'ІННОВАЦІЙНІ РОЗРОБКИ',
        link: ''
    },
]

const ILinkListItemRight: ILinkListItemLeft[] = [
    {
        text: 'ЦЕНТР МІЖНАРОДНОЇ ДІЯЛЬНОСТІ ',
        link: ''
    },
    {
        text: 'ВІДДІЛ МІЖНАРОДНИХ ГРАНТІВ ТА АКАДЕМІЧНОЇ МОБІЛЬНОСТІ',
        link: ''
    },
    {
        text: 'ЦЕНТР ЛІНГВІСТИЧНОЇ ПІДГОТОВКИ',
        link: ''
    },
    {
        text: 'ЦЕНТР УКРАЇНО-ФРАНЦУЗЬКОГО СПІВРОБІТНИЦТВА',
        link: ''
    },
    {
        text: 'ЦЕНТР УКРАЇНО-ТУРЕЦЬКОГО СПІВРОБІТНИЦТВА',
        link: ''
    },
    {
        text: 'МІЖНАРОДНІ ПРОЕКТИ',
        link: ''
    },
]

const LinkList = ({}) => {


    return (
        <div className="w-full flex flex-row 2xl:gap-x-56 max-2xl:gap-x-40 max-xl:gap-x-12 max-md:gap-x-4">
            <div className="flex flex-col gap-y-8 w-full text-center">
                <div className="uppercase text-4xl max-md:text-2xl font-semibold">
                    <div className="relative z-10">
                    <span
                    className="relative after:content-[''] after:z-[-1] after:absolute after:top-0 after:left-0 after:w-full after:h-[75%] after:bg-[#99ABA6] after:translate-x-[18px] after:translate-y-[20px]">
                    наукова робота
                    </span>
                    </div>
                    </div>
                {ILinkListItemLeft.map((item, index) =>
                    <div key={index} className="underline uppercase text-[20px]">
                        <Link href={item.link}>
                            {item.text}
                        </Link>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-y-8 w-full text-center">
                <div className="uppercase text-4xl max-md:text-2xl font-semibold">
                    <div className="relative z-10">
                        <span
                            className="relative after:content-[''] after:z-[-1] after:absolute after:top-0 after:left-0 after:w-full after:h-[75%] after:bg-[#99ABA6] after:translate-x-[18px] after:translate-y-[20px]">
                            міжнародна діяльність
                        </span>
                    </div>
                </div>
                {ILinkListItemRight.map((item, index) =>
                    <div key={index} className="underline uppercase text-[20px]">
                        <Link href={item.link}>
                            {item.text}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LinkList;