import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import InnovationsTable from "./components/InnovationsTable";

const Innovations = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <InnovationsTable/>
            </Suspense>
        </div>
    )
}

export default Innovations;