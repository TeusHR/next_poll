import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import InternationalTable from "./components/InternationalTable";

const International = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <InternationalTable/>
            </Suspense>
        </div>
    )
}

export default International;