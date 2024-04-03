import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import ConferenceTabs from "./conference/components/ConferenceTabs";


const CMS = async ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <ConferenceTabs/>
            </Suspense>
        </div>
    )
}

export default CMS;