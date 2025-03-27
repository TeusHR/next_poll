'use client'
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useSession} from 'next-auth/react';
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {useLocale} from 'next-intl';
import {toast} from "react-toastify";
import revalidateFetch from '@/services/revalidateFetch';
import {ICreateInnovationFilterForm, IInnovationFilter, IUpdateInnovationFilterForm} from "@/types/InnovationFilter";
import {InnovationsFilters} from '@/services/CMS.service';
import {Language} from '@/types/Language';
import {Button, Input} from "@nextui-org/react";
import Select from "@/components/CMS/Select";

const EditFilterModal = () => {
    const {handleSubmit, control, formState, setValue, watch, clearErrors} = useForm<IUpdateInnovationFilterForm>({
        mode: "all",
        defaultValues: {
            name: "",
            filterId: new Set<string>,
        },
    });

    const {status} = useSession();
    const $apiAuth = useAxiosAuth();
    const [isLoading, setIsLoading] = useState(false);
    const language = useLocale();
    const [innovationFilters, setInnovationFilters] = useState<IInnovationFilter[]>([])

    const filterID = watch("filterId");

    const handlerFetchFilters = useCallback(() => {
        InnovationsFilters.getAll($apiAuth, language.toUpperCase()).then(res => {
            setInnovationFilters(res.sort((a, b) => a.name.localeCompare(b.name)))
        })
    }, [$apiAuth, language])

    useEffect(() => {
        handlerFetchFilters()
    }, [$apiAuth, handlerFetchFilters, language]);
    
    const handlerFilter = useCallback((keys:Set<string>)=> {
        const filters = Array.from(keys)[0]
        const name = innovationFilters.find((item)=>item.id===filters)
        setValue('name', name?.name || '')
        clearErrors('name')
        setValue('filterId', keys)
    }, [clearErrors, innovationFilters, setValue]);

    const onSubmit: SubmitHandler<IUpdateInnovationFilterForm> = async (dataForm) => {
        if (toast.isActive("toast-register") || status !== "authenticated") {
            return;
        }
        setIsLoading(true);

        try {
            const filterID = Array.from(dataForm.filterId)[0]
            const dataProduct: ICreateInnovationFilterForm = {
                name: dataForm.name,
                language: language.toUpperCase() as Language,
            };

            const status = await InnovationsFilters.update(dataProduct, filterID, $apiAuth);
            if (status === 200) {
                await revalidateFetch("directions-filter");
                handlerFetchFilters()
                toast.success("Запис успішно оновленно");
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
                        name="filterId"
                        control={control}
                        render={({field}) => (
                            <div className="w-full">
                                <div className={`flex justify-between items-end text-brand-gray-200 max-xl:!text-sm ${formState.errors.filterId?.message ? "text-red-600" : ""}`}>
                                    Виберіть напрямок
                                </div>
                                <Select options={innovationFilters.map(item => ({
                                    value: item.id.toString(),
                                    label: item.name
                                }))}
                                        selectionMode={'single'}
                                        placeholder={'Фільтр'}
                                        selected={field.value}
                                        isSearchable
                                        justify
                                        disabled={innovationFilters.length === 0}
                                        classNameList={"max-h-28"}
                                        onChange={handlerFilter}/>
                                {formState.errors.filterId?.message && (
                                    <div
                                        className="text-red-600 text-sm">{formState.errors.filterId.message}</div>
                                )}
                            </div>
                        )}
                    />
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
                                disabled={!(filterID.size > 0)}
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
                            Оновити
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditFilterModal;