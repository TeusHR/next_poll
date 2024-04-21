'use client'
import React, {useEffect, useState} from 'react'
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {DigamService} from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import DigamCreate from "../DigamCreate";
import {IDigam} from "@/types/Digam";


const DigamTabs = ({}) => {

    const [initialDigam, setInitialDigam] = useState<IDigam>()

    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    useEffect(() => {
        if (status === 'authenticated') {
            DigamService.getDigam($apiAuth).then(res => {
                setInitialDigam(res)
            })
        }
    }, [$apiAuth, status]);

    return (
        <div className="flex flex-col px-10 max-xl:px-3 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Відділ міжнародних грантів та академічної мобільності" isBack={false}/>
            </div>
            <DigamCreate digam={initialDigam}/>
        </div>
    )
}

export default DigamTabs;