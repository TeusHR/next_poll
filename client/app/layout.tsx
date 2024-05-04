import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {PropsWithChildren} from "react";
import Providers from "../providers";
import "@/assets/styles/index.scss"
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({subsets: ["latin"]});

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL('uk', process.env.NEXTAUTH_URL),
        description: 'Офіційний сайт ОНТУ: наукова робота, міжнародні програми, конференції, семінари...',
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

export default function RootLayout({children,}: PropsWithChildren) {
    return (
        <html lang="uk">
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
