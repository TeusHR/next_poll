import React from 'react'
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import {Link} from "@/routing/*";

export type ICellItem = {
    text: string,
    image: string,
    styleImage?: boolean,
    wrapperStyle?: string,
    link: string
}

type Props = {
    text: string,
    image: string,
    styleImage?: string,
    wrapperStyle?: string,
    readMore?: string,
    link: string,
    linkClassName?: string,
    textClassName?: string,
    imageClassName?: string,
    wrapperTextClassName?: string,
}

const CellItem = ({
                      text,
                      image,
                      styleImage,
                      link,
                      wrapperStyle,
                      readMore,
                      linkClassName,
                      textClassName,
                      imageClassName,
                      wrapperTextClassName
                  }: Props) => {


    return (
        <Link href={link} className={`${linkClassName ? linkClassName : "flex-1 flex"} relative`}>
            <div
                className="rounded-2xl h-full flex flex-row w-full justify-between border border-b-1 px-8 max-xl:px-4 max-xl:py-6 py-9 border-primary">
                <div
                    className={`flex flex-col gap-14 justify-between ${wrapperTextClassName ? wrapperTextClassName : 'pr-40 max-2xl:pr-20 max-sm:pr-28'}`}>
                    <span
                        className={`${textClassName ? textClassName : "text-3xl max-xl:text-2xl max-md:text-xl text-start"}`}>
                        {text}
                    </span>
                    <div className="flex flex-row gap-2 items-center">
                        <span className="bg-[#6E8880] w-[34px] h-[34px] flex items-center justify-center rounded-full">
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.3923 9.46387L11.8762 11.39L19.5036 13.441L8.96411 19.526L9.96411 21.2581L20.5036 15.1731L18.4662 22.8042L20.3923 23.3203L23.3205 12.3921L12.3923 9.46387Z"
                                    fill="#FDFDFD"/>
                            </svg>
                        </span>
                        {readMore && <span className="text-base">
                            {readMore}
                        </span>}
                    </div>
                </div>
                <div
                    className={`flex items-center ${styleImage ? styleImage : 'absolute right-[-30px] bottom-0 top-0 my-auto max-2xl:max-w-[175px] max-xl:max-w-[140px] max-sm:max-w-[175px] max-te:max-w-[140px]'}`}>
                    <Image
                        src={image}
                        as={NextImage}
                        classNames={{wrapper: wrapperStyle}}
                        className={` ${imageClassName ? imageClassName : 'object-contain'}`}
                        alt={text}
                        fill
                        // width={205}
                        // height={205}
                        fetchPriority="high"
                    />
                </div>
            </div>
        </Link>
    )
}

export default CellItem;