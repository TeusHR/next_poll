import React, {useCallback, useEffect, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {
    CreateConferenceFileForm,
    IConferencesFile,
    ICreateConferencesFile
} from "@/types/Conference";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {uploadType} from "../../../innovations/components/InnovationsEdit";
import {toast} from "react-toastify";
import {FileService} from "@/services/file.service";
import {FileToFileList} from "@/utils/FIleToFileList";
import {ConferencesService} from "@/services/CMS.service";
import revalidateFetch from "@/services/revalidateFetch";
import {Button} from "@nextui-org/react";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import {Language} from "@/types/Language";
import {useLocale} from "next-intl";


const ConferenceFile = () => {
    const {handleSubmit, control, formState} = useForm<CreateConferenceFileForm>({
        mode: "all",
    });
    const {status} = useSession();
    const $apiAuth = useAxiosAuth();
    const language = useLocale()

    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState<uploadType[]>([]);
    const [conferenceFile, setConferenceFile] = useState<IConferencesFile>();

    useEffect(() => {
        setIsLoading(true);
        ConferencesService.getConferencesFiles(language.toUpperCase() as Language, $apiAuth)
          .then((data) => setConferenceFile(data))
          .catch(() => {
              toast.error("Конференцію не знайдено");
          })
          .finally(() => setIsLoading(false));
    }, [$apiAuth, language]);

    useEffect(() => {
        if (conferenceFile) {
            const serverFiles: uploadType[] = conferenceFile.files.map((url) => ({
                name: renderFileName(url),
                typeUpload: "server" as const,
                type: "file",
                url: url,
            }));
            setFiles(serverFiles);
        }
    }, [conferenceFile]);

    const renderFileName = (fileName: string): string => {
        return fileName.replace("/uploads/files/", "");
    };

    const onSubmit: SubmitHandler<CreateConferenceFileForm> = async () => {
        if (toast.isActive("toast-register") || status !== "authenticated") return;

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

            const dataProduct: ICreateConferencesFile = {
                files: allFilesUrls,
                language: language.toUpperCase() as Language,
            };

            const status = await ConferencesService.postConferencesFiles(dataProduct, $apiAuth);
            if (status === 201) {
                await revalidateFetch("conference");
                toast.success("Файли завантажені успішно");
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
        setFiles((currentFiles) => {
            return currentFiles.filter((_, fileIndex) => index !== fileIndex);
        });
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-12 max-2xl:gap-4 flex-col">
                    <div className="rounded-[20px] bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="w-full flex flex-col gap-4">
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
                                        <div className="flex justify-center items-center">
                                            <Button type={"submit"} isLoading={isLoading} className="px-6 bg-fd text-xl">
                                                {conferenceFile && conferenceFile.files.length > 0 ? 'Оновити' : 'Створити'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ConferenceFile;
