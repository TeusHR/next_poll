    import React, {ReactNode} from "react";
    import Header from "@/components/Header";
    import {Image} from "@heroui/react";

    export default function LocaleLayout({children, params}: {
        children: ReactNode,
      params: { locale: string }
    }) {

        return (
            <div className="relative min-h-screen overflow-hidden">
                <Header />
                <video
                    loop
                    muted
                    autoPlay
                    playsInline
                    className="fixed top-0 left-0 w-full h-full object-cover z-[-1] max-sm:hidden"
                    controls={false}
                >
                    <source src={"/image/video.mp4"} type="video/mp4" />
                </video>

                {/* Статическое изображение для экранов sm и меньше */}
                <Image
                    src={"/image/video_static.png"}
                    alt="Static Image"
                    className="hidden max-sm:block fixed top-0 left-0 w-full h-full object-cover z-[-1] rounded-none"
                />
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        );
    }
