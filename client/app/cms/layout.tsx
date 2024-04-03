import React from 'react'
import {Metadata} from "next";
import Header from "@/components/CMS/Header";
import Sidebar from "@/components/CMS/Sidebar";

export const metadata: Metadata = {
    title: "Адмін панель",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false
        }
    }
}

const LayoutCMS = ({
                       children,
                   }: { children: React.ReactNode }) => {

    return (
        <div className="flex">
            <Sidebar/>
            <main className="flex-1">
                <div className="flex flex-col lg:ml-60 sm:border-r sm:border-zinc-700 min-h-screen">
                    <Header/>
                    <div className="flex flex-col pt-2 px-4 space-y-2 bg-zinc-100 flex-grow pb-4">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LayoutCMS;
