'use client'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter, useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {ResearchService} from "@/services/CMS.service";
import {IResearch} from "@/types/Research";
import TableSearch from "@/components/CMS/TableSearch";
import {Button} from "@nextui-org/react";
import TitleBack from "@/components/CMS/TitleBack";
import TableItems from "@/components/CMS/TableItems";
import {IResponseMeta} from "@/types/Conference";

const tableColumn: { title: string, key: string }[] = [
    {title: 'id', key: 'id'},
    {title: 'Зображення', key: 'image'},
    {title: 'Назва', key: 'title'},
    {title: 'Опис', key: 'text'},
    {title: 'Дії', key: 'action'}
]

const ResearchTable = ({}) => {

    const [initialResearch, setInitialConference] = useState<IResponseMeta<IResearch[]>>()

    const searchParams = useSearchParams()
    const {status} = useSession()
    const $apiAuth = useAxiosAuth()
    const showAdd = true

    const router = useRouter()
    const [valueSearch,
        setValueSearch] = useState<string>('')
    const [filterResearch,
        setFilterResearch] = useState<IResearch[]>([])

    useEffect(() => {
        if (status === 'authenticated') {
            ResearchService.getAllResearch($apiAuth, Number(searchParams.get('page') ?? 1), 999).then(res => {
                setInitialConference(res)
                setFilterResearch(res.data)
            })
        }
    }, [$apiAuth, searchParams, status]);

    const handleSelectCategories = useCallback(() => {
        if(initialResearch) {
            let filter: IResearch[] = initialResearch.data
            if (valueSearch.trim() !== '') {
                filter = initialResearch.data.filter((conferences) =>
                    conferences.title.toLowerCase().includes(valueSearch.toLowerCase()));
            }
            setFilterResearch(filter);
        }

    }, [initialResearch, valueSearch])

    useEffect(() => {
        handleSelectCategories()
    }, [valueSearch, handleSelectCategories]);

    const openCreatePage = useCallback(() => {
        router.push('/cms/research/new')
    }, [router])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 items-center">
                <div className="gap-8 max-lg:gap-4 flex items-center justify-start w-full max-lg:items-start">
                    <div className="w-full flex gap-8 max-lg:gap-4 max-lg:grid max-lg:grid-cols-2 max-lg:items-start">
                        <TableSearch handleSearch={setValueSearch} valueInput={valueSearch}
                                     wrapperClassName="w-full max-w-[300px] min-w-[150px]"/>
                    </div>
                    <div className="py-2">
                        {showAdd &&
                            <Button onPress={openCreatePage} color="default" className="text-black flex-1 bg-fd"
                                    endContent={<svg xmlns="http://www.w3.org/2000/svg" className="w-[20px]"
                                                     viewBox="0 0 24 24"
                                                     fill="currentColor">
                                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                                    </svg>}>Створити</Button>}
                    </div>
                </div>

            </div>
        )
    }, [valueSearch, showAdd, openCreatePage])
    
    return (
        <div className="flex flex-col px-10 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Наукова робота ОНТУ" isBack={false}/>
            </div>
            <TableItems dataItems={filterResearch || []}
                        searchInput={valueSearch}
                        rowsViewPage={10}
                        typeProduct='research'
                        topContent={topContent}
                        tableColumn={tableColumn}
            />
        </div>
    )
}

export default ResearchTable;