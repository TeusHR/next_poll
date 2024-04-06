import React from 'react'
import Title from "@/UI/Title";
import CountryCoop from "@/components/CountryCoop";
import MemberOrganizations from "@/components/MemberOrganizations";


const Department = ({}) => {


    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
            <div className="flex flex-col gap-14 max-sm:gap-8">
                <Title text="Відділ міжнародних грантів та академічної мобільності"
                       style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"/>
                <div className="text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem lectus. Praesent ac
                    maximus mi. Suspendisse hendrerit urna eget nulla dapibus, vel auctor mauris vestibulum. Suspendisse
                    dictum est pharetra sem dignissim egestas. Quisque pharetra, nisi sed dignissim egestas, nisi magna
                    bibendum ipsum, ut finibus urna tellus vitae libero. Phasellus rutrum ante ex, dignissim
                    sollicitudin nisi suscipit ac. Etiam at libero quis ipsum laoreet maximus quis quis sem. Etiam
                    aliquet tempor sem, quis tincidunt lectus tempus eu. Vestibulum pharetra ipsum quis odio volutpat
                    cursus. Cras eu tortor eu turpis dapibus tempus aliquet ac eros. Aenean quis sagittis nulla.
                    Curabitur pulvinar dapibus finibus. Orci varius natoque penatibus et magnis dis parturient montes,
                    nascetur ridiculus mus. Donec feugiat porttitor iaculis.
                </div>
                <MemberOrganizations/>
                <CountryCoop/>
            </div>
        </div>
    )
}

export default Department;
