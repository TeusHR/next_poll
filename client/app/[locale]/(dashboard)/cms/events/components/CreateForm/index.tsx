import React, {FC, useRef, useState} from "react";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import moment from "moment";
import {EventsService} from "@/services/CMS.service";
import revalidateFetch from "@/services/revalidateFetch";
import {Button, Input} from "@nextui-org/react";
import EditorWrapper from "@/components/EditorWrapper";
import {Language} from "@/types/Language";
import {CreateEventsForm, ICreateEvents} from "@/types/Events";
import CloseIcon from "@/UI/CloseIcon";

type Props = {
    language: Language;
};

const EventsCreateForm: FC<Props> = ({language}) => {
    const {handleSubmit, control, formState, reset, watch} = useForm<CreateEventsForm>({
        mode: "all",
        defaultValues: {
            title: "",
            link: "",
            roomNumber: "",
            date: "",
            supervisor:[],
            toDate: "",
            text: "",
        },
    });
    const {status} = useSession();
    const $apiAuth = useAxiosAuth();

    const {fields, append, remove} = useFieldArray({control, name: "supervisor"});

    const [isLoading, setIsLoading] = useState(false);

    const watchText = watch('text');

    const onSubmit: SubmitHandler<CreateEventsForm> = async (dataForm) => {
        if (toast.isActive("toast-register") || status !== "authenticated") return;

        setIsLoading(true);
        try {
            console.log(dataForm)
            const dataProduct: ICreateEvents = {
                title: dataForm.title,
                text: dataForm.text,
                roomNumber: dataForm.roomNumber,
                supervisor: dataForm.supervisor.map((item) => item.name),
                link: dataForm.link,
                date: moment(dataForm.date).toISOString(),
                toDate: dataForm.toDate ? moment(dataForm.toDate).toISOString() : undefined,
                language,
            };

            const status = await EventsService.post(dataProduct, $apiAuth);
            if (status === 201) {
                handlerReset();
                await revalidateFetch("events");
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

    const editorRef = useRef<{ setContent: (content: string) => void }>(null);

    const handlerRemoveSupervisor = (index: number) => {
        remove(index);
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-12 max-2xl:gap-4 flex-col">
                    <div className="flex max-md:flex-wrap gap-10">
                        <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4">
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
                                                    maxLength: {
                                                        value: 500,
                                                        message: "Максимальна довжина 500 символів"
                                                    },
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
                                                rules={{required: "Обов'язкове поле"}}
                                                render={({field}) => (
                                                    <Input
                                                        className="border-none py-2"
                                                        type="datetime-local"
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
                                                        type="datetime-local"
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
                                                name="roomNumber"
                                                control={control}
                                                rules={{
                                                    minLength: {value: 1, message: "Мінімальна довжина 1 символи"},
                                                    maxLength: {
                                                        value: 500,
                                                        message: "Максимальна довжина 500 символів"
                                                    },
                                                }}
                                                render={({field}) => (
                                                    <Input
                                                        className="border-none py-2"
                                                        type="text"
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                        classNames={{
                                                            inputWrapper: "border-1 border-primary-500",
                                                            input: "focus:outline-none text-base text-primary",
                                                            errorMessage: "text-red-600 text-sm",
                                                            label: "text-base",
                                                        }}
                                                        key="roomNumber"
                                                        label="Номер кабінету"
                                                        labelPlacement="outside"
                                                        placeholder="Введіть номер"
                                                        autoComplete="off"
                                                        isInvalid={!!formState.errors.roomNumber?.message}
                                                        errorMessage={formState.errors.roomNumber?.message}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                name="link"
                                                control={control}
                                                render={({field}) => (
                                                    <Input
                                                        className="border-none py-2"
                                                        type="text"
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                        classNames={{
                                                            inputWrapper: "border-1 border-primary-500",
                                                            input: "focus:outline-none text-base text-primary",
                                                            errorMessage: "text-red-600 text-sm",
                                                            label: "text-base",
                                                        }}
                                                        key="link"
                                                        label="Посилання"
                                                        labelPlacement="outside"
                                                        placeholder="Введіть посилання"
                                                        autoComplete="off"
                                                        isInvalid={!!formState.errors.link?.message}
                                                        errorMessage={formState.errors.link?.message}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="w-full flex justify-center items-center">
                                            <Button
                                                onClick={() =>
                                                    append({
                                                        name: "",
                                                    })
                                                }
                                                className="px-6 bg-fd text-xl"
                                            >
                                                Додати керівника
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap w-full transition max-md:flex-col gap-8 max-lg:gap-4 justify-between">
                            <div className={`rounded-[20px] transition w-full bg-white px-8 py-6 flex flex-col max-w-[700px] gap-4 ${fields.length > 0 ? "block" : "hidden" }`}>
                                <div className="flex transition flex-col gap-4">
                                    {fields.map((item, idx) => (
                                        <div key={item.id} className="flex transition flex-col gap-4 w-full">
                                            <div className="flex flex-row gap-4 items-center">
                                                <Controller
                                                    name={`supervisor.${idx}.name`}
                                                    control={control}
                                                    rules={{
                                                        required: "Обов'язкове поле",
                                                        minLength: {value: 3, message: "Мінімальна довжина 3 символи"},
                                                        maxLength: {
                                                            value: 500,
                                                            message: "Максимальна довжина 500 символів"
                                                        },
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
                                                                label: "text-base select-none",
                                                            }}
                                                            key="title"
                                                            label="Керівник"
                                                            labelPlacement="outside"
                                                            placeholder="Введіть керівника"
                                                            autoComplete="off"
                                                            isInvalid={!!formState.errors?.supervisor?.[idx]?.name?.message}
                                                            errorMessage={formState.errors?.supervisor?.[idx]?.name?.message}
                                                        />
                                                    )}
                                                />
                                                <span className="cursor-pointer mt-6"
                                                      onClick={() => handlerRemoveSupervisor(idx)}>
                                                    <CloseIcon/>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
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

export default EventsCreateForm;
