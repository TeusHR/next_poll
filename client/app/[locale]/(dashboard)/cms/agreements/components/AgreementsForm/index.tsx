import React, { FC, useCallback, useEffect, useState } from "react";
import { Control, Controller, FormState, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import DNDUpload from "@/components/DNDFiles";
import PreviewUpload from "@/components/DNDFiles/previewUpload";
import { Button, Input } from "@nextui-org/react";
import CloseIcon from "@/UI/CloseIcon";
import Title from "@/UI/Title";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { uploadType } from "../../../innovations/components/InnovationsEdit";
import { toast } from "react-toastify";
import { FileService } from "@/services/file.service";
import { FileToFileList } from "@/utils/FIleToFileList";
import { AgreementsService } from "@/services/CMS.service";
import revalidateFetch from "@/services/revalidateFetch";
import { Language } from "@/types/Language";
import {
  IAgreements,
  ICreateAgreements,
  ICreateAgreementsForm,
  ICreateForeignUniversities,
  IForeignUniversitiesForm,
} from "@/types/Agreements";

type Props = {
  agreements: IAgreements | null | undefined;
  language: Language;
};

const AgreementsFormCreate: FC<Props> = ({ agreements, language }) => {
  const { handleSubmit, control, formState, setValue, getValues } = useForm<ICreateAgreementsForm>({
    mode: "all",
  });

  const {
    fields: fieldsForeign,
    append: appendForeign,
    remove: removeForeign,
  } = useFieldArray({ control, name: "foreignUniversities" });

  const { status } = useSession();
  const $apiAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState<{ [countryIdx: number]: { [universityIdx: number]: uploadType[] } }>({});

  useEffect(() => {
    if (agreements) {

      const foreignUniversities: IForeignUniversitiesForm[] = Object.entries(
        agreements.foreignUniversities
      ).map(([country, universities], countryIdx) => ({
        country,
        item: universities.map((university, universityIdx) => {

          setFiles((prev) => ({
            ...prev,
            [countryIdx]: {
              ...(prev[countryIdx] || {}),
              [universityIdx]: university.files.map((url) => ({
                      name: renderName(url),
                      typeUpload: "server" as const,
                      type: "file",
                      url: url,
                    })),
            },
          }));

          return {
            title: university.title,
            description: university.description,
          };
        }),
      }));

      setValue("foreignUniversities", foreignUniversities);
    }
  }, [agreements, setValue]);

  const renderName = (fileName: string): string => {
    return fileName.replace("/uploads/pdf/", "").replace("/uploads/image/", "");
  };

  const onSubmit: SubmitHandler<ICreateAgreementsForm> = async (dataForm) => {
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
      // const foreignUniversities2: ICreateForeignUniversities[][] = await Promise.all(
      //   dataForm.foreignUniversities.map(async (foreign, countryIdx) => {
      //
      //     const universitiesWithFiles = await Promise.all(
      //       foreign.item.map(async (university, universityIdx) => {
      //         const currentFiles = files[countryIdx]?.[universityIdx] || [];
      //         const uploadedUrls = await processUpload(currentFiles, "files");
      //         const existingUrls = currentFiles
      //           .filter((file) => file.typeUpload === "server")
      //           .map((file) => file.url);
      //
      //         const allFiles = [...existingUrls, ...uploadedUrls];
      //
      //         return {
      //           title: university.title,
      //           description: university.description,
      //           files: allFiles,
      //         };
      //       })
      //     );
      //
      //     const temp = universitiesWithFiles.flatMap((item) => {
      //       return {
      //         description: item.description,
      //         title: item.title,
      //         country: foreign.country,
      //         files:item.files,
      //       };
      //     })
      //
      //     return temp;
      //   })
      // );
      //
      // console.log(foreignUniversities2, ' foreignUniversities2');

      const foreignUniversities: ICreateForeignUniversities[][] = await Promise.all(
        dataForm.foreignUniversities.map(async (foreign, countryIdx) => {

          return Promise.all(
            foreign.item.flatMap(async (university, universityIdx) => {
              const currentFiles = files[countryIdx]?.[universityIdx] || [];
              const uploadedUrls = await processUpload(currentFiles, "files");
              const existingUrls = currentFiles
                .filter((file) => file.typeUpload === "server")
                .map((file) => file.url);


              const allFiles = [...existingUrls, ...uploadedUrls];

              return {
                country: foreign.country,
                title: university.title,
                description: university.description,
                files: allFiles,
              };
            })
          );
        })
      );

      const flatForeignUniversities = foreignUniversities.flat();

      const dataProduct: ICreateAgreements = {
        foreignUniversities: flatForeignUniversities,
        language,
      };

      const status = await AgreementsService.postAgreements(dataProduct, $apiAuth);

      if (status === 201) {
        await revalidateFetch("agreements");
        toast.success("Дані оновлено");
      }
    } catch (error) {
      console.log(error);
      toast.error("Щось пішло не так");
    } finally {
      setIsLoading(false);
    }
  };

  const handlerRemoveForeign = async (index: number) => {
    removeForeign(index);
  };

  const handlerPushForeign = (countryIdx: number) => {
    const currentForeignUniversities = getValues("foreignUniversities");
    if (countryIdx >= 0 && countryIdx < currentForeignUniversities.length) {
      currentForeignUniversities[countryIdx].item.push({
        title: "",
        description: "",
      });
      setValue("foreignUniversities", currentForeignUniversities);
    }
  };

  const handleUpload = useCallback(
    async (uploadedFiles: File[], type: "file" | "image", countryIdx: number, universityIdx: number) => {
      const newFiles: uploadType[] = uploadedFiles.map((file) => ({
        name: file.name,
        typeUpload: "uploaded" as const,
        type: type,
        file,
        url: file.name,
      }));

      setFiles((prev) => {
        const updatedFiles = { ...prev };
        if (!updatedFiles[countryIdx]) {
          updatedFiles[countryIdx] = {};
        }
        if (!updatedFiles[countryIdx][universityIdx]) {
          updatedFiles[countryIdx][universityIdx] = [];
        }
        updatedFiles[countryIdx][universityIdx] = [
          ...updatedFiles[countryIdx][universityIdx],
          ...newFiles,
        ];
        return updatedFiles;
      });
    },
    []
  );

  const handleRemove = useCallback(
    (fileIndex: number, type: "file" | "image", countryIdx: number, universityIdx: number) => {
      setFiles((prev) => {
        const updatedFiles = { ...prev };
        if (updatedFiles[countryIdx]?.[universityIdx]) {
          updatedFiles[countryIdx][universityIdx] = updatedFiles[countryIdx][universityIdx].filter(
            (_, idx) => idx !== fileIndex
          );
        }
        return updatedFiles;
      });
    },
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-12 max-2xl:gap-4 flex-col">
        <div className="flex flex-row max-md:flex-col gap-8 max-lg:gap-4 justify-between">
          <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col md:max-w-[600px] gap-4">
              <div className="w-full flex flex-row gap-5 max-md:flex-col justify-center items-center">
                <Button
                    onClick={() =>
                      appendForeign({
                        country: "",
                        item: [
                          {
                            title: "",
                            description: ""
                          }
                        ]
                      })
                    }
                    className="px-6 bg-fd text-base"
                >
                  Додати співпрацю
                </Button>
                <div className="flex justify-center items-center">
                  <Button type={"submit"} isLoading={isLoading} className="px-6 bg-fd text-xl">
                    Зберегти
                  </Button>
                </div>
              </div>
          </div>
        </div>

        <div className="flex flex-wrap transition max-md:flex-col gap-8 max-lg:gap-4 justify-between">
          {fieldsForeign.map((item, idx) => (
            <div
              key={`${item.id} - ${item.country} - ${idx}`}
              className="rounded-[20px] transition w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4"
            >
              <div className="flex transition flex-col gap-4">
                <div className="w-full transition flex flex-col gap-4">
                  <div className="flex transition flex-col gap-6 w-full">
                    <div className="flex  w-full items-center justify-between gap-4">
                      <Title text={`Співробітництво ${idx + 1}`} style="text-[#111318] text-xl max-sm:text-base" />
                      <span className="cursor-pointer" onClick={() => handlerRemoveForeign(idx)}>
                        <CloseIcon />
                      </span>
                    </div>
                    <div className="flex flex-row gap-4 items-start justify-between">
                      <Controller
                        name={`foreignUniversities.${idx}.country`}
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
                            key="country"
                            label="Країна"
                            labelPlacement="outside"
                            placeholder="Введіть країну"
                            autoComplete="off"
                            isInvalid={!!formState.errors?.foreignUniversities?.[idx]?.country?.message}
                            errorMessage={formState.errors?.foreignUniversities?.[idx]?.country?.message}
                          />
                        )}
                      />
                      <div className="py-2 mt-6">
                        <Button onClick={() => handlerPushForeign(idx)} className="bg-fd text-base">
                          Додати
                        </Button>
                      </div>
                    </div>
                    <NestedFieldArray control={control} formState={formState}
                                      parentFieldIndex={idx}
                                      handleUpload={handleUpload}
                                      handleRemove={handleRemove}
                                      files={files}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

type NestedFieldArrayProps = {
  control: Control<ICreateAgreementsForm, any>;
  formState: FormState<ICreateAgreementsForm>;
  parentFieldIndex: number;
  handleUpload: (uploadedFiles: File[], type: ("file" | "image"), countryIdx: number, universityIdx: number) => Promise<void>
  handleRemove: (fileIndex: number, type: ("file" | "image"), countryIdx: number, universityIdx: number) => void
  files:  {   [p: number]: {     [p: number]: uploadType[]   } },
};

function NestedFieldArray({ control, formState, parentFieldIndex, handleUpload, handleRemove, files }: NestedFieldArrayProps) {
  const { fields, remove } = useFieldArray({
    control,
    name: `foreignUniversities.${parentFieldIndex}.item`,
  });

  const handleRemoveForeignItem = (itemIdx: number) => {
    remove(itemIdx);
  };

  return (
    <>
      {fields.map((item, itemIdx) => (
        <div key={`${item.id}-${item.title}-${itemIdx}`} className="flex flex-row gap-4 w-full items-center">
          <div className="flex flex-col w-full">
            <Controller
              name={`foreignUniversities.${parentFieldIndex}.item.${itemIdx}.title`}
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
                  key={`${itemIdx}-title`}
                  label="Назва"
                  labelPlacement="outside"
                  placeholder="Введіть назву"
                  autoComplete="off"
                  isInvalid={
                    !!formState.errors?.foreignUniversities?.[parentFieldIndex]?.item?.[itemIdx]?.title?.message
                  }
                  errorMessage={
                    formState.errors?.foreignUniversities?.[parentFieldIndex]?.item?.[itemIdx]?.title?.message
                  }
                />
              )}
            />
            <Controller
              name={`foreignUniversities.${parentFieldIndex}.item.${itemIdx}.description`}
              control={control}
              rules={{
                required: "Обов'язкове поле",
                minLength: {
                  value: 3,
                  message: "Мінімальна довжина 3 символи",
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
                  key={`${itemIdx}-description`}
                  label="Опис"
                  labelPlacement="outside"
                  placeholder="Введіть опис"
                  autoComplete="off"
                  isInvalid={
                    !!formState.errors?.foreignUniversities?.[parentFieldIndex]?.item?.[itemIdx]?.description?.message
                  }
                  errorMessage={
                    formState.errors?.foreignUniversities?.[parentFieldIndex]?.item?.[itemIdx]?.description?.message
                  }
                />
              )}
            />
            <div className="flex flex-col gap-4 w-full relative justify-end">
              <Controller
                name={`foreignUniversities.${parentFieldIndex}.item.${itemIdx}.files`}
                control={control}
                render={({ field }) => (
                  <div className="w-full">
                    <div
                      className={`text-brand-gray-200 max-xl:!text-sm ${formState.errors?.foreignUniversities?.[parentFieldIndex]?.item?.[itemIdx]?.files?.message ? "text-red-600" : ""}`}
                    >
                      Завантаження документів
                    </div>
                    <DNDUpload
                      onUpload={(files) => handleUpload(files, "file", parentFieldIndex, itemIdx)}
                      onChange={field.onChange}
                      styleContainer="w-full mt-2 relative h-[125px] max-sm:h-[100px] flex items-center justify-center text-2xl max-sm:text-base border-2 border-primary border-dashed"
                    >
                      Скинь мені файли
                    </DNDUpload>
                    {formState.errors?.foreignUniversities?.[parentFieldIndex]?.item?.[itemIdx]?.files?.message && (
                      <div className="text-red-600 text-sm">{formState.errors?.foreignUniversities?.[parentFieldIndex]?.item?.[itemIdx]?.files?.message}</div>
                    )}
                  </div>
                )}
              />
              <div className="w-full flex flex-col gap-4 items-start">
                <PreviewUpload files={files[parentFieldIndex]?.[itemIdx] || []}
                               handleRemoveFile={(index) => handleRemove(index, "file", parentFieldIndex, itemIdx)} />
              </div>
            </div>
          </div>
          <span className="cursor-pointer pt-[20px]" onClick={() => handleRemoveForeignItem(itemIdx)}>
            <CloseIcon />
          </span>
        </div>
      ))}
    </>
  );
}

export default AgreementsFormCreate;
