import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import AcademicCouncilTabs from "./components/Wrapper";

const AcademicCouncil = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <AcademicCouncilTabs/>
            </Suspense>
        </div>
    )
}

export default AcademicCouncil;