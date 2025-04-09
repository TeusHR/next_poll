'use client'
import React, {useEffect, useState} from 'react'
import {useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {AcademicCouncilService} from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import AcademicCouncilTable from "../Table";
import {IAcademicCouncil} from "@/types/AcademicCouncil";

const tableColumn: { title: string, key: string }[] = [
    {title: 'id', key: 'id'},
    {title: 'Назва', key: 'title'},
    {title: 'Дата створення', key: 'createdAt'},
    {title: 'Дії', key: 'action'}
]

const AcademicCouncilTabs = () => {

    const [initialData, setInitialData] = useState<IAcademicCouncil[]>([])

    const searchParams = useSearchParams()
    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    useEffect(() => {
        if (status === 'authenticated') {
            AcademicCouncilService.getAll($apiAuth).then(res => {
                setInitialData(res)
            })
        }
    }, [$apiAuth, searchParams, status]);


    return (
        <div className="flex flex-col px-10 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Робота спеціалізованих вчених рад" isBack={false}/>
            </div>
            <AcademicCouncilTable tableColumn={tableColumn} data={initialData} showAdd/>
        </div>
    )
}

export default AcademicCouncilTabs;
