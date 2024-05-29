'use client'
import React, {FC, useState} from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import GoogleMap from "@/components/GoogleMap";
import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import NextImage from "next/image";
import {Image} from "@nextui-org/react";
import {IFeedbackForm} from "@/types/Feedback";
import {FeedbackService} from "@/services/client.service";

const Feedback: FC<{ apiKey: string }> = ({apiKey}) => {

    const {
        handleSubmit,
        control,
        formState,
        reset
    } = useForm<IFeedbackForm>({
        mode: "all",
        defaultValues: {
            name: '',
            email: '',
            text: ''
        },
    });

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<IFeedbackForm> = async (dataForm) => {
        if (toast.isActive('toast-register')) {
            return;
        }
        setIsLoading(true)

        try {
            const data: IFeedbackForm = {
                name: dataForm.name,
                email: dataForm.email,
                text: dataForm.text,
            };

            FeedbackService.post(data).then((status) => {
                if (status === 201) {
                    reset()
                    toast.success('Відправлено')
                }
            })
        } catch (error) {
            console.log(error)
            toast.error('Щось пішло не так')
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="w-full h-[600px] mt-24 relative max-sm:flex max-sm:flex-col max-sm:gap-8 max-sm:h-full">
            <div className="flex sm:px-28 max-xl:px-16 justify-center max-sm:px-4 sm:justify-end sm:absolute w-full top-[-5%]">
                <div
                    className="bg-white border border-primary rounded-2xl z-20 justify-end w-full max-xl:max-w-[450px] max-w-[600px] min-h-[600px] sm:min-h-[700px] relative">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex h-full flex-col">
                            <div className="sm:px-16 px-8 pt-14 w-full min-h-[500px] text-primary">
                                <div className="text-3xl max-sm:text-center sm:text-4xl xl:text-2xl md:text-xl">
                                    <span className="font-semibold">Зворотній зв’язок</span>
                                </div>
                                <div className="flex flex-col mt-8 gap-4">
                                    <Controller name="name" control={control} rules={{
                                        required: "Обов'язкове поле",
                                        minLength: {value: 3, message: "Мінімальна довжина 3 символи"},
                                        maxLength: {value: 50, message: "Максимальна довжина 50 символів"},
                                    }} render={({field}) =>
                                        <Input className="border-none py-2"
                                               type="text"
                                               value={field.value}
                                               onValueChange={field.onChange}
                                               key="name"
                                               classNames={{
                                                   input: "focus:outline-none text-xl text-primary",
                                                   label: "text-lg text-primary",
                                                   errorMessage: "text-red-600 text-base"
                                               }}
                                               variant="underlined"
                                               max="50"
                                               min="2"
                                               label="Ім’я"
                                               autoComplete="off"
                                               isInvalid={!!formState.errors.name?.message}
                                               errorMessage={formState.errors.name?.message}
                                        />
                                    }
                                    />
                                    <Controller name="email" control={control} rules={{
                                        required: "Обов'язкове поле",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Невірна адреса електронної пошти"
                                        }
                                    }} render={({field}) =>
                                        <Input className="border-none py-2"
                                               type="email"
                                               value={field.value}
                                               onValueChange={field.onChange}
                                               classNames={{
                                                   input: "focus:outline-none text-xl text-primary",
                                                   label: "text-lg text-primary",
                                                   errorMessage: "text-red-600 text-base"
                                               }}
                                               variant="underlined"
                                               key="gmail"
                                               max="50"
                                               min="2"
                                               label="Пошта"
                                               autoComplete="off"
                                               isInvalid={!!formState.errors.email?.message}
                                               errorMessage={formState.errors.email?.message}
                                        />
                                    }
                                    />
                                    <Controller name="text" control={control} rules={{
                                        required: "Обов'язкове поле",
                                        minLength: {value: 3, message: "Мінімальна довжина 3 символи"},
                                        maxLength: {value: 250, message: "Максимальна довжина 250 символів"},
                                    }} render={({field}) =>
                                        <Input className="border-none py-2"
                                               type="text"
                                               value={field.value}
                                               onValueChange={field.onChange}
                                               key="text"
                                               classNames={{
                                                   input: "focus:outline-none text-xl text-primary",
                                                   label: "text-lg text-primary",
                                                   errorMessage: "text-red-600 text-base"
                                               }}
                                               variant="underlined"
                                               max="50"
                                               min="2"
                                               label="Текст"
                                               autoComplete="off"
                                               isInvalid={!!formState.errors.text?.message}
                                               errorMessage={formState.errors.text?.message}
                                        />
                                    }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-2">
                                <Button
                                    className="bg-primary flex flex-row gap-4 rounded-l-[4px] p-4 sm:px-8 sm:h-[60px] max-sm:!text-[14px]"
                                    isLoading={isLoading}
                                    disableAnimation
                                    radius="none"
                                    type="submit">
                                <span className="uppercase text-white sm:text-xl md:text-base">
                                        Відправити
                                </span>
                                    <span>
                                    <Image
                                        src={'/image/arrowSubmit.svg'}
                                        as={NextImage}
                                        alt={'Відправити'}
                                        width={24}
                                        height={24}
                                    />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <GoogleMap apiKey={apiKey}/>
        </div>
    )
}

export default Feedback;
