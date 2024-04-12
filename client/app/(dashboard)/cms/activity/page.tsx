import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import ActivityTable from "./components/ActivityTable";

const Research =   () =>{

    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <ActivityTable/>
            </Suspense>
        </div>
    )
}

export default Research;