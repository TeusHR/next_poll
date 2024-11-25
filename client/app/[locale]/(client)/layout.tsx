import React, {ReactNode} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GetTranslationsForJson } from "@/utils/getTranslationKeys";
import mainJson from "@/messages/ua/main.json";
import { MainTranslation } from "./page";

export default function LocaleLayout({children, params}: {
    children: ReactNode,
  params: { locale: string }
}) {

  const mainPage = GetTranslationsForJson<MainTranslation>('Main', mainJson)

    return (
        <div className="bg-white w-full text-primary flex flex-col min-h-screen">
            <Header params={params}/>
            <main className="flex-auto">
                {children}
            </main>
            <Footer translation={mainPage.Main['footer']}/>
        </div>
    );
}
