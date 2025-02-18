import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import EditorWrapper from "@/components/EditorWrapper";
import { Button } from "@nextui-org/react";
import { ICreateStudent, IStudent } from "@/types/Student";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import { StudentService } from "@/services/CMS.service";
import revalidateFetch from "@/services/revalidateFetch";
import { Language } from "@/types/Language";

type Props = {
  student: IStudent | undefined;
  language: Language;
};

const StudentFormCreate: FC<Props> = ({ student, language }) => {
  const { handleSubmit, control, formState, setValue } = useForm<ICreateStudent>({
    mode: "all",
    defaultValues: {
      text: "",
    },
  });

  const { status } = useSession();
  const $apiAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);

  const setEditorContent = useCallback((text: string) => {
    if (editorRef.current) {
      editorRef.current.setContent(text);
    }
  }, []);

  const editorRef = useRef<{ setContent: (content: string) => void }>(null);
  
  useEffect(() => {
    if (student) {
      setValue("text", student.text);
      setEditorContent(student.text);
    }
  }, [student, setValue, setEditorContent]);

  const onSubmit: SubmitHandler<ICreateStudent> = async (dataForm) => {
    if (toast.isActive("toast-register") || status !== "authenticated") {
      return;
    }
    setIsLoading(true);

    try {
      const dataProduct: ICreateStudent = {
        text: dataForm.text,
        language,
      };

      const status = await StudentService.postStudent(dataProduct, $apiAuth);
      if (status === 201) {
        await revalidateFetch("studentScience");
        toast.success("Дані оновлено");
      }
    } catch (error) {
      console.log(error);
      toast.error("Щось пішло не так");
    } finally {
      setIsLoading(false);
    }
  };

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
                              ref={editorRef}
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
              Зберегти
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default StudentFormCreate;
