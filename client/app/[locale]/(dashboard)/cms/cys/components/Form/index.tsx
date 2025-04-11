import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@nextui-org/react";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {CysService} from "@/services/CMS.service";
import revalidateFetch from "@/services/revalidateFetch";
import {Language} from "@/types/Language";
import {CreateCysForm, ICreateCys, ICys} from "@/types/CYS";
import EditorWrapper from "@/components/EditorWrapper";

type Props = {
    cys: ICys | null | undefined;
    language: Language;
};

const CYSFormCreate: FC<Props> = ({cys, language}) => {
    const {handleSubmit, control, formState, setValue} = useForm<CreateCysForm>({
        mode: "all",
        defaultValues: {
            text: '',
        }
    });

    const {status} = useSession();
    const $apiAuth = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<CreateCysForm> = async (dataForm) => {
        if (toast.isActive("toast-register") || status !== "authenticated") {
            return;
        }
        setIsLoading(true);

        try {

            const dataProduct: ICreateCys = {
                text: dataForm.text,
                language,
            };

            const status = await CysService.post(dataProduct, $apiAuth);

            if (status === 201) {
                await revalidateFetch("cys");
                toast.success("Дані оновлено");
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

  useEffect(() => {
    if (cys) {
      setValue("text", cys.text);
      setEditorContent(cys.text);
    }
  }, [cys, setEditorContent, setValue]);

    const editorRef = useRef<{ setContent: (content: string) => void }>(null);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-12 max-2xl:gap-4 flex-col">
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
                            className={`px-6 bg-fd text-xl`}
                        >
                            Оновити
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CYSFormCreate;
