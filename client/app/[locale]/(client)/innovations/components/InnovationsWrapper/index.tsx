'use client'
import React, {useEffect, useState} from 'react';
import InnovationsFilter from "../InnovationsFilter";
import NewsItem from "@/components/NewsItem";
import PaginationCustom from "@/components/Pagination";
import {InnovationService} from "@/services/client.service";
import {useSearchParams} from "next/navigation";
import {useLocale} from "next-intl";
import {IResponseMeta} from "@/types/Conference";
import {IInnovation} from "@/types/Innovation";

const InnovationsWrapper = () => {
    const [selectedFilter, setSelectedFilter] = React.useState<string[]>([]);
    const [innovations, setInnovations] = useState<IResponseMeta<IInnovation[]>>({
        data: [],
        meta: {
            total: 0,
            lastPage: 1,
            currentPage: 1,
            perPage: 5,
            prev: 1,
            next: 1
        }
    })
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams?.get('page')) || 1;
    const language = useLocale();

    useEffect(() => {
        InnovationService.getAllClient(currentPage, 8, "createdAt", undefined, language.toUpperCase(), selectedFilter).then(res => {
            setInnovations(res)
        })
    }, [currentPage, language, selectedFilter]);

    return (
        <>
            <InnovationsFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
            <div className="flex flex-col gap-14">
                {innovations.data.map((item, index) => (
                    <NewsItem
                        title={item.title}
                        imageObj={{
                            image: item.images[0],
                            width: 400,
                            height: 210,
                            imageStyle: `max-h-[210px]`,
                        }}
                        lightBoxImage={{
                            show: true,
                            images: item.images,
                        }}
                        key={index}
                        text={item.text}
                        date={item.createdAt}
                        index={index}
                        buttonDetails
                        link={`/innovations/${item.id}`}
                        lengthArr={innovations.data.length}
                    />
                ))}
            </div>
            <div className="my-0 mx-auto">
                <PaginationCustom total={innovations.meta.total} rowsPerPage={innovations.meta.perPage}/>
            </div>
        </>
    );
};

export default InnovationsWrapper;