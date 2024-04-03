'use client'
import React, {useState} from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import GoogleMap from "@/components/GoogleMap";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import NextImage from "next/image";
import {Image} from "@nextui-org/react";

interface IFeedbackForm {
    name: string,
    gmail: string,
    text: string,
}

const Feedback = ({}) => {

    const {
        handleSubmit,
        control,
        formState,
    } = useForm<IFeedbackForm>({
        mode: "all",
        defaultValues: {
            name: '',
            gmail: '',
            text: ''
        },
    });

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<IFeedbackForm> = data => {
        if (!toast.isActive('feedback')) {
            setIsLoading(true)

        }
    }

    return (
        <div className="w-full h-[600px] mt-24 relative">
            <div className="flex px-28 max-xl:px-16 justify-end absolute w-full top-[-5%]">
                <div
                    className="bg-white border border-primary rounded-2xl z-20 justify-end w-full max-xl:max-w-[450px] max-w-[600px] min-h-[700px] relative">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="px-16 py-14 text-primary">
                            <div className="text-4xl xl:text-2xl md:text-xl">
                                <span className="font-semibold">Зворотній зв’язок</span>
                            </div>
                            <div className="flex flex-col mt-16 gap-12">
                                <Controller name="name" control={control} rules={{
                                    required: "Обов'язкове поле",
                                }} render={({field}) =>
                                    <Input className="border-none py-2"
                                           type="text"
                                           defaultValue={field.value}
                                           isRequired
                                           classNames={{
                                               inputWrapper: "border-b-1 border-primary pb-[5px]",
                                               input: "focus:outline-none text-xl text-primary px-2",
                                               errorMessage: "text-red-600 text-base"
                                           }}
                                           max="50"
                                           min="2"
                                           placeholder="Ім’я"
                                           autoComplete="off"
                                           isInvalid={!!formState.errors.name?.message}
                                           errorMessage={formState.errors.name?.message}
                                    />
                                }
                                />
                                <Controller name="gmail" control={control} rules={{
                                    required: "Обов'язкове поле",
                                }} render={({field}) =>
                                    <Input className="border-none py-2"
                                           type="text"
                                           defaultValue={field.value}
                                           isRequired
                                           classNames={{
                                               inputWrapper: "border-b-1 border-primary pb-[5px]",
                                               input: "focus:outline-none text-xl text-primary px-2",
                                               errorMessage: "text-red-600 text-base"
                                           }}
                                           max="50"
                                           min="2"
                                           placeholder="Пошта"
                                           autoComplete="off"
                                           isInvalid={!!formState.errors.gmail?.message}
                                           errorMessage={formState.errors.gmail?.message}
                                    />
                                }
                                />
                                <Controller name="text" control={control} rules={{
                                    required: "Обов'язкове поле",
                                }} render={({field}) =>
                                    <Input className="border-none py-2"
                                           type="text"
                                           defaultValue={field.value}
                                           isRequired
                                           classNames={{
                                               inputWrapper: "border-b-1 border-primary pb-[5px]",
                                               input: "focus:outline-none text-xl text-primary px-2",
                                               errorMessage: "text-red-600 text-base"
                                           }}
                                           max="50"
                                           min="2"
                                           placeholder="Текст"
                                           autoComplete="off"
                                           isInvalid={!!formState.errors.text?.message}
                                           errorMessage={formState.errors.text?.message}
                                    />
                                }
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-12">
                            <Button
                                className="bg-primary flex flex-row gap-4 p-4 px-8 h-[60px] max-sm:!text-[14px]"
                                isLoading={isLoading}
                                disableAnimation
                                type="submit">
                                <span className="uppercase text-white text-xl md:text-base">
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
                    </form>
                </div>
            </div>
            <GoogleMap/>
        </div>
    )
}

export default Feedback;