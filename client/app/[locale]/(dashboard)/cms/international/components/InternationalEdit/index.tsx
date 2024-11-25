"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { FileToFileList } from "@/utils/FIleToFileList";
import { InternationalService } from "@/services/CMS.service";
import { toast } from "react-toastify";
import { Button, Input } from "@nextui-org/react";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import EditorWrapper from "@/components/EditorWrapper";
import { FileService } from "@/services/file.service";
import { IInternational, IUpdateInternational, IUpdateInternationalForm } from "@/types/International";
import { uploadType } from "../../../innovations/components/InnovationsEdit";
import revalidateFetch from "@/services/revalidateFetch";
import { renderName } from "@/utils/renderName";

type Props = {
  internationalId: string;
};

const InternationalEdit: FC<Props> = ({ internationalId }) => {
  const { handleSubmit, control, formState, setValue, setError } = useForm<IUpdateInternationalForm>({
    mode: "all",
    defaultValues: {
      title: "",
      text: "",
    },
  });

  const { status } = useSession();
  const $apiAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [international, setInternational] = useState<IInternational>();
  const [files, setFiles] = useState<uploadType[]>([]);
  const [filesImage, setFilesImage] = useState<uploadType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    InternationalService.getInternational(internationalId)
      .then((data) => setInternational(data))
      .catch(() => {
        toast.error("Не знайдено");
      })
      .finally(() => setIsLoading(false));
  }, [internationalId]);

  useEffect(() => {
    if (international) {
      setValue("title", international.title);
      setValue("text", international.text);
      const serverFiles: uploadType[] = international.files.map((url) => ({
        name: renderName(url),
        typeUpload: "server" as const,
        type: "file",
        url: url,
      }));
      setFiles(serverFiles);
      const serverImage: uploadType[] = international.images.map((url) => ({
        name: renderName(url),
        typeUpload: "server" as const,
        type: "image" as const,
        url: url,
      }));
      setFilesImage(serverImage);
    }
  }, [international, setValue]);

  const onSubmit: SubmitHandler<IUpdateInternationalForm> = async (dataForm) => {
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

      const existingUrlDocs = files.filter((file) => file.typeUpload === "server").map((file) => file.url);

      const existingUrlImages = filesImage.filter((file) => file.typeUpload === "server").map((file) => file.url);

      const dataProduct: IUpdateInternational = {
        title: dataForm.title,
        text: dataForm.text,
        files: [...existingUrlDocs, ...urlsDocs],
        images: [...existingUrlImages, ...urlsImages],
      };

      const status = await InternationalService.updateInternational(dataProduct, internationalId, $apiAuth);
      if (status === 200) {
        await revalidateFetch("international");
        toast.success("Запис оновлено");
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
    const setter = type === "file" ? setFiles : setFilesImage;
    setter((currentFiles) => currentFiles.filter((_, fileIndex) => index !== fileIndex));
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
                          label="Назва"
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
                        render={({ field }) => (
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
                              <div className="text-red-600 text-sm">{formState.errors.images.message}</div>
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
                      render={({ field }) => (
                        <>
                          <div
                            className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.text?.message ? "text-red-600" : ""} after:content-['*'] after:text-[#F3005E] after:ml-0.5`}
                          >
                            Текст
                          </div>
                          <div className="relative w-full">
                            <EditorWrapper
                              onChange={field.onChange}
                              description={field.value}
                              placeholder={"Напишіть текст для слайдера"}
                            />
                          </div>
                          {formState.errors.text?.message && (
                            <div className="text-red-600 text-sm">{formState.errors.text.message}</div>
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
                Оновити
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InternationalEdit;
