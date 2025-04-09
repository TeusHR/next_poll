import React, {FC, useRef, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {AcademicCouncilService} from "@/services/CMS.service";
import revalidateFetch from "@/services/revalidateFetch";
import {Button, Input} from "@nextui-org/react";
import EditorWrapper from "@/components/EditorWrapper";
import {Language} from "@/types/Language";
import {CreateAcademicCouncilForm, ICreateAcademicCouncil} from "@/types/AcademicCouncil";

type Props = {
    language: Language;
};

const AcademicCouncilCreateForm: FC<Props> = ({language}) => {
    const {handleSubmit, control, formState, reset, watch} = useForm<CreateAcademicCouncilForm>({
        mode: "all",
        defaultValues: {
            title: "",
            text: "",
        },
    });
    const {status} = useSession();
    const $apiAuth = useAxiosAuth();

    const [isLoading, setIsLoading] = useState(false);

    const watchText = watch('text');

    const onSubmit: SubmitHandler<CreateAcademicCouncilForm> = async (dataForm) => {
        if (toast.isActive("toast-register") || status !== "authenticated") return;

        setIsLoading(true);
        try {

            const dataProduct: ICreateAcademicCouncil = {
                title: dataForm.title,
                text: dataForm.text,
                language,
            };

            const status = await AcademicCouncilService.post(dataProduct, $apiAuth);
            if (status === 201) {
                handlerReset();
                await revalidateFetch("academic-council");
                toast.success("Успішно створено");
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
    };

    // const setEditorContent = useCallback((text: string) => {
    //     if (editorRef.current) {
    //         editorRef.current.setContent(text);
    //     }
    // }, []);

    const editorRef = useRef<{ setContent: (content: string) => void }>(null);

    return (
        <>
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
                                                            ref={editorRef}
                                                            onChange={field.onChange}
                                                            description={watchText}
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
        </>
    );
};

export default AcademicCouncilCreateForm;
