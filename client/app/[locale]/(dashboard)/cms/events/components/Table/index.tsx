'use client'
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter} from "next/navigation";
import {Button, Input} from "@nextui-org/react";
import TableItems from "@/components/CMS/TableItems";
import moment from "moment/moment";
import TableSearch from "@/components/CMS/TableSearch";
import 'moment/locale/uk';
import {IEvents} from "@/types/Events";

type Props = {
    tableColumn: { title: string, key: string }[]
    data: IEvents[]
    showAdd?: boolean
    selectionMode?: 'none' | 'multiple'
    selectedKeys?: Set<string>
    onSelectKeys?: (keys: Set<string>) => void
    totalDataItems?: number
    disableShadow?: boolean
}

const EventsTable: FC<Props> = ({
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
    const [filterConference,
        setFilterConference] = useState<IEvents[]>([])
    const [dateSelect,
        setDateSelect] = useState<string>('')

    const handleSelectCategories = useCallback(() => {
        let filter: IEvents[] = data
        if (valueSearch.trim() !== '') {
            filter = data.filter((item) =>
                item.title.toLowerCase().includes(valueSearch.toLowerCase()));
        }
        if (dateSelect !== '') {
            let dateLocal = moment(dateSelect).locale('uk').format('DD MMMM')
            filter = filter.filter((item) => moment(item.date).locale('uk').format('DD MMMM') === dateLocal)
        }
        setFilterConference(filter);
    }, [data, valueSearch, dateSelect])

    useEffect(() => {
        handleSelectCategories()
    }, [valueSearch, handleSelectCategories]);

    useEffect(() => {
        if (data)
            setFilterConference(data)
    }, [data]);

    const openCreatePage = useCallback(() => {
        router.push('/cms/events/new')
    }, [router])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 items-center">
                <div className="gap-8 max-lg:gap-4 flex items-center justify-start w-full max-lg:items-start">
                    <div className="w-full flex gap-8 max-lg:gap-4 items-center max-lg:grid max-lg:grid-cols-2 max-lg:items-start">
                        <TableSearch handleSearch={setValueSearch} valueInput={valueSearch}
                                     wrapperClassName="w-full max-w-[300px] min-w-[150px]"/>
                        <div className="w-full max-w-[300px] min-w-[150px]">
                            <Input className="border-none py-2"
                                   type="date"
                                   value={dateSelect}
                                   onValueChange={setDateSelect}
                                   classNames={{
                                       inputWrapper: "border-1 border-primary-500",
                                       input: "focus:outline-none text-base text-primary",
                                       errorMessage: "text-red-600 text-sm",
                                       label: "text-base",
                                   }}
                                   key="date"
                                   labelPlacement="outside"
                                   placeholder="Введіть дату"
                                   autoComplete="off"
                            />
                        </div>
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
    }, [valueSearch, dateSelect, showAdd, openCreatePage])


    return (
        <>
            <TableItems dataItems={filterConference || []}
                        searchInput={valueSearch}
                        rowsViewPage={10}
                        typeProduct='events'
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

export default EventsTable;
