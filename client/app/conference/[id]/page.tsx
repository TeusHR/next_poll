import React from 'react'
import Title from "@/components/UI/Title";
import Link from "next/link";


const Conference = ({}) => {


    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14">
                <div className="flex flec-row gap-8 items-end">
                    <Title text="Конференція з собачок" style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
                    <div className="flex flex-row gap-2">
                    <span>
                        28 січня
                    </span>
                        <span className="text-[#D9D9D9]">&#8226;</span>
                        <span>
                        Конференція
                    </span>
                        <span className="text-[#D9D9D9]">&#8226;</span>
                        <span>
                        Україна
                    </span>
                    </div>
                </div>
                <div className="text-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta erat ipsum, et imperdiet
                    quam viverra congue. Quisque vitae nulla arcu. Fusce scelerisque commodo urna id luctus. Sed commodo
                    elit quis odio pharetra mattis. Vivamus bibendum metus et elementum dapibus. Ut suscipit euismod
                    ligula, a porttitor mi facilisis in. Nulla condimentum congue varius. Donec sed feugiat felis, quis
                    fringilla nulla. In vitae arcu at ex interdum venenatis sit amet et lorem. Praesent consequat
                    laoreet ultrices. Fusce facilisis euismod ante vel lobortis. Aliquam mollis mi eu purus fringilla
                    facilisis. Etiam quis pellentesque justo. Vivamus eget felis elit. Sed porttitor metus erat, quis
                    volutpat metus venenatis sed.
                </div>
                <div className="flex flex-col">
                    <Link href={"/"} className="flex flex-row gap-3">
                        <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.33332 20.6668H17.6667V23.5002H6.33332V20.6668ZM6.33332 15.0002H17.6667V17.8335H6.33332V15.0002ZM14.8333 0.833496H3.49999C1.94166 0.833496 0.666656 2.1085 0.666656 3.66683V26.3335C0.666656 27.8918 1.92749 29.1668 3.48582 29.1668H20.5C22.0583 29.1668 23.3333 27.8918 23.3333 26.3335V9.3335L14.8333 0.833496ZM20.5 26.3335H3.49999V3.66683H13.4167V10.7502H20.5V26.3335Z"
                                fill="#2E2C39"/>
                        </svg>
                        <span>
                        Документ
                    </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Conference;