"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from '@/store/store'
import { ToastContainer } from "react-toastify";

interface Props {
    children: ReactNode
}

const Providers = ({ children }: Props) => {
    return <SessionProvider>
        <Provider store={store}>
            <NextUIProvider>
                <ToastContainer limit={3} autoClose={5000} closeOnClick newestOnTop position="bottom-center" pauseOnHover/>
                {children}
            </NextUIProvider>
        </Provider>
    </SessionProvider>
}

export default Providers
