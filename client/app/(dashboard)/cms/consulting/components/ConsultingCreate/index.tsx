'use client'
import React, {FC, useCallback, useEffect, useState} from 'react'
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {IConsulting, ICreateConsulting, ICreateConsultingForm} from "@/types/Consulting";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {Button, Image, Input} from "@nextui-org/react";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import EditorWrapper from "@/components/EditorWrapper";
import {HandlerImageValidate, loadPreviewImage} from "@/utils/ImageValidate";
import {ConsultingService} from "@/services/CMS.service";
import {FileService} from "@/services/file.service";
import {FileToFileList} from "@/utils/FIleToFileList";
import CloseIcon from "@/UI/CloseIcon";
import {uploadType} from "../../../innovations/components/InnovationsEdit";
import revalidateFetch from "@/services/revalidateFetch";

type Props = {
    consulting:IConsulting | undefined
}

export type filePath = { url: string, name: string }

const ConsultingCreate:FC<Props> = ({consulting}) => {
    const {
        handleSubmit,
        control,
        formState,
        setValue,
        setError,
    } = useForm<ICreateConsultingForm>({
        mode: 'all',
        defaultValues: {
            title: '',
            text: '',
        }
    })
    const {
        fields,
        append,
        remove
    } = useFieldArray({control, name: "images"});

    const {status} = useSession()
    const $apiAuth = useAxiosAuth()
    const [isLoading, setIsLoading] = useState(false)

    const [files, setFiles] = useState<uploadType[]>([]);

    useEffect(() => {
        if(consulting) {
            setValue('text', consulting.text)
            setValue('title', consulting.title)
            setValue('images', consulting.images)
            const serverFiles:uploadType[] = consulting.images.map(url => (
                {
                    name: renderFileName(url.image),
                    typeUpload: "server" as const,
                    type:"file",
                    url: url.image,
                }
            ));
            setFiles(serverFiles);
        }
    }, [consulting, setValue]);

    const renderFileName = (fileName: string): string => {
        return fileName.replace('/uploads/image/', '');
    }

    const onSubmit: SubmitHandler<ICreateConsultingForm> = async (dataForm) => {

        if (toast.isActive('toast-register') || status !== 'authenticated') {
            return;
        }
        setIsLoading(true)

        try {
            const uploadFiles = files.filter(file => file.typeUpload === 'uploaded').map(file => file.file as File);

            const filesPath = uploadFiles.length > 0
                ? await FileService.upload($apiAuth, FileToFileList(uploadFiles), 'image')
                : [];

            if (filesPath.length === 0 && uploadFiles.length > 0) {
                toast.error('Файли не збережені, щось не так.');
                setIsLoading(false);
                return;
            }

            const serverUploadedFiles  = files.filter(file => file.typeUpload === 'server').map(file => file)
            const images = createImagesList(filesPath, dataForm, serverUploadedFiles);

            const dataProduct: ICreateConsulting = {
                title: dataForm.title,
                text: dataForm.text,
                images: images,
            };

            const status = await ConsultingService.postConsulting(dataProduct, $apiAuth)

            if (status === 201) {
                await revalidateFetch('consulting')
                toast.success('Успішно створено')
            }
        } catch (error) {
            console.log(error)
            toast.error('Щось пішло не так')
        } finally {
            setIsLoading(false)
        }

    }

    const createImagesList = (filesPath:filePath[], dataForm:ICreateConsultingForm, serverUploadedFiles:uploadType[]) => {
        const images = filesPath.map((file, i) => ({
            image: file.url,
            description: dataForm.images[serverUploadedFiles.length+i].description
        }));

        const ServerImages = serverUploadedFiles.map((file, i) => ({
            image: file.url,
            description: dataForm.images[i].description
        }));

        return [...ServerImages, ...images]
    };

    const onUpload = async (files: File[], type: 'file' | 'image') => {
        if (type === 'image') {
            try {
                for (const item of files) {
                    await HandlerImageValidate(item,
                        1280,
                        720,
                        'Усі зображення мають бути 1280x720')
                }
            } catch (error) {
                setError('files', {type: 'custom', message: error as string})
                return error as string
            }
        }

        const newFiles: uploadType[] = files.map(file => ({
            name: file.name,
            typeUpload: 'uploaded' as const,
            type: type,
            file,
            url: file.name
        }));
        console.log(newFiles)
        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleRemoveFile = useCallback((index: number, type: 'file' | 'image') => {
        setFiles((currentFiles) => currentFiles.filter((_, fileIndex) => index !== fileIndex));
        remove(index)
    }, [remove]);

    useEffect(() => {
        if (files.length > 0) {
            for (let i = 0; i < files.length - fields.length; i++) {
                append({image: '', description: 'test'})
            }
        }
    }, [append, fields.length, files]);


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
                                                            required: "Обов'язкове поле",
                                                        }}
                                                        render={({field}) =>
                                                            <div className="w-full">
                                                                <div
                                                                    className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.files?.message ? 'text-red-600' : ''}`}>
                                                                    Завантаження файлів
                                                                </div>
                                                                <DNDUpload onUpload={(files) => onUpload(files, 'image')}
                                                                           onChange={field.onChange}
                                                                           formats={[".png", ".jpeg", ".jpg"]}
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
                                                <PreviewUpload files={files} handleRemoveFile={(index) => handleRemoveFile(index, 'file')}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {files.length > 0 &&
                            <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
                                <div className="flex flex-col gap-4">
                                    <div className="w-full flex flex-col gap-4">
                                        {fields.map((item, index) => (
                                            <div className="flex flex-row gap-4 w-full items-center" key={item.id}>
                                                <div className="w-[80px]">
                                                    <Image src={loadPreviewImage(files[index].file) || files[index].url}
                                                           alt="preview"/>
                                                </div>
                                                <div className="w-full">
                                                    <Controller name={`images.${index}.description`}
                                                                control={control}
                                                                rules={{
                                                                    required: "Обов'язкове поле",
                                                                    minLength: {
                                                                        value: 3,
                                                                        message: "Мінімальна довжина 3 символи"
                                                                    },
                                                                    maxLength: {
                                                                        value: 100,
                                                                        message: "Максимальна довжина 100 символів"
                                                                    },
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
                                                               key="description"
                                                               label="Опис"
                                                               labelPlacement="outside"
                                                               placeholder="Введіть назву"
                                                               autoComplete="off"
                                                               isInvalid={!!formState.errors.title?.message}
                                                               errorMessage={formState.errors.title?.message}
                                                        />
                                                    }
                                                    />
                                                </div>
                                                <span className="cursor-pointer pt-[20px]"
                                                      onClick={() => handleRemoveFile(index, "file")}>
                                                        <CloseIcon/>
                                                    </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        }
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
