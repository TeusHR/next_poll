import React from 'react'
import DetailsPage from "@/components/DetailsPage";
import {InternationalPracticeService} from "@/services/client.service";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {stripHtml} from "@/utils/StripHtml";

type Params = { params: { id: string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const id = params.id

    try {
        const international = await InternationalPracticeService.get(params.id || '')

        if (!international)
            throw new Error("Could not find innovation");

        const images = international.images.length ?
            {
                url: new URL(international.images[0], process.env.NEXTAUTH_URL),
                width: 1920,
                height: 1080,
                alt: `${international.title} | SCINT ONTU`
            }
            :{
                url: "/image/logo.svg",
                width: 200,
                height: 146,
                alt: "SCINT ONTU логотип"
            }

        return {
            title: international.title,
            description: stripHtml(international.text, 197),
            openGraph: {
                title: international.title,
                url: `/international-practice/${id}/`,
                images
            },
        }
    } catch (e) {
        return {
            title: "Сторінка не знайдена",
            openGraph: {
                title: 'Сторінка не знайдена',
                url: `/international-practice/${id}/`,
            },
        }
    }
}

const InternationalPracticeItem = async ({params}: Params) => {
    const internationalPractice = await InternationalPracticeService.get(params.id || '')

    if (internationalPractice === null)
        return notFound();

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <DetailsPage data={internationalPractice}/>
            </div>
        </div>
    )
}

export default InternationalPracticeItem;
