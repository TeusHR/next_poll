import React from 'react'
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import Search from "@/components/Search";


const Header = () => (
    <header
        className="flex flex-row h-[178px] max-sm:h-auto max-sm:flex-col gap-4 justify-between items-center p-4 my-4 xl:container xl:mx-auto">
        <div className="flex flex-row max-sm:flex-col justify-start gap-4 w-full">
            <Link href="/" className="w-auto h-full flex justify-center">
                <Image src={'/image/logo.png'}
                       alt={'ONTU логотип'}
                       className={"object-contain"}
                       as={NextImage}
                       width={120}
                       height={180}
                       fetchPriority={"high"}
                />
            </Link>
            <div className="flex flex-col justify-center gap-4 text-primary max-sm:text-center max-sm:items-center max-sm:h-[70px]">
              <Image src={'/image/logoText.svg'}
                     alt={'ONTU логотип'}
                     className={"object-contain"}
                     classNames={{wrapper:'h-full w-[270px] max-sm:w-full !max-w-full'}}
                     as={NextImage}
                     fill
                     fetchPriority={"high"}
              />
                {/*<div className="text-4xl font-semibold">*/}
                {/*    SCINT ONTU*/}
                {/*</div>*/}
                {/*<div className="flex flex-col text-xs">*/}
                {/*  <span>*/}
                {/*    Наукова робота та міжнародна діяльність*/}
                {/*  </span>*/}
                {/*  <span>*/}
                {/*    Одеського національного технологічного університету*/}
                {/*  </span>*/}
                {/*</div>*/}
            </div>
        </div>
        <Search/>
    </header>
)

export default Header;
