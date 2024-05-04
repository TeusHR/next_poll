'use client'
import React, {FC, useCallback, useEffect, useState} from 'react'
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {
    IConsulting,
    ICreateConsulting,
    ICreateConsultingForm,
    ICreateTraining,
    ICreateTrainingForm,
    ITraining
} from "@/types/Consulting";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {Button, Image, Input} from "@nextui-org/react";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import EditorWrapper from "@/components/EditorWrapper";
import {HandlerImageValidate, loadPreviewImage} from "@/utils/ImageValidate";
import {ConsultingService, TrainingService} from "@/services/CMS.service";
import {FileService} from "@/services/file.service";
import {FileToFileList} from "@/utils/FIleToFileList";
import CloseIcon from "@/UI/CloseIcon";
import {uploadType} from "../../../innovations/components/InnovationsEdit";
import revalidateFetch from "@/services/revalidateFetch";
import Title from "@/UI/Title";

type Props = {
    consulting: IConsulting | undefined
    training: ITraining[]
}

export type filePath = { url: string, name: string }

const ConsultingCreate: FC<Props> = ({consulting, training}) => {
    const {
        handleSubmit,
        control,
        formState,
        setValue,
        setError,
        watch,
        getValues,
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

    const {
        fields: fieldsTraining,
        append: appendTraining,
        remove: removeTraining,
    } = useFieldArray({control, name: "training"});
    const trainingWatch = watch("training");

    const {status} = useSession()
    const $apiAuth = useAxiosAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [trainingsConsulting, setTrainingsConsulting] = useState<ITraining[]>(training)

    const [files, setFiles] = useState<uploadType[]>([]);

    useEffect(() => {
        if (consulting) {
            console.log(consulting)
            setValue('text', consulting.text)
            setValue('title', consulting.title)
            setValue('images', consulting.images)
            const serverFiles: uploadType[] = consulting.images.map(url => (
                {
                    name: renderFileName(url.image),
                    typeUpload: "server" as const,
                    type: "file",
                    url: url.image,
                }
            ));
            setFiles(serverFiles);
            if (training) {
                console.log(training)
                const trainingForm: ICreateTrainingForm[] = training.map(train => (
                    {
                        text: train.text,
                        title: train.title,
                        images: train.images.map(url => (
                            {
                                name: renderFileName(url),
                                typeUpload: "server" as const,
                                type: 'file' as const,
                                url: url,
                            }
                        )),
                        files: train.files.map(url => (
                            {
                                name: renderFileName(url),
                                typeUpload: "server" as const,
                                type: 'file' as const,
                                url: url,
                            }
                        )),
                    }
                ));
                setValue('training', trainingForm)
                setTrainingsConsulting(training)
            }
        }
    }, [consulting, setValue, training]);

    const renderFileName = (fileName: string): string => {
        return fileName.replace('/uploads/pdf/', '').replace('/uploads/image/', '');
    }

    const onSubmit: SubmitHandler<ICreateConsultingForm> = async (dataForm) => {

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
            const uploadFiles = files.filter(file => file.typeUpload === 'uploaded').map(file => file.file as File);

            const filesPath = uploadFiles.length > 0
                ? await FileService.upload($apiAuth, FileToFileList(uploadFiles), 'image')
                : [];

            if (filesPath.length === 0 && uploadFiles.length > 0) {
                toast.error('Файли не збережені, щось не так.');
                setIsLoading(false);
                return;
            }

            const serverUploadedFiles = files.filter(file => file.typeUpload === 'server').map(file => file)
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


            let trainings: ICreateTraining[] = []
            if (dataForm.training && dataForm.training.length > 0) {
                for (const training of dataForm.training) {
                    const devFilesUrls = await processUpload(training.files, 'pdf');
                    const devImagesUrls = await processUpload(training.images, 'image');

                    let existingUrlDevelopDocs = training.files
                        .filter(file => file.typeUpload === 'server')
                        .map(file => file.url)

                    let existingUrlDevelopImages = training.images
                        .filter(file => file.typeUpload === 'server')
                        .map(file => file.url)


                    trainings.push({
                        ...training,
                        files: [...existingUrlDevelopDocs, ...devFilesUrls],
                        images: [...existingUrlDevelopImages, ...devImagesUrls],
                    });
                }
            }

            try {
                if (trainingsConsulting) {
                    for (const train of trainings) {
                        const idx = trainings.indexOf(train)

                        if (trainingsConsulting.length > idx)
                            await TrainingService.updateTraining(train, trainingsConsulting[idx].id, $apiAuth)
                        else {
                            const {status, data} = await TrainingService.postTraining(train, $apiAuth);
                            if (status === 201 && data) {
                                setTrainingsConsulting(prevState => [...prevState, data]);
                            }
                        }

                    }
                    await revalidateFetch('training')
                }
            } catch (error) {
                console.log(error)
            }

        } catch (error) {
            console.log(error)
            toast.error('Щось пішло не так')
        } finally {
            setIsLoading(false)
        }

    }

    const createImagesList = (filesPath: filePath[], dataForm: ICreateConsultingForm, serverUploadedFiles: uploadType[]) => {
        const images = filesPath.map((file, i) => ({
            image: file.url,
            description: dataForm.images[serverUploadedFiles.length + i].description
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

    const handlerRemoveLab = async (index: number) => {
        removeTraining(index)

        if (training) {
            const isDevelop = training[index]

            if (isDevelop) {
                await TrainingService.removeTraining(isDevelop.id, $apiAuth).then((status) => {
                    if (status) {
                        toast.success('Успішно видалено')
                        setTrainingsConsulting(prevState => {
                            const newDevelopments = prevState.filter((_, idx) => idx !== index);
                            return {
                                ...prevState,
                                newDevelopments
                            };
                        });
                    }
                })
            }
        }
    }

    const handleRemoveDynamic = useCallback((fileIndex: number, type: 'file' | 'image', index: number) => {
        const types = type === 'file' ? "files" : "images"
        const currentFiles = getValues(`training.${index}`);
        const updatedFiles = currentFiles[types].filter((_, idx) => idx !== fileIndex);

        setValue(`training.${index}`, {...currentFiles, [types]: updatedFiles})
    }, [getValues, setValue]);

    const handleUploadDynamic = useCallback(async (uploadedFiles: File[], type: 'file' | 'image', index: number) => {
        if (type === 'image') {
            try {
                for (const item of uploadedFiles) {
                    await HandlerImageValidate(item,
                        1920,
                        1080,
                        'Усі зображення мають бути 1920x1080')
                }
            } catch (error) {
                setError(`training.${index}.images`, {type: 'custom', message: error as string})
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

        const types = type === 'file' ? "files" : "images"
        const currentFiles = getValues(`training.${index}`);
        setValue(`training.${index}`, {...currentFiles, [types]: [...currentFiles[types], ...newFiles]})
    }, [getValues, setError, setValue]);

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
                                                                    Завантаження файлів
                                                                </div>
                                                                <DNDUpload
                                                                    onUpload={(files) => onUpload(files, 'image')}
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
                                                <PreviewUpload files={files}
                                                               handleRemoveFile={(index) => handleRemoveFile(index, 'file')}/>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-center items-center">
                                            <Button
                                                onClick={() => appendTraining({
                                                    files: [],
                                                    images: [],
                                                    title: '',
                                                    text: ''
                                                })}
                                                className="px-6 bg-fd text-xl">
                                                Додати тренування
                                            </Button>
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

                    <div className="flex flex-wrap transition max-md:flex-col gap-8 max-lg:gap-4 justify-between">
                        {fieldsTraining.map((item, idx) => (
                            <div key={item.id}
                                 className="rounded-[20px] transition w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
                                <div className="flex transition flex-col gap-4">
                                    <div className="w-full transition flex flex-col gap-4">
                                        <div className="flex transition flex-col gap-4 w-full">
                                            <div className="flex  w-full items-center justify-between gap-4">
                                                <Title text={`Тренування ${idx + 1}`}
                                                       style="text-[#111318] text-xl max-sm:text-base"
                                                />
                                                <span className="cursor-pointer"
                                                      onClick={() => handlerRemoveLab(idx)}>
                                                        <CloseIcon/>
                                                </span>
                                            </div>
                                            <Controller name={`training.${idx}.title`} control={control} rules={{
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
                                                       isInvalid={!!formState.errors?.training?.[idx]?.title?.message}
                                                       errorMessage={formState.errors?.training?.[idx]?.title?.message}
                                                />
                                            }
                                            />
                                            <div className="flex flex-col gap-4 w-full relative justify-end">
                                                <Controller name={`training.${idx}.files`} control={control}
                                                            render={() =>
                                                                <div className="w-full">
                                                                    <div
                                                                        className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors?.training?.[idx]?.files?.message ? 'text-red-600' : ''}`}>
                                                                        Завантаження документів
                                                                    </div>
                                                                    <DNDUpload
                                                                        onUpload={(files) => handleUploadDynamic(files, 'file', idx)}
                                                                        styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed">
                                                                        Скинь мені файли
                                                                    </DNDUpload>
                                                                    {formState.errors?.training?.[idx]?.files?.message &&
                                                                        <div
                                                                            className="text-red-600 text-sm">{formState.errors?.training?.[idx]?.files?.message}</div>}
                                                                </div>
                                                            }
                                                />
                                                <div className="w-full flex flex-col gap-4 items-start">
                                                    <PreviewUpload files={trainingWatch?.[idx].files || []}
                                                                   handleRemoveFile={(index) => handleRemoveDynamic(index, 'file', idx)}/>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-4 w-full relative justify-end">
                                                <Controller name={`training.${idx}.images`} control={control}
                                                            render={() =>
                                                                <div className="w-full">
                                                                    <div
                                                                        className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors?.training?.[idx]?.images?.message ? 'text-red-600' : ''}`}>
                                                                        Завантаження зображень
                                                                    </div>
                                                                    <DNDUpload
                                                                        onUpload={(files) => handleUploadDynamic(files, 'image', idx)}
                                                                        formats={[".png", ".jpeg", ".svg", ".jpg"]}
                                                                        styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed">
                                                                        Скинь мені файли
                                                                    </DNDUpload>
                                                                    {formState.errors?.training?.[idx]?.images?.message &&
                                                                        <div
                                                                            className="text-red-600 text-sm">{formState.errors?.training?.[idx]?.images?.message}</div>}
                                                                </div>
                                                            }
                                                />
                                                <div className="w-full flex flex-col gap-4 items-start">
                                                    <PreviewUpload files={trainingWatch?.[idx].images || []}
                                                                   type="image"
                                                                   handleRemoveFile={(fileIndex) => handleRemoveDynamic(fileIndex, 'image', idx)}/>
                                                </div>
                                            </div>
                                            <Controller name={`training.${idx}.text`} control={control}
                                                        rules={{
                                                            required: 'Обов\'язкове поле',
                                                        }}
                                                        render={({field}) =>
                                                            <>
                                                                <div
                                                                    className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors?.training?.[idx]?.text?.message ? 'text-red-600' : ''} after:content-['*'] after:text-[#F3005E] after:ml-0.5`}>
                                                                    Текст
                                                                </div>
                                                                <div className="relative transition-all w-full">
                                                                    <EditorWrapper onChange={(field.onChange)}
                                                                                   description={field.value}
                                                                                   placeholder={'Напишіть текст для слайдера'}
                                                                    />
                                                                </div>
                                                                {formState.errors?.training?.[idx]?.text?.message &&
                                                                    <div
                                                                        className="text-red-600 text-sm">{formState.errors?.training?.[idx]?.text?.message}</div>}
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

export default ConsultingCreate;
