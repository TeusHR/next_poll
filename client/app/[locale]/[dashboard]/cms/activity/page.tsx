import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import ActivityTable from "./components/ActivityTable";

const Activity =   () =>{

    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <ActivityTable/>
            </Suspense>
        </div>
    )
}

export default Activity;