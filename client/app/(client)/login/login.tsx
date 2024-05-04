'use client';
import {FC, useEffect} from 'react';
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import Form from "./form";

const Login: FC = () => {
    const router = useRouter();
    const {status} = useSession()

    useEffect(() => {
        if (status === 'authenticated')
            router.push("/cms");
    }, [router, status]);

    return (
        <div className="flex w-full items-center justify-center h-[calc(100vh_-_29.875rem)]">
                <Form/>
        </div>
    )
};

export default Login;
