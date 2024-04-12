import React, {Suspense} from 'react'
import TitleBack from "@/components/CMS/TitleBack";
import Loading from "@/components/Loading";
import ActivityCreate from "../components/ActivityCreate";
import ActivityEdit from "../components/ActivityEdit/ActivityEdit";

const CMSActivity  =  async ({params}: { params: { id: string } }) =>{
    if (params.id === 'new') {
        return (
            <div>
                <div className="flex flex-col px-12 py-12 max-xl:px-4">
                    <TitleBack title="Створення"/>
                    <div className="w-full flex flex-row flex-wrap">
                        <Suspense fallback={<Loading transparent/>}>
                            <ActivityCreate/>
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <div className="flex flex-col px-12 py-12 max-xl:px-4">
                <TitleBack title="Редагування"/>
                <div className="w-full flex flex-row flex-wrap">
                    <Suspense fallback={<Loading transparent/>}>
                        <ActivityEdit activityId={params.id}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default CMSActivity;