'use client'
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {ILiftGroupConference} from "@/types/Conference";
import {useRouter} from "next/navigation";
import {Button} from "@nextui-org/react";
import TableItems from "@/components/CMS/TableItems";
import moment from "moment/moment";


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

    const [valueSearch, setValueSearch] = useState<string>('')
    const [filterConference,
        setFilterConference] = useState<ILiftGroupConference[]>([])

    const handleSelectCategories = useCallback(() => {
        if (false) {
            // if (valueSearch.trim() !== '') {
            //     const filter = products.filter((product) =>
            //         product.productCategories.some((category) =>
            //             selectedCategories.has(String(category.id))) &&
            //         ((selectedSubCategories.size > 0)
            //             ? product.productCategories.some((category) =>
            //                 selectedSubCategories.has(String(category.id)))
            //             : true)
            //     ).filter((product) =>
            //         product.title.toLowerCase().includes(valueSearch.toLowerCase()) ||
            //         product.itemCode?.toLowerCase().includes(valueSearch.toLowerCase())
            //     );
            //     setFilterProducts(filter);
            // } else {
            //     const filter = products.filter((product) =>
            //         product.productCategories.some((category) =>
            //             selectedCategories.has(String(category.id))) &&
            //         ((selectedSubCategories.size > 0)
            //             ? product.productCategories.some((category) =>
            //                 selectedSubCategories.has(String(category.id)))
            //             : true)
            //     );
            //     setFilterProducts(filter);
            // }
        } else if (valueSearch.trim() !== '') {
            // let filter = conferences.filter((conferences) =>
            //     conferences.title.toLowerCase().includes(valueSearch.toLowerCase()) ||
            //     conferences.itemCode?.toLowerCase().includes(valueSearch.toLowerCase())
            // );
            // setFilterConference(filter);
        } else {
            setFilterConference(conferences);
        }
    }, [conferences, valueSearch])

    useEffect(() => {
        handleSelectCategories()
    }, [valueSearch, handleSelectCategories]);


    useEffect(() => {
        console.log(conferences)
        if (conferences)
            setFilterConference(conferences)
    }, [conferences]);

    const openNewProduct = useCallback(() => {
        router.push('/cms/conference/new')
    }, [router])

    const topContent = useMemo(() => {
        return (
            <div className="flex items-center">
                <div className="gap-8 flex items-center w-full">
                    {/*<ProductSearch handleSearch={setValueSearch} placeholder="Назва\артикул продукту"*/}
                    {/*               valueInput={valueSearch} wrapperClassName="w-[350px]"/>*/}
                    <div className="flex items-center justify-between w-full">
                        <div className="w-full flex gap-8">
                            <div className="w-[300px]">
                                {/*<SelectID*/}
                                {/*    options={categories.map(item => ({label: item.name, value: item.id.toString()}))}*/}
                                {/*    selected={selectedCategories}*/}
                                {/*    placeholder="Категорія"*/}
                                {/*    onChange={(keys) => setSelectedCategories(keys)}/>*/}
                            </div>
                            <div className="w-[300px]">
                                {/*{(selectedCategories.size > 0 && categories.find(item => item.id.toString() === selectedCategories.values().next().value)?.subcategories.filter(f => f.image).length !== 0) &&*/}
                                {/*    <SelectID*/}
                                {/*        options={(categories.find(item => item.id.toString() === selectedCategories.values().next().value)?.subcategories.filter(f => f.image) || []).map(item => ({*/}
                                {/*            label: item.name,*/}
                                {/*            value: item.id.toString()*/}
                                {/*        }))}*/}
                                {/*        selected={selectedSubCategories}*/}
                                {/*        placeholder="Підкатегорія"*/}
                                {/*        onChange={(keys) => setSelectedSubCategories(keys)}/>}*/}
                            </div>
                        </div>
                        <div>
                            {showAdd &&
                                <Button onPress={openNewProduct} color="default" className="text-black flex-1 bg-fd"
                                        endContent={<svg xmlns="http://www.w3.org/2000/svg" className="w-[20px]"
                                                         viewBox="0 0 24 24"
                                                         fill="currentColor">
                                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                                        </svg>}>Створити</Button>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }, [valueSearch, conferences, showAdd, openNewProduct])

    const toDate = (a: ILiftGroupConference, b: ILiftGroupConference) => {
        return moment(a.date, 'YYYY-MM-DD').valueOf() - moment(b.date, 'YYYY-MM-DD').valueOf();
    };


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