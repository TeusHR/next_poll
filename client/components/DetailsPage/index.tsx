import React from 'react'
import Title from "@/components/UI/Title";
import SliderImage from "@/components/SliderImage";
import Document from "@/components/Document";

const images =  ['/image/MainAfter.webp', "/image/MainAfter.webp", "/image/MainAfter.webp"]

const DetailsPage = ({}) => {


    return (
        <>
            <Title text="Lorem ipsum dolor sit amet"
                   style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
            <div className="flex flex-col gap-14">
                <div className="text-xl font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta erat ipsum, et imperdiet
                    quam viverra congue. Quisque vitae nulla arcu. Fusce scelerisque commodo urna id luctus. Sed
                    commodo elit quis odio pharetra mattis. Vivamus bibendum metus et elementum dapibus. Ut suscipit
                    euismod ligula, a porttitor mi facilisis in. Nulla condimentum congue varius. Donec sed feugiat
                    felis, quis fringilla nulla. In vitae arcu at ex interdum venenatis sit amet et lorem. Praesent
                    consequat laoreet ultrices. Fusce facilisis euismod ante vel lobortis. Aliquam mollis mi eu
                    purus fringilla facilisis. Etiam quis pellentesque justo. Vivamus eget felis elit. Sed porttitor
                    metus erat, quis volutpat metus venenatis sed.
                    <br/><br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta erat ipsum, et imperdiet
                    quam viverra congue. Quisque vitae nulla arcu. Fusce scelerisque commodo urna id luctus. Sed
                    commodo elit quis odio pharetra mattis. Vivamus bibendum metus et elementum dapibus. Ut suscipit
                    euismod ligula, a porttitor mi facilisis in. Nulla condimentum congue varius. Donec sed feugiat
                    felis, quis fringilla nulla. In vitae arcu at ex interdum venenatis sit amet et lorem. Praesent
                    consequat laoreet ultrices. Fusce facilisis euismod ante vel lobortis. Aliquam mollis mi eu
                    purus fringilla facilisis. Etiam quis pellentesque justo. Vivamus eget felis elit. Sed porttitor
                    metus erat, quis volutpat metus venenatis sed.
                </div>
                <div>
                    <SliderImage images={images}/>
                </div>
                <div className="flex flex-col gap-4 w-max">
                    <Document link={"/image/document.pdf"}/>
                    <Document link={"/image/document.pdf"}/>
                    <Document link={"/image/document.pdf"}/>
                </div>
            </div>
        </>
    )
}

export default DetailsPage;