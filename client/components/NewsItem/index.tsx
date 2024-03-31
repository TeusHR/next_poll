import React from 'react'
import Title from "components/UI/Title";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import ButtonDetails from "components/UI/ButtonDetails";

type Props = {
    title: string,
    image: string,
    text: string,
    date: string,
    index: number,
    lengthArr: number,
    buttonDetails?: boolean,
    link?: string,
    showDate?: boolean
}

const NewsItem = ({title, image, text, date, index, lengthArr, buttonDetails, link = '/', showDate = true}: Props) => {


    return (
        <React.Fragment>
            <div className="flex flex-row gap-3 items-center">
                <Title text={title}
                       style="text-[#2E2C39] text-3xl max-xl:text-2xl max-sm:text-xl font-semibold"/>
                {showDate ?
                    <>
                        <span className="text-[#D9D9D9]">&#8226;</span>
                        <span>
                            {date}
                        </span>
                    </> :
                    ''}
            </div>
            <div
                className="flex flex-row max-md:flex-col max-md:items-center gap-4 text-xl max-sm:text-base items-start">
                <Image src={image}
                       width={600}
                       height={210}
                       classNames={{wrapper: "w-full min-w-[230px]"}}
                       alt={'preview'}
                       radius="none"
                       as={NextImage}
                       fetchPriority={"high"}
                />
                <div className="flex flex-col gap-6">
                                    <span>
                                        {text}
                                    </span>
                    {buttonDetails &&
                        <ButtonDetails link={link}>
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.714045 0.285955L0.714045 1.94766L7.29603 1.95355L0.124789 9.12479L1.3033 10.3033L8.47454 3.13206L8.48043 9.71404L10.1421 9.71405V0.285955H0.714045Z"
                                    fill="#111318"/>
                            </svg>
                        </ButtonDetails>
                    }
                </div>
            </div>
            {index !== lengthArr - 1 && <span className="border border-[#6E8880]"></span>}
        </React.Fragment>
    )
}

export default NewsItem;