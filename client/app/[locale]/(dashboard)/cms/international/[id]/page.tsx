import React, {Suspense} from 'react'
import TitleBack from "@/components/CMS/TitleBack";
import Loading from "@/components/Loading";
import InternationalCreate from "../components/InternationalCreate";
import InternationalEdit from "../components/InternationalEdit";

const CMSInternational =  async ({params}: { params: { id: string } }) => {
    if (params.id === 'new') {
        return (
            <div>
                <div className="flex flex-col px-12 py-12 max-xl:px-4">
                    <TitleBack title="Створення"/>
                    <div className="w-full flex flex-row flex-wrap">
                        <Suspense fallback={<Loading transparent/>}>
                            <InternationalCreate/>
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
                        <InternationalEdit internationalId={params.id}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default CMSInternational;