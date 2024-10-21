import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import DigamTabs from "./components/DigamTabs";


const Digam = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <DigamTabs/>
            </Suspense>
        </div>
    )
}

export default Digam;