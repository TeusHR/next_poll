import type {Metadata} from "next";
// import {Inter} from "next/font/google";
import "@/assets/styles/index.scss"
import 'react-toastify/dist/ReactToastify.css';
import { LOCALES } from "@/config/constants";
import React, {ReactNode} from "react";
import {redirect} from "next/navigation";
import Providers from "../../providers";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {Roboto_Slab} from 'next/font/google';

export function generateStaticParams() {
    return LOCALES.map((locale) => ({locale}));
}

// const inter = Inter({subsets: ["latin"]});
const RobotoSlab = Roboto_Slab({subsets: ['latin', 'cyrillic']});


export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL('uk', process.env.NEXTAUTH_URL),
        description: 'Наукова робота та міжнародна діяльність Одеського національного технологічного університету',
        title: {
            default: 'SCINT',
            template: '%s | SCINT'
        },
        keywords: "ОНТУ, наука, дослідження, університет, освіта, міжнародне співробітництво, академічні програми, студенти",
        category: "Education",
        openGraph: {
            title: {
                default: 'SCINT',
                template: "%s | SCINT "
            },
            description: 'Офіційний сайт ОНТУ: наукова робота, міжнародні програми, конференції, семінари...',
            siteName: "SCINT ONTU",
            locale: 'uk',
            type: "website",
            images: {
                url: "/image/logo.svg",
                width: 200,
                height: 146,
                alt: "SCINT ONTU логотип"
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
        <body className={RobotoSlab.className}>
        <NextIntlClientProvider messages={messages}>
            <Providers>
                {children}
            </Providers>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
