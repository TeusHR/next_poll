import React from 'react'
import DetailsPage from "@/components/DetailsPage";
import {InternationalService} from "@/services/client.service";
import {notFound} from "next/navigation";

const InternationalItem = async ({params}: { params: { id: string } }) => {
    const international = await InternationalService.get(params.id || '')

    if (international === null)
        return notFound();

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <DetailsPage data={international}/>
            </div>
        </div>
    )
}

export default InternationalItem;