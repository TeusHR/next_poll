"use client";
import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {AcademicCouncilService} from "@/services/CMS.service";
import {Button, Input} from "@nextui-org/react";
import EditorWrapper from "@/components/EditorWrapper";
import revalidateFetch from "@/services/revalidateFetch";
import {IAcademicCouncil, IUpdateAcademicCouncil, UpdateAcademicCouncilForm} from "@/types/AcademicCouncil";

type Props = {
    idItem: string;
};

const AcademicCouncilEdit: FC<Props> = ({idItem}) => {
    const {handleSubmit, control, formState, setValue} = useForm<UpdateAcademicCouncilForm>({
        mode: "all",
        defaultValues: {
            title: "",
            text: "",
        },
    });

    const {status} = useSession();

    const $apiAuth = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [academic, setAcademic] = useState<IAcademicCouncil>();

    useEffect(() => {
        setIsLoading(true);
        AcademicCouncilService.get(idItem)
            .then((data) => setAcademic(data))
            .catch(() => {
                toast.error("Не знайдено");
            })
            .finally(() => setIsLoading(false));
    }, [idItem]);

    const onSubmit: SubmitHandler<UpdateAcademicCouncilForm> = async (dataForm) => {
        if (toast.isActive("toast-register") || status !== "authenticated") {
            return;
        }
        setIsLoading(true);

        try {
            const dataProduct: IUpdateAcademicCouncil = {
                title: dataForm.title,
                text: dataForm.text,
            };
            const status = await AcademicCouncilService.update(dataProduct, idItem, $apiAuth);
            if (status === 200) {
                await revalidateFetch("academic-council");
                toast.success("Запис оновлено");
            }
        } catch (error) {
            console.log(error);
            toast.error("Щось пішло не так");
        } finally {
            setIsLoading(false);
        }
    };

    const setEditorContent = useCallback((text: string) => {
        if (editorRef.current) {
            editorRef.current.setContent(text);
        }
    }, []);

    const editorRef = useRef<{ setContent: (content: string) => void }>(null);

    useEffect(() => {
        if (academic) {
            setValue("title", academic.title);
            setValue("text", academic.text);
            setEditorContent(academic.text);
        }
    }, [academic, setEditorContent, setValue]);

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
                                disabled={!academic}
                                disableAnimation={!academic}
                                className={`px-6 ${!academic ? "bg-gray-400" : "bg-fd"} text-xl`}
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

export default AcademicCouncilEdit;
