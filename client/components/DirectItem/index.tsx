import React from 'react'
import Title from "components/UI/Title";
import Document from "@/components/Document";

type Props = {
    title: string,
    text: string,
    index: number,
  files?:string[],
}

const DirectItem = ({title, text, index, files}: Props) => {

    return (
        <div className="flex flex-row gap-14 max-sm:gap-7 max-xsm:flex-col">
            {/*<div>*/}
            {/*    <span className="text-8xl font-bold text-white"*/}
            {/*          style={{WebkitTextStroke: "2px black", WebkitTextFillColor: "transparent"}}>*/}
            {/*        {index < 10 ? `0${index}/` : `${index}/`}*/}
            {/*    </span>*/}
            {/*</div>*/}
          <div className="flex flex-col gap-6 text-xl w-full">
            <Title text={title} style="text-[#2E2C39] text-3xl max-xl:text-2xl max-sm:text-xl font-semibold" />
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
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