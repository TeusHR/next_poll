"use client";
import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {ScienceCompetitionService} from "@/services/CMS.service";
import {FileService} from "@/services/file.service";
import moment from "moment";
import {Button, Checkbox, Input} from "@nextui-org/react";
import Select from "@/components/CMS/Select";
import {typeConference} from "@/utils/ConferenceType";
import {countryOptions} from "@/utils/CountrySet";
import DNDUpload from "components/DNDFiles";
import EditorWrapper from "@/components/EditorWrapper";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import {FileToFileList} from "@/utils/FIleToFileList";
import {uploadType} from "../../../innovations/components/InnovationsEdit";
import revalidateFetch from "@/services/revalidateFetch";
import {IScienceCompetition, IUpdateScienceCompetition, UpdateScienceCompetitionForm} from "@/types/ScienceCompetition";

type Props = {
    idItem: string;
};

const ScienceCompetitionEdit: FC<Props> = ({idItem}) => {
    const {handleSubmit, control, formState, setValue} = useForm<UpdateScienceCompetitionForm>({
        mode: "all",
        defaultValues: {
            title: "",
            country: new Set<string>(),
            date: "",
            toDate: "",
            text: "",
            isStudent:false,
            type: new Set<string>(),
        },
    });

    const {status} = useSession();

    const $apiAuth = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [science, setScience] = useState<IScienceCompetition>();
    const [files, setFiles] = useState<uploadType[]>([]);

    useEffect(() => {
        setIsLoading(true);
        ScienceCompetitionService.get(idItem)
            .then((data) => setScience(data))
            .catch(() => {
                toast.error("Не знайдено");
            })
            .finally(() => setIsLoading(false));
    }, [idItem]);

    const renderFileName = (fileName: string): string => {
        return fileName.replace("/uploads/pdf/", "");
    };

    const onSubmit: SubmitHandler<UpdateScienceCompetitionForm> = async (dataForm) => {
        if (toast.isActive("toast-register") || status !== "authenticated") {
            return;
        }
        setIsLoading(true);

        try {
            let filesPath: {
                url: string;
                name: string;
            }[] = [];

            let newFilesUrls: string[] = [];

            const uploadFiles = files.filter((file) => file.typeUpload === "uploaded").map((file) => file.file as File);

            if (uploadFiles.length > 0) {
                filesPath = await FileService.upload($apiAuth, FileToFileList(uploadFiles), "pdf");
                if (filesPath.length > 0) newFilesUrls = filesPath.map((file) => file.url);
                else toast.error("Файли не збережені, щось не так.");
            }

            const existingFilesUrls = files.filter((file) => file.typeUpload === "server").map((file) => file.url);

            const allFilesUrls = [...newFilesUrls, ...existingFilesUrls];

            const dataProduct: IUpdateScienceCompetition = {
                type: Array.from(dataForm.type).toString(),
                country: Array.from(dataForm.country).toString(),
                date: moment(dataForm.date).format(),
                toDate: dataForm.toDate ? moment(dataForm.toDate).format() : undefined,
                title: dataForm.title,
                text: dataForm.text,
                isStudent:dataForm.isStudent,
                files: allFilesUrls,
            };
            const status = await ScienceCompetitionService.update(dataProduct, idItem, $apiAuth);
            if (status === 200) {
                await revalidateFetch("science-competition");
                toast.success("Запис оновлено");
            }
        } catch (error) {
            console.log(error);
            toast.error("Щось пішло не так");
        } finally {
            setIsLoading(false);
        }
    };

    const onUpload = (files: File[], type: "file" | "image") => {
        const newFiles: uploadType[] = files.map((file) => ({
            name: file.name,
            typeUpload: "uploaded" as const,
            type: type,
            file,
            url: file.name,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleRemoveFile = useCallback((index: number) => {
        setFiles((currentFiles) => currentFiles.filter((_, fileIndex) => index !== fileIndex));
    }, []);

    const setEditorContent = useCallback((text: string) => {
        if (editorRef.current) {
            editorRef.current.setContent(text);
        }
    }, []);

    const editorRef = useRef<{ setContent: (content: string) => void }>(null);

    useEffect(() => {
        if (science) {
            setValue("title", science.title);
            setValue("country", new Set([science.country]));
            setValue("type", new Set([science.type]));
            setValue("isStudent", science.isStudent)
            if (science.dateISO) setValue("date", moment(science.dateISO).format("YYYY-MM-DD"));
            if (science.toDateISO) setValue("toDate", moment(science.toDateISO).format("YYYY-MM-DD"));
            setValue("text", science.text);
            setEditorContent(science.text);
            const serverFiles: uploadType[] = science.files.map((url) => ({
                name: renderFileName(url),
                typeUpload: "server" as const,
                type: "file",
                url: url,
            }));
            setFiles(serverFiles);
        }
    }, [science, setEditorContent, setValue]);

    return (
        <div className="flex flex-col gap-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-12 max-2xl:gap-4 flex-col">
                    <div className="rounded-[20px] bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-col gap-4 w-full">
                                    <div>
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
                                                    label="Назва"
                                                    labelPlacement="outside"
                                                    placeholder="Введіть назву"
                                                    autoComplete="off"
                                                    isInvalid={!!formState.errors.title?.message}
                                                    errorMessage={formState.errors.title?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div
                                        className="flex flex-row max-sm:flex-col gap-4 w-full relative justify-between">
                                        <Controller
                                            name="date"
                                            control={control}
                                            rules={{
                                                required: "Обов'язкове поле",
                                            }}
                                            render={({field}) => (
                                                <Input
                                                    className="border-none py-2"
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
                                                    label="Дата з"
                                                    labelPlacement="outside"
                                                    placeholder="Введіть дату"
                                                    autoComplete="off"
                                                    isInvalid={!!formState.errors.date?.message}
                                                    errorMessage={formState.errors.date?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="toDate"
                                            control={control}
                                            rules={{
                                                validate: (value, formValues) =>
                                                    !value
                                                        ? true
                                                        : moment(value).isAfter(formValues.date)
                                                            ? true
                                                            : "Дата кінця має бути пізніше за дату початку",
                                            }}
                                            render={({field}) => (
                                                <Input
                                                    className="border-none py-2"
                                                    type="date"
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    lang="ua-UA"
                                                    classNames={{
                                                        inputWrapper: "border-1 border-primary-500",
                                                        input: "focus:outline-none text-base text-primary",
                                                        errorMessage: "text-red-600 text-sm",
                                                        label: "text-base",
                                                    }}
                                                    key="date"
                                                    label="Дата по"
                                                    labelPlacement="outside"
                                                    placeholder="Введіть дату"
                                                    autoComplete="off"
                                                    isInvalid={!!formState.errors.toDate?.message}
                                                    errorMessage={formState.errors.toDate?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div
                                        className="flex flex-row max-sm:flex-col gap-4 w-full relative justify-between">
                                        <Controller
                                            name="type"
                                            control={control}
                                            rules={{
                                                required: "Обов'язкове поле",
                                                validate: (value) => (value.size === 0 ? "Обов'язкове поле" : true),
                                            }}
                                            render={({field}) => (
                                                <div className="w-full">
                                                    <div
                                                        className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.type?.message ? "text-red-600" : ""} after:content-['*'] after:text-[#F3005E] after:ml-0.5`}
                                                    >
                                                        Тип
                                                    </div>
                                                    <Select
                                                        options={typeConference.map((item) => ({
                                                            label: item.label,
                                                            value: item.value,
                                                        }))}
                                                        selectionMode={"single"}
                                                        justify
                                                        disabled={true}
                                                        selected={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                    {formState.errors.type?.message && (
                                                        <div
                                                            className="text-red-600 text-sm">{formState.errors.type.message}</div>
                                                    )}
                                                </div>
                                            )}
                                        />
                                        <Controller
                                            name="country"
                                            control={control}
                                            rules={{
                                                required: "Обов'язкове поле",
                                                validate: (value) => (value.size === 0 ? "Обов'язкове поле" : true),
                                            }}
                                            render={({field}) => (
                                                <div className="w-full">
                                                    <div
                                                        className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.country?.message ? "text-red-600" : ""} after:content-['*'] after:text-[#F3005E] after:ml-0.5`}
                                                    >
                                                        Країна
                                                    </div>
                                                    <Select
                                                        options={countryOptions.map((item) => ({
                                                            label: item.label,
                                                            value: item.value,
                                                        }))}
                                                        selectionMode={"single"}
                                                        justify
                                                        isSearchable
                                                        disabled={false}
                                                        selected={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                    {formState.errors.country?.message && (
                                                        <div
                                                            className="text-red-600 text-sm">{formState.errors.country.message}</div>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4 w-full relative">
                                    <div className="flex flex-col gap-4 w-full relative justify-end">
                                        <Controller
                                            name="files"
                                            control={control}
                                            render={({field}) => (
                                                <div className="w-full">
                                                    <div
                                                        className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.files?.message ? "text-red-600" : ""}`}
                                                    >
                                                        Завантаження файлів
                                                    </div>
                                                    <DNDUpload
                                                        onUpload={(files) => onUpload(files, "file")}
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
                                            <PreviewUpload files={files} handleRemoveFile={handleRemoveFile}/>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-row max-sm:flex-col gap-4 relative justify-between">
                                    <Controller
                                        name="isStudent"
                                        control={control}
                                        render={({field}) => (
                                            <div className="w-full">
                                                <Checkbox isSelected={field.value}
                                                          classNames={{
                                                              label:"text-lg"
                                                          }}
                                                          onValueChange={field.onChange}>
                                                    Студентське?
                                                </Checkbox>
                                                {formState.errors.type?.message && (
                                                    <div
                                                        className="text-red-600 text-sm">{formState.errors.type.message}</div>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col gap-4">
                        <div className="flex">
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex flex-col gap-4 items-start w-full relative">
                                        <Controller
                                            name="text"
                                            control={control}
                                            rules={{required: "Обов'язкове поле"}}
                                            render={({field}) => (
                                                <>
                                                    <div
                                                        className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.text?.message ? "text-red-600" : ""} after:content-['*'] after:text-[#F3005E] after:ml-0.5`}
                                                    >
                                                        Текст
                                                    </div>
                                                    <div className="relative w-full">
                                                        <EditorWrapper
                                                            ref={editorRef}
                                                            onChange={field.onChange}
                                                            description={field.value}
                                                            placeholder={"Напишіть текст для слайдера"}
                                                        />
                                                    </div>
                                                    {formState.errors.text?.message && (
                                                        <div
                                                            className="text-red-600 text-sm">{formState.errors.text.message}</div>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <Button
                                type={"submit"}
                                isLoading={isLoading}
                                disabled={!science}
                                disableAnimation={!science}
                                className={`px-6 ${!science ? "bg-gray-400" : "bg-fd"} text-xl`}
                            >
                                Оновити
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ScienceCompetitionEdit;
