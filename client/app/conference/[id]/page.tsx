import React from 'react'
import Title from "@/components/UI/Title";
import Document from "@/components/Document";

const Conference = ({}) => {


    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <div className="flex flec-row gap-8 items-end max-sm:flex-col max-sm:gap-4 max-sm:items-start">
                    <Title text="Конференція з собачок"
                           style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
                    <div className="flex flex-row gap-2 sm:min-w-max">
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
                <div className="flex flex-col relative w-max">
                    <Document link={"/image/document.pdf"}/>
                </div>
            </div>
        </div>
    )
}

export default Conference;