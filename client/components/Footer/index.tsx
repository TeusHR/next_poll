import React from 'react'
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

const Footer = ({}) => {


    return (
        <div className="h-[300px] bg-[#17161D] w-full">
            <div className="xl:container mx-auto h-full">
                <div
                    className="grid grid-cols-4 p-16 px-24 pt-28 pr-[40rem] h-full items-center text-white text-xl md:text-base">
                    <Image
                        src={'/image/logoft.png'}
                        as={NextImage}
                        alt={'ONTU'}
                        width={150}
                        height={115}
                    />
                    <div className="flex flex-col gap-10">
                        <Image
                            src={'/image/need2know.png'}
                            as={NextImage}
                            alt={'need2know'}
                            width={200}
                            height={25}
                        />
                        <span>
                            scint.uni@gmail.com
                        </span>
                    </div>
                    <div className="flex flex-col gap-10">
                        <span>
                          Сайт ОНТУ
                        </span>
                        <span>
                          048-712-41-79
                        </span>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-row gap-3">
                            <Image
                                src={'/image/tg.svg'}
                                as={NextImage}
                                alt={'telegram'}
                                width={26}
                                height={26}
                            />
                            <div>
                                <Link href="https://t.me/scintONTU">
                                    Телеграм-канал
                                    <span className="font-bold">SCINT</span>
                                </Link>
                            </div>
                        </div>
                        <span>
                          Канатна, 112,  каб А-109, Одеса, Україна,
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;