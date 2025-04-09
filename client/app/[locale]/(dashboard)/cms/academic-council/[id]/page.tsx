import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import TitleBack from "@/components/CMS/TitleBack";
import AcademicCouncilEdit from "../components/EditForm";
import AcademicCouncilCreate from "../components/Tabs/page";

const CMSAcademicCouncil =  async ({params}: { params: { id: string } }) => {
    if (params.id === 'new') {
        return (
            <div>
                <div className="flex flex-col px-12 py-12 max-xl:px-4">
                    <TitleBack title="Створення"/>
                    <div className="w-full flex flex-row flex-wrap">
                        <Suspense fallback={<Loading transparent/>}>
                            <AcademicCouncilCreate/>
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
                        <AcademicCouncilEdit idItem={params.id}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default CMSAcademicCouncil;
