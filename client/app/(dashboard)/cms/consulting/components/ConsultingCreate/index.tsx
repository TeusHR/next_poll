'use client'
import React, {useCallback, useState} from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ICreateConsulting, ICreateConsultingForm} from "@/types/Consulting";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {Button, Input} from "@nextui-org/react";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import EditorWrapper from "@/components/EditorWrapper";
import {HandlerImageValidate} from "@/utils/ImageValidate";

const ConsultingCreate = ({}) => {
    const {
        handleSubmit,
        control,
        formState,
        reset,
    } = useForm<ICreateConsultingForm>({
        mode: 'all',
        defaultValues: {
            title: '',
            text: '',
        }
    })

    const {status} = useSession()
    const $apiAuth = useAxiosAuth()
    const [isLoading, setIsLoading] = useState(false)

    const [uploadFiles, setUploadFiles] = useState<File[]>([])
    const [previewUpload, setPreviewUpload] = useState<string[]>([])

    const onSubmit: SubmitHandler<ICreateConsultingForm> = async (dataForm) => {

        if (toast.isActive('toast-register') || status !== 'authenticated') {
            return;
        }
        setIsLoading(true)

        const dataProduct: ICreateConsulting = {
            title: dataForm.title,
            text: dataForm.text,
            images: [],
        };

        // ConferencesService.postConferences(dataProduct, $apiAuth).then((status) => {
        //     if (status === 201) {
        //         reset()
        //         toast.success('Конференцію успішно створено')
        //     }
        // }).catch((error) => {
        //     console.log(error)
        //     toast.error('Щось пішло не так')
        // }).finally(() => setIsLoading(false))

    }

    const onUpload = (files: File[]) => {
        const fileNames = files.map(file => file.name);
        setPreviewUpload(prevState => [...prevState, ...fileNames]);
        setUploadFiles((prevState) => [...prevState, ...files])
    };

    const handleRemoveFile = useCallback((index: number) => {
        setUploadFiles((currentFiles) => {
            return currentFiles.filter((_, fileIndex) => index !== fileIndex);
        });
        setPreviewUpload((currentFiles) => {
            return currentFiles.filter((_, fileIndex) => index !== fileIndex);
        });
    }, []);

    return (
        <div className="flex flex-col gap-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-12 max-2xl:gap-4 flex-col">
                    {/*<div className="max-2xl:row-start-1 max-2xl:col-start-1 max-2xl:row-end-2 max-2xl:col-end-3">*/}
                    <div className="rounded-[20px] bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-col gap-4 w-full">
                                    <Controller name="title" control={control} rules={{
                                        required: "Обов'язкове поле",
                                        minLength: {value: 3, message: "Мінімальна довжина 3 символи"},
                                        maxLength: {value: 50, message: "Максимальна довжина 50 символів"},
                                    }} render={({field}) =>
                                        <Input className="border-none py-2"
                                               type="text"
                                               value={field.value}
                                               onValueChange={field.onChange}
                                               isRequired
                                               classNames={{
                                                   inputWrapper: "border-1 border-primary-500",
                                                   input: "focus:outline-none text-base text-primary",
                                                   errorMessage: "text-red-600 text-sm",
                                                   label: "text-base",
                                               }}
                                               key="title"
                                               label="Назва"
                                               labelPlacement="outside"
                                               placeholder="Введіть назву"
                                               autoComplete="off"
                                               isInvalid={!!formState.errors.title?.message}
                                               errorMessage={formState.errors.title?.message}
                                        />
                                    }
                                    />
                                    <div className="flex flex-col gap-4 w-full relative justify-end">
                                        <Controller name="files" control={control}
                                                    rules={{
                                                        // validate: async (value) => {
                                                        //     if (value && value.length > 0) {
                                                        //         try {
                                                        //             // @ts-ignore
                                                        //             for (const item of value) {
                                                        //                 await HandlerImageValidate(item,
                                                        //                     500,
                                                        //                     500,
                                                        //                     'Усі зображення має бути 400x400',
                                                        //                     ["image/png"])
                                                        //             }
                                                        //         } catch (error) {
                                                        //             return error as string
                                                        //         }
                                                        //     } else {
                                                        //         return 'Не вибрано жодного файлу';
                                                        //     }
                                                        // },
                                                    }}
                                                    render={({field}) =>
                                                        <div className="w-full">
                                                            <div
                                                                className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.files?.message ? 'text-red-600' : ''}`}>
                                                                Завантаження файлів
                                                            </div>
                                                            <DNDUpload onUpload={onUpload}
                                                                       onChange={field.onChange}
                                                                       formats={[".png", ".jpeg", ".svg"]}
                                                                       styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed">
                                                                Скинь мені файли
                                                            </DNDUpload>
                                                            {formState.errors.files?.message &&
                                                                <div
                                                                    className="text-red-600 text-sm">{formState.errors.files.message}</div>}
                                                        </div>
                                                    }
                                        />
                                        <div className="w-full flex flex-col gap-4 items-start">
                                            <PreviewUpload files={previewUpload} handleRemoveFile={handleRemoveFile}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*</div>*/}
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
                                Створити
                            </Button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default ConsultingCreate;