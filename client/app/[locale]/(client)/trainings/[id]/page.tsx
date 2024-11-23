import React from 'react'
import {TrainingService} from "@/services/client.service";
import {notFound} from "next/navigation";
import DetailsPage from "@/components/DetailsPage";
import {Metadata} from "next";
import {stripHtml} from "@/utils/StripHtml";
import { getTranslations } from "next-intl/server";

type Params = { params: { id: string, locale:string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const id = params.id
    const t = await getTranslations({locale:params.locale, namespace: 'Page'});
    try {
        const trainings = await TrainingService.get(params.id || '')
        if (!trainings)
            throw new Error("Could not find innovation");
        const images = trainings.images.length ?
            {
                url: new URL(trainings.images[0], process.env.NEXTAUTH_URL),
                width: 1920,
                height: 1080,
                alt: `${trainings.title} | SCINT ONTU`
            }
            :{
                url: "/image/logo.svg",
                width: 200,
                height: 146,
                alt: "SCINT ONTU логотип"
            }

        return {
            title: trainings.title,
            description: stripHtml(trainings.text, 197),
            openGraph: {
                title: trainings.title,
                url: `/trainings/${id}/`,
                images
            },
        }
    } catch (e) {
        return {
            title: t('notFound'),
            openGraph: {
                title: t('notFound'),
                url: `/trainings/${id}/`,
            },
        }
    }
}

const Trainings = async ({params}: Params) => {
    const trainings = await TrainingService.get(params.id || '')

    if (trainings === null)
        return notFound();

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <DetailsPage data={trainings} />
            </div>
        </div>
    )
}

export default Trainings;