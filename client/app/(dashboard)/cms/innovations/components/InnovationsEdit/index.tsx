'use client'
import React, {FC, useCallback, useEffect, useState} from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ICreateInnovation, IInnovation, IUpdateInnovationForm} from "@/types/Innovation";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {FileToFileList} from "@/utils/FIleToFileList";
import {InnovationsService} from "@/services/CMS.service";
import {toast} from "react-toastify";
import {Button, Input} from "@nextui-org/react";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import EditorWrapper from "@/components/EditorWrapper";
import {FileService} from "@/services/file.service";

type Props = {
    innovationsId: string
}

export type uploadType = {
    name: string,
    typeUpload: "server" | "uploaded",
    type: "file" | "image",
    file?:File,
    url: string,
}

const InnovationsEdit: FC<Props> = ({innovationsId}) =>{

    const {
        handleSubmit,
        control,
        formState,
        setValue,
    } = useForm<IUpdateInnovationForm>({
        mode: 'all',
        defaultValues: {
            title: '',
            text: '',
        }
    })

    const {status} = useSession()
    const $apiAuth = useAxiosAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [innovations, setInnovations] = useState<IInnovation>()
    const [files, setFiles] = useState<uploadType[]>([]);
    const [filesImage, setFilesImage] = useState<uploadType[]>([]);

    useEffect(() => {
        setIsLoading(true)
        InnovationsService.getInnovation(innovationsId).then(data => setInnovations(data))
            .catch(() => {
                toast.error('Не знайдено')
            })
            .finally(() => setIsLoading(false))
    }, [innovationsId]);

    useEffect(() => {
        if (innovations) {
            setValue('title', innovations.title)
            setValue('text', innovations.text)
            const serverFiles:uploadType[] = innovations.files.map(url => (
                {
                    name: renderName(url),
                    typeUpload: "server" as const,
                    type:'file',
                    url: url,
                }
            ));
            setFiles(serverFiles);
            const serverImage:uploadType[] = innovations.images.map(url => (
                {
                    name: renderName(url),
                    typeUpload: "server" as const,
                    type:'image' as const,
                    url: url,
                }
            ));
            setFilesImage(serverImage)
        }
    }, [innovations, setValue]);

    const renderName = (fileName: string): string => {
        return fileName.replace('/uploads/pdf/', '').replace('/uploads/image/', '');
    }

    const onSubmit: SubmitHandler<IUpdateInnovationForm> = async (dataForm) => {

        if (toast.isActive('toast-register') || status !== 'authenticated') {
            return;
        }
        setIsLoading(true)

        const processUpload = async (files:uploadType[], folder:string) => {
            const filteredFiles = files.filter(file => file.typeUpload === 'uploaded').map(file => file.file as File);
            if (filteredFiles.length === 0) return [];

            const paths = await FileService.upload($apiAuth, FileToFileList(filteredFiles), folder);
            if (paths.length === 0) {
                toast.error('Файли не збережені, щось не так.');
                setIsLoading(false);
                return [];
            }

            return paths.map(file => file.url);
        };

        try {

            const urlsDocs = await processUpload(files, 'pdf');
            const urlsImages = await processUpload(filesImage, 'image');

            const existingUrlDocs = files
                .filter(file => file.typeUpload === 'server')
                .map(file => file.url)

            const existingUrlImages = filesImage
                .filter(file => file.typeUpload === 'server')
                .map(file => file.url)

            // let urlsDocs: string[] = [];
            // if (uploadFiles.length > 0) {
            //     const filesPath = await FileService.upload($apiAuth, FileToFileList(uploadFiles), 'pdf');
            //     if (filesPath.length === 0) {
            //         toast.error('Файли не збережені, щось не так.');
            //         return;
            //     }
            //     urlsDocs = filesPath.map(file => file.url);
            // }
            //
            // let urlsImages: string[] = [];
            // if (uploadImages.length > 0) {
            //     const filesPath = await FileService.upload($apiAuth, FileToFileList(uploadImages), 'image');
            //     if (filesPath.length === 0) {
            //         toast.error('Файли не збережені, щось не так.');
            //         return;
            //     }
            //     urlsImages = filesPath.map(file => file.url);
            // }

            const dataProduct: ICreateInnovation = {
                title: dataForm.title,
                text: dataForm.text,
                files: [...existingUrlDocs, ...urlsDocs],
                images: [...existingUrlImages, ...urlsImages]
            };
            console.log(dataProduct)
            InnovationsService.updateInnovation(dataProduct, innovationsId, $apiAuth).then((status) => {
                if (status === 200) {
                    toast.success('Успішно створено')
                }
            })
        } catch (error) {
            console.log(error)
            toast.error('Щось пішло не так')
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpload = useCallback((uploadedFiles: File[], type: 'file' | 'image') => {
        const setter = type === 'file' ? setFiles : setFilesImage;
        const newFiles:uploadType[] = uploadedFiles.map(file => ({
            name: file.name,
            typeUpload: 'uploaded' as const,
            type: type,
            file,
            url: file.name
        }));
        setter(prev => [...prev, ...newFiles]);
    }, []);

    const handleRemove = useCallback((index: number, type: 'file' | 'image') => {
        const setter = type === 'file' ? setFiles : setFilesImage;
        setter(currentFiles => currentFiles.filter((_, fileIndex) => index !== fileIndex));
    }, []);


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
                                                        render={({field}) =>
                                                            <div className="w-full">
                                                                <div
                                                                    className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.files?.message ? 'text-red-600' : ''}`}>
                                                                    Завантаження документів
                                                                </div>
                                                                <DNDUpload onUpload={(files) => handleUpload(files, 'file')}
                                                                           onChange={field.onChange}
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
                                                <PreviewUpload files={files}
                                                               handleRemoveFile={(index) => handleRemove(index, 'file')}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex flex-row gap-4 w-full items-center">
                                        <div className="flex flex-col gap-4 w-full relative justify-end">
                                            <Controller name="images" control={control}
                                                        render={({field}) =>
                                                            <div className="w-full">
                                                                <div
                                                                    className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.files?.message ? 'text-red-600' : ''}`}>
                                                                    Завантаження зображень
                                                                </div>
                                                                <DNDUpload onUpload={(files) => handleUpload(files, 'image')}
                                                                           onChange={field.onChange}
                                                                           formats={[".png", ".jpeg", ".svg", ".jpg"]}
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
                                                <PreviewUpload files={filesImage}
                                                               type="image"
                                                               handleRemoveFile={(index) => handleRemove(index, 'image')}/>
                                            </div>
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
                                Створити
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default InnovationsEdit;