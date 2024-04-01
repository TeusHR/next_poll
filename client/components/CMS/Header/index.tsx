'use client'
import React, {useEffect} from 'react'
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const Header = ({}) => {
    const { data } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (data?.error)
            signOut({ redirect: false }).then(() => router.push("/?auth=true"));
    }, [data, router]);

    return (
        <header className="bg-white border-b border-zinc-200">
            <div className="h-[90px] bg-white w-full flex justify-between">
                <div className="p-2 w-full">
                    <div className="flex flex-row gap-4 justify-between items-center pl-4">
                        <div>

                        </div>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;