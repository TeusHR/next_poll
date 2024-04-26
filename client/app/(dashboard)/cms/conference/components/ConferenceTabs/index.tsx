'use client'
import React, {useEffect, useState} from 'react'
import {useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {ConferencesService} from "@/services/CMS.service";
import {ILiftGroupConference} from "@/types/Conference";
import TitleBack from "@/components/CMS/TitleBack";
import ConferenceTable from "../ConferenceTable";
import {LiftGroupConference} from "@/utils/ConferenceType";

const tableColumn: { title: string, key: string }[] = [
    {title: 'id', key: 'id'},
    {title: 'Назва', key: 'title'},
    {title: 'Місяць', key: 'month'},
    {title: 'Дата', key: 'date'},
    {title: 'Тип', key: 'type'},
    {title: 'Країна', key: 'country'},
    // {title: 'Опис', key: 'text'},
    {title: 'Дії', key: 'action'}
]

const ConferenceTabs = ({}) => {

    const [initialConference, setInitialConference] = useState<ILiftGroupConference[]>([])

    const searchParams = useSearchParams()
    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    useEffect(() => {
        if (status === 'authenticated') {
            ConferencesService.getAllConference($apiAuth, Number(searchParams.get('page') ?? 1), 6).then(res => {
                setInitialConference(LiftGroupConference(res))
            })
        }
    }, [$apiAuth, searchParams, status]);

    return (
        <div className="flex flex-col px-10 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Конференції, семінари та конкурси" isBack={false}/>
            </div>
            <ConferenceTable tableColumn={tableColumn} conferences={initialConference} showAdd/>
        </div>
    )
}

export default ConferenceTabs;
