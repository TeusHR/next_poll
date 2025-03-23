'use client'
import React, {useCallback, useRef, useState} from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { uploadType } from "../../../innovations/components/InnovationsEdit";
import { toast } from "react-toastify";
import { FileService } from "@/services/file.service";
import { FileToFileList } from "@/utils/FIleToFileList";
import revalidateFetch from "@/services/revalidateFetch";
import { Button, Input } from "@nextui-org/react";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import Title from "@/UI/Title";
import CloseIcon from "@/UI/CloseIcon";
import { Language } from "@/types/Language";
import {ICreatePageForm} from "@/types/PublicInformation";
import {useLocale} from "next-intl";
import {DocumentTemplates, PublicInformation} from "@/services/CMS.service";
import {ICreateDocumentsTemplates, IDocumentsTemplatesForm} from "@/types/DocumentsTemplates";


const DocumentsTemplatesCreateForm = () => {
    const { handleSubmit, control, formState, reset, getValues, setValue, watch, setError } = useForm<IDocumentsTemplatesForm>({
        mode: "all",
        defaultValues: {
            title: "",
        },
    });

    const { status } = useSession();
    const $apiAuth = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false);
    const language = useLocale();

    const { fields, append, remove } = useFieldArray({ control, name: "pages" });

    const [files, setFiles] = useState<uploadType[]>([]);
    const pages = watch("pages");

    const onSubmit: SubmitHandler<IDocumentsTemplatesForm> = async (dataForm) => {
        if (toast.isActive("toast-register") || status !== "authenticated") {
            return;
        }
        setIsLoading(true);

        const processUpload = async (files: uploadType[], folder: string) => {
            const filteredFiles = files.filter((file) => file.typeUpload === "uploaded").map((file) => file.file as File);
            if (filteredFiles.length === 0) return [];

            const paths = await FileService.upload($apiAuth, FileToFileList(filteredFiles), folder);
            if (paths.length === 0) {
                toast.error("Файли не збережені, щось не так.");
                setIsLoading(false);
                return [];
            }

            return paths.map((file) => file.url);
        };

        try {
            setIsLoading(false);
            const urlsDocs = await processUpload(files, "pdf");

            const dataProduct: ICreateDocumentsTemplates = {
                title: dataForm.title,
                files: urlsDocs,
                language: language.toUpperCase() as Language,
            };

            let pageID: string | undefined;

            const { status, data } = await DocumentTemplates.post(dataProduct, $apiAuth);

            if (status === 201) {
                pageID = data.id;
                await revalidateFetch("documents-templates");
                handlerReset();
                toast.success("Запис успішно створено");
            }

            if (pageID) {
                let pageFolder: ICreatePageForm[] = [];
                if (dataForm.pages && dataForm.pages.length > 0) {
                    for (const folder of dataForm.pages) {
                        const devFilesUrls = await processUpload(folder.files, "pdf");
                        pageFolder.push({
                            ...folder,
                            files: devFilesUrls,
                            documentsTemplatesId: pageID,
                        });
                    }
                }

                try {
                    for (const folder of pageFolder) {
                        await PublicInformation.postPage(folder, $apiAuth);
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    await revalidateFetch("documents-templates");
                    handleRemoveDevelop();
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Щось пішло не так");
        } finally {
            setIsLoading(false);
        }
    };

    const handlerReset = () => {
        if (editorRef.current) {
            editorRef.current.setContent('');
        }
        reset();
        setFiles([]);
    };

    const editorRef = useRef<{ setContent: (content: string) => void }>(null);

    const handleRemoveDevelop = () => {
        let indexDev: number[] = pages.map((_, i) => i);
        if (indexDev) {
            remove(indexDev);
        }
    };

    const handleUpload = useCallback(
        async (uploadedFiles: File[], type: "file" | "image") => {
            // if (type === 'image') {
            //     try {
            //         for (const item of uploadedFiles) {
            //             console.log(item)
            //             await HandlerImageValidate(item,
            //                 1080,
            //                 1920,
            //                 'Усі зображення мають бути 1920x1080')
            //         }
            //     } catch (error) {
            //         setError('images', {type: 'custom', message: error as string})
            //         return error as string
            //     }
            // }

            const newFiles: uploadType[] = uploadedFiles.map((file) => ({
                name: file.name,
                typeUpload: "uploaded" as const,
                type: type,
                file,
                url: file.name,
            }));

            setFiles((prev) => [...prev, ...newFiles]);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setError],
    );

    const handleRemove = useCallback((index: number, type: "file" | "image") => {
        setFiles((currentFiles) => currentFiles.filter((_, fileIndex) => index !== fileIndex));
    }, []);

    const handleUploadDynamic = useCallback(
        (uploadedFiles: File[], type: "files", index: number) => {
            const newFiles: uploadType[] = uploadedFiles.map((file) => ({
                name: file.name,
                typeUpload: "uploaded" as const,
                type: "file",
                file,
                url: file.name,
            }));

            const currentFiles = getValues(`pages.${index}`);
            setValue(`pages.${index}`, { ...currentFiles, [type]: [...currentFiles[type], ...newFiles] });
        },
        [getValues, setValue],
    );

    const handleRemoveDynamic = useCallback(
        (fileIndex: number, type: "files", index: number) => {
            const currentFiles = getValues(`pages.${index}`);
            const updatedFiles = currentFiles[type].filter((_, idx) => idx !== fileIndex);

            setValue(`pages.${index}`, { ...currentFiles, [type]: updatedFiles });
        },
        [getValues, setValue],
    );

    const handlerRemoveLab = (index: number) => {
        remove(index);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex gap-12 max-2xl:gap-4 flex-col">
                    <div className="flex flex-row max-md:flex-col gap-8 max-lg:gap-4 justify-between">
                        <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex flex-col gap-4 w-full">
                                        <Controller
                                            name="title"
                                            control={control}
                                            rules={{
                                                required: "Обов'язкове поле",
                                                minLength: { value: 3, message: "Мінімальна довжина 3 символи" },
                                                maxLength: { value: 500, message: "Максимальна довжина 500 символів" },
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    className="border-none py-2"
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
                                                    label="Назва сторінки"
                                                    labelPlacement="outside"
                                                    placeholder="Введіть назву"
                                                    autoComplete="off"
                                                    isInvalid={!!formState.errors.title?.message}
                                                    errorMessage={formState.errors.title?.message}
                                                />
                                            )}
                                        />
                                        <div className="flex flex-col gap-4 w-full relative justify-end">
                                            <Controller
                                                name="files"
                                                control={control}
                                                render={({ field }) => (
                                                    <div className="w-full">
                                                        <div
                                                            className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.files?.message ? "text-red-600" : ""}`}
                                                        >
                                                            Завантаження документів
                                                        </div>
                                                        <DNDUpload
                                                            onUpload={(files) => handleUpload(files, "file")}
                                                            onChange={field.onChange}
                                                            styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed"
                                                        >
                                                            Скинь мені файли
                                                        </DNDUpload>
                                                        {formState.errors.files?.message && (
                                                            <div className="text-red-600 text-sm">{formState.errors.files.message}</div>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                            <div className="w-full flex flex-col gap-4 items-start">
                                                <PreviewUpload files={files} handleRemoveFile={(index) => handleRemove(index, "file")} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-[max-content] gap-4 justify-center">
                                            <div className="flex justify-center items-center">
                                                <Button
                                                    onClick={() =>
                                                        append({
                                                            files: [],
                                                            title: "",
                                                        })
                                                    }
                                                    className="px-6 bg-fd text-xl w-full"
                                                >
                                                    Додати папку
                                                </Button>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <Button type={"submit"} isLoading={isLoading} className="px-6 bg-fd text-xl">
                                                    Створити сторінку
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap transition max-md:flex-col gap-8 max-lg:gap-4 justify-between">
                        {fields.map((item, idx) => (
                            <div
                                key={item.id}
                                className="rounded-[20px] transition w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4"
                            >
                                <div className="flex transition flex-col gap-4">
                                    <div className="w-full transition flex flex-col gap-4">
                                        <div className="flex transition flex-col gap-4 w-full">
                                            <div className="flex  w-full items-center justify-between gap-4">
                                                <Title text={`Папка ${idx + 1}`} style="text-[#111318] text-xl max-sm:text-base" />
                                                <span className="cursor-pointer" onClick={() => handlerRemoveLab(idx)}>
                          <CloseIcon />
                        </span>
                                            </div>
                                            <Controller
                                                name={`pages.${idx}.title`}
                                                control={control}
                                                rules={{
                                                    required: "Обов'язкове поле",
                                                    minLength: { value: 3, message: "Мінімальна довжина 3 символи" },
                                                    maxLength: { value: 500, message: "Максимальна довжина 500 символів" },
                                                }}
                                                render={({ field }) => (
                                                    <Input
                                                        className="border-none py-2"
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
                                                        isInvalid={!!formState.errors?.pages?.[idx]?.title?.message}
                                                        errorMessage={formState.errors?.pages?.[idx]?.title?.message}
                                                    />
                                                )}
                                            />
                                            <div className="flex flex-col gap-4 w-full relative justify-end">
                                                <Controller
                                                    name={`pages.${idx}.files`}
                                                    control={control}
                                                    render={() => (
                                                        <div className="w-full">
                                                            <div
                                                                className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors?.pages?.[idx]?.files?.message ? "text-red-600" : ""}`}
                                                            >
                                                                Завантаження документів
                                                            </div>
                                                            <DNDUpload
                                                                onUpload={(files) => handleUploadDynamic(files, "files", idx)}
                                                                styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed"
                                                            >
                                                                Скинь мені файли
                                                            </DNDUpload>
                                                            {formState.errors?.pages?.[idx]?.files?.message && (
                                                                <div className="text-red-600 text-sm">
                                                                    {formState.errors?.pages?.[idx]?.files?.message}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                                <div className="w-full flex flex-col gap-4 items-start">
                                                    <PreviewUpload
                                                        files={pages?.[idx].files || []}
                                                        handleRemoveFile={(index) => handleRemoveDynamic(index, "files", idx)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </>
    );
};

export default DocumentsTemplatesCreateForm;
