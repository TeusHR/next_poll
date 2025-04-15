import React from "react";
import {setRequestLocale} from 'next-intl/server';
import mainJson from '@/messages/ua/main.json'
import {questions} from "@/utils/TableMapping";
import Title from "@/UI/Title";
import {Link} from "@/routing/*";
import {Button} from "@heroui/react";

type Props = {
    params: { locale: string }
}

export type MainTranslation = typeof mainJson

export default function Home({params: {locale}}: Props) {
    setRequestLocale(locale);

    return (
        <>
            <div className="h-[calc(100vh-126px)]">
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="flex flex-col gap-6 items-center justify-center text-center">
                            <Title text={`${`Вітаємо`.toUpperCase()}`} style="text-white text-8xl max-bg:text-6xl max-sm:text-5xl font-black max-bg:text-base"/>
                            <span className="text-white text-3xl font-normal max-bg:text-xl max-sm:text-lg tracking-widest max-w-[550px] max-sm:max-w-[350px]">
                        тест займе не більше 10 хвилин, тож дякуємо за свої відповіді
                    </span>
                            <Link href="/poll" className="h-full flex justify-center max-w-[270px] max-sm:max-w-[200px] w-full">
                                <Button className="border-fd bg-fd border-2 shadow-fd tracking-widest w-full text-black text-xl max-bg:text-base font-bold px-6 py-6 rounded-full data-[hover=true]:bg-fd data-[hover=true]:!opacity-100 shadow-[0_0_35px_2px_rgba(254,201,56,0.2)] transition-shadow duration-300">
                                    ПОЧАТИ
                                    {/*<span className="w-[14px] h-[14px]">*/}
                                    {/*    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z"></path></svg>*/}
                                    {/*</span>*/}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
