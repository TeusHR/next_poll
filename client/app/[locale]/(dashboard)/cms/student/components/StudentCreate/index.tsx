'use client'
import React, {FC, useEffect, useState} from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {Button} from "@nextui-org/react";
import EditorWrapper from "@/components/EditorWrapper";
import {StudentService} from "@/services/CMS.service";
import {ICreateStudent, IStudent} from "@/types/Student";
import revalidateFetch from "@/services/revalidateFetch";

type Props = {
    student:IStudent | undefined
}

export type filePath = { url: string, name: string }

const StudentCreate:FC<Props> = ({student}) => {
    const {
        handleSubmit,
        control,
        formState,
        setValue,
    } = useForm<ICreateStudent>({
        mode: 'all',
        defaultValues: {
            text: '',
        }
    })


    const {status} = useSession()
    const $apiAuth = useAxiosAuth()
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if(student) {
            setValue('text', student.text)
        }
    }, [student, setValue]);


    const onSubmit: SubmitHandler<ICreateStudent> = async (dataForm) => {

        if (toast.isActive('toast-register') || status !== 'authenticated') {
            return;
        }
        setIsLoading(true)

        try {
            const dataProduct: ICreateStudent = {
                text: dataForm.text,
            };

            const status = await StudentService.postStudent(dataProduct, $apiAuth)
            if (status === 201) {
                await revalidateFetch('studentScience')
                toast.success('Дані оновлено')
            }
        } catch (error) {
            console.log(error)
            toast.error('Щось пішло не так')
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="flex flex-col gap-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-12 max-2xl:gap-4 flex-col">
                    <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col gap-4">
                        <div className="flex">
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex flex-col gap-4 items-start w-full relative">
                                        <Controller name="text" control={control}
                                                    rules={{
                                                        required: 'Обов\'язкове поле',
                                                    }}
                                                    render={({field}) =>
                                                        <>
                                                            <div
                                                                className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.text?.message ? 'text-red-600' : ''} after:content-['*'] after:text-[#F3005E] after:ml-0.5`}>
                                                                Текст
                                                            </div>
                                                            <div className="relative w-full">
                                                                <EditorWrapper onChange={(field.onChange)}
                                                                               description={field.value}
                                                                               placeholder={'Напишіть текст для слайдера'}
                                                                />
                                                            </div>
                                                            {formState.errors.text?.message &&
                                                                <div
                                                                    className="text-red-600 text-sm">{formState.errors.text.message}</div>}
                                                        </>
                                                    }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <Button type={"submit"}
                                    isLoading={isLoading}
                                    className="px-6 bg-fd text-xl">
                                Зберегти
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StudentCreate;
