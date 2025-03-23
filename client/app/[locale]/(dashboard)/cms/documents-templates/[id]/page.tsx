import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import TitleBack from "@/components/CMS/TitleBack";
import DocumentsTemplatesCreateForm from "../components/CreateForm";
import DocumentsTemplatesEdit from "../components/EditForm";

const CMSConference =  async ({params}: { params: { id: string } }) => {
    if (params.id === 'new') {
        return (
            <div>
                <div className="flex flex-col px-12 py-12 max-xl:px-4">
                    <TitleBack title="Створення сторінки"/>
                    <div className="w-full flex flex-row flex-wrap">
                        <Suspense fallback={<Loading transparent/>}>
                            <DocumentsTemplatesCreateForm/>
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col px-12 py-12 max-xl:px-4">
                <TitleBack title="Редагування сторінки"/>
                <div className="w-full flex flex-row flex-wrap">
                    <Suspense fallback={<Loading transparent/>}>
                        <DocumentsTemplatesEdit pageID={params.id}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default CMSConference;
