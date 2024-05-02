import React from 'react'
import Title from "components/UI/Title";
import NextImage from "next/image";
import {Image} from "@nextui-org/react";
import {ConsultingService} from "@/services/client.service";
import {notFound} from "next/navigation";
import {stripHtml} from "@/utils/StripHtml";


const Consulting = async ({}) => {
    const consulting = await ConsultingService.getAll()

    if (consulting === null)
        return notFound();

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <Title text="Консалтинговий центр НДІ"
                       style="text-[#111318] text-5xl max-xl:text-3xl font-semibold"/>
                {consulting.images.map((item, index) => (
                    <div key={`${item.image}-${index}`}
                         className="flex flex-row gap-20 max-sm:flex-col max-xl:gap-14 max-sm:gap-8 text-xl">
                        <div className="flex flex-col gap-14 max-sm:gap-10 max-w-[400px]">
                            <div className="flex flex-col gap-5 max-sm:items-center max-sm:justify-center">
                                <Image src={item.image}
                                       width={400}
                                       height={400}
                                       sizes="100vw"
                                       style={{width: '100%', height: '100%'}}
                                       classNames={{wrapper: "w-full max-w-[400px] max-h-[400px] max-lg:max-w-[300px] max-lg:max-h-[300px]"}}
                                       alt={'preview'}
                                       radius="none"
                                       as={NextImage}
                                       fetchPriority={"high"}
                                />
                                <div className="mx-auto my-0 text-center">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-14 max-sm:gap-10">
                            <Title text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                   style="text-[#111318] text-3xl max-xl:text-2xl font-semibold"/>
                            <div>
                                {stripHtml(consulting.text)}
                            </div>
                        </div>
                    </div>))}

                <div className="flex flex-col gap-14 max-sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <Title text="Lorem ipsum dolor sit amet"
                               style="text-[#111318] text-5xl max-xl:text-3xl font-semibold"/>
                        <span className="border border-[#6E8880]"></span>
                    </div>
                    <div className="flex flex-col gap-14">
                        {/*{consulting.map((item, index) =>*/}
                        {/*    <NewsItem title={item.title}*/}
                        {/*              imageObj={{*/}
                        {/*                  image: item.image,*/}
                        {/*                  width: 400,*/}
                        {/*                  height: 400,*/}
                        {/*                  imageStyle:`max-h-[400px]`*/}
                        {/*              }}*/}
                        {/*              key={index}*/}
                        {/*              text={item.text}*/}
                        {/*              date={new Date().toISOString()}*/}
                        {/*              index={index}*/}
                        {/*              buttonDetails*/}
                        {/*              link={'/'}*/}
                        {/*              showDate={false}*/}
                        {/*              lengthArr={consulting.length}/>*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Consulting;
