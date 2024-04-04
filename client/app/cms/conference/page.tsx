import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import ConferenceTabs from "./components/ConferenceTabs";


const Conference = async ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <ConferenceTabs/>
            </Suspense>
        </div>
    )
}

export default Conference;