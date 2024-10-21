'use client'
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {ILiftGroupConference} from "@/types/Conference";
import {useRouter} from "next/navigation";
import {Button, Input} from "@nextui-org/react";
import TableItems from "@/components/CMS/TableItems";
import moment from "moment/moment";
import TableSearch from "@/components/CMS/TableSearch";
import Select from "@/components/CMS/Select";
import {monthsArray, typeConference} from "@/utils/ConferenceType";
import 'moment/locale/uk';
import {countryOptions} from "@/utils/CountrySet";

type Props = {
    tableColumn: { title: string, key: string }[]
    conferences: ILiftGroupConference[]
    showAdd?: boolean
    selectionMode?: 'none' | 'multiple'
    selectedKeys?: Set<string>
    onSelectKeys?: (keys: Set<string>) => void
    totalDataItems?: number
    disableShadow?: boolean
}

const ConferenceTable: FC<Props> = ({
                                        tableColumn,
                                        conferences,
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
        setFilterConference] = useState<ILiftGroupConference[]>([])
    const [selectConferenceType,
        setSelectConferenceType] = useState(new Set<string>())
    const [monthArray,
        setMonthArray] = useState(new Set<string>())
    const [countrySelect,
        setCountrySelect] = useState(new Set<string>())
    const [dateSelect,
        setDateSelect] = useState<string>('')


    const handleSelectCategories = useCallback(() => {
        let filter: ILiftGroupConference[] = conferences
        if (valueSearch.trim() !== '') {
            filter = conferences.filter((conferences) =>
                conferences.title.toLowerCase().includes(valueSearch.toLowerCase()));
        }
        if (selectConferenceType.size > 0) {
            filter = filter.filter((conferences) => selectConferenceType.has(conferences.type))
        }
        if (monthArray.size > 0) {
            filter = filter.filter((conferences) => monthArray.has(conferences.month.toUpperCase()))
        }
        if (dateSelect !== '') {
            let dateLocal = moment(dateSelect).locale('uk').format('DD MMMM')
            filter = filter.filter((conferences) => conferences.date === dateLocal)
        }
        if (countrySelect.size > 0) {
            filter = filter.filter((conferences) => countrySelect.has(conferences.country))
        }

        setFilterConference(filter);

    }, [conferences, valueSearch, selectConferenceType, monthArray, dateSelect, countrySelect])

    useEffect(() => {
        handleSelectCategories()
    }, [valueSearch, handleSelectCategories, selectConferenceType]);

    useEffect(() => {
        if (conferences)
            setFilterConference(conferences)
    }, [conferences]);

    const openCreatePage = useCallback(() => {
        router.push('/cms/conference/new')
    }, [router])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 items-center">
                <div className="gap-8 max-lg:gap-4 flex items-center justify-start w-full max-lg:items-start">
                    <div className="w-full flex gap-8 max-lg:gap-4 items-center max-lg:grid max-lg:grid-cols-2 max-lg:items-start">
                        <TableSearch handleSearch={setValueSearch} valueInput={valueSearch}
                                     wrapperClassName="w-full max-w-[300px] min-w-[150px]"/>
                        <div className="w-full max-w-[300px] min-w-[150px]">
                            <Select options={typeConference.map(item => ({
                                label: item.label,
                                value: item.value
                            }))}
                                    selectionMode={'single'}
                                    mainWrapperStyle={"min-w-full"}
                                    selected={selectConferenceType}
                                    placeholder="Тип"
                                    onChange={(keys) => setSelectConferenceType(new Set(keys))}/>
                        </div>
                        <div className="w-full max-w-[300px] min-w-[150px]">
                            <Select options={monthsArray.map(item => ({
                                label: item.label,
                                value: item.value
                            }))}
                                    selectionMode={'single'}
                                    mainWrapperStyle={"min-w-full"}
                                    selected={monthArray}
                                    placeholder="Місяць"
                                    onChange={(keys) => setMonthArray(new Set(keys))}/>
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
                <div className="gap-8 flex items-center justify-start w-full">
                    <div className="w-full flex gap-8 max-lg:gap-4">
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
                        <div className="w-full max-w-[300px] min-w-[150px]">
                            <Select options={countryOptions.map(item => ({
                                label: item.label,
                                value: item.value
                            }))}
                                    selectionMode={'single'}
                                    mainWrapperStyle={"min-w-full"}
                                    selected={countrySelect}
                                    placeholder="Країна"
                                    onChange={(keys) => setCountrySelect(new Set(keys))}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }, [valueSearch, selectConferenceType, monthArray, dateSelect, countrySelect, showAdd, openCreatePage])

    // const toDate = (a: ILiftGroupConference, b: ILiftGroupConference) => {
    //     return moment(a.date, 'YYYY-MM-DD').valueOf() - moment(b.date, 'YYYY-MM-DD').valueOf();
    // };


    return (
        <>
            <TableItems dataItems={filterConference || []}
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

export default ConferenceTable;
