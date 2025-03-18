import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import PublicInformationTabs from "./components/PublicInformationTabs";

const PublicInformation = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <PublicInformationTabs/>
            </Suspense>
        </div>
    )
}

export default PublicInformation;