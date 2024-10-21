import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import cn from "classnames";
import {signIn} from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

type LoginForm = {
    email: string
    password: string
}

const Form: FC = () => {
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

        console.log(res)
        if (res) {
            if (res.status === 401) {
                toast.error("Неправильний email або пароль")
            } else if (res.error) {
                toast.error("Спробуйте пізніше")
            } else if (res.ok) {
                router.push(callbackUrl || '/cms')
            }
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border rounded-xl px-10 py-5 flex flex-col gap-5 w-1/4">
            <h1 className="text-center font-bold">Авторизація</h1>
            <Controller name="email" control={control} rules={{ required: "Field is required" }}
                        render={({ field }) => <div>
                            <label htmlFor="email" className="ml-3">Email</label>
                            <Input id="email" name="email" type="email" value={field.value}
                                   onValueChange={field.onChange}
                                   className={cn("border rounded-xl border-transparent", { "border-red-400": errors.email?.message?.length })}/>
                            <span className="text-red-400 text-sm ml-3">{errors.email?.message}</span>
                        </div>}/>

            <Controller name="password" control={control} rules={{ required: "Field is required" }}
                        render={({ field }) => <div>
                            <label htmlFor="password" className="ml-3">Пароль</label>
                            <Input id="password" name="password" type="password" value={field.value}
                                   onValueChange={field.onChange}
                                   className={cn("border rounded-xl border-transparent", { "border-red-400": errors.password?.message?.length })}/>
                            <span className="text-red-400 text-sm ml-3">{errors.password?.message}</span>
                        </div>}/>
            <Button type="submit" isLoading={isLoading}>Вхід в систему</Button>
        </form>
    );
};

export default Form;
