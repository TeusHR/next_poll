'use client'
import React, {useEffect, useState} from 'react'
import {useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {ConsultingService} from "@/services/CMS.service";
import {Tab, Tabs} from "@nextui-org/react";
import TitleBack from "@/components/CMS/TitleBack";
import {IConsulting} from "@/types/Consulting";
import ConsultingTable from "../ConsultingTable";

const tableColumn: { title: string, key: string }[] = [
    {title: 'id', key: 'id'},
    {title: 'Назва', key: 'title'},
    {title: 'Зображення', key: 'images'},
    {title: 'Дії', key: 'action'}
]

const ConsultingTabs = ({}) => {

    const [initialConsulting, setInitialConsulting] = useState<IConsulting[]>([])

    const searchParams = useSearchParams()
    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    useEffect(() => {
        if (status === 'authenticated') {
            ConsultingService.getAllConsulting($apiAuth, Number(searchParams.get('page') ?? 1), 6).then(res => {
                setInitialConsulting(res)
            })
        }
    }, [$apiAuth, searchParams, status]);

    useEffect(() => {
        console.log(initialConsulting)
    }, [initialConsulting]);

    return (
        <div className="flex flex-col px-10 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Консалтинговий центр НДІ" isBack={false}/>
            </div>
            <Tabs className="w-full" classNames={{
                tab: "!text-medium max-xl:!text-base font-bold px-[20px] z-[1] data-[hover-unselected=true]:opacity-100",
                base: "relative",
                panel: 'mt-[20px] p-0',
                tabList: 'bg-white',
                cursor: "w-full text-fd bg-fd h-[3px] bottom-[-4px]",
                tabContent: "group-data-[selected=true]:text-primary max-sm:text-[12px] max-lg:text-base text-black group-data-[hover-unselected=true]:text-primary"
            }} variant="solid">
                <Tab key="consulting" value="consulting" title="Список">
                    <ConsultingTable tableColumn={tableColumn} consulting={initialConsulting} showAdd/>
                </Tab>
            </Tabs>
        </div>
    )
}

export default ConsultingTabs;