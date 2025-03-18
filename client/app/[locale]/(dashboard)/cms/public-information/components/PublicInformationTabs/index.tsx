'use client'
import React, {useEffect, useState} from 'react'
import {useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {PublicInformation} from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import PublicInformationTable from "../PublicInformationTable";

const tableColumn: { title: string, key: string }[] = [
    {title: 'id', key: 'id'},
    {title: 'Назва', key: 'title'},
    {title: 'Дата створення', key: 'createdAt'},
    {title: 'Дата оновлення', key: 'updatedAt'},
    {title: 'Дії', key: 'action'}
]

const PublicInformationTabs = () => {

    const [initialData, setInitialData] = useState<any[]>([])

    const searchParams = useSearchParams()
    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    useEffect(() => {
        if (status === 'authenticated') {
            PublicInformation.getAllPublicInformation($apiAuth).then(res => {
                setInitialData(res)
            })
        }
    }, [$apiAuth, searchParams, status]);

    console.log(initialData)

    return (
        <div className="flex flex-col px-10 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Публічна інформація" isBack={false}/>
            </div>
            <PublicInformationTable tableColumn={tableColumn} initialData={initialData} showAdd/>
        </div>
    )
}

export default PublicInformationTabs;
