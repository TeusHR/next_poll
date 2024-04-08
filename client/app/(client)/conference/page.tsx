import React from 'react'
import Title from "@/UI/Title";
import ConferenceItem from "@/components/ScheduleC";

const Conference = ({}) => {


    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4 flex flex-col gap-14 max-sm:gap-8">
            <Title text={"Конференції, семінари та конкурси"}
                   style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
            <ConferenceItem/>
        </div>
    )
}

export default Conference;
