import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import InternationalPracticeTable from "./components/InternationalTable";

const InternationalPractice = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <InternationalPracticeTable/>
            </Suspense>
        </div>
    )
}

export default InternationalPractice;