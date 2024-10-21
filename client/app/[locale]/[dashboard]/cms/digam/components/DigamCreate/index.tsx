'use client'
import React, {FC, useCallback, useEffect, useState} from 'react'
import {Control, Controller, FormState, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {Button, Image, Input} from "@nextui-org/react";
import EditorWrapper from "@/components/EditorWrapper";
import {loadPreviewImage} from "@/utils/ImageValidate";
import CloseIcon from "@/UI/CloseIcon";
import {uploadType} from "../../../innovations/components/InnovationsEdit";
import {
    ICreateDigam,
    ICreateDigamForm, ICreateForeignUniversities,
    IDigam,
    IForeignUniversitiesForm,
    IOrganizations,
    IOrganizationsForm
} from "@/types/Digam";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import Title from "@/UI/Title";
import {DigamService} from "@/services/CMS.service";
import {FileService} from "@/services/file.service";
import {FileToFileList} from "@/utils/FIleToFileList";
import revalidateFetch from "@/services/revalidateFetch";


type Props = {
    digam: IDigam | null
}

const DigamCreate: FC<Props> = ({digam}) => {
    const {
        handleSubmit,
        control,
        formState,
        setValue,
        setError,
        getValues,
    } = useForm<ICreateDigamForm>({
        mode: 'all',
        defaultValues: {
            text: '',
        }
    })

    const {
        fields,
        append,
        remove
    } = useFieldArray({control, name: "organizations"});

    const {
        fields: fieldsForeign,
        append: appendForeign,
        remove: removeForeign
    } = useFieldArray({control, name: "foreignUniversities"});

    const {status} = useSession()
    const $apiAuth = useAxiosAuth()
    const [isLoading, setIsLoading] = useState(false)

    const [files, setFiles] = useState<uploadType[]>([]);


    useEffect(() => {
        if (digam) {
            setValue('text', digam.text)
            const organizations: IOrganizationsForm[] = digam.organizations.map(organizations => (
                {
                    title: organizations.title,
                    link: organizations.link,
                    image: organizations.image,
                }
            ));
            setValue('organizations', organizations)

            const foreignUniversities: IForeignUniversitiesForm[] = Object.entries(digam.foreignUniversities).map(([country, universities]) => (
                {
                    country: country,
                    item: universities.map(university => ({
                            title: university.title,
                            description: university.description
                        })
                    )
                }
            ));
            setValue('foreignUniversities', foreignUniversities)

            const serverFiles: uploadType[] = digam.organizations.map(url => (
                {
                    name: renderName(url.image),
                    typeUpload: "server" as const,
                    type: "file",
                    url: url.image,
                }
            ));
            setFiles(serverFiles)
        }
    }, [digam, setValue]);

    const renderName = (fileName: string): string => {
        return fileName.replace('/uploads/pdf/', '').replace('/uploads/image/', '');
    }

    const onSubmit: SubmitHandler<ICreateDigamForm> = async (dataForm) => {

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

            const urlsImage = await processUpload(files, 'image');

            const existingUrlImages = files
                .filter(file => file.typeUpload === 'server')
                .map(file => file.url)

            const collection = [...existingUrlImages, ...urlsImage];
            const organizations: IOrganizations[] = dataForm.organizations.map((item, idx) => {
                return {
                    image: collection[idx],
                    title: item.title,
                    link: item.link,
                }
            })

            const foreignUniversities: ICreateForeignUniversities[] = dataForm.foreignUniversities
                .flatMap((foreign) => foreign.item
                    .map((item) => {
                        return {
                            description: item.description,
                            title: item.title,
                            country: foreign.country,
                        }
                    }))

            const dataProduct: ICreateDigam = {
                text: dataForm.text,
                organizations: organizations,
                foreignUniversities: foreignUniversities,
            };

            const status = await DigamService.postDigam(dataProduct, $apiAuth)

            if (status === 201) {
                await revalidateFetch('digam')
                toast.success('Дані оновлено')
            }
        } catch (error) {
            console.log(error)
            toast.error('Щось пішло не так')
        } finally {
            setIsLoading(false)
        }

    }

    const onUpload = async (files: File[], type: 'file' | 'image') => {
        try {
            // for (const item of files) {
            //     await HandlerImageValidate(item,
            //         1280,
            //         720,
            //         'Усі зображення мають бути 1280х720')
            // }

            const newFiles: uploadType[] = files.map(file => ({
                name: file.name,
                typeUpload: 'uploaded' as const,
                file,
                type,
                url: file.name
            }));

            setFiles(prev => [...prev, ...newFiles]);
        } catch (error) {
            setError('filesOrg', {type: 'custom', message: error as string})
            return error as string
        }

    };

    const handleRemoveFile = useCallback((index: number) => {
        setFiles((currentFiles) => currentFiles.filter((_, fileIndex) => index !== fileIndex));
        remove(index)
    }, [remove]);

    useEffect(() => {
        if (files.length > 0) {
            for (let i = 0; i < files.length - fields.length; i++) {
                append({image: '', title: '', link: ''})
            }
        }
    }, [append, fields.length, files]);

    const handlerRemoveForeign = async (index: number) => {
        removeForeign(index)
    }

    const handlerPushForeign = (countryIdx: number) => {
        const currentForeignUniversities = getValues('foreignUniversities');
        if (countryIdx >= 0 && countryIdx < currentForeignUniversities.length) {
            currentForeignUniversities[countryIdx].item.push({
                title: '',
                description: '',
            });
            setValue('foreignUniversities', currentForeignUniversities);
        }
    }


    return (
        <div className="flex flex-col gap-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-12 max-2xl:gap-4 flex-col">
                    <div className="flex flex-row max-md:flex-col gap-8 max-lg:gap-4 justify-between">
                        <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col md:max-w-[600px] gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex flex-col gap-4 w-full">
                                        <div className="flex flex-col gap-4 w-full relative justify-end">
                                            <Controller name="filesOrg" control={control}
                                                        render={({field}) =>
                                                            <div className="w-full">
                                                                <div
                                                                    className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.filesOrg?.message ? 'text-red-600' : ''}`}>
                                                                    Завантаження файлів
                                                                </div>
                                                                <DNDUpload onUpload={(files) => onUpload(files, 'file')}
                                                                           onChange={field.onChange}
                                                                           formats={[".png", ".jpeg", ".svg", ".jpg"]}
                                                                           styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed">
                                                                    Скинь мені файли
                                                                </DNDUpload>
                                                                {formState.errors.filesOrg?.message &&
                                                                    <div
                                                                        className="text-red-600 text-sm">{formState.errors.filesOrg.message}</div>}
                                                            </div>
                                                        }
                                            />
                                            <div className="w-full flex flex-col gap-4 items-start">
                                                <PreviewUpload files={files}
                                                               handleRemoveFile={(index) => handleRemoveFile(index)}/>
                                            </div>
                                            <div className="w-full flex justify-center items-center">
                                                <div>
                                                    <Button
                                                        onClick={() => appendForeign({
                                                            country: '',
                                                            item: [{
                                                                title: '',
                                                                description: '',
                                                            }],
                                                        })}
                                                        className="px-6 bg-fd text-base">
                                                        Додати співпрацю
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {fields.length > 0 &&
                            <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col gap-4">
                                {fields.map((item, idx) => (
                                    <div key={item.id} className="flex flex-col gap-4">
                                        <div className="w-full flex flex-col gap-4">
                                            <div className="flex flex-row gap-4 w-full items-center">
                                                <div className="w-[80px]">
                                                    <Image src={loadPreviewImage(files[idx]?.file) || files[idx].url}
                                                           alt="preview"/>
                                                </div>
                                                <div className="w-full">
                                                    <Controller name={`organizations.${idx}.title`}
                                                                control={control}
                                                                rules={{
                                                                    required: "Обов'язкове поле",
                                                                    minLength: {
                                                                        value: 3,
                                                                        message: "Мінімальна довжина 3 символи"
                                                                    },
                                                                    maxLength: {
                                                                        value: 500,
                                                                        message: "Максимальна довжина 500 символів"
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
                                                               key="title"
                                                               label="Назва"
                                                               labelPlacement="outside"
                                                               placeholder="Введіть назву"
                                                               autoComplete="off"
                                                               isInvalid={!!formState.errors?.organizations?.[idx]?.title?.message}
                                                               errorMessage={formState.errors?.organizations?.[idx]?.title?.message}
                                                        />
                                                    }
                                                    />
                                                    <Controller name={`organizations.${idx}.link`}
                                                                control={control}
                                                                rules={{
                                                                    required: "Обов'язкове поле",
                                                                    minLength: {
                                                                        value: 3,
                                                                        message: "Мінімальна довжина 3 символи"
                                                                    },
                                                                    maxLength: {
                                                                        value: 500,
                                                                        message: "Максимальна довжина 500 символів"
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
                                                               key="Link"
                                                               label="Посилання"
                                                               labelPlacement="outside"
                                                               placeholder="Введіть посилання"
                                                               autoComplete="off"
                                                               isInvalid={!!formState.errors?.organizations?.[idx]?.link?.message}
                                                               errorMessage={formState.errors?.organizations?.[idx]?.link?.message}
                                                        />
                                                    }
                                                    />
                                                </div>
                                                <span className="cursor-pointer pt-[20px]"
                                                      onClick={() => handleRemoveFile(idx)}>
                                                        <CloseIcon/>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>

                    <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col gap-4">
                        <div className="flex">
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-col gap-4 w-full">
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


                    <div className="flex flex-wrap transition max-md:flex-col gap-8 max-lg:gap-4 justify-between">
                        {fieldsForeign.map((item, idx) => (
                            <div key={`${item.id} - ${item.country} - ${idx}`}
                                 className="rounded-[20px] transition w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
                                <div className="flex transition flex-col gap-4">
                                    <div className="w-full transition flex flex-col gap-4">
                                        <div className="flex transition flex-col gap-6 w-full">
                                            <div className="flex  w-full items-center justify-between gap-4">
                                                <Title text={`Співробітництво ${idx + 1}`}
                                                       style="text-[#111318] text-xl max-sm:text-base"
                                                />
                                                <span className="cursor-pointer"
                                                      onClick={() => handlerRemoveForeign(idx)}>
                                        <CloseIcon/>
                                    </span>
                                            </div>
                                            <div className="flex flex-row gap-4 items-start justify-between">
                                                <Controller name={`foreignUniversities.${idx}.country`}
                                                            control={control}
                                                            rules={{
                                                                required: "Обов'язкове поле",
                                                                minLength: {
                                                                    value: 3,
                                                                    message: "Мінімальна довжина 3 символи"
                                                                },
                                                                maxLength: {
                                                                    value: 500,
                                                                    message: "Максимальна довжина 500 символів"
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
                                                           key="country"
                                                           label="Країна"
                                                           labelPlacement="outside"
                                                           placeholder="Введіть країну"
                                                           autoComplete="off"
                                                           isInvalid={!!formState.errors?.foreignUniversities?.[idx]?.country?.message}
                                                           errorMessage={formState.errors?.foreignUniversities?.[idx]?.country?.message}
                                                    />
                                                }
                                                />
                                                <div className="py-2 mt-6">
                                                    <Button onClick={() => handlerPushForeign(idx)}
                                                            className="bg-fd text-base">
                                                        Додати
                                                    </Button>
                                                </div>
                                            </div>
                                            <NestedFieldArray control={control}
                                                              formState={formState}
                                                              parentFieldIndex={idx}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>

                </div>
            </form>
        </div>
    )
}

type NestedFieldArrayProps = {
    control: Control<ICreateDigamForm, any>;
    formState: FormState<ICreateDigamForm>;
    parentFieldIndex: number;
};

function NestedFieldArray({
                              control,
                              formState,
                              parentFieldIndex
                          }: NestedFieldArrayProps) {

    const {
        fields,
        remove
    } = useFieldArray({
        control,
        name: `foreignUniversities.${parentFieldIndex}.item`
    });

    const handleRemoveForeignItem = (itemIdx: number) => {
        remove(itemIdx)
    };

    return (
        <>
            {fields.map((item, itemIdx) => (
                <div key={`${item.id}-${item.title}-${itemIdx}`}
                     className="flex flex-row gap-4 w-full items-center">
                    <div className="flex flex-col w-full">
                        <Controller
                            name={`foreignUniversities.${parentFieldIndex}.item.${itemIdx}.title`}
                            control={control}
                            rules={{
                                required: "Обов'язкове поле",
                                minLength: {
                                    value: 3,
                                    message: "Мінімальна довжина 3 символи"
                                },
                                maxLength: {
                                    value: 500,
                                    message: "Максимальна довжина 500 символів"
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
                                   key={`${itemIdx}-title`}
                                   label="Назва"
                                   labelPlacement="outside"
                                   placeholder="Введіть назву"
                                   autoComplete="off"
                                   isInvalid={!!formState.errors?.foreignUniversities?.[parentFieldIndex]?.item?.[itemIdx]?.title?.message}
                                   errorMessage={formState.errors?.foreignUniversities?.[parentFieldIndex]?.item?.[itemIdx]?.title?.message}
                            />
                        }
                        />
                        <Controller
                            name={`foreignUniversities.${parentFieldIndex}.item.${itemIdx}.description`}
                            control={control}
                            rules={{
                                required: "Обов'язкове поле",
                                minLength: {
                                    value: 3,
                                    message: "Мінімальна довжина 3 символи"
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
                                   key={`${itemIdx}-description`}
                                   label="Опис"
                                   labelPlacement="outside"
                                   placeholder="Введіть опис"
                                   autoComplete="off"
                                   isInvalid={!!formState.errors?.foreignUniversities?.[parentFieldIndex]?.item?.[itemIdx]?.description?.message}
                                   errorMessage={formState.errors?.foreignUniversities?.[parentFieldIndex]?.item?.[itemIdx]?.description?.message}
                            />
                        }
                        />
                    </div>
                    <span className="cursor-pointer pt-[20px]"
                          onClick={() => handleRemoveForeignItem(itemIdx)}>
                        <CloseIcon/>
                    </span>
                </div>
            ))}
        </>
    );
}

export default DigamCreate;
