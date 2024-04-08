import React, {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter} from "next/navigation";
import {IConsulting} from "@/types/Consulting";
import TableSearch from "@/components/CMS/TableSearch";
import {Button, Input} from "@nextui-org/react";
import TableItems from "@/components/CMS/TableItems";

type Props = {
    tableColumn: { title: string, key: string }[]
    consulting: IConsulting[]
    showAdd?: boolean
    selectionMode?: 'none' | 'multiple'
    selectedKeys?: Set<string>
    onSelectKeys?: (keys: Set<string>) => void
    totalDataItems?: number
    disableShadow?: boolean
}

const ConsultingTable:FC<Props> = ({
                                       tableColumn,
                                       consulting,
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
    const [filterConsulting,
        setFilterConsulting] = useState<IConsulting[]>([])

    const handleSelectCategories = useCallback(() => {
        let filter: IConsulting[] = consulting
        if (valueSearch.trim() !== '') {
            filter = consulting.filter((conferences) =>
                conferences.title.toLowerCase().includes(valueSearch.toLowerCase()));
        }

        setFilterConsulting(filter);

    }, [consulting, valueSearch])

    useEffect(() => {
        handleSelectCategories()
    }, [valueSearch, handleSelectCategories]);

    useEffect(() => {
        if (consulting)
            setFilterConsulting(consulting)
    }, [consulting]);

    const openCreatePage = useCallback(() => {
        router.push('/cms/consulting/new')
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
        <>
            <TableItems dataItems={filterConsulting || []}
                        searchInput={valueSearch}
                        rowsViewPage={10}
                        typeProduct='conference'
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

export default ConsultingTable;