'use client'
import React, {useEffect, useState} from 'react'
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {StudentService} from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import StudentCreate from "../StudentCreate";
import {IStudent} from "@/types/Student";


const StudentTabs = ({}) => {

    const [initialStudent, setInitialStudent] = useState<IStudent>()

    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    useEffect(() => {
        if (status === 'authenticated') {
            StudentService.getStudent($apiAuth).then(res => {
                setInitialStudent(res.data)
            })
        }
    }, [$apiAuth, status]);

    return (
        <div className="flex flex-col px-10 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
            <div className="flex items-center justify-between">
                <TitleBack title="Студентська наука" isBack={false}/>
            </div>
            <StudentCreate student={initialStudent}/>
        </div>
    )
}

export default StudentTabs;