import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import ResearchTable from "./components/ResearchTable";

const Research =   () =>{

    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <ResearchTable/>
            </Suspense>
        </div>
    )
}

export default Research;