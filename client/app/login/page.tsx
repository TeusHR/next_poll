'use client';
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import cn from "classnames"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";

type LoginForm = {
    email: string
    password: string
}

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const router = useRouter()

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
            setIsLoading(true)
            const res = await signIn('credentials', {
                ...data,
                redirect: false
            })

            if (res) {
                if (res.status === 401) {
                    toast.error("Invalid email or password")
                } else if (res.error) {
                    toast.error("Try again later")
                } else if (res.ok) {
                    router.push(callbackUrl || '/dashboard')
                }
            }
            setIsLoading(false)
    }

    return (
        <div className="flex w-full items-center justify-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="border rounded-xl px-10 py-5 flex flex-col gap-5 w-1/4">
                <h1 className="text-center font-bold">Auth</h1>
                <Controller name="email" control={control} rules={{required: "Field is required"}} render={({ field }) => <div>
                    <label htmlFor="email" className="ml-3">Email</label>
                    <Input id="email" name="email" type="email" value={field.value} onValueChange={field.onChange} className={cn("border rounded-xl border-transparent", {"border-red-400": errors.email?.message?.length})}/>
                    <span className="text-red-400 text-sm ml-3">{errors.email?.message}</span>
                </div>}/>

                <Controller name="password" control={control} rules={{required: "Field is required"}} render={({ field }) => <div>
                    <label htmlFor="password" className="ml-3" >Password</label>
                    <Input id="password" name="password" type="password" value={field.value} onValueChange={field.onChange} className={cn("border rounded-xl border-transparent", {"border-red-400": errors.password?.message?.length})}/>
                    <span className="text-red-400 text-sm ml-3">{errors.password?.message}</span>
                </div>}/>
                <Button type="submit" isLoading={isLoading}>Login</Button>
            </form>
        </div>
    )
}
