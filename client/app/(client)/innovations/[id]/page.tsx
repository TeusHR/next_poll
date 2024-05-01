import React from 'react'
import DetailsPage from "@/components/DetailsPage";
import {InnovationService} from "@/services/client.service";
import {notFound} from "next/navigation";


const InnovationsItem = async ({params}: { params: { id: string } }) => {
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