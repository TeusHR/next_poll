import React, {Suspense} from 'react'
import TitleBack from "@/components/CMS/TitleBack";
import Loading from "@/components/Loading";
import ResearchCreate from "../components/ResearchCreate";
import ResearchEdit from "../components/ResearchEdit/ResearchEdit";

const CMSResearch  =  async ({params}: { params: { id: string } }) =>{
    if (params.id === 'new') {
        return (
            <div>
                <div className="flex flex-col px-12 py-12 max-xl:px-4">
                    <TitleBack title="Створення напряму для співпраці"/>
                    <div className="w-full flex flex-row flex-wrap">
                        <Suspense fallback={<Loading transparent/>}>
                            <ResearchCreate/>
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
                        <ResearchEdit/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default CMSResearch;