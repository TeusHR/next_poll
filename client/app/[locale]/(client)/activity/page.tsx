import React from 'react'
import Title from "@/UI/Title";
import NewsItem from "@/components/NewsItem";
import {ActivityService} from "@/services/client.service";
import PaginationCustom from "@/components/Pagination";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Міжнародна діяльність ОНТУ",
    openGraph: {
        url: '/activity/',
    },
}


const Activity = async ({ searchParams }: { searchParams?: { page?: string; }; }) => {
    const currentPage = Number(searchParams?.page) || 1;
    const activity = await ActivityService.getAll(currentPage, 8, 'createdAt')

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <Title text="Міжнародна діяльність ОНТУ"
                       style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
                <div className="flex flex-col gap-14">
                    {activity.data.map((item, index) =>
                        <NewsItem title={item.title}
                                  imageObj={
                                      {
                                          image: item.image,
                                          width: 400,
                                          height: 210,
                                          imageStyle: `max-h-[210px]`
                                      }
                                  }
                                  key={index}
                                  text={item.text}
                                  date={item.createAt}
                                  index={index}
                                  lengthArr={activity.data.length}/>
                    )}
                </div>
                <div className="my-0 mx-auto">
                    <PaginationCustom total={activity.meta.total}
                                      rowsPerPage={activity.meta.perPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Activity;
