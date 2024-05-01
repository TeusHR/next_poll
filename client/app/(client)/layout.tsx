import React, {ReactNode} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LocaleLayout({children}: {
    children: ReactNode,
}) {

    return (
        <div className="bg-white w-full text-primary flex flex-col min-h-screen">
            <Header/>
            <main className="flex-auto">
                {children}
            </main>
            <Footer/>
        </div>
    );
}
