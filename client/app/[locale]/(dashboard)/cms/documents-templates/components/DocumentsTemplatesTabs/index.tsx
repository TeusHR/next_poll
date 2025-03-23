'use client'
import React, {useEffect, useState} from 'react'
import {useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {DocumentTemplates} from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import DocumentsTemplatesTable from "../DocumentsTemplatesTable";
import {IDocumentsTemplates} from "@/types/DocumentsTemplates";

const tableColumn: { title: string, key: string }[] = [
    {title: 'id', key: 'id'},
    {title: 'Назва', key: 'title'},
    {title: 'Дата створення', key: 'createdAt'},
    {title: 'Дата оновлення', key: 'updatedAt'},
    {title: 'Дії', key: 'action'}
]

const DocumentTemplatesTabs = () => {

    const [initialData, setInitialData] = useState<IDocumentsTemplates[]>([])

    const searchParams = useSearchParams()
    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    useEffect(() => {
        if (status === 'authenticated') {
            DocumentTemplates.getAll($apiAuth).then(res => {
                setInitialData(res)
            })
        }
    }, [$apiAuth, searchParams, status]);

    console.log(initialData)

    return (
        <div className="flex flex-col px-10 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Шаблони документів" isBack={false}/>
            </div>
            <DocumentsTemplatesTable tableColumn={tableColumn} initialData={initialData} showAdd/>
        </div>
    )
}

export default DocumentTemplatesTabs;
