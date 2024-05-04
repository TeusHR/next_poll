'use client';
import {Suspense, useEffect} from "react";
import Form from "./form";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";



export default function Login() {
    const router = useRouter();
    const {status} = useSession()

    useEffect(() => {
        if (status === 'authenticated')
            router.push("/cms");
    }, [router, status]);

    return (
        <div className="flex w-full items-center justify-center h-[calc(100vh_-_29.875rem)]">
            <Suspense>
                <Form/>
            </Suspense>
        </div>
    )
}
