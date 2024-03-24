import React from 'react'
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";


const Header = ({}) => {


    return (
        <>
            <header className="flex flex-row h-[178px] max-sm:h-auto max-sm:flex-col gap-4 justify-between items-center p-4 my-4 xl:container mx-auto">
                <div className="flex flex-row max-sm:flex-col justify-center gap-4">
                    <Link href="/" className="w-auto h-full flex justify-center">
                        <Image src={'/image/logo.svg'}
                               alt={'ONTU логотип'}
                               as={NextImage}
                               width={200}
                               height={150}
                               fetchPriority={"high"}
                        />
                    </Link>
                    <div className="flex flex-col gap-4 text-primary max-sm:text-center">
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