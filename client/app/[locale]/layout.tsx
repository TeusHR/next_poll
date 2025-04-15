import type {Metadata} from "next";
import "@/assets/styles/index.scss"
import 'react-toastify/dist/ReactToastify.css';
import { LOCALES } from "@/config/constants";
import React, {ReactNode} from "react";
import {redirect} from "next/navigation";
import Providers from "../../providers";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export function generateStaticParams() {
    return LOCALES.map((locale) => ({locale}));
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL('uk', process.env.NEXTAUTH_URL),
        title: {
            default: 'TEUS',
            template: '%s | TEUS'
        },
        openGraph: {
            title: {
                default: 'TEUS',
                template: "%s | TEUS "
            },
            siteName: "TEUS",
            locale: 'ua',
            type: "website",
            images: {
                url: "/image/TEUS_DARK-02.png",
                width: 200,
                height: 146,
                alt: "TEUS логотип"
            }
        }
    }
}

export default async function RootLayout({children, params: {locale}}: {
    children: ReactNode,
    params: { locale: string }
}) {
    const isValidLocale = LOCALES.some((cur) => cur === locale);
    if (!isValidLocale) redirect(`/`);

    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body >
        <NextIntlClientProvider messages={messages}>
            <Providers>
                {children}
            </Providers>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
