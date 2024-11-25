import React, {Suspense} from 'react'
import TitleBack from "@/components/CMS/TitleBack";
import Loading from "@/components/Loading";
import DocumentsCreate from "../components/DocumentsCreate";
import DocumentsEdit from "../components/DocumentsEdit";

const CMSDocuments =  async ({params}: { params: { id: string } }) => {
    if (params.id === 'new') {
        return (
            <div>
                <div className="flex flex-col px-12 py-12 max-xl:px-4">
                    <TitleBack title="Створення напряму для співпраці"/>
                    <div className="w-full flex flex-row flex-wrap">
                        <Suspense fallback={<Loading transparent/>}>
                            <DocumentsCreate/>
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
                        <DocumentsEdit documentsId={params.id}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default CMSDocuments;