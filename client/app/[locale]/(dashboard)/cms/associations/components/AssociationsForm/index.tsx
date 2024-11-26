import React, { FC, useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import { Button, Image, Input } from "@nextui-org/react";
import { loadPreviewImage } from "@/utils/ImageValidate";
import CloseIcon from "@/UI/CloseIcon";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { uploadType } from "../../../innovations/components/InnovationsEdit";
import { toast } from "react-toastify";
import { FileService } from "@/services/file.service";
import { FileToFileList } from "@/utils/FIleToFileList";
import { AssociationsService } from "@/services/CMS.service";
import revalidateFetch from "@/services/revalidateFetch";
import { Language } from "@/types/Language";
import {
  IAssociations,
  ICreateAssociations,
  ICreateAssociationsForm,
  IOrganizations,
  IOrganizationsForm
} from "@/types/Associations";
import NextImage from "next/image";

type Props = {
  associations: IAssociations | null | undefined;
  language: Language;
};

const AssociationsFormCreate: FC<Props> = ({ associations, language }) => {
  const { handleSubmit, control, formState, setValue, setError } = useForm<ICreateAssociationsForm>({
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "organizations" });

  const { status } = useSession();
  const $apiAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState<uploadType[]>([]);

  const [filesOrganizations, setFilesOrganizations] = useState<uploadType[][]>([]);

  useEffect(() => {
    if (associations) {
      const organizations: IOrganizationsForm[] = associations.organizations.map((organizations) => ({
        title: organizations.title,
        link: organizations.link,
        image: organizations.image,
      }));
      setValue("organizations", organizations);

      const serverFilesOrganizations: uploadType[][] = associations.organizations.map((organization) =>
        organization.files?.map((fileUrl) => ({
          name: renderName(fileUrl),
          typeUpload: "server" as const,
          type: "file",
          url: fileUrl,
        })) || []
      );
      setFilesOrganizations(serverFilesOrganizations);

      const serverFiles: uploadType[] = associations.organizations.map((url) => ({
        name: renderName(url.image),
        typeUpload: "server" as const,
        type: "file",
        url: url.image,
      }));
      setFiles(serverFiles);
    }
  }, [associations, setValue]);

  const renderName = (fileName: string): string => {
    return fileName.replace("/uploads/pdf/", "").replace("/uploads/image/", "");
  };

  const onSubmit: SubmitHandler<ICreateAssociationsForm> = async (dataForm) => {
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
      const urlsImage = await processUpload(files, "image");

      const existingUrlImages = files.filter((file) => file.typeUpload === "server").map((file) => file.url);

      const collection = [...existingUrlImages, ...urlsImage];

      const organizations: IOrganizations[] = await Promise.all(
        dataForm.organizations.map(async (item, idx) => {
          const currentFiles = filesOrganizations[idx] || [];

          const uploadedUrls = await processUpload(currentFiles, 'pdf');

          const existingUrls = currentFiles
            .filter((file) => file.typeUpload === "server")
            .map((file) => file.url);

          return {
            image: collection[idx],
            title: item.title,
            link: item.link,
            files: [...existingUrls, ...uploadedUrls],
          };
        })
      );

      const dataProduct: ICreateAssociations = {
        organizations: organizations,
        language,
      };

      const status = await AssociationsService.postAssociations(dataProduct, $apiAuth);

      if (status === 201) {
        await revalidateFetch("associations");
        toast.success("Дані оновлено");
      }
    } catch (error) {
      console.log(error);
      toast.error("Щось пішло не так");
    } finally {
      setIsLoading(false);
    }
  };

  const onUpload = async (files: File[], type: "file" | "image") => {
    try {
      // for (const item of files) {
      //     await HandlerImageValidate(item,
      //         1280,
      //         720,
      //         'Усі зображення мають бути 1280х720')
      // }

      const newFiles: uploadType[] = files.map((file) => ({
        name: file.name,
        typeUpload: "uploaded" as const,
        file,
        type,
        url: file.name,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
    } catch (error) {
      setError("filesOrg", { type: "custom", message: error as string });
      return error as string;
    }
  };

  const handleRemoveFile = useCallback((index: number) => {
      setFiles((currentFiles) => currentFiles.filter((_, fileIndex) => index !== fileIndex));
      remove(index);
    }, [remove],);

  const handleUpload = useCallback(
    async (uploadedFiles: File[], type: "file" | "image", idx:number) => {

      const newFiles: uploadType[] = uploadedFiles.map((file) => ({
        name: file.name,
        typeUpload: "uploaded" as const,
        type: type,
        file,
        url: file.name,
      }));

      setFilesOrganizations((prev) => {
        const updatedFiles = [...prev];
        updatedFiles[idx] = updatedFiles[idx] ? [...updatedFiles[idx], ...newFiles] : newFiles;
        return updatedFiles;
      });
    },
    [],
  );

  const handleRemove = useCallback((index: number, type: "file" | "image", idx:number) => {
    setFilesOrganizations((currentFiles) =>
      currentFiles.map((files, i) =>
        i === idx ? files.filter((_, fileIndex) => index !== fileIndex) : files
      )
    );
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      for (let i = 0; i < files.length - fields.length; i++) {
        append({ image: "", title: "", link: "" });
      }
    }
  }, [append, fields.length, files]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-12 max-2xl:gap-4 flex-col">
        <div className="flex flex-col gap-8 max-lg:gap-4 justify-between">
          <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col md:max-w-[600px] gap-4">
            <div className="flex flex-col gap-4">
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-4 w-full relative justify-end">
                    <Controller
                      name="filesOrg"
                      control={control}
                      render={({ field }) => (
                        <div className="w-full">
                          <div
                            className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.filesOrg?.message ? "text-red-600" : ""}`}
                          >
                            Завантаження файлів
                          </div>
                          <DNDUpload
                            onUpload={(files) => onUpload(files, "file")}
                            onChange={field.onChange}
                            formats={[".png", ".jpeg", ".svg", ".jpg"]}
                            styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed"
                          >
                            Скинь мені файли
                          </DNDUpload>
                          {formState.errors.filesOrg?.message && (
                            <div className="text-red-600 text-sm">{formState.errors.filesOrg.message}</div>
                          )}
                        </div>
                      )}
                    />
                    <div className="w-full flex flex-col gap-4 items-start">
                      <PreviewUpload files={files} handleRemoveFile={(index) => handleRemoveFile(index)} />
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <Button type={"submit"} isLoading={isLoading} className="px-6 bg-fd text-xl">
                      Зберегти
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {fields.length > 0 && (
            <div className="grid grid-cols-2 gap-8 w-full">
              {fields.map((item, idx) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-[20px] bg-white px-8 py-6">
                  <div className="w-full flex flex-col gap-4">
                    <div className="grid grid-cols-[80px_1fr_max-content] gap-4 w-full items-center">
                      <div className="w-[80px]">
                        <Image as={NextImage} className="object-cover"
                               src={loadPreviewImage(files[idx]?.file) || files[idx].url}
                               alt="preview"
                               width={80} height={100} />
                      </div>
                      <div className="w-full">
                        <Controller
                          name={`organizations.${idx}.title`}
                          control={control}
                          rules={{
                            required: "Обов'язкове поле",
                            minLength: {
                              value: 3,
                              message: "Мінімальна довжина 3 символи",
                            },
                            maxLength: {
                              value: 500,
                              message: "Максимальна довжина 500 символів",
                            },
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
                              isInvalid={!!formState.errors?.organizations?.[idx]?.title?.message}
                              errorMessage={formState.errors?.organizations?.[idx]?.title?.message}
                            />
                          )}
                        />
                        <Controller
                          name={`organizations.${idx}.link`}
                          control={control}
                          rules={{
                            required: "Обов'язкове поле",
                            minLength: {
                              value: 3,
                              message: "Мінімальна довжина 3 символи",
                            },
                            maxLength: {
                              value: 500,
                              message: "Максимальна довжина 500 символів",
                            },
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
                              key="Link"
                              label="Посилання"
                              labelPlacement="outside"
                              placeholder="Введіть посилання"
                              autoComplete="off"
                              isInvalid={!!formState.errors?.organizations?.[idx]?.link?.message}
                              errorMessage={formState.errors?.organizations?.[idx]?.link?.message}
                            />
                          )}
                        />
                      </div>
                      <span className="cursor-pointer pt-[20px]" onClick={() => handleRemoveFile(idx)}>
                        <CloseIcon />
                      </span>
                    </div>
                    <div className="flex flex-col gap-4 w-full relative justify-end">
                      <Controller
                        name={`organizations.${idx}.files`}
                        control={control}
                        render={({ field }) => (
                          <div className="w-full">
                            <div
                              className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors.organizations?.[idx]?.message ? "text-red-600" : ""}`}
                            >
                              Завантаження документів
                            </div>
                            <DNDUpload
                              onUpload={(files) => handleUpload(files, "file", idx)}
                              onChange={field.onChange}
                              styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed"
                            >
                              Скинь мені файли
                            </DNDUpload>
                            {formState.errors.organizations?.[idx]?.message && (
                              <div className="text-red-600 text-sm">{formState.errors.organizations?.[idx]?.message}</div>
                            )}
                          </div>
                        )}
                      />
                      <div className="w-full flex flex-col gap-4 items-start">
                        <PreviewUpload files={filesOrganizations[idx] || []} handleRemoveFile={(index) => handleRemove(index, "file", idx)} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default AssociationsFormCreate;
