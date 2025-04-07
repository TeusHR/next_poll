'use client'
import React, {useEffect, useState} from 'react'
import {useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {EventsService} from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import EventsTable from "../Table";
import {IEvents} from "@/types/Events";

const tableColumn: { title: string, key: string }[] = [
    {title: 'id', key: 'id'},
    {title: 'Назва', key: 'title'},
    {title: 'Керівник', key: 'supervisor'},
    {title: 'Дата', key: 'date'},
    {title: 'Номер', key: 'roomNumber'},
    {title: 'Дії', key: 'action'}
]

const EventsTabs = () => {

    const [initialData, setInitialData] = useState<IEvents[]>([])

    const searchParams = useSearchParams()
    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    useEffect(() => {
        if (status === 'authenticated') {
            EventsService.getAll($apiAuth).then(res => {
                setInitialData(res)
            })
        }
    }, [$apiAuth, searchParams, status]);


    return (
        <div className="flex flex-col px-10 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Наукові конкурси" isBack={false}/>
            </div>
            <EventsTable tableColumn={tableColumn} data={initialData} showAdd/>
        </div>
    )
}

export default EventsTabs;
