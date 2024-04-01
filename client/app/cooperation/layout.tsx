import React, {ReactNode} from "react";
import Layout from "@/components/Layout";



export default function LocaleLayout({children}: {
    children: ReactNode,
}) {

    return (
        <>
            <Layout>
                {children}
            </Layout>
        </>

    );
}