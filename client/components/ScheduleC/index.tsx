import React from 'react'
import Title from "components/UI/Title";
import ButtonDetails from "components/UI/ButtonDetails";


const ConferenceItem = ({}) => {

    const hr = 2

    return (
        <div className="my-16 flex flex-col gap-8">
            <div className="flex flex-col">
                <div
                    className="flex flex-row max-md:flex-col gap-y-4 gap-x-96 max-xl:gap-x-16 max-lg:gap-x-6 max-xl:justify-between text-[#111318] text-xl">
                    <Title text={"Січень"} style={"text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-bold"}/>
                    <div className="flex flex-col gap-9">
                        <div className="flex flex-row max-sm:flex-col gap-y-6 gap-x-36 max-xl:gap-x-8">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2">
                                    <span>
                                        28 січня
                                    </span>
                                    <span className="text-[#D9D9D9]">&#8226;</span>
                                    <span>
                               Конференція
                            </span>
                                    <span className="text-[#D9D9D9]">&#8226;</span>
                                    <span>
                                Україна
                            </span>
                                </div>
                                <div>
                            <span className="font-medium">
                                Конференція з собачок
                            </span>
                                </div>
                            </div>
                            <ButtonDetails link={'/conference/1'}>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.714045 0.285955L0.714045 1.94766L7.29603 1.95355L0.124789 9.12479L1.3033 10.3033L8.47454 3.13206L8.48043 9.71404L10.1421 9.71405V0.285955H0.714045Z"
                                        fill="#111318"/>
                                </svg>
                            </ButtonDetails>
                        </div>
                        <div className="flex flex-row max-sm:flex-col gap-y-6 gap-x-36 max-xl:gap-x-8">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2">
                                    <span>
                                        28 січня
                                    </span>
                                    <span className="text-[#D9D9D9]">&#8226;</span>
                                    <span>
                                        Конференція
                                    </span>
                                    <span className="text-[#D9D9D9]">&#8226;</span>
                                    <span>
                                        Україна
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium">
                                        Конференція з собачок
                                    </span>
                                </div>
                            </div>
                            <ButtonDetails link={''}>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.714045 0.285955L0.714045 1.94766L7.29603 1.95355L0.124789 9.12479L1.3033 10.3033L8.47454 3.13206L8.48043 9.71404L10.1421 9.71405V0.285955H0.714045Z"
                                        fill="#111318"/>
                                </svg>
                            </ButtonDetails>
                        </div>
                    </div>
                </div>
                {hr % 2 === 0 ? <span className="mt-14 border border-[#6E8880]"></span> : ''}
            </div>
        </div>
    )
}

export default ConferenceItem;