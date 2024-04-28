'use client'
import React, {useEffect, useState} from 'react'
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {ConsultingService} from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import {IConsulting} from "@/types/Consulting";
import ConsultingCreate from "../ConsultingCreate";



const ConsultingTabs = ({}) => {

    const [initialConsulting, setInitialConsulting] = useState<IConsulting>()

    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    useEffect(() => {
        if (status === 'authenticated') {
            ConsultingService.getConsulting($apiAuth).then(res => {
                setInitialConsulting(res)
            })
        }
    }, [$apiAuth, status]);

    return (
        <div className="flex flex-col px-10 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Консалтинговий центр НДІ" isBack={false}/>
            </div>
            <ConsultingCreate consulting={initialConsulting}/>
        </div>
    )
}

export default ConsultingTabs;