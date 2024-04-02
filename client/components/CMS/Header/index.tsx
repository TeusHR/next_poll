'use client'
import React, {useEffect} from 'react'
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import NavbarBurger from "@/components/CMS/NavbarBurger";

const Header = ({}) => {
    const { data } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (data?.error)
            signOut({ redirect: false }).then(() => router.push("/?auth=true"));
    }, [data, router]);
    
    const logOut = () => {
        signOut({ redirect: false }).then(() => router.push("/"));
    }
    
    return (
        <header className="bg-white border-b border-zinc-200">
            <div className="h-[90px] bg-white w-full flex justify-between">
                <div className="p-2 w-full">
                    <div className="flex w-full h-full flex-row gap-4 justify-end items-center pl-4">
                        <div className="flex flex-row gap-3 items-center h-full">
                            {data?.user.name}
                        </div>
                        <div className="underline-offset-2 underline cursor-pointer" onClick={()=>logOut()}>
                            Вийти
                        </div>
                        <div className="relative h-full max-lg:w-[45px]">
                            <NavbarBurger/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;