'use client'
import React, {useEffect, useState} from 'react'
import {useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {ConferencesService} from "@/services/CMS.service";
import {IConferences, ICreateConferences} from "@/types/Conference";
import {Tabs} from "@nextui-org/react";
import TitleBack from "@/components/CMS/TitleBack";

const ConferenceTabs = ({}) => {

    // const [categories, setCategories] = useState<ICategory[]>([])
    const [initialConference, setInitialConference] = useState<IConferences[]>([])

    const searchParams = useSearchParams()
    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    useEffect(() => {
        if (status === 'authenticated') {
            ConferencesService.getAllConference($apiAuth, Number(searchParams.get('page') ?? 1), 6).then(res => {
                setInitialConference(res)
            })
        }
    }, [$apiAuth, searchParams, status]);

    return (
        <div className="flex flex-col px-10 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Товари" isBack={false}/>
            </div>
            <Tabs className="w-full" classNames={{
                tab: "!text-medium max-xl:!text-base font-bold px-[20px] z-[1] data-[hover-unselected=true]:opacity-100",
                base: "relative",
                panel: 'mt-[20px] p-0',
                cursor: "w-full text-primary-400 bg-primary-400 h-[3px] bottom-[-4px]",
                tabContent: "group-data-[selected=true]:text-primary-400 max-sm:text-[12px] max-lg:text-base text-black group-data-[hover-unselected=true]:text-primary-400"
            }} variant="solid">
                {/*<Tab key="products" value="products" title="Список">*/}
                {/*    <ProductTable tableColumn={tableColumn} products={initialProducts} categories={categories} showAdd/>*/}
                {/*</Tab>*/}
                {/*<Tab key="query" value="query" title="Сортування">*/}
                {/*    <ProductQuery categories={categories} products={initialProducts}/>*/}
                {/*</Tab>*/}
            </Tabs>
        </div>
    )
}

export default ConferenceTabs;