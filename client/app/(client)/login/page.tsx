'use client';
import { Suspense } from "react";
import Form from "./form";



export default function Login() {
    return (
        <div className="flex w-full items-center justify-center h-[calc(100vh_-_29.875rem)]">
            <Suspense>
                <Form/>
            </Suspense>
        </div>
    )
}
