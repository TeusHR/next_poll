import React from 'react'
import Title from "components/UI/Title";
import {stripHtml} from "@/utils/StripHtml";

type Props = {
    title: string,
    text: string,
    index: number,
}

const DirectItem = ({title, text, index}: Props) => {

    return (
        <div className="flex flex-row gap-14 max-sm:gap-7 max-xsm:flex-col">
            <div>
                <span className="text-8xl font-bold text-white"
                      style={{WebkitTextStroke: "2px black", WebkitTextFillColor: "transparent"}}>
                    {index < 10 ? `0${index}/` : `${index}/`}
                </span>
            </div>
            <div className="flex flex-col gap-6 text-xl">
                <Title text={title} style="text-[#2E2C39] text-3xl max-xl:text-2xl max-sm:text-xl font-semibold"/>
                <span>
                  {stripHtml(text)}
                </span>
            </div>
        </div>
    )
}

export default DirectItem;