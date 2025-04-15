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
                    <Link href="/poll" className="w-auto h-full flex justify-center">
                        <Button className="border-fd bg-transparent border-2 text-white font-bold px-6 text-base rounded-full data-[hover=true]:bg-fd data-[hover=true]:!opacity-100">
                            Почати
                            <span className="w-[14px] h-[14px]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z"></path></svg>
                            </span>
                        </Button>
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Header;
