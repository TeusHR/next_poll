import React from 'react'
import Link from "next/link";

interface ILinkListItemLeft {
    text: string,
    link: string
}

const ILinkListItemLeft: ILinkListItemLeft[] = [
    {
        text: 'НАУКОВО-ДОСЛІДНИЙ ІНСТИТУТ',
        link: '/consulting'
    },
    {
        text: 'КОНСАЛТИНГОВИЙ ЦЕНТР',
        link: '/consulting'
    },
    {
        text: 'НАУКОВО-ДОСЛІДНІ ЛАБОРАТОРІЇ',
        link: '/laboratory'
    },
    {
        text: 'НАУКОВІ ШКОЛИ',
        link: '/science'
    },
    {
        text: 'СТУДЕНТСЬКА НАУКА',
        link: '/student'
    },
    {
        text: 'ІННОВАЦІЙНІ РОЗРОБКИ',
        link: '/innovations'
    },
]

const ILinkListItemRight: ILinkListItemLeft[] = [
    {
        text: 'ЦЕНТР МІЖНАРОДНОЇ ДІЯЛЬНОСТІ ',
        link: '/consulting'
    },
    {
        text: 'ВІДДІЛ МІЖНАРОДНИХ ГРАНТІВ ТА АКАДЕМІЧНОЇ МОБІЛЬНОСТІ',
        link: ''
    },
    {
        text: 'ЦЕНТР ЛІНГВІСТИЧНОЇ ПІДГОТОВКИ',
        link: '/consulting'
    },
    {
        text: 'ЦЕНТР УКРАЇНО-ФРАНЦУЗЬКОГО СПІВРОБІТНИЦТВА',
        link: '/consulting'
    },
    {
        text: 'ЦЕНТР УКРАЇНО-ТУРЕЦЬКОГО СПІВРОБІТНИЦТВА',
        link: '/consulting'
    },
    {
        text: 'МІЖНАРОДНІ ПРОЕКТИ',
        link: '/international'
    },
]

const LinkList = ({}) => {


    return (
        <div
            className="w-full flex flex-row max-sm:flex-col px-2 max-sm:gap-12 2xl:gap-x-56 max-2xl:gap-x-40 max-xl:gap-x-12 max-md:gap-x-4">
            <div className="flex flex-col gap-y-8 w-full text-center">
                <div className="uppercase text-4xl max-md:text-2xl font-semibold">
                    <div className="relative z-10">
                        <span
                            className="relative after:content-[''] after:z-[-1] after:absolute after:top-0 after:left-0 after:w-full after:h-[75%] after:bg-[#99ABA6] after:translate-x-[18px] after:translate-y-[20px] max-sm:after:translate-x-[15px] max-sm:after:translate-y-[13px]">
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
                            className="relative after:content-[''] after:z-[-1] after:absolute after:top-0 after:left-0 after:w-full after:h-[75%] after:bg-[#99ABA6] after:translate-x-[18px] after:translate-y-[20px] max-sm:after:translate-x-[15px] max-sm:after:translate-y-[13px]">
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