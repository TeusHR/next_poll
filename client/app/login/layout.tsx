import React, { ReactNode, Suspense } from "react";
import Layout from "@/components/Layout";



export default function LocaleLayout({children}: {
    children: ReactNode,
}) {

    return (
        <>
            <Layout>
                <Suspense>
                    {children}
                </Suspense>
            </Layout>
        </>

    );
}
