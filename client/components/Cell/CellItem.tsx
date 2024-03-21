
import React from 'react'
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

const CellItem = ({}) => {


    return (
        <div className="rounded-2xl border border-b-1 px-8 py-9 border-primary max-w-[650px]">
            <div className="flex flex-col">
                <span className="text-3xl">
                    Lorem ipsum dolor sit amet
                </span>
                <div className="flex flex-row gap-2">
                    <span>
                         <Image src={'/image/arrow.svg'}
                                alt={'Перейти далі'}
                                as={NextImage}
                                width={24}
                                height={24}
                         />
                    </span>
                    <span className="text-base">
                        Читати далі
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CellItem;