"use client";
import React, {FC, useCallback, useEffect, useState} from "react";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {FileToFileList} from "@/utils/FIleToFileList";
import {DocumentTemplates, PublicInformation} from "@/services/CMS.service";
import {toast} from "react-toastify";
import {Button, Input} from "@nextui-org/react";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import {FileService} from "@/services/file.service";
import {uploadType} from "../../../innovations/components/InnovationsEdit";
import Title from "@/UI/Title";
import CloseIcon from "@/UI/CloseIcon";
import {useLocale} from "next-intl";
import {
    ICreatePageForm,
    IPublicInformationPageForm
} from "@/types/PublicInformation";
import {Language} from "@/types/Language";
import revalidateFetch from "@/services/revalidateFetch";
import {ICreateDocumentsTemplates, IDocumentsTemplates, IDocumentsTemplatesForm} from "@/types/DocumentsTemplates";

type Props = {
    pageID: string;
};

const DocumentsTemplatesEdit: FC<Props> = ({pageID}) => {
    const {handleSubmit, control, formState, getValues, setValue, watch, setError} = useForm<IDocumentsTemplatesForm>({
        mode: "all",
        defaultValues: {
            title: "",
        },
    });

    const {fields, append, remove} = useFieldArray({control, name: "pages"});
    const pages = watch("pages");
    const language = useLocale()

    const {status} = useSession();
    const $apiAuth = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [pageFolders, setPageFolders] = useState<IDocumentsTemplates>();
    const [files, setFiles] = useState<uploadType[]>([]);

    useEffect(() => {
        setIsLoading(true);
        DocumentTemplates.get(pageID)
            .then((data) => {
                setPageFolders(data);
                console.log(data)
                setValue("title", data.title);
                const serverFiles: uploadType[] = data.files.map((url) => ({
                    name: renderName(url),
                    typeUpload: "server" as const,
                    type: "file",
                    url: url,
                }));
                setFiles(serverFiles);

                const pages: IPublicInformationPageForm[] = data.pages.map((folder) => ({
                    title: folder.title,
                    files: folder.files.map((url) => ({
                        name: renderName(url),
                        typeUpload: "server" as const,
                        type: "file" as const,
                        url: url,
                    })),
                }));
                setValue("pages", pages);
            })
            .catch(() => {
                toast.error("Не знайдено");
            })
            .finally(() => setIsLoading(false));
    }, [pageID, setValue]);

    const renderName = (fileName: string): string => {
        return fileName.replace("/uploads/pdf/", "").replace("/uploads/image/", "");
    };

    const onSubmit: SubmitHandler<IDocumentsTemplatesForm> = async (dataForm) => {
        if (toast.isActive("toast-register") || status !== "authenticated") {
            return;
        }

        // if (!isDataChanged(dataForm, pageFolders)) {
        //     toast.warning("Немає змін для оновлення");
        //     return;
        // }

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
            const urlsDocs = await processUpload(files, "pdf");

            const existingUrlDocs = files.filter((file) => file.typeUpload === "server").map((file) => file.url);

            const dataProduct: ICreateDocumentsTemplates = {
                title: dataForm.title,
                language: language.toUpperCase() as Language,
                files: [...existingUrlDocs, ...urlsDocs],
            };

            const status = await DocumentTemplates.update(dataProduct, pageID, $apiAuth);
            if (status === 200) {
                await revalidateFetch("documents-templates");
                toast.success("Запис оновлено");
            }

            let pages: ICreatePageForm[] = [];
            if (dataForm.pages && dataForm.pages.length > 0) {
                for (const folder of dataForm.pages) {
                    const devFilesUrls = await processUpload(folder.files, "pdf");

                    let existingUrlDevelopDocs = folder.files
                        .filter((file) => file.typeUpload === "server")
                        .map((file) => file.url);

                    pages.push({
                        ...folder,
                        files: [...existingUrlDevelopDocs, ...devFilesUrls],
                        documentsTemplatesId:pageID,
                    });
                }
            }

            try {
                if (pageFolders) {
                    for (const folder of pages) {
                        const idx = pages.indexOf(folder);

                        if (pageFolders.pages.length > pages.indexOf(folder)) {
                            await PublicInformation.updatePublicInformationPage(
                                folder,
                                pageFolders.pages[idx].id,
                                $apiAuth,
                            );
                        }
                        else {
                            const { status, data } = await PublicInformation.postPage(folder, $apiAuth);
                            if (status === 201 && data) {
                                setPageFolders((prevState) => {
                                    if (!prevState) return undefined;
                                    const newPages = [...prevState.pages, data];
                                    return {
                                        ...prevState,
                                        pages: newPages,
                                    };
                                });
                            }
                        }
                    }
                    await revalidateFetch("documents-templates");
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
            toast.error("Щось пішло не так");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = useCallback(
        async (uploadedFiles: File[], type: "file" | "image") => {
            const setter = setFiles;

            // if (type === 'image') {
            //     try {
            //         for (const item of uploadedFiles) {
            //             await HandlerImageValidate(item,
            //                 1920,
            //                 1080,
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

            setter((prev) => [...prev, ...newFiles]);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setError],
    );

    const handleRemove = useCallback((index: number, type: "file" | "image") => {
        setFiles((currentFiles) => currentFiles.filter((_, fileIndex) => index !== fileIndex));
    }, []);

    const handleUploadDynamic = useCallback(
        async (uploadedFiles: File[], type: "files", index: number) => {
            // if (type === 'image') {
            //     try {
            //         for (const item of uploadedFiles) {
            //             await HandlerImageValidate(item,
            //                 1920,
            //                 1080,
            //                 'Усі зображення мають бути 1920x1080')
            //         }
            //     } catch (error) {
            //         setError(`developments.${index}.images`, {type: 'custom', message: error as string})
            //         return error as string
            //     }
            // }

            const newFiles: uploadType[] = uploadedFiles.map((file) => ({
                name: file.name,
                typeUpload: "uploaded" as const,
                type: "file",
                file,
                url: file.name,
            }));

            const types = "files";
            const currentFiles = getValues(`pages.${index}`);
            setValue(`pages.${index}`, {...currentFiles, [types]: [...currentFiles[types], ...newFiles]});
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [getValues, setError, setValue],
    );

    const handleRemoveDynamic = useCallback(
        (fileIndex: number, type: "files", index: number) => {
            const types = "files";
            const currentFiles = getValues(`pages.${index}`);
            const updatedFiles = currentFiles[types].filter((_, idx) => idx !== fileIndex);

            setValue(`pages.${index}`, {...currentFiles, [types]: updatedFiles});
        },
        [getValues, setValue],
    );

    const handlerRemoveLab = async (index: number) => {
        remove(index);

        if (pageFolders) {
            const isFolder = pageFolders?.pages[index];
            if (isFolder) {
                await PublicInformation.removePublicInformationPage(isFolder.id, $apiAuth).then((status) => {
                    if (status) {
                        toast.success("Успішно видалено");
                        setPageFolders((prevState) => {
                            if (!prevState) return undefined;
                            const newPages = prevState.pages.filter((_, idx) => idx !== index);
                            return {
                                ...prevState,
                                pages: newPages,
                            };
                        });
                    }
                });
            }
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full">
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
                                                minLength: {value: 3, message: "Мінімальна довжина 3 символи"},
                                                maxLength: {value: 500, message: "Максимальна довжина 500 символів"},
                                            }}
                                            render={({field}) => (
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
                                                render={({field}) => (
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
                                                            <div
                                                                className="text-red-600 text-sm">{formState.errors.files.message}</div>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                            <div className="w-full flex flex-col gap-4 items-start">
                                                <PreviewUpload files={files}
                                                               handleRemoveFile={(index) => handleRemove(index, "file")}/>
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
                                                <Button type={"submit"} isLoading={isLoading}
                                                        className="px-6 bg-fd text-xl">
                                                    Оновити сторінку
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
                                                <Title text={`Папка ${idx + 1}`}
                                                       style="text-[#111318] text-xl max-sm:text-base"/>
                                                <span className="cursor-pointer" onClick={() => handlerRemoveLab(idx)}>
                          <CloseIcon/>
                        </span>
                                            </div>
                                            <Controller
                                                name={`pages.${idx}.title`}
                                                control={control}
                                                rules={{
                                                    required: "Обов'язкове поле",
                                                    minLength: {value: 3, message: "Мінімальна довжина 3 символи"},
                                                    maxLength: {
                                                        value: 500,
                                                        message: "Максимальна довжина 500 символів"
                                                    },
                                                }}
                                                render={({field}) => (
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
        </div>
    );
};

export default DocumentsTemplatesEdit;
