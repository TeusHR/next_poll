'use client'
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Accordion, AccordionItem, Checkbox, CheckboxGroup} from "@nextui-org/react";
import {IInnovationFilter} from "@/types/InnovationFilter";
import {InnovationsFilters} from "@/services/CMS.service";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {useLocale} from "next-intl";
import {Raleway} from "next/font/google";

const FilterSVG = () => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0 14V16H6V14H0ZM0 2V4H10V2H0ZM10 18V16H18V14H10V12H8V18H10ZM4 6V8H0V10H4V12H6V6H4ZM18 10V8H8V10H18ZM12 6H14V4H18V2H14V0H12V6Z"
                fill="#1E1E1E"/>
        </svg>
    )
}

type Props = {
    selectedFilter: string[]
    setSelectedFilter: React.Dispatch<React.SetStateAction<string[]>>
}

const RalewaySlab = Raleway({weight: '400', subsets: ['cyrillic']});

const InnovationsFilter: FC<Props> = ({selectedFilter, setSelectedFilter}) => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["filter"]));
    const [innovationFilters, setInnovationFilters] = useState<IInnovationFilter[]>([])
    const $apiAuth = useAxiosAuth();
    const language = useLocale();

    const handlerFetchFilters = useCallback(() => {
        InnovationsFilters.getAll($apiAuth, language.toUpperCase()).then(res => {
            setInnovationFilters(res.sort((a, b) => a.name.localeCompare(b.name)))
        })
    }, [$apiAuth, language])

    useEffect(() => {
        handlerFetchFilters()
    }, [$apiAuth, handlerFetchFilters, language]);

    return (
        <div className={`${RalewaySlab.className}`}>
            <Accordion selectedKeys={selectedKeys} className="px-0" itemClasses={{
                title: "text-xl"
            }} onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}>
                <AccordionItem key="filter" aria-label="Фільтр" title="Фільтр" hideIndicator={true}
                               startContent={<FilterSVG/>}>
                    <div className="flex flex-row gap-6 rounded-2xl bg-[#D9D9D9] px-4 py-4 min-h-36">
                        <div className="flex flex-row gap-10 w-full justify-between">
                            {innovationFilters.length > 0 ? <CheckboxGroup
                                classNames={{
                                    wrapper: "flex flex-row gap-y-3 gap-x-7",
                                }}
                                value={selectedFilter}
                                onValueChange={setSelectedFilter}
                            >
                                {innovationFilters.map((filter) =>
                                    <Checkbox key={filter.id} classNames={{
                                        label: `text-lg`,
                                        wrapper: 'rounded-none before:rounded-[4px] before:border-black before:border-[3px]',
                                        icon: 'h-[0.85rem]'
                                    }}
                                              value={filter.id}>{filter.name}</Checkbox>
                                )}
                            </CheckboxGroup> : <span className="font-bold text-2xl">Ще немає фільтрів</span>}
                            <div className="flex flex-row gap-3 h-max items-center cursor-pointer"
                                 onClick={() => setSelectedFilter([])}>
                                <svg width="18" height="10" viewBox="0 0 18 10" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 6H16V4H2V6ZM0 10H14V8H0V10ZM4 0V2H18V0H4Z" fill="#2E2C39"/>
                                </svg>
                                <span className="text-lg">Очистити</span>
                            </div>
                        </div>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default InnovationsFilter;