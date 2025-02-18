import React from 'react'
import Title from "@/components/UI/Title";
import Document from "@/components/Document";
import {ConferencesService} from "@/services/client.service";
import {StringConferenceType} from "@/utils/ConferenceType";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {stripHtml} from "@/utils/StripHtml";

type Params = { params: { id: string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const id = params.id

    try {
        const conference = await ConferencesService.get(params.id || '')
        if (!conference)
            throw new Error("Could not find conference");

        return {
            title: conference.title,
            description: stripHtml(conference.text, 197),
            openGraph: {
                title: conference.title,
                url: `/conference/${id}/`,
            },
        }
    } catch (e) {
        return {
            title: "Сторінка не знайдена",
            openGraph: {
                title: 'Сторінка не знайдена',
                url: `/conference/${id}/`,
            },
        }
    }
}

const Conference = async ({params}: Params) => {
    const conference = await ConferencesService.get(params.id || '')

    if (conference === null)
        return notFound();

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <div className="flex flec-row gap-8 items-end max-sm:flex-col max-sm:gap-4 max-sm:items-start">
                    <Title text={conference.title}
                           style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
                    {<div className="flex flex-row gap-2 sm:min-w-max max-sm:flex-wrap">
                        <span>{conference.date} {conference.toDate ? ` - ${conference.toDate}` : ''}</span>
                        <span className="text-[#D9D9D9]">&#8226;</span>
                        <span>{StringConferenceType(conference.type)}</span>
                        <span className="text-[#D9D9D9]">&#8226;</span>
                        <span>{conference.country}</span>
                    </div>}
                </div>
                <div className="text-xl" dangerouslySetInnerHTML={{ __html: conference.text }}>

                </div>
                <div className="flex flex-col relative w-max gap-2">
                    {conference.files.map(item => (<Document key={item} link={item} title={item}/>))}
                </div>
            </div>
        </div>
    )
}

export default Conference;
