'use client';
import React, {FC} from 'react';
import TooltipFD from "@/UI/ToltipFD";
import {usePathname, useRouter} from "next/navigation";

const TitleBack: FC<{ title: string, isBack?: boolean }> = ({title, isBack = true}) => {
    const router = useRouter()
    const pathname=  usePathname()
    return (
        <div className={`group/title w-fit ${isBack ? 'cursor-pointer' : 'cursor-default'} mb-8`}>
            {isBack
                ? <TooltipFD label="Повернутися назад" delay={300}>
                    <div>
                        <button className="flex items-center transition-opacity group-hover/title:opacity-40" onClick={() => router.push("/" + pathname.split('/').slice(1, -1).join('/'))}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12,9.059V6.5c0-0.256-0.098-0.512-0.293-0.708C11.512,5.597,11.256,5.5,11,5.5s-0.512,0.097-0.707,0.292L4,12l6.293,6.207  C10.488,18.402,10.744,18.5,11,18.5s0.512-0.098,0.707-0.293S12,17.755,12,17.5v-2.489c2.75,0.068,5.755,0.566,8,3.989v-1  C20,13.367,16.5,9.557,12,9.059z"/>
                            </svg>
                            <span className="text-black font-montserrat text-3xl font-bold transition-opacity">
                                {title}
                            </span>
                        </button>
                    </div>
                </TooltipFD>
                : <span className="text-black font-montserrat text-3xl font-bold transition-opacity">
                    {title}
                </span>}
        </div>
    );
};

export default TitleBack;