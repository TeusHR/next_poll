import React from 'react'
import {Button, Image} from "@heroui/react";
import NextImage from "next/image";
import {Link} from "@/routing/*";

const Header = () => {

    return (
        <div className="flex flex-col relative z-10 py-6">
            <header className="flex flex-row h-[78px] bg-[rgba(0,_0,_0,_0.65)] max-sm:h-auto gap-4 justify-between items-center p-4 xl:container xl:mx-auto">
                <div className="flex flex-row gap-4 w-full items-center justify-between px-10 max-xsm:px-0">
                    <Link href="/" className="w-auto h-full flex justify-center">
                        <Image src={"/image/Teus_free_1000-1000_PNG.png"}
                               alt={"ONTU логотип"}
                               className={"object-contain"}
                               classNames={{
                                   wrapper:"!max-w-none w-[75px] h-[75px]"
                               }}
                               as={NextImage}
                               fill
                               fetchPriority={"high"}
                        />
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Header;
