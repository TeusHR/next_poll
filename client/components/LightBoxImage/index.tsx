'use client'
import React, {FC, useState} from 'react'
import FsLightbox from "fslightbox-react";
import NextImage from "next/image";
import {Image} from "@nextui-org/react";
import {imageProps} from "@/components/NewsItem";

type Props = {
    images: string[],
    imageObj: imageProps,
}

const LightboxImages: FC<Props> = ({images, imageObj}) => {
    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });

    const openLightboxOnSlide = () => {
        setLightboxController({
            toggler: !lightboxController.toggler,
            slide: 1
        });
    }

    return (
        <div>
            <FsLightbox
                toggler={lightboxController.toggler}
                sources={images}
            />
            <Image src={imageObj.image}
                   width={imageObj.width}
                   height={imageObj.height}
                   onClick={()=>openLightboxOnSlide()}
                   classNames={{
                       wrapper: "w-full min-w-[230px] cursor-pointer",
                       img: imageObj.imageStyle,
                   }}
                   alt={'preview'}
                   radius="none"
                   as={NextImage}
                   fetchPriority={"high"}
            />
        </div>
    )
}

export default LightboxImages;