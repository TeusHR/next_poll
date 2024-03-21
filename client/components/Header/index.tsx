import React from 'react'
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";


const Header = ({}) => {


    return (
        <>
            <header className="flex flex-row h-[178px] justify-between items-center p-4 my-4 container mx-auto">
                <div className="flex flex-row gap-4">
                    <Link href="/" className="w-auto h-full">
                        <Image src={'/image/logo.svg'}
                               alt={'ONTU логотип'}
                               as={NextImage}
                               width={200}
                               height={150}
                               fetchPriority={"high"}
                        />
                    </Link>
                    <div className="flex flex-col gap-4 text-primary">
                        <div className="text-6xl font-semibold">
                            SCINT ONTU
                        </div>
                        <div className="flex flex-col text-base">
                           <span>
                                Наукова робота та міжнародна діяльность
                           </span>
                           <span>
                                Одеського національного технологічного університету
                           </span>
                        </div>
                    </div>
                </div>
                <div className="cursor-pointer">
                    <Image src={'/image/search.svg'}
                           alt={'Пошук'}
                           as={NextImage}
                           width={34}
                           height={34}
                           fetchPriority={"high"}
                    />
                </div>
            </header>
        </>
    )
}

export default Header;