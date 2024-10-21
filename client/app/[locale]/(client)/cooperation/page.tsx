import React from 'react'
import Title from "@/UI/Title";
import DirectItem from "@/components/DirectItem";
import {CooperationService} from "@/services/client.service";
import PaginationCustom from "@/components/Pagination";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Напрямки для співпраці",
    openGraph: {
        url: '/cooperation/',
    },
}

const Cooperation = async ({searchParams}: { searchParams?: { page?: string; }; }) => {
    const currentPage = Number(searchParams?.page) || 1;
    const cooperation = await CooperationService.getAll(currentPage, 8, 'createdAt')


    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <Title text="Напрямки для співпраці"
                       style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
                {cooperation.data.map((item, index) =>

                    <React.Fragment key={index}>
                        <DirectItem title={item.title} text={item.text}
                                    index={(currentPage - 1) * cooperation.meta.perPage + index + 1}/>
                        {index !== cooperation.data.length - 1 && <span className="border border-[#6E8880]"></span>}
                    </React.Fragment>
                )}
                <div className="my-0 mx-auto">
                    <PaginationCustom total={cooperation.meta.total}
                                      rowsPerPage={cooperation.meta.perPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Cooperation;
