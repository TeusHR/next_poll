"use client";
import React, {FC, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
// import GoogleMap from "@/components/GoogleMap";
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import NextImage from "next/image";
import {Image} from "@heroui/react";
import {IFeedbackForm} from "@/types/Feedback";
import {FeedbackService} from "@/services/client.service";
import {Link} from "@/routing/*";
import {MainTranslation} from "../../app/[locale]/(client)/page";

type Props = {
    translation: MainTranslation['Main']['form'],
    apiKey: string
}

const Feedback: FC<Props> = ({apiKey, translation}) => {
    const {handleSubmit, control, formState, reset} = useForm<IFeedbackForm>({
        mode: "all",
        defaultValues: {
            name: "",
            email: "",
            // text: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<IFeedbackForm> = async (dataForm) => {
        if (toast.isActive("toast-register")) {
            return;
        }
        setIsLoading(true);

        try {
            // const data: any = {
            //   name: dataForm.name,
            //   email: dataForm.email,
            //   text: dataForm.text,
            // };
            //
            // FeedbackService.post(data).then((status) => {
            //   if (status === 201) {
            //     reset();
            //     toast.success(translation.sent);
            //   }
            // });
        } catch (error) {
            console.log(error);
            toast.error(translation.error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="xl:container mx-auto">
            <div className="w-full bg-white relative max-lg:flex max-lg:flex-col max-lg:gap-8 max-lg:h-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex h-full flex-col">
                        <div className="sm:px-16 px-8 pt-14 w-full min-h-[500px] text-primary">
                            <div className="text-3xl max-sm:text-center sm:text-4xl xl:text-2xl md:text-xl">
                                <span className="font-semibold">{translation.feedback}</span>
                            </div>
                            <div className="flex flex-col mt-8 gap-4">
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: translation.required,
                                        minLength: {value: 3, message: translation.minLength},
                                        maxLength: {value: 50, message: translation.maxLength},
                                    }}
                                    render={({field}) => (
                                        <Input
                                            className="border-none py-2"
                                            type="text"
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            key="name"
                                            classNames={{
                                                input: "focus:outline-none text-xl text-primary",
                                                label: "text-lg text-primary",
                                                errorMessage: "text-red-600 text-base",
                                            }}
                                            variant="underlined"
                                            max="50"
                                            min="2"
                                            label={translation.name}
                                            autoComplete="off"
                                            isInvalid={!!formState.errors.name?.message}
                                            errorMessage={formState.errors.name?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: translation.required,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: translation.errorEmail,
                                        },
                                    }}
                                    render={({field}) => (
                                        <Input
                                            className="border-none py-2"
                                            type="email"
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            classNames={{
                                                input: "focus:outline-none text-xl text-primary",
                                                label: "text-lg text-primary",
                                                errorMessage: "text-red-600 text-base",
                                            }}
                                            variant="underlined"
                                            key="gmail"
                                            max="50"
                                            min="2"
                                            label={translation.email}
                                            autoComplete="off"
                                            isInvalid={!!formState.errors.email?.message}
                                            errorMessage={formState.errors.email?.message}
                                        />
                                    )}
                                />
                                {/*<Controller*/}
                                {/*  name="text"*/}
                                {/*  control={control}*/}
                                {/*  rules={{*/}
                                {/*    required: translation.required,*/}
                                {/*    minLength: { value: 3, message: translation.minLength },*/}
                                {/*    maxLength: { value: 50, message: translation.maxLength },*/}
                                {/*  }}*/}
                                {/*  render={({ field }) => (*/}
                                {/*    <Input*/}
                                {/*      className="border-none py-2"*/}
                                {/*      type="text"*/}
                                {/*      value={field.value}*/}
                                {/*      onValueChange={field.onChange}*/}
                                {/*      key="text"*/}
                                {/*      classNames={{*/}
                                {/*        input: "focus:outline-none text-xl text-primary",*/}
                                {/*        label: "text-lg text-primary",*/}
                                {/*        errorMessage: "text-red-600 text-base",*/}
                                {/*      }}*/}
                                {/*      variant="underlined"*/}
                                {/*      max="50"*/}
                                {/*      min="2"*/}
                                {/*      label={translation.text}*/}
                                {/*      autoComplete="off"*/}
                                {/*      isInvalid={!!formState.errors.text?.message}*/}
                                {/*      errorMessage={formState.errors.text?.message}*/}
                                {/*    />*/}
                                {/*  )}*/}
                                {/*/>*/}
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <Button
                                className="bg-primary flex flex-row gap-4 rounded-l-[4px] p-4 sm:px-8 sm:h-[60px] max-sm:!text-[14px]"
                                isLoading={isLoading}
                                disableAnimation
                                radius="none"
                                type="submit"
                            >
                                    <span
                                        className="uppercase text-white sm:text-xl md:text-base">{translation.submit}</span>
                                <span>
                    <Image src={"/image/arrowSubmit.svg"} as={NextImage} alt={translation.submit} width={24}
                           height={24}/>
                  </span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
