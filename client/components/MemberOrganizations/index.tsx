import React from 'react'
import Title from "@/components/UI/Title";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import ButtonDetails from "@/components/UI/ButtonDetails";

const MemberOrganizations = ({}) => {


    return (
        <div className="flex flex-col gap-16 max-sm:gap-10">
            <Title text="ОНТУ є дійсним членом наступних міжнародних організацій:"
                   style="text-[#111318] text-4xl max-xl:text-2xl max-sm:text-xl font-semibold"/>
            <div
                className="flex flex-row gap-24 max-lg:gap-16 max-sm:gap-8 items-center max-md:flex-wrap max-md:items-center max-md:justify-center">
                <Image
                    src={'/image/effost.png'}
                    classNames={{wrapper: 'min-w-[200px] max-md:w-full max-md:!max-w-full max-md:flex max-md:justify-center'}}
                    as={NextImage}
                    alt={'effost'}
                    width={200}
                    height={140}
                />
                <span>
                            <Title text="Lorem ipsum dolor sit amet"
                                   style="text-[#111318] text-4xl max-xl:text-2xl max-sm:text-xl font-semibold"/>
                        </span>
                <ButtonDetails link={'/'}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.714045 0.285955L0.714045 1.94766L7.29603 1.95355L0.124789 9.12479L1.3033 10.3033L8.47454 3.13206L8.48043 9.71404L10.1421 9.71405V0.285955H0.714045Z"
                            fill="#111318"/>
                    </svg>
                </ButtonDetails>
            </div>
            <div
                className="flex flex-row gap-24 max-lg:gap-16 max-sm:gap-8 items-center max-md:flex-wrap max-md:items-center max-md:justify-center">
                <Image
                    src={'/image/effost.png'}
                    classNames={{wrapper: 'min-w-[200px] max-md:w-full max-md:!max-w-full max-md:flex max-md:justify-center'}}
                    as={NextImage}
                    alt={'effost'}
                    width={200}
                    height={140}
                />
                <span>
                            <Title text="Lorem ipsum dolor sit amet"
                                   style="text-[#111318] text-4xl max-xl:text-2xl max-sm:text-xl font-semibold"/>
                        </span>
                <ButtonDetails link={'/'}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.714045 0.285955L0.714045 1.94766L7.29603 1.95355L0.124789 9.12479L1.3033 10.3033L8.47454 3.13206L8.48043 9.71404L10.1421 9.71405V0.285955H0.714045Z"
                            fill="#111318"/>
                    </svg>
                </ButtonDetails>
            </div>
            <div
                className="flex flex-row gap-24 max-lg:gap-16 max-sm:gap-8 items-center max-md:flex-wrap max-md:items-center max-md:justify-center">
                <Image
                    src={'/image/effost.png'}
                    classNames={{wrapper: 'min-w-[200px] max-md:w-full max-md:!max-w-full max-md:flex max-md:justify-center'}}
                    as={NextImage}
                    alt={'effost'}
                    width={200}
                    height={140}
                />
                <span>
                            <Title text="Lorem ipsum dolor sit amet"
                                   style="text-[#111318] text-4xl max-xl:text-2xl max-sm:text-xl font-semibold"/>
                        </span>
                <ButtonDetails link={'/'}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.714045 0.285955L0.714045 1.94766L7.29603 1.95355L0.124789 9.12479L1.3033 10.3033L8.47454 3.13206L8.48043 9.71404L10.1421 9.71405V0.285955H0.714045Z"
                            fill="#111318"/>
                    </svg>
                </ButtonDetails>
            </div>
        </div>
    )
}

export default MemberOrganizations;