import React, {Suspense} from 'react'
import TitleBack from "@/components/CMS/TitleBack";
import Loading from "@/components/Loading";
import InternationalPracticeCreate from "../components/InternationalCreate";
import InternationalPracticeEdit from "../components/InternationalEdit";

const CMSInternationalPractice =  async ({params}: { params: { id: string } }) => {
    if (params.id === 'new') {
        return (
            <div>
                <div className="flex flex-col px-12 py-12 max-xl:px-4">
                    <TitleBack title="Створення"/>
                    <div className="w-full flex flex-row flex-wrap">
                        <Suspense fallback={<Loading transparent/>}>
                            <InternationalPracticeCreate/>
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
                        <InternationalPracticeEdit itemId={params.id}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default CMSInternationalPractice;