'use client';
import { Suspense } from "react";
import Form from "./form";



export default function Login() {
    return (
        <div className="flex w-full items-center justify-center h-screen">
            <Suspense>
                <Form/>
            </Suspense>
        </div>
    )
}
