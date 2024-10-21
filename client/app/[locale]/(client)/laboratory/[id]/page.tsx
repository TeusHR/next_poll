import React from 'react'
import DetailsPage from "@/components/DetailsPage";
import NewsItem from "@/components/NewsItem";
import {LaboratoryService} from "@/services/client.service";
import {notFound} from "next/navigation";
import {ILaboratory} from "@/types/Laboratory";
import {Metadata} from "next";
import {stripHtml} from "@/utils/StripHtml";

type Params = {
    params: { id: string },
    searchParams?: { develop?: string; };
}

export async function generateMetadata({params, searchParams}: Params): Promise<Metadata> {
    const id = params.id

    try {
        const isDevelop = searchParams?.develop || 'false';
        const laboratory = isDevelop === 'true'
            ? await LaboratoryService.getDevelopment(params.id || '')
            : await LaboratoryService.get(params.id || '')

        if (!laboratory)
            throw new Error("Could not find laboratory");
        const images = laboratory.images.length ?
            {
                url: new URL(laboratory.images[0], process.env.NEXTAUTH_URL),
                width: 1920,
                height: 1080,
                alt: `${laboratory.title} | SCINT ONTU`
            }
            : {
                url: "/image/logo.svg",
                width: 200,
                height: 146,
                alt: "SCINT ONTU логотип"
            }

        return {
            title: laboratory.title,
            description: stripHtml(laboratory.text, 197),
            openGraph: {
                title: laboratory.title,
                url: `/laboratory/${id}/`,
                images
            },
        }
    } catch (e) {
        return {
            title: "Сторінка не знайдена",
            openGraph: {
                title: 'Сторінка не знайдена',
                url: `/laboratory/${id}/`,
            },
        }
    }
}

const LaboratoryItem = async ({params, searchParams}: Params) => {
    const isDevelop = searchParams?.develop || 'false';
    const laboratory = isDevelop === 'true'
        ? await LaboratoryService.getDevelopment(params.id || '')
        : await LaboratoryService.get(params.id || '')

    if (laboratory === null)
        return notFound();

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14">
                <DetailsPage data={laboratory}/>
                {isDevelop === 'false' && <div className="flex flex-col gap-14">
                    {(laboratory as ILaboratory).developments.map((item, index) =>
                        <NewsItem title={item.title}
                                  imageObj={
                                      {
                                          image: item.images[0],
                                          width: 400,
                                          height: 210,
                                          imageStyle: `max-h-[210px]`
                                      }
                                  }
                                  lightBoxImage={{
                                      show: true,
                                      images: item.images
                                  }}
                                  key={index}
                                  text={item.text}
                                  date={new Date().toISOString()}
                                  index={index}
                                  buttonDetails
                                  link={`/laboratory/${item.id}?develop=true`}
                                  lengthArr={(laboratory as ILaboratory).developments.length}
                        />
                    )}
                </div>}
            </div>
        </div>
    )
}

export default LaboratoryItem;
