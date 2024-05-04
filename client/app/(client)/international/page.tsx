import React from 'react'
import Title from "components/UI/Title";
import NewsItem from "@/components/NewsItem";
import {InternationalService} from "@/services/client.service";
import PaginationCustom from "@/components/Pagination";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Міжнародні проекти",
    openGraph: {
        url: '/international/',
    },
}

const International = async ({
                           searchParams,
                       }: { searchParams?: { page?: string; }; }) => {
    const currentPage = Number(searchParams?.page) || 1;
    const international = await InternationalService.getAll(currentPage, 8, 'createdAt')

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <Title text="Міжнародні проекти"
                       style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
                <div className="flex flex-col gap-14">
                    {international.data.map((item, index) =>
                        <NewsItem title={item.title}
                                  imageObj={
                                      {
                                          image: item.images[0],
                                          width: 400,
                                          height: 210,
                                          imageStyle: `max-h-[210px]`
                                      }
                                  }
                                  lightBoxImage={{
                                      show: true,
                                      images: item.images
                                  }}
                                  key={index}
                                  text={item.text}
                                  date={new Date().toISOString()}
                                  index={index}
                                  buttonDetails
                                  link={`/international/${item.id}`}
                                  lengthArr={international.data.length}
                        />
                    )}
                </div>
                <div className="my-0 mx-auto">
                    <PaginationCustom total={international.meta.total}
                                      rowsPerPage={international.meta.perPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default International;
