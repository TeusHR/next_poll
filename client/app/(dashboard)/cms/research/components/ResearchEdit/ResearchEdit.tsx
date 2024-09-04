'use client'
import React, {FC, useEffect, useState} from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ICreateResearch, IResearch, IUpdateResearchForm} from "@/types/Research";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {filePath} from "../../../consulting/components/ConsultingCreate";
import {FileService} from "@/services/file.service";
import {ResearchService} from "@/services/CMS.service";
import {Button, Input} from "@nextui-org/react";
import EditorWrapper from "@/components/EditorWrapper";
import revalidateFetch from "@/services/revalidateFetch";


type Props = {
    researchId: string
}

const ResearchEdit: FC<Props> = ({researchId}) => {

    const {
        handleSubmit,
        control,
        formState,
        setValue,
    } = useForm<IUpdateResearchForm>({
        mode: 'all',
        defaultValues: {
            title: '',
            text: '',
        }
    })

    const {status} = useSession()
    const $apiAuth = useAxiosAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState<string>('')
    const [research, setResearch] = useState<IResearch>()

    useEffect(() => {
        if (researchId) {
            setIsLoading(true)
            ResearchService.getResearch(researchId).then(data => setResearch(data))
                .catch(() => {
                    toast.error('Не знайдено')
                })
                .finally(() => setIsLoading(false))
        }
    }, [researchId]);

    useEffect(() => {
        if (research) {
            setValue('title', research.title)
            setValue('text', research.text)
            setImagePreview(renderFileName(research.image))
        }
    }, [research, setValue]);

    const renderFileName = (fileName: string): string => {
        return fileName.replace('/uploads/image/', '');
    }

    const onSubmit: SubmitHandler<IUpdateResearchForm> = async (dataForm) => {

        if (toast.isActive('toast-register') || status !== 'authenticated') {
            return;
        }
        setIsLoading(true)

        try {
            if (research) {

                let urlImage: filePath[] | undefined

                if (dataForm.image) {
                    urlImage = await FileService.upload($apiAuth, dataForm.image, 'image')
                }

                if (urlImage && urlImage.length === 0) {
                    toast.error('Зображення не було завантажено.');
                    setIsLoading(false);
                    return;
                }

                const dataProduct: ICreateResearch = {
                    title: dataForm.title,
                    text: dataForm.text,
                    image: urlImage ? urlImage[0].url : research.image,
                };

                const status = await ResearchService.updateResearch(dataProduct, researchId, $apiAuth)
                if (status === 200) {
                    await revalidateFetch('researchWork')
                    toast.success('Запис оновлено')
                }
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
                    <div className="flex flex-row max-md:flex-col gap-8 max-lg:gap-4 justify-between">
                        <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex flex-col gap-4 w-full">
                                        <Controller name="title" control={control} rules={{
                                            required: "Обов'язкове поле",
                                            minLength: {value: 3, message: "Мінімальна довжина 3 символи"},
                                            maxLength: {value: 500, message: "Максимальна довжина 500 символів"},
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
                                            <Controller name="image" control={control}
                                                        rules={{
                                                            validate: async (value) => {
                                                                if (value && value.length > 0) {
                                                                    setImagePreview('')
                                                                    try {
                                                                        // const result = await HandlerImageValidate(value[0],
                                                                        //     1280,
                                                                        //     720,
                                                                        //     'Усі зображення мають бути 1280x720')
                                                                        // setImagePreview(result)
                                                                        setImagePreview(value[0].name)
                                                                    } catch (error) {
                                                                        return error as string
                                                                    }
                                                                } else {
                                                                    if (!imagePreview)
                                                                        return 'Не вибрано жодного файлу';
                                                                }
                                                            },
                                                        }}
                                                        render={({field}) =>
                                                            <div className="w-full">
                                                                <div
                                                                    className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.image?.message ? 'text-red-600' : ''} after:content-['*'] after:text-[#F3005E] after:ml-0.5`}>
                                                                    Зображення
                                                                </div>
                                                                <div className="relative py-2">
                                                                    <div
                                                                        className="border-1 border-primary-500 text-base h-unit-10 rounded-[14px] bg-default-100 hover:bg-default-200">
                                                                        <input
                                                                            className="border-none w-full px-3 h-full opacity-0 cursor-pointer absolute z-10"
                                                                            onChange={(event) => {
                                                                                field.onChange(event.target.files as FileList);
                                                                            }}
                                                                            placeholder="Виберіть файл"
                                                                            type="file"
                                                                            accept="image/png, image/jpeg, image/svg"
                                                                            key="title"
                                                                            autoComplete="off"
                                                                        />
                                                                        <div
                                                                            className={`!truncate py-2 px-3 ${imagePreview !== '' ? 'text-primary' : 'text-foreground-500'} h-full w-full flex items-center`}>
                                                                            <span>
                                                                                {imagePreview ? imagePreview : 'Виберіть файл'}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    {formState.errors.image?.message &&
                                                                        <div
                                                                            className="text-red-600 text-sm">{formState.errors.image.message}</div>}
                                                                </div>
                                                            </div>
                                                        }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                Оновити
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ResearchEdit;
