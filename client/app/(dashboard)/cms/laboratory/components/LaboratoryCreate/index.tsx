'use client'
import React, {useCallback, useState} from 'react'
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {LaboratoryDevelopService, LaboratoryService} from "@/services/CMS.service";
import {Button, Input} from "@nextui-org/react";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import EditorWrapper from "@/components/EditorWrapper";
import {FileService} from "@/services/file.service";
import {FileToFileList} from "@/utils/FIleToFileList";
import {uploadType} from "../../../innovations/components/InnovationsEdit";
import {ICreateLaboratory, ILaboratoryForm} from "@/types/Laboratory";
import Title from "@/UI/Title";
import CloseIcon from "@/UI/CloseIcon";
import {ICreateDevelopments} from "@/types/LaboratoryDevelopments";
import revalidateFetch from "@/services/revalidateFetch";
import {HandlerImageValidate} from "@/utils/ImageValidate";


const LaboratoryCreate = ({}) => {
    const {
        handleSubmit,
        control,
        formState,
        reset,
        getValues,
        setValue,
        watch,
        setError,
    } = useForm<ILaboratoryForm>({
        mode: 'all',
        defaultValues: {
            title: '',
            text: '',
        }
    })

    const {status} = useSession()
    const $apiAuth = useAxiosAuth()
    const [isLoading, setIsLoading] = useState(false)

    const {
        fields,
        append,
        remove,
    } = useFieldArray({control, name: "developments"});

    const [files, setFiles] = useState<uploadType[]>([]);
    const [filesImage, setFilesImage] = useState<uploadType[]>([]);
    const developments = watch("developments");


    const onSubmit: SubmitHandler<ILaboratoryForm> = async (dataForm) => {

        if (toast.isActive('toast-register') || status !== 'authenticated') {
            return;
        }
        setIsLoading(true)

        const processUpload = async (files: uploadType[], folder: string) => {
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
            setIsLoading(false)


            const urlsDocs = await processUpload(files, 'pdf');
            const urlsImages = await processUpload(filesImage, 'image');

            const dataProduct: ICreateLaboratory = {
                title: dataForm.title,
                text: dataForm.text,
                files: urlsDocs,
                images: urlsImages,
            };

            let laboratoryID: string | undefined;

            const {status, data} = await LaboratoryService.postLaboratory(dataProduct, $apiAuth)

            if (status === 201) {
                laboratoryID = data.id;
                await revalidateFetch('laboratory')
                reset()
                handlerReset()
                toast.success('Запис успішно створено')
            }


            if (laboratoryID) {
                let developments: ICreateDevelopments[] = []
                if (dataForm.developments && dataForm.developments.length > 0) {
                    for (const development of dataForm.developments) {
                        const devFilesUrls = await processUpload(development.files, 'pdf');
                        const devImagesUrls = await processUpload(development.images, 'image');
                        developments.push({
                            ...development,
                            files: devFilesUrls,
                            images: devImagesUrls,
                            laboratoryId: laboratoryID,
                        });
                    }
                }

                try {
                    for (const develop of developments) {
                        await LaboratoryDevelopService.postLaboratoryDevelop(develop, $apiAuth)
                    }
                    await revalidateFetch('laboratoryDevelopments')
                } catch (error) {
                    console.log(error)
                } finally {
                    handleRemoveDevelop()
                }

            }

        } catch (error) {
            console.log(error)
            toast.error('Щось пішло не так')
        } finally {
            setIsLoading(false)
        }

    }

    const handlerReset = () => {
        setFiles([])
        setFilesImage([])
    }

    const handleRemoveDevelop = () => {
        let indexDev: number[] = developments.map((_, i) => i);
        if (indexDev) {
            remove(indexDev);
        }
    }

    const handleUpload = useCallback(async (uploadedFiles: File[], type: 'file' | 'image') => {
        const setter = type === 'file' ? setFiles : setFilesImage;

        if (type === 'image') {
            try {
                for (const item of uploadedFiles) {
                    await HandlerImageValidate(item,
                        1920,
                        1080,
                        'Усі зображення мають бути 1920x1080')
                }
            } catch (error) {
                setError('images', {type: 'custom', message: error as string})
                return error as string
            }
        }

        const newFiles: uploadType[] = uploadedFiles.map(file => ({
            name: file.name,
            typeUpload: 'uploaded' as const,
            type: type,
            file,
            url: file.name
        }));

        setter(prev => [...prev, ...newFiles]);
    }, [setError]);

    const handleRemove = useCallback((index: number, type: 'file' | 'image') => {
        const setter = type === 'file' ? setFiles : setFilesImage;
        setter(currentFiles => currentFiles.filter((_, fileIndex) => index !== fileIndex));
    }, []);

    const handleUploadDynamic = useCallback((uploadedFiles: File[], type: 'file' | 'image', index: number) => {
        const newFiles: uploadType[] = uploadedFiles.map(file => ({
            name: file.name,
            typeUpload: 'uploaded' as const,
            type: type,
            file,
            url: file.name
        }));

        const types = type === 'file' ? "files" : "images"
        const currentFiles = getValues(`developments.${index}`);
        setValue(`developments.${index}`, {...currentFiles, [types]: [...currentFiles[types], ...newFiles]})
    }, [getValues, setValue]);

    const handleRemoveDynamic = useCallback((fileIndex: number, type: 'file' | 'image', index: number) => {
        const types = type === 'file' ? "files" : "images"
        const currentFiles = getValues(`developments.${index}`);
        const updatedFiles = currentFiles[types].filter((_, idx) => idx !== fileIndex);

        setValue(`developments.${index}`, {...currentFiles, [types]: updatedFiles})
    }, [getValues, setValue]);

    const handlerRemoveLab = (index: number) => {
        remove(index)
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
                                                                <DNDUpload
                                                                    onUpload={(files) => handleUpload(files, 'file')}
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

                                        <div className="flex flex-col gap-4 w-full relative justify-end">
                                            <Controller name="images" control={control}
                                                        rules={{
                                                            required: "Обов'язкове поле",
                                                        }}
                                                        render={({field}) =>
                                                            <div className="w-full">
                                                                <div
                                                                    className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.images?.message ? 'text-red-600' : ''}`}>
                                                                    Завантаження зображень
                                                                </div>
                                                                <DNDUpload
                                                                    onUpload={(files) => handleUpload(files, 'image')}
                                                                    onChange={field.onChange}
                                                                    formats={[".png", ".jpeg", ".jpg"]}
                                                                    styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed">
                                                                    Скинь мені файли
                                                                </DNDUpload>
                                                                {formState.errors.images?.message &&
                                                                    <div
                                                                        className="text-red-600 text-sm">{formState.errors.images.message}</div>}
                                                            </div>
                                                        }
                                            />
                                            <div className="w-full flex flex-col gap-4 items-start">
                                                <PreviewUpload files={filesImage}
                                                               type="image"
                                                               handleRemoveFile={(index) => handleRemove(index, 'image')}/>
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-center items-center">
                                            <Button
                                                onClick={() => append({
                                                    files: [],
                                                    images: [],
                                                    title: '',
                                                    text: ''
                                                })}
                                                className="px-6 bg-fd text-xl">
                                                Додати лабораторію
                                            </Button>
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


                    <div className="flex flex-wrap transition max-md:flex-col gap-8 max-lg:gap-4 justify-between">
                        {fields.map((item, idx) => (
                            <div key={item.id}
                                 className="rounded-[20px] transition w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
                                <div className="flex transition flex-col gap-4">
                                    <div className="w-full transition flex flex-col gap-4">
                                        <div className="flex transition flex-col gap-4 w-full">
                                            <div className="flex  w-full items-center justify-between gap-4">
                                                <Title text={`Лабораторія ${idx + 1}`}
                                                       style="text-[#111318] text-xl max-sm:text-base"
                                                />
                                                <span className="cursor-pointer"
                                                      onClick={() => handlerRemoveLab(idx)}>
                                                        <CloseIcon/>
                                                </span>
                                            </div>
                                            <Controller name={`developments.${idx}.title`} control={control} rules={{
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
                                                       isInvalid={!!formState.errors?.developments?.[idx]?.title?.message}
                                                       errorMessage={formState.errors?.developments?.[idx]?.title?.message}
                                                />
                                            }
                                            />
                                            <div className="flex flex-col gap-4 w-full relative justify-end">
                                                <Controller name={`developments.${idx}.files`} control={control}
                                                            render={() =>
                                                                <div className="w-full">
                                                                    <div
                                                                        className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors?.developments?.[idx]?.files?.message ? 'text-red-600' : ''}`}>
                                                                        Завантаження документів
                                                                    </div>
                                                                    <DNDUpload
                                                                        onUpload={(files) => handleUploadDynamic(files, 'file', idx)}
                                                                        styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed">
                                                                        Скинь мені файли
                                                                    </DNDUpload>
                                                                    {formState.errors?.developments?.[idx]?.files?.message &&
                                                                        <div
                                                                            className="text-red-600 text-sm">{formState.errors?.developments?.[idx]?.files?.message}</div>}
                                                                </div>
                                                            }
                                                />
                                                <div className="w-full flex flex-col gap-4 items-start">
                                                    <PreviewUpload files={developments?.[idx].files || []}
                                                                   handleRemoveFile={(index) => handleRemoveDynamic(index, 'file', idx)}/>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4 w-full relative justify-end">
                                                <Controller name={`developments.${idx}.images`} control={control}
                                                            render={() =>
                                                                <div className="w-full">
                                                                    <div
                                                                        className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors?.developments?.[idx]?.images?.message ? 'text-red-600' : ''}`}>
                                                                        Завантаження зображень
                                                                    </div>
                                                                    <DNDUpload
                                                                        onUpload={(files) => handleUploadDynamic(files, 'image', idx)}
                                                                        formats={[".png", ".jpeg", ".svg", ".jpg"]}
                                                                        styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed">
                                                                        Скинь мені файли
                                                                    </DNDUpload>
                                                                    {formState.errors?.developments?.[idx]?.images?.message &&
                                                                        <div
                                                                            className="text-red-600 text-sm">{formState.errors?.developments?.[idx]?.images?.message}</div>}
                                                                </div>
                                                            }
                                                />
                                                <div className="w-full flex flex-col gap-4 items-start">
                                                    <PreviewUpload files={developments?.[idx].images || []}
                                                                   type="image"
                                                                   handleRemoveFile={(fileIndex) => handleRemoveDynamic(fileIndex, 'image', idx)}/>
                                                </div>
                                            </div>
                                            <Controller name={`developments.${idx}.text`} control={control}
                                                        rules={{
                                                            required: 'Обов\'язкове поле',
                                                        }}
                                                        render={({field}) =>
                                                            <>
                                                                <div
                                                                    className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors?.developments?.[idx]?.text?.message ? 'text-red-600' : ''} after:content-['*'] after:text-[#F3005E] after:ml-0.5`}>
                                                                    Текст
                                                                </div>
                                                                <div className="relative transition-all w-full">
                                                                    <EditorWrapper onChange={(field.onChange)}
                                                                                   description={field.value}
                                                                                   placeholder={'Напишіть текст для слайдера'}
                                                                    />
                                                                </div>
                                                                {formState.errors?.developments?.[idx]?.text?.message &&
                                                                    <div
                                                                        className="text-red-600 text-sm">{formState.errors?.developments?.[idx]?.text?.message}</div>}
                                                            </>
                                                        }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LaboratoryCreate;
