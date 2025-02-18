'use client'
import React, {useState} from 'react'
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import NextImage from "next/image";
import {Image} from "@nextui-org/react";
import FsLightbox from "fslightbox-react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './navigation.scss'
import {Swiper as SwiperTypes} from "swiper/types";

type Props = {
    images: string[]
}

const SliderImage = ({images}: Props) => {
    const [swiper, setSwiper] = useState<SwiperTypes>();
    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });

    const openLightboxOnSlide = () => {
        if (swiper)
            setLightboxController({
                toggler: !lightboxController.toggler,
                slide: swiper.activeIndex + 1
            });
    }

    return (
        <div className="flex mx-auto my-0 w-full h-full max-w-[1300px] max-h-[650px] select-none">
            <FsLightbox
                toggler={lightboxController.toggler}
                sources={images}
            />
            <Swiper
                pagination={{
                    clickable: true,
                    enabled: images.length > 1
                }}
                loop
                autoplay={{
                    delay: 5000,
                    pauseOnMouseEnter: true
                }}
                onSwiper={setSwiper}
                navigation={images.length > 1}
                modules={[Pagination, Autoplay, Navigation]}
                className="w-full rounded-[16px]"
            >
                {images.map((item, index) =>
                    <SwiperSlide key={index} onClick={() => openLightboxOnSlide()}>
                        <Image src={encodeURI(item)}
                               sizes="100vw"
                               alt={'preview'}
                               as={NextImage}
                               width={0}
                               height={0}
                               style={{width: '100%', height: 'auto', cursor: 'pointer'}}
                               radius="none"
                               fetchPriority={"high"}
                               classNames={{wrapper: '!max-w-[100%]'}}
                        />
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}

export default SliderImage;
