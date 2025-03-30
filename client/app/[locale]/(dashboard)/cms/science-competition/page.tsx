import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import ScienceCompetitionTabs from "./components/Wrapper";

const ScienceCompetition = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <ScienceCompetitionTabs/>
            </Suspense>
        </div>
    )
}

export default ScienceCompetition;