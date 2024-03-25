import React from 'react'
import Title from "components/UI/Title";
import ScheduleC from "@/components/ScheduleC";

const Schedule = ({}) => {


    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <Title text={"Конференції, семінари та конкурси"}/>
            <ScheduleC/>
        </div>
    )
}

export default Schedule;