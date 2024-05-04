import {Metadata} from "next";
import {Suspense} from "react";
import Login from "./login";

export const metadata: Metadata = {
    title: "Авторизація",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false
        }
    }
}

export default function LoginPage() {
    return <Suspense>
        <Login/>
    </Suspense>
}
