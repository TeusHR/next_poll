import React from 'react'
import Title from "@/components/UI/Title";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

const news = [
    {
        image: '/image/preview.png',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem lectus. Praesent ac maximus mi. Suspendisse hendrerit urna eget nulla dapibus, vel auctor mauris vestibulum. Suspendisse dictum est pharetra sem dignissim egestas. Quisque pharetra, nisi sed dignissim egestas, nisi magna bibendum ipsum, ut finibus urna tellus vitae libero. Phasellus rutrum ante ex, dignissim sollicitudin nisi suscipit ac. Etiam at libero quis ipsum laoreet maximus quis quis sem.',
        date: new Date()
    },
    {
        image: '/image/preview.png',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem lectus. Praesent ac maximus mi. Suspendisse hendrerit urna eget nulla dapibus, vel auctor mauris vestibulum. Suspendisse dictum est pharetra sem dignissim egestas. Quisque pharetra, nisi sed dignissim egestas, nisi magna bibendum ipsum, ut finibus urna tellus vitae libero. Phasellus rutrum ante ex, dignissim sollicitudin nisi suscipit ac. Etiam at libero quis ipsum laoreet maximus quis quis sem.',
        date: new Date()
    },
    {
        image: '/image/preview.png',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem lectus. Praesent ac maximus mi. Suspendisse hendrerit urna eget nulla dapibus, vel auctor mauris vestibulum. Suspendisse dictum est pharetra sem dignissim egestas. Quisque pharetra, nisi sed dignissim egestas, nisi magna bibendum ipsum, ut finibus urna tellus vitae libero. Phasellus rutrum ante ex, dignissim sollicitudin nisi suscipit ac. Etiam at libero quis ipsum laoreet maximus quis quis sem.',
        date: new Date()
    },
]

const News = ({}) => {


    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14">
                <Title text="Наукова робота ОНТУ"
                       style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
                <div className="flex flex-col gap-14">
                    {news.map((item, index) =>
                        <React.Fragment key={index}>
                            <div className="flex flex-row gap-3 items-center">
                                <Title text={item.title}
                                       style="text-[#2E2C39] text-3xl max-xl:text-2xl max-sm:text-xl font-semibold"/>
                                <span className="text-[#D9D9D9]">&#8226;</span>
                                <span>
                                    28 січня
                                </span>
                            </div>
                            <div className="flex flex-row max-md:flex-col max-md:items-center gap-4 text-xl max-sm:text-base items-start">
                                <Image src={item.image}
                                       width={600}
                                       height={210}
                                       classNames={{wrapper:"w-full min-w-[230px]"}}
                                       alt={'preview'}
                                       as={NextImage}
                                       fetchPriority={"high"}
                                />
                                <span>
                                    {item.text}
                                </span>
                            </div>
                            {index !== news.length - 1 && <span className="border border-[#6E8880]"></span>}
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    )
}

export default News;