import React from 'react'
import Title from "components/UI/Title";
import Document from "@/components/Document";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

type Props = {
    title: string,
    text: string,
    index: number,
    files?: string[],
}

const DirectItem = ({title, text, index, files}: Props) => {

    return (
        <div className="grid grid-cols-[minmax(0,85px)_1fr] gap-10 max-sm:gap-7 max-xsm:grid-cols-1">
            <div className="text-8xl font-bold text-white w-full h-full content-center max-xsm:hidden"
                 style={{WebkitTextStroke: "2px black", WebkitTextFillColor: "transparent"}}>
                <Image
                    src={"/image/ArrowDirectItem.svg"}
                    classNames={{
                        wrapper:"!max-w-[85px] h-[125px] max-lg:h-[100px] max-md:h-[85px]"
                    }}
                    as={NextImage}
                    alt={"static arrow"}
                    fill
                    fetchPriority="high"
                />
            </div>
            <div className="flex flex-col gap-6 text-xl w-full">
                <Title text={title} style="text-[#2E2C39] text-3xl max-xl:text-2xl max-sm:text-xl font-semibold"/>
                <div dangerouslySetInnerHTML={{__html: text}}></div>
                {files &&
                    <div className="flex flex-col relative w-max gap-2">
                        {files.map(item => (<Document key={item} link={item} title={item}/>))}
                    </div>
                }
            </div>
        </div>
    )
}

export default DirectItem;