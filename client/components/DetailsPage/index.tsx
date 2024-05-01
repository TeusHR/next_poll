import React, {FC} from 'react'
import Title from "@/components/UI/Title";
import SliderImage from "@/components/SliderImage";
import Document from "@/components/Document";
import {IInnovation} from "@/types/Innovation";
import {stripHtml} from "@/utils/StripHtml";
import {IInternational} from "@/types/International";

const images =  ['/image/MainAfter.webp', "/image/MainAfter.webp", "/image/MainAfter.webp"]

type Props<T> = {
    data:T
}

const DetailsPage:FC<Props<IInnovation | IInternational>> = ({data}) => {


    return (
        <>
            <Title text={data.title}
                   style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
            <div className="flex flex-col gap-14">
                <div className="text-xl font-normal">
                    {stripHtml(data.text)}
                </div>
                <div>
                    <SliderImage images={data.images}/>
                </div>
                <div className="flex flex-col gap-4 w-max">
                    {data.files.map(item => (<Document key={item} link={item}/>))}
                </div>
            </div>
        </>
    )
}

export default DetailsPage;