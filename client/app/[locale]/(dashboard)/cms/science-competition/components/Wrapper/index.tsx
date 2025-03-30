'use client'
import React, {useEffect, useState} from 'react'
import {useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {ScienceCompetitionService} from "@/services/CMS.service";
import {ILiftGroupConference} from "@/types/Conference";
import TitleBack from "@/components/CMS/TitleBack";
import ScienceCompetitionTable from "../Table";
import {LiftGroupConference} from "@/utils/ConferenceType";

const tableColumn: { title: string, key: string }[] = [
    {title: 'id', key: 'id'},
    {title: 'Назва', key: 'title'},
    {title: 'Місяць', key: 'month'},
    {title: 'Дата', key: 'date'},
    {title: 'Країна', key: 'country'},
    {title: 'Дії', key: 'action'}
]

const ScienceCompetitionTabs = () => {

    const [initialData, setInitialData] = useState<ILiftGroupConference[]>([])

    const searchParams = useSearchParams()
    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    useEffect(() => {
        if (status === 'authenticated') {
            ScienceCompetitionService.getAll($apiAuth).then(res => {
                setInitialData(LiftGroupConference(res))
            })
        }
    }, [$apiAuth, searchParams, status]);


    return (
        <div className="flex flex-col px-10 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Наукові конкурси" isBack={false}/>
            </div>
            <ScienceCompetitionTable tableColumn={tableColumn} data={initialData} showAdd/>
        </div>
    )
}

export default ScienceCompetitionTabs;
