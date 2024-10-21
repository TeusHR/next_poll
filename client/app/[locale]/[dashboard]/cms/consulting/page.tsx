import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import ConsultingTabs from "./components/ConsultingTabs";


const Consulting = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <ConsultingTabs/>
            </Suspense>
        </div>
    )
}

export default Consulting;