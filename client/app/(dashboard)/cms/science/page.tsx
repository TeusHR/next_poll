import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import ScienceTable from "./components/ScienceTable";


const Science = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
               <ScienceTable/>
            </Suspense>
        </div>
    )
}

export default Science;