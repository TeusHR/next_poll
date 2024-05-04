"use client";
import {SessionProvider} from "next-auth/react";
import {NextUIProvider} from "@nextui-org/react";
import {ToastContainer} from "react-toastify";
import AuthProvider from "./auth.provider";
import {PropsWithChildren} from "react";

const Providers = ({children}: PropsWithChildren) => {
        return <SessionProvider>
        <NextUIProvider>
            <AuthProvider>
                <ToastContainer limit={3} autoClose={5000} closeOnClick newestOnTop position="bottom-center" pauseOnHover/>
                {children}
            </AuthProvider>
        </NextUIProvider>
    </SessionProvider>
}

export default Providers
