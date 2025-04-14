import React, {ReactNode} from "react";
import Header from "@/components/Header";

export default function LocaleLayout({children, params}: {
    children: ReactNode,
  params: { locale: string }
}) {

    return (
        <div>
            <Header />
            <main className="flex-auto">
                <video loop muted autoPlay className="fixed top-[-5%]" controls={false}>
                    <source src={"/image/video.mp4"} type="video/mp4" />
                </video>
                {children}
            </main>
        </div>
    );
}
