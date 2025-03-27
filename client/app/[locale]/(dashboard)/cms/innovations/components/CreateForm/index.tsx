import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ICreateInnovation, ICreateInnovationForm} from "@/types/Innovation";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {uploadType} from "../InnovationsEdit";
import {toast} from "react-toastify";
import {FileService} from "@/services/file.service";
import {FileToFileList} from "@/utils/FIleToFileList";
import {InnovationsFilters, InnovationsService} from "@/services/CMS.service";
import revalidateFetch from "@/services/revalidateFetch";
import {Button, Input, useDisclosure} from "@nextui-org/react";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import EditorWrapper from "@/components/EditorWrapper";
import {Language} from "@/types/Language";
import Select from "@/components/CMS/Select";
import {useLocale} from "next-intl";
import InnovationFilterModal from "@/components/CMS/InnovationFilterModal";
import {IInnovationFilter} from "@/types/InnovationFilter";

type Props = {
    language: Language;
};

const InnovationsCreateForm: FC<Props> = () => {
    const {handleSubmit, control, formState, reset, setError} = useForm<ICreateInnovationForm>({
        mode: "all",
        defaultValues: {
            title: "",
            text: "",
            filter: new Set<string>(),
        },
    });

    const {status} = useSession();
    const $apiAuth = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false);

    const [files, setFiles] = useState<uploadType[]>([]);
    const [filesImage, setFilesImage] = useState<uploadType[]>([]);
    const [innovationFilters, setInnovationFilters] = useState<IInnovationFilter[]>([])
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const language = useLocale();

    const handlerFetchFilters = useCallback(() => {
        InnovationsFilters.getAll($apiAuth, language.toUpperCase()).then(res => {
            setInnovationFilters(res.sort((a, b) => a.name.localeCompare(b.name)))
        })
    }, [$apiAuth, language])

    useEffect(() => {
        handlerFetchFilters()
    }, [handlerFetchFilters]);

    const onSubmit: SubmitHandler<ICreateInnovationForm> = async (dataForm) => {
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
            const urlsDocs = await processUpload(files, "pdf");
            const urlsImages = await processUpload(filesImage, "image");
            const filters = Array.from(dataForm.filter)

            const dataProduct: ICreateInnovation = {
                title: dataForm.title,
                text: dataForm.text,
                files: urlsDocs,
                images: urlsImages,
                filter: filters,
                language: language.toUpperCase() as Language,
            };

            const status = await InnovationsService.postInnovation(dataProduct, $apiAuth);
            if (status === 201) {
                await revalidateFetch("innovation");
                handlerReset();
                toast.success("Запис успішно створено");
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
            const setter = type === "file" ? setFiles : setFilesImage;

            // if (type === 'image') {
            //     try {
            //         for (const item of uploadedFiles) {
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

            setter((prev) => [...prev, ...newFiles]);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setError],
    );

    const handleRemove = useCallback((index: number, type: "file" | "image") => {
        const setter = type === "file" ? setFiles : setFilesImage;
        setter((currentFiles) => currentFiles.filter((_, fileIndex) => index !== fileIndex));
    }, []);

    const handlerReset = () => {
        if (editorRef.current) {
            editorRef.current.setContent('');
        }
        setFiles([]);
        setFilesImage([]);
        reset();
    };

    const editorRef = useRef<{ setContent: (content: string) => void }>(null);

    const handlerOpenChangeModal = () => {
        handlerFetchFilters()
        onOpenChange()
    }

    return (
        <div>
            <InnovationFilterModal isOpen={isOpen} onOpenChange={handlerOpenChangeModal} onOpen={onOpen}/>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                                    label="Назва"
                                                    labelPlacement="outside"
                                                    placeholder="Введіть назву"
                                                    autoComplete="off"
                                                    isInvalid={!!formState.errors.title?.message}
                                                    errorMessage={formState.errors.title?.message}
                                                />
                                            )}
                                        />
                                        <div className="flex w-1/2">
                                            <Controller
                                                name="filter"
                                                control={control}
                                                render={({field}) => (
                                                    <div className="w-full">
                                                        <div className={`flex justify-between items-end text-brand-gray-200 max-xl:!text-sm ${formState.errors.filter?.message ? "text-red-600" : ""}`}>
                                                            Напрямок
                                                            <span onClick={onOpen} className={"text-xs text-gray-600 underline decoration-dashed cursor-pointer"}>
                                                                Створити
                                                            </span>
                                                        </div>
                                                        <Select options={innovationFilters.map(item => ({
                                                            value: item.id.toString(),
                                                            label: item.name
                                                        }))}
                                                                selectionMode={'multiple'}
                                                                placeholder={'Фільтр'}
                                                                selected={field.value}
                                                                isSearchable
                                                                justify
                                                                disabled={innovationFilters.length === 0}
                                                                onChange={field.onChange}/>
                                                        {formState.errors.filter?.message && (
                                                            <div
                                                                className="text-red-600 text-sm">{formState.errors.filter.message}</div>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex flex-row gap-4 w-full items-center">
                                        <div className="flex flex-col gap-4 w-full relative justify-end">
                                            <Controller
                                                name="images"
                                                control={control}
                                                rules={{
                                                    required: "Обов'язкове поле",
                                                }}
                                                render={({field}) => (
                                                    <div className="w-full">
                                                        <div
                                                            className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.images?.message ? "text-red-600" : ""}`}
                                                        >
                                                            Завантаження зображень
                                                        </div>
                                                        <DNDUpload
                                                            onUpload={(files) => handleUpload(files, "image")}
                                                            onChange={field.onChange}
                                                            formats={[".png", ".jpeg", ".jpg"]}
                                                            styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed"
                                                        >
                                                            Скинь мені файли
                                                        </DNDUpload>
                                                        {formState.errors.images?.message && (
                                                            <div
                                                                className="text-red-600 text-sm">{formState.errors.images.message}</div>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                            <div className="w-full flex flex-col gap-4 items-start">
                                                <PreviewUpload
                                                    files={filesImage}
                                                    type="image"
                                                    handleRemoveFile={(index) => handleRemove(index, "image")}
                                                />
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
                                        <Controller
                                            name="text"
                                            control={control}
                                            rules={{
                                                required: "Обов'язкове поле",
                                            }}
                                            render={({field}) => (
                                                <>
                                                    <div
                                                        className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.text?.message ? "text-red-600" : ""} after:content-['*'] after:text-[#F3005E] after:ml-0.5`}
                                                    >
                                                        Текст
                                                    </div>
                                                    <div className="relative w-full">
                                                        <EditorWrapper
                                                            onChange={field.onChange}
                                                            ref={editorRef}
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
                            <Button type={"submit"} isLoading={isLoading} className="px-6 bg-fd text-xl">
                                Створити
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InnovationsCreateForm;
