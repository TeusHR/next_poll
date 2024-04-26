import React, {ReactNode} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LocaleLayout({children}: {
    children: ReactNode,
}) {

    return (
        <div className="bg-white w-full text-primary">
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
}
