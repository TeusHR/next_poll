import React, {FC} from 'react'
import Title from "@/components/UI/Title";
import SliderImage from "@/components/SliderImage";
import Document from "@/components/Document";
import {IInnovation} from "@/types/Innovation";
import {IInternational} from "@/types/International";
import {ILaboratory} from "@/types/Laboratory";

type Props<T> = {
    data: T
}

const DetailsPage: FC<Props<IInnovation | IInternational | ILaboratory>> = ({data}) => (
    <>
        <Title text={data.title}
               style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
        <div className="flex flex-col gap-14">
            <div className="text-xl font-normal" dangerouslySetInnerHTML={{ __html: data.text }}></div>
            {data.images.length > 0 && <div>
                <SliderImage images={data.images}/>
            </div>
            }
            <div className="flex flex-col gap-4 w-max">
                {data.files.map(item => (<Document key={item} link={item} title={item}/>))}
            </div>
        </div>
    </>
)

export default DetailsPage;
