import React from 'react'
import Title from "components/UI/Title";
import NewsItem from "@/components/NewsItem";
import NextImage from "next/image";
import {Image} from "@nextui-org/react";

const consulting = [
    {
        image: '/image/preview.png',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem lectus. Praesent ac maximus mi. Suspendisse hendrerit urna eget nulla dapibus, vel auctor mauris vestibulum. Suspendisse dictum est pharetra sem dignissim egestas. Quisque pharetra, nisi sed dignissim egestas, nisi magna bibendum ipsum, ut finibus urna tellus vitae libero. Phasellus rutrum ante ex, dignissim sollicitudin nisi suscipit ac. Etiam at libero quis ipsum laoreet maximus quis quis sem.',
        date: new Date()
    },
    {
        image: '/image/preview.png',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem lectus. Praesent ac maximus mi. Suspendisse hendrerit urna eget nulla dapibus, vel auctor mauris vestibulum. Suspendisse dictum est pharetra sem dignissim egestas. Quisque pharetra, nisi sed dignissim egestas, nisi magna bibendum ipsum, ut finibus urna tellus vitae libero. Phasellus rutrum ante ex, dignissim sollicitudin nisi suscipit ac. Etiam at libero quis ipsum laoreet maximus quis quis sem.',
        date: new Date()
    },
    {
        image: '/image/preview.png',
        title: 'Lorem ipsum dolor sit amet',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem lectus. Praesent ac maximus mi. Suspendisse hendrerit urna eget nulla dapibus, vel auctor mauris vestibulum. Suspendisse dictum est pharetra sem dignissim egestas. Quisque pharetra, nisi sed dignissim egestas, nisi magna bibendum ipsum, ut finibus urna tellus vitae libero. Phasellus rutrum ante ex, dignissim sollicitudin nisi suscipit ac. Etiam at libero quis ipsum laoreet maximus quis quis sem.',
        date: new Date()
    },
]

const Consulting = ({}) => {


    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <Title text="Інноваційні розробки"
                       style="text-[#111318] text-5xl max-xl:text-3xl font-semibold"/>
                <div
                    className="flex flex-row gap-20 max-sm:flex-col max-xl:gap-14 max-sm:gap-8 text-xl">
                    <div
                        className="flex flex-col gap-14 max-sm:gap-10 w-full min-w-[400px] max-lg:min-w-[300px] max-lg:min-h-[300px] max-sm:min-w-[400px] max-sm:min-h-[400px]">
                        <div className="flex flex-col gap-5 max-sm:items-center max-sm:justify-center">
                            <Image src={"/image/preview.png"}
                                   width={0}
                                   height={0}
                                   sizes="100vw"
                                   style={{width: '100%', height: '100%'}}
                                   classNames={{wrapper: "w-full min-w-[400px] min-h-[400px] max-lg:min-w-[300px] max-lg:min-h-[300px]"}}
                                   alt={'preview'}
                                   radius="none"
                                   as={NextImage}
                                   fetchPriority={"high"}
                            />
                            <div className="text-center flex">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 max-sm:items-center max-sm:justify-center">
                            <Image src={"/image/preview.png"}
                                   width={0}
                                   height={0}
                                   sizes="100vw"
                                   style={{width: '100%', height: '100%'}}
                                   classNames={{wrapper: "w-full min-w-[400px] min-h-[400px] max-lg:min-w-[300px] max-lg:min-h-[300px]"}}
                                   alt={'preview'}
                                   radius="none"
                                   as={NextImage}
                                   fetchPriority={"high"}
                            />
                            <div className="text-center flex">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-14 max-sm:gap-10">
                        <Title text="Інноваційні розробки"
                               style="text-[#111318] text-3xl max-xl:text-2xl font-semibold"/>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta erat ipsum, et
                            imperdiet quam viverra congue. Quisque vitae nulla arcu. Fusce scelerisque commodo urna id
                            luctus. Sed commodo elit quis odio pharetra mattis. Vivamus bibendum metus et elementum
                            dapibus. Ut suscipit euismod ligula, a porttitor mi facilisis in. Nulla condimentum congue
                            varius. Donec sed feugiat felis, quis fringilla nulla.
                            <br/><br/>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta erat ipsum, et
                            imperdiet quam viverra congue. Quisque vitae nulla arcu. Fusce scelerisque commodo urna id
                            luctus. Sed commodo elit quis odio pharetra mattis. Vivamus bibendum metus et elementum
                            dapibus. Ut suscipit euismod ligula, a porttitor mi facilisis in. Nulla condimentum congue
                            varius. Donec sed feugiat felis, quis fringilla nulla.
                            <br/><br/>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta erat ipsum, et
                            imperdiet quam viverra congue. Quisque vitae nulla arcu. Fusce scelerisque commodo urna id
                            luctus. Sed commodo elit quis odio pharetra mattis. Vivamus bibendum metus et elementum
                            dapibus. Ut suscipit euismod ligula, a porttitor mi facilisis in. Nulla condimentum congue
                            varius. Donec sed feugiat felis, quis fringilla nulla.
                            <br/><br/>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta erat ipsum, et
                            imperdiet quam viverra congue. Quisque vitae nulla arcu. Fusce scelerisque commodo urna id
                            luctus. Sed commodo elit quis odio pharetra mattis. Vivamus bibendum metus et elementum
                            dapibus. Ut suscipit euismod ligula, a porttitor mi facilisis in. Nulla condimentum congue
                            varius. Donec sed feugiat felis, quis fringilla nulla.
                            <br/><br/>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-14 max-sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <Title text="Lorem ipsum dolor sit amet"
                               style="text-[#111318] text-5xl max-xl:text-3xl font-semibold"/>
                        <span className="border border-[#6E8880]"></span>
                    </div>
                    <div className="flex flex-col gap-14">
                        {consulting.map((item, index) =>
                            <NewsItem title={item.title} image={item.image}
                                      key={index}
                                      text={item.text}
                                      date={"28 січня"}
                                      index={index}
                                      buttonDetails
                                      link={'/'}
                                      showDate={false}
                                      lengthArr={consulting.length}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Consulting;