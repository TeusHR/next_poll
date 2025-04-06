import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import TitleBack from "@/components/CMS/TitleBack";
import EventsEdit from "../components/EditForm";
import EventsCreate from "../components/Tabs/page";

const CMSScienceCompetition =  async ({params}: { params: { id: string } }) => {
    if (params.id === 'new') {
        return (
            <div>
                <div className="flex flex-col px-12 py-12 max-xl:px-4">
                    <TitleBack title="Створення заходу"/>
                    <div className="w-full flex flex-row flex-wrap">
                        <Suspense fallback={<Loading transparent/>}>
                            <EventsCreate/>
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col px-12 py-12 max-xl:px-4">
                <TitleBack title="Редагування заходу"/>
                <div className="w-full flex flex-row flex-wrap">
                    <Suspense fallback={<Loading transparent/>}>
                        <EventsEdit idItem={params.id}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default CMSScienceCompetition;
