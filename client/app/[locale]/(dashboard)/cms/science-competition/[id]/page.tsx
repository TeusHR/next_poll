import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import TitleBack from "@/components/CMS/TitleBack";
import ScienceCompetitionEdit from "../components/EditForm";
import ScienceCompetitionCreate from "../components/Tabs/page";

const CMSScienceCompetition =  async ({params}: { params: { id: string } }) => {
    if (params.id === 'new') {
        return (
            <div>
                <div className="flex flex-col px-12 py-12 max-xl:px-4">
                    <TitleBack title="Створення конференції"/>
                    <div className="w-full flex flex-row flex-wrap">
                        <Suspense fallback={<Loading transparent/>}>
                            <ScienceCompetitionCreate/>
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col px-12 py-12 max-xl:px-4">
                <TitleBack title="Редагування конференції"/>
                <div className="w-full flex flex-row flex-wrap">
                    <Suspense fallback={<Loading transparent/>}>
                        <ScienceCompetitionEdit idItem={params.id}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default CMSScienceCompetition;
