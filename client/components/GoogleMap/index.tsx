import React from 'react'
import NextImage from "next/image";
import {Image} from "@nextui-org/react";

const GoogleMap = ({}) => {


    return (
        <>
            <Image
                src={'/image/googlemaps.png'}
                as={NextImage}
                classNames={{wrapper:"static"}}
                alt={'google map'}
                fill={true}
            />
        </>
    )
}

export default GoogleMap;