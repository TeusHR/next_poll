import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import DocumentsTable from "./components/DocumentsTable";

const Documents = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
               <DocumentsTable/>
            </Suspense>
        </div>
    )
}

export default Documents;