import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import CooperationTable from "./components/CooperationTable";

const Cooperation = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
               <CooperationTable/>
            </Suspense>
        </div>
    )
}

export default Cooperation;