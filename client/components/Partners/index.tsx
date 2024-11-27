import React from 'react'
import NextImage from "next/image";
import {Image} from "@nextui-org/react";

interface IPartners {
    image:string
    alt:string,
}

const partnersImage:IPartners[] = [
    {
        image:'/image/effost.png',
        alt:'effost'
    },
    {
        image:'/image/icde.png',
        alt:'icde'
    },
    {
        image:'/image/eua.png',
        alt:'EUA'
    },
    // {
    //     image:'/image/eua2.png',
    //     alt:'EUA'
    // },
    {
        image:'/image/eramus.png',
        alt:'Erasmus+'
    },
    {
        image:'/image/moi.png',
        alt:'MOI'
    },
    {
        image:'/image/euchems.png',
        alt:'EuChems'
    },
]

const partnersMain:IPartners[] = [
    {
        image:'/image/horizoneu.png',
        alt:'horizon europe'
    },
    {
        image:'/image/ontu.png',
        alt:'ontu'
    },
    {
        image:'/image/bsun.png',
        alt:'BSUN'
    },
]

const Partners = ({}) => {


    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-evenly w-full gap-6">
                {partnersImage.map((item, index) => <Image
                    key={index}
                    src={item.image}
                    className={"object-contain"}
                    classNames={{wrapper:'min-w-[200px]'}}
                    as={NextImage}
                    alt={item.alt}
                    width={200}
                    height={140}
                />)}
            </div>
            <div className="flex flex-wrap items-center justify-evenly w-full gap-6">
                {partnersMain.map((item, index) => <Image
                    key={index}
                    src={item.image}
                    className={"object-contain"}
                    classNames={{wrapper:'min-w-[200px]'}}
                    as={NextImage}
                    alt={item.alt}
                    width={200}
                    height={140}
                />)}
            </div>
        </div>
    )
}

export default Partners;