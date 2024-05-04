import React from 'react'
import DetailsPage from "@/components/DetailsPage";
import {InnovationService} from "@/services/client.service";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {stripHtml} from "@/utils/StripHtml";

type Params = { params: { id: string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const id = params.id

    try {
        const innovation = await InnovationService.get(params.id || '')
        if (!innovation)
            throw new Error("Could not find innovation");
        const images = innovation.images.length ?
            {
                url: new URL(innovation.images[0], process.env.NEXTAUTH_URL),
                width: 1920,
                height: 1080,
                alt: `${innovation.title} | SCINT ONTU`
            }
            :{
                url: "/image/logo.svg",
                width: 200,
                height: 146,
                alt: "SCINT ONTU логотип"
            }

        return {
            title: innovation.title,
            description: stripHtml(innovation.text, 197),
            openGraph: {
                title: innovation.title,
                url: `/innovations/${id}/`,
                images
            },
        }
    } catch (e) {
        return {
            title: "Сторінка не знайдена",
            openGraph: {
                title: 'Сторінка не знайдена',
                url: `/innovations/${id}/`,
            },
        }
    }
}


const InnovationsItem = async ({params}: Params) => {
    const innovation = await InnovationService.get(params.id || '')

    if (innovation === null)
        return notFound();

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <DetailsPage data={innovation} />
            </div>
        </div>
    )
}

export default InnovationsItem;
