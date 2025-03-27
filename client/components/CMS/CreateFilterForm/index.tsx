'use client'
import React, { useState } from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import { useSession } from 'next-auth/react';
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useLocale } from 'next-intl';
import {toast} from "react-toastify";
import revalidateFetch from '@/services/revalidateFetch';
import {ICreateInnovationFilterForm} from "@/types/InnovationFilter";
import {InnovationsFilters} from '@/services/CMS.service';
import { Language } from '@/types/Language';
import {Button, Input} from "@nextui-org/react";

const CreateFilterModal = () => {
    const {handleSubmit, control, formState, reset} = useForm<ICreateInnovationFilterForm>({
        mode: "all",
        defaultValues: {
            name: "",
        },
    });

    const {status} = useSession();
    const $apiAuth = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false);

    const language = useLocale();

    const onSubmit: SubmitHandler<ICreateInnovationFilterForm> = async (dataForm) => {
        if (toast.isActive("toast-register") || status !== "authenticated") {
            return;
        }
        setIsLoading(true);

        try {
            const dataProduct: ICreateInnovationFilterForm = {
                name: dataForm.name,
                language: language.toUpperCase() as Language,
            };

            const status = await InnovationsFilters.post(dataProduct, $apiAuth);
            if (status === 201) {
                await revalidateFetch("directions-filter");
                reset()
                toast.success("Запис успішно створено");
            }
        } catch (error) {
            console.log(error);
            toast.error("Щось пішло не так");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-4 max-2xl:gap-4 flex-col">
                    <Controller
                        name="name"
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
                                isInvalid={!!formState.errors.name?.message}
                                errorMessage={formState.errors.name?.message}
                            />
                        )}
                    />
                    <div className="flex w-full justify-center">
                        <Button className="px-6 bg-fd text-xl" type={"submit"} isLoading={isLoading}>
                            Створити
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default CreateFilterModal;