import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import Providers from "../providers";
import "@/assets/styles/index.scss"
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`http://localhost:3000`),
  title: {
    default: 'SCINT',
    template: '%s | SCINT'
  },
  keywords: "",
  category: "Education"
};

export default function RootLayout({ children, }: PropsWithChildren) {
  return (
    <html lang="uk">
      <body className={inter.className}>
      <Providers>
            <Layout>
                {children}
            </Layout>
      </Providers>
      </body>
    </html>
  );
}
