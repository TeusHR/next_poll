import React, {Suspense} from 'react'
import Loading from "@/components/Loading";
import EventsTabs from "./components/Wrapper";

const Events = ({}) => {


    return (
        <div>
            <Suspense fallback={<Loading transparent/>}>
                <EventsTabs/>
            </Suspense>
        </div>
    )
}

export default Events;