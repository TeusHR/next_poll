import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import LaboratoryTable from "./components/LaboratoryTable";

const Laboratory = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <LaboratoryTable/>
            </Suspense>
        </div>
    )
}

export default Laboratory;