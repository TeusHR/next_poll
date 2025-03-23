import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import DocumentTemplatesTabs from "./components/DocumentsTemplatesTabs";

const DocumentsTemplates = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <DocumentTemplatesTabs/>
            </Suspense>
        </div>
    )
}

export default DocumentsTemplates;