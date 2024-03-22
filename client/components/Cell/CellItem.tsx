import React from 'react'
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

export type ICellItem = {
    text:string,
    image:string,
    styleImage?:string,
    link:string
}

const CellItem = ({text,image, styleImage, link}:ICellItem) => {


    return (
        <Link href={link} className="flex-1">
            <div
                className="rounded-2xl flex flex-row justify-between border border-b-1 px-8 max-xl:px-4 max-xl:py-6 py-9 border-primary">
                <div className="flex flex-col gap-14 justify-between">
                <span className="text-3xl max-xl:text-2xl max-md:text-xl max-sm:text-2xl text-start">
                    {text}
                </span>
                    <div className="flex flex-row gap-2 items-center">
                    <span className="bg-[#6E8880] w-[34px] h-[34px] flex items-center justify-center rounded-full">
                        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.3923 9.46387L11.8762 11.39L19.5036 13.441L8.96411 19.526L9.96411 21.2581L20.5036 15.1731L18.4662 22.8042L20.3923 23.3203L23.3205 12.3921L12.3923 9.46387Z"
                                fill="#FDFDFD"/>
                        </svg>
                    </span>
                        <span className="text-base">
                        Читати далі
                    </span>
                    </div>
                </div>
                <div className="flex items-center">
                    <Image
                        src={image}
                        as={NextImage}
                        alt={"Шолом"}
                        width={175}
                        height={175}
                        fetchPriority="high"
                    />
                </div>
            </div>
        </Link>
    )
}

export default CellItem;