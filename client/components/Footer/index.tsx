import React from 'react'
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

const Footer = ({}) => {


    return (
        <div className="h-[300px] max-md:h-auto bg-[#17161D] w-full">
            <div className="xl:container mx-auto h-full">
                <div
                    className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:justify-center gap-20 max-xl:gap-10 max-xl:p-6 p-8 max-xl:pt-28 pt-28 h-full items-center text-white text-xl md:text-base">
                    <div className="flex w-full max-sm:justify-center">
                        <Image
                            src={'/image/logo.png'}
                            as={NextImage}
                            alt={'ONTU'}
                            width={120}
                            height={133}
                        />
                    </div>
                    <div className="flex flex-col gap-10 max-sm:items-center">
                        <a href="https://need2know.ontu.edu.ua/" target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">
                            <Image
                                src={'/image/need2know.png'}
                                as={NextImage}
                                alt={'need2know'}
                                radius={'none'}
                                width={200}
                                height={25}
                            />
                        </a>
                        <a href="mailto:scint.uni@gmail.com">
                            scint.uni@gmail.com
                        </a>
                    </div>
                    <div className="flex flex-col gap-10 max-sm:items-center">
                        <a href="https://ontu.edu.ua/" className="hover:underline" rel="noopener noreferrer" referrerPolicy="no-referrer">
                          Сайт ОНТУ
                        </a>
                        <a href="tel:+38(048)712-41-79">
                            +38(048)712-41-79
                        </a>
                    </div>
                    <div className="flex flex-col gap-10 max-sm:items-center">
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
                                    <span className="font-bold"> SCINT</span>
                                </Link>
                            </div>
                        </div>
                        <span>
                          Україна, 65039, <br/> м. Одеса, вул. Канатна, 112, каб. А-109
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
