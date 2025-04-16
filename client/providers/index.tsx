"use client";
import {SessionProvider} from "next-auth/react";
import {ToastContainer} from "react-toastify";
import {PropsWithChildren} from "react";
import {HeroUIProvider} from "@heroui/react";

const Providers = ({children}: PropsWithChildren) => {
        return <SessionProvider>
        <HeroUIProvider>
                <ToastContainer limit={3} autoClose={5000} closeOnClick newestOnTop position="bottom-center" pauseOnHover/>
                {children}
        </HeroUIProvider>
    </SessionProvider>
}

export default Providers
