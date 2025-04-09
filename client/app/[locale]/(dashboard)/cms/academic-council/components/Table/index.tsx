'use client'
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter} from "next/navigation";
import {Button} from "@nextui-org/react";
import TableItems from "@/components/CMS/TableItems";
import TableSearch from "@/components/CMS/TableSearch";
import 'moment/locale/uk';
import {IAcademicCouncil} from "@/types/AcademicCouncil";

type Props = {
    tableColumn: { title: string, key: string }[]
    data: IAcademicCouncil[]
    showAdd?: boolean
    selectionMode?: 'none' | 'multiple'
    selectedKeys?: Set<string>
    onSelectKeys?: (keys: Set<string>) => void
    totalDataItems?: number
    disableShadow?: boolean
}

const AcademicCouncilTable: FC<Props> = ({
                                        tableColumn,
                                        data,
                                        selectionMode = 'none',
                                        showAdd = false,
                                        selectedKeys,
                                        onSelectKeys,
                                        totalDataItems,
                                        disableShadow
                                    }) => {
    const router = useRouter()

    const [valueSearch,
        setValueSearch] = useState<string>('')
    const [filterData,
        setFilterData] = useState<IAcademicCouncil[]>([])


    const handleSelectCategories = useCallback(() => {
        let filter: IAcademicCouncil[] = data
        if (valueSearch.trim() !== '') {
            filter = data.filter((conferences) =>
                conferences.title.toLowerCase().includes(valueSearch.toLowerCase()));
        }
        setFilterData(filter);

    }, [data, valueSearch])

    useEffect(() => {
        handleSelectCategories()
    }, [valueSearch, handleSelectCategories]);

    useEffect(() => {
        if (data)
            setFilterData(data)
    }, [data]);

    const openCreatePage = useCallback(() => {
        router.push('/cms/academic-council/new')
    }, [router])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 items-center">
                <div className="gap-8 max-lg:gap-4 flex items-center justify-start w-full max-lg:items-start">
                    <div className="w-full flex gap-8 max-lg:gap-4 items-center max-lg:grid max-lg:grid-cols-2 max-lg:items-start">
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
        <>
            <TableItems dataItems={filterData || []}
                        searchInput={valueSearch}
                        rowsViewPage={10}
                        typeProduct='academic-council'
                        selectedKeys={selectedKeys}
                        onSelectKeys={onSelectKeys}
                        totalDataItems={totalDataItems}
                        selectionMode={selectionMode}
                        topContent={topContent}
                        disableShadow={disableShadow}
                        tableColumn={tableColumn}/>
        </>
    )
}

export default AcademicCouncilTable;
