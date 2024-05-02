import React from 'react'
import Title from "@/components/UI/Title";
import Document from "@/components/Document";
import {ConferencesService} from "@/services/client.service";
import {StringConferenceType} from "@/utils/ConferenceType";
import {notFound} from "next/navigation";
import {stripHtml} from "@/utils/StripHtml";

const Conference = async ({params}: { params: { id: string } }) => {
    const conference = await ConferencesService.get(params.id || '')

    if (conference === null)
        return notFound();

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <div className="flex flec-row gap-8 items-end max-sm:flex-col max-sm:gap-4 max-sm:items-start">
                    <Title text="Конференція з собачок"
                           style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
                    {<div className="flex flex-row gap-2 sm:min-w-max">
                        <span>{conference.date}</span>
                        <span className="text-[#D9D9D9]">&#8226;</span>
                        <span>{StringConferenceType(conference.type)}</span>
                        <span className="text-[#D9D9D9]">&#8226;</span>
                        <span>{conference.country}</span>
                    </div>}
                </div>
                <div className="text-xl">
                    {stripHtml(conference.text)}
                </div>
                <div className="flex flex-col relative w-max">
                    {conference.files.map(item => (<Document key={item} link={item}/>))}
                </div>
            </div>
        </div>
    )
}

export default Conference;