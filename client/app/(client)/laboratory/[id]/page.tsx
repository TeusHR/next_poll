import React from 'react'
import DetailsPage from "@/components/DetailsPage";
import NewsItem from "@/components/NewsItem";
import {LaboratoryService} from "@/services/client.service";
import {notFound} from "next/navigation";
import {ILaboratory} from "@/types/Laboratory";


const LaboratoryItem = async ({params, searchParams}
                                  :
                                  {
                                      params: { id: string },
                                      searchParams?: { develop?: string; };
                                  }) => {

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
