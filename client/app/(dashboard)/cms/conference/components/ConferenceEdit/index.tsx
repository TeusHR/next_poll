'use client'
import React, {FC, useCallback, useEffect, useState} from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IConferences, ICreateConferences, UpdateConferenceForm} from "@/types/Conference";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {ConferencesService} from "@/services/CMS.service";
import {FileService} from "@/services/file.service";
import moment from "moment";
import {Button, Input} from "@nextui-org/react";
import Select from "@/components/CMS/Select";
import {typeConference} from "@/utils/ConferenceType";
import {countryOptions} from "@/utils/CountrySet";
import DNDUpload from "components/DNDFiles";
import EditorWrapper from "@/components/EditorWrapper";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import {FileToFileList} from "@/utils/FIleToFileList";
import {uploadType} from "../../../innovations/components/InnovationsEdit";

type Props = {
    conferenceId: string
}

const ConferenceEdit: FC<Props> = ({conferenceId}) => {

    const {
        handleSubmit,
        control,
        formState,
        setValue,
    } = useForm<UpdateConferenceForm>({
        mode: 'all',
        defaultValues: {
            title: '',
            country: new Set<string>(),
            date: '',
            text: '',
            type: new Set<string>(),
        }
    })

    const {status} = useSession()
    const $apiAuth = useAxiosAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [conference, setConference] = useState<IConferences>()
    const [files, setFiles] = useState<uploadType[]>([]);

    useEffect(() => {
        setIsLoading(true)
        ConferencesService.getConference(conferenceId).then(data => setConference(data))
            .catch(() => {
                toast.error('Конференцію не знайдено')
            })
            .finally(() => setIsLoading(false))
    }, [conferenceId]);

    const renderFileName = (fileName: string): string => {
        return fileName.replace('/uploads/pdf/', '');
    }

    useEffect(() => {
        if (conference) {
            setValue('title', conference.title)
            setValue('country', new Set([conference.country]))
            setValue('type', new Set([conference.type]))
            setValue('date', moment(conference.date).format('YYYY-MM-DD'))
            setValue('text', conference.text)
            const serverFiles:uploadType[] = conference.files.map(url => (
                {
                    name: renderFileName(url),
                    typeUpload: "server" as const,
                    type:'file',
                    url: url,
                }
            ));
            setFiles(serverFiles);
        }
    }, [conference, setValue]);

    const onSubmit: SubmitHandler<UpdateConferenceForm> = async (dataForm) => {

        if (toast.isActive('toast-register') || status !== 'authenticated') {
            return;
        }
        setIsLoading(true)

        try {
            let filesPath: {
                url: string,
                name: string
            }[] = []

            let newFilesUrls: string[] = []


            const uploadFiles = files.filter(file => file.typeUpload === 'uploaded').map(file => file.file as File);

            if (uploadFiles.length > 0) {
                filesPath = await FileService.upload($apiAuth, FileToFileList(uploadFiles), 'pdf')
                if (filesPath.length > 0)
                    newFilesUrls = filesPath.map(file => file.url);
                else
                    toast.error('Файли не збережені, щось не так.');
            }

            const existingFilesUrls = files
                .filter(file => file.typeUpload === 'server')
                .map(file => file.url)

            const allFilesUrls = [...newFilesUrls, ...existingFilesUrls];

            const dataProduct: ICreateConferences = {
                type: Array.from(dataForm.type).toString(),
                country: Array.from(dataForm.country).toString(),
                date: moment(dataForm.date).format(),
                title: dataForm.title,
                text: dataForm.text,
                files: allFilesUrls,
            };
            ConferencesService.updateConferences(dataProduct, conferenceId, $apiAuth).then((status) => {
                if (status === 200)
                    toast.success('Конференцію успішно створено')
            })
        } catch (error) {
            console.log(error)
            toast.error('Щось пішло не так')
        } finally {
            setIsLoading(false)
        }
    }

    const onUpload = (files: File[], type: 'file' | 'image') => {
        const newFiles:uploadType[] = files.map(file => ({
            name: file.name,
            typeUpload: 'uploaded' as const,
            type: type,
            file,
            url: file.name
        }));
        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleRemoveFile = useCallback((index: number) => {
        setFiles((currentFiles) => currentFiles.filter((_, fileIndex) => index !== fileIndex));
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
                                    <div
                                        className="flex flex-row max-sm:flex-col gap-4 w-full relative justify-between">
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
                                        <Controller name="date" control={control}
                                                    rules={{
                                                        required: "Обов'язкове поле",
                                                    }}
                                                    render={({field}) =>
                                                        <Input className="border-none py-2"
                                                               type="date"
                                                               value={field.value}
                                                               onValueChange={field.onChange}
                                                               isRequired
                                                               lang="ua-UA"
                                                               classNames={{
                                                                   inputWrapper: "border-1 border-primary-500",
                                                                   input: "focus:outline-none text-base text-primary",
                                                                   errorMessage: "text-red-600 text-sm",
                                                                   label: "text-base",
                                                               }}
                                                               key="date"
                                                               label="Дата"
                                                               labelPlacement="outside"
                                                               placeholder="Введіть дату"
                                                               autoComplete="off"
                                                               isInvalid={!!formState.errors.date?.message}
                                                               errorMessage={formState.errors.date?.message}
                                                        />
                                                    }
                                        />
                                    </div>
                                    <div
                                        className="flex flex-row max-sm:flex-col gap-4 w-full relative justify-between">
                                        <Controller name="type" control={control} rules={{
                                            required: 'Обов\'язкове поле',
                                            validate: value => value.size === 0 ? 'Обов\'язкове поле' : true
                                        }} render={({field}) =>
                                            <div className="w-full">
                                                <div
                                                    className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.type?.message ? 'text-red-600' : ''} after:content-['*'] after:text-[#F3005E] after:ml-0.5`}>Тип
                                                </div>
                                                <Select options={typeConference.map(item => ({
                                                    label: item.label,
                                                    value: item.value
                                                }))}
                                                        selectionMode={'single'}
                                                        justify
                                                        disabled={false}
                                                        selected={field.value}
                                                        onChange={field.onChange}/>
                                                {formState.errors.type?.message &&
                                                    <div
                                                        className="text-red-600 text-sm">{formState.errors.type.message}</div>}
                                            </div>
                                        }
                                        />
                                        <Controller name="country" control={control} rules={{
                                            required: 'Обов\'язкове поле',
                                            validate: value => value.size === 0 ? 'Обов\'язкове поле' : true
                                        }} render={({field}) =>
                                            <div className="w-full">
                                                <div
                                                    className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.country?.message ? 'text-red-600' : ''} after:content-['*'] after:text-[#F3005E] after:ml-0.5`}>
                                                    Країна
                                                </div>
                                                <Select options={countryOptions.map(item => ({
                                                    label: item.label,
                                                    value: item.value
                                                }))}
                                                        selectionMode={'single'}
                                                        justify
                                                        isSearchable
                                                        disabled={false}
                                                        selected={field.value}
                                                        onChange={field.onChange}/>
                                                {formState.errors.country?.message &&
                                                    <div
                                                        className="text-red-600 text-sm">{formState.errors.country.message}</div>}
                                            </div>
                                        }
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4 w-full relative">
                                    <div className="flex flex-col gap-4 w-full relative justify-end">
                                        <Controller name="files" control={control}
                                                    render={({field}) =>
                                                        <div className="w-full">
                                                            <div
                                                                className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.files?.message ? 'text-red-600' : ''}`}>
                                                                Завантаження файлів
                                                            </div>
                                                            <DNDUpload onUpload={(files) => onUpload(files, 'file')}
                                                                       onChange={field.onChange}
                                                                       styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed">
                                                                Гей, скинь мені файли
                                                            </DNDUpload>
                                                            {formState.errors.files?.message &&
                                                                <div
                                                                    className="text-red-600 text-sm">{formState.errors.files.message}</div>}
                                                        </div>
                                                    }
                                        />
                                        <div className="w-full flex flex-col gap-4 items-start">
                                            <PreviewUpload files={files} handleRemoveFile={handleRemoveFile}/>
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
                                    disabled={!conference}
                                    disableAnimation={!conference}
                                    className={`px-6 ${!conference ? 'bg-gray-400' : 'bg-fd'} text-xl`}>
                                Оновити
                            </Button>
                        </div>
                    </div>

                </div>
            </form>
            {/*{!missArticle && <PreviewProduct product={productPreview}/>}*/}
        </div>
    )
}

export default ConferenceEdit;