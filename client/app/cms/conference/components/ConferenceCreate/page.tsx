'use client'
import React, {useState} from 'react'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {CreateConferenceForm, IConferences, ICreateConferences} from "@/types/Conference";
import {useSession} from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {toast} from "react-toastify";
import {ConferencesService} from "@/services/CMS.service";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

const ConferenceCreate = ({}) => {
    const {
        handleSubmit,
        control,
        formState,
        resetField,
        setValue,
        reset,
        watch,
    } = useForm<CreateConferenceForm>({
        mode: 'all',
        defaultValues: {
            title: '',
            country: '',
            date: '',
            text: '',
            type: ''
        }
    })

    const [conferecePreview,
        setConferencePreview] = useState<IConferences>({
        country: "",
        createdAt: "",
        date: "",
        files: [],
        id: "",
        text: "",
        title: "",
        type: "SEMINAR",
        updatedAt: ""
    })

    const [conferenceFiles, setConferenceFiles] = useState('')
    const {status} = useSession()
    const $apiAuth = useAxiosAuth()

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<CreateConferenceForm> = async (dataForm) => {
        if (toast.isActive('toast-register') || status !== 'authenticated')
            return;

        setIsLoading(true)


        // let urlImage = await loadImageFile(dataForm.image, 'product', $apiAuth)
        // let urlImagePage = await loadImageFile(dataForm.pageImage, 'product', $apiAuth)

        if (true) {

            const dataProduct: ICreateConferences = {
                type: "SEMINAR",
                country: dataForm.country,
                date: dataForm.date,
                title: dataForm.title,
                text: dataForm.text,
                files: ['2342'],
            };

            ConferencesService.postConferences(dataProduct, $apiAuth).then((status) => {
                if (status === 201) {
                    reset()
                    toast.success('Конференцію успішно створено')
                }
            }).catch((error) => {
                console.log(error)
                toast.error('Щось пішло не так')
            }).finally(() => setIsLoading(false))
        } else {
            setIsLoading(false)
            toast.error('Зображення не було завантажено.')
        }
    }

    return (
        <div className="flex flex-col gap-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-12 max-2xl:gap-4 max-2xl:grid max-2xl:grid-cols-2">
                    <div
                        className="w-[300px] max-2xl:row-start-1 max-2xl:col-start-1 max-2xl:row-end-2 max-2xl:col-end-3">
                        <div className="rounded-[20px] w-[300px] bg-white px-8 py-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="w-full flex flex-col gap-4">
                                    <div className="text-black font-montserrat text-xl max-xl:text-base font-bold">
                                        Верифікація:
                                    </div>
                                    <div className="flex flex-row gap-4 w-full">
                                        <div className="flex flex-col gap-4 w-full relative">
                                            <Controller name="title" control={control} rules={{
                                                required: "Обов'язкове поле",
                                                validate: (value) => {
                                                    if (/^\d+$/.test(value))
                                                        return true
                                                    else
                                                        return 'Тільки цифри'
                                                }
                                            }} render={({field}) =>
                                                <Input className="border-none py-2"
                                                       type="text"
                                                       defaultValue={field.value}
                                                       isRequired
                                                       classNames={{
                                                           inputWrapper: "border-b-1 border-primary pb-[5px]",
                                                           input: "focus:outline-none text-xl text-primary px-2",
                                                           errorMessage: "text-red-600 text-base"
                                                       }}
                                                       max="50"
                                                       min="2"
                                                       placeholder="Пошка"
                                                       autoComplete="off"
                                                       isInvalid={!!formState.errors.title?.message}
                                                       errorMessage={formState.errors.title?.message}
                                                />
                                            }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center">
                                    {/*<Button onClick={(e) => handlerArticle(e)}*/}
                                    {/*        isLoading={isLoading}*/}
                                    {/*        className="px-6 bg-primary-400 text-xl">*/}
                                    {/*    Перевірити*/}
                                    {/*</Button>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col gap-4">
                        <div className="flex">
                            <div className="w-full flex flex-col gap-4">
                                <div className="text-black font-montserrat text-xl max-xl:text-base font-bold">
                                    Інформація:
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex flex-row gap-4 items-end w-full relative">
                                        <Controller name="text" control={control} rules={{
                                            required: "Обов'язкове поле",
                                            minLength: {value: 3, message: "Мінімальна довжина 3 символи"}
                                        }} render={({field}) =>
                                            <Input className="border-none py-2"
                                                   type="text"
                                                   defaultValue={field.value}
                                                   isRequired
                                                   classNames={{
                                                       inputWrapper: "border-b-1 border-primary pb-[5px]",
                                                       input: "focus:outline-none text-xl text-primary px-2",
                                                       errorMessage: "text-red-600 text-base"
                                                   }}
                                                   max="50"
                                                   min="2"
                                                   placeholder="Пошка"
                                                   autoComplete="off"
                                                   isInvalid={!!formState.errors.text?.message}
                                                   errorMessage={formState.errors.text?.message}
                                            />
                                        }
                                        />
                                        <Controller name="date" control={control}
                                                    rules={{
                                                        validate: (value) => {
                                                            if (value)
                                                                if (String(value).length > 10)
                                                                    return 'Число має бути менше 10 цифр'
                                                        },
                                                    }}
                                                    render={({field}) =>
                                                        <Input className="border-none py-2"
                                                               type="text"
                                                               defaultValue={field.value}
                                                               isRequired
                                                               classNames={{
                                                                   inputWrapper: "border-b-1 border-primary pb-[5px]",
                                                                   input: "focus:outline-none text-xl text-primary px-2",
                                                                   errorMessage: "text-red-600 text-base"
                                                               }}
                                                               max="50"
                                                               min="2"
                                                               placeholder="Пошка"
                                                               autoComplete="off"
                                                               isInvalid={!!formState.errors.date?.message}
                                                               errorMessage={formState.errors.date?.message}
                                                        />
                                                    }
                                        />
                                    </div>
                                    <div className="flex flex-row gap-4 items-end w-full relative">
                                        <Controller name="type" control={control} rules={{
                                            required: "Обов'язкове поле",
                                        }} render={({field}) =>
                                            <Input className="border-none py-2"
                                                   type="text"
                                                   defaultValue={field.value}
                                                   isRequired
                                                   classNames={{
                                                       inputWrapper: "border-b-1 border-primary pb-[5px]",
                                                       input: "focus:outline-none text-xl text-primary px-2",
                                                       errorMessage: "text-red-600 text-base"
                                                   }}
                                                   max="50"
                                                   min="2"
                                                   placeholder="Пошка"
                                                   autoComplete="off"
                                                   isInvalid={!!formState.errors.type?.message}
                                                   errorMessage={formState.errors.type?.message}
                                            />
                                        }
                                        />
                                        <Controller name="country" control={control}
                                                    render={({field}) =>
                                                        <Input className="border-none py-2"
                                                               type="text"
                                                               defaultValue={field.value}
                                                               isRequired
                                                               classNames={{
                                                                   inputWrapper: "border-b-1 border-primary pb-[5px]",
                                                                   input: "focus:outline-none text-xl text-primary px-2",
                                                                   errorMessage: "text-red-600 text-base"
                                                               }}
                                                               max="50"
                                                               min="2"
                                                               placeholder="Пошка"
                                                               autoComplete="off"
                                                               isInvalid={!!formState.errors.country?.message}
                                                               errorMessage={formState.errors.country?.message}
                                                        />
                                                    }
                                        />
                                    </div>
                                    <div className="flex flex-row gap-4 items-end w-full relative">
                                        <Controller name="files" control={control} rules={{
                                            required: "Обов'язкове поле",
                                        }} render={({field: {onChange, value}}) =>
                                            <Input className="border-none py-2"
                                                   type="text"
                                                   defaultValue={''}
                                                   isRequired
                                                   classNames={{
                                                       inputWrapper: "border-b-1 border-primary pb-[5px]",
                                                       input: "focus:outline-none text-xl text-primary px-2",
                                                       errorMessage: "text-red-600 text-base"
                                                   }}
                                                   max="50"
                                                   min="2"
                                                   placeholder="Пошка"
                                                   autoComplete="off"
                                                   isInvalid={!!formState.errors.files?.message}
                                                   errorMessage={formState.errors.files?.message}
                                            />
                                        }
                                        />
                                    </div>
                                    {/*<text className="flex flex-row gap-4 items-end w-full relative">*/}
                                    {/*    <Controller name="price" control={control}*/}
                                    {/*                rules={{*/}
                                    {/*                    required: "Обов'язкове поле",*/}
                                    {/*                    validate: (value) => {*/}
                                    {/*                        if (value) {*/}
                                    {/*                            if (String(value).length > 10)*/}
                                    {/*                                return 'Число має бути менше 10 цифр'*/}
                                    {/*                            if (value < 0)*/}
                                    {/*                                return 'Ціна має бути більше 0'*/}
                                    {/*                        }*/}

                                    {/*                    },*/}

                                    {/*                }} render={({field}) =>*/}
                                    {/*        <FormControl isRequired isInvalid={!!formState.errors.price?.message}*/}
                                    {/*                     className="min-h-[110px]">*/}
                                    {/*            <FormLabel*/}
                                    {/*                className="text-brand-gray-200 max-xl:!text-sm">Ціна</FormLabel>*/}
                                    {/*            <InputGroup className="!block !isolation-auto">*/}
                                    {/*                <Input borderRadius={20} h={50} className="border-brand-gray-200"*/}
                                    {/*                       type="number"*/}
                                    {/*                       value={field.value}*/}
                                    {/*                       disabled={missArticle}*/}
                                    {/*                       onChange={(e) => field.onChange(e.target.value)}/>*/}
                                    {/*                <InputRightElement className="h-full pr-4">*/}
                                    {/*                    {missArticle && <LockIcon color="brand.gray.200"*/}
                                    {/*                                              className="transition-colors"/>*/}
                                    {/*                    }*/}
                                    {/*                </InputRightElement>*/}
                                    {/*            </InputGroup>*/}
                                    {/*            {formState.errors.price?.message &&*/}
                                    {/*                <FormErrorMessage>{formState.errors.price.message}</FormErrorMessage>}*/}
                                    {/*        </FormControl>}*/}
                                    {/*    />*/}
                                    {/*    <Controller name="carbohydrates" control={control}*/}
                                    {/*                rules={{*/}
                                    {/*                    validate: (value) => {*/}
                                    {/*                        if (value)*/}
                                    {/*                            if (String(value).length > 10)*/}
                                    {/*                                return 'Число має бути менше 10 цифр'*/}
                                    {/*                    },*/}
                                    {/*                }}*/}
                                    {/*                render={({field}) =>*/}
                                    {/*                    <FormControl*/}
                                    {/*                        isInvalid={!!formState.errors.carbohydrates?.message}*/}
                                    {/*                        className="min-h-[110px]">*/}
                                    {/*                        <FormLabel*/}
                                    {/*                            className="text-brand-gray-200 max-xl:!text-sm">Вуглеводи</FormLabel>*/}
                                    {/*                        <InputGroup className="!block !isolation-auto">*/}
                                    {/*                            <Input borderRadius={20} h={50}*/}
                                    {/*                                   className="border-brand-gray-200"*/}
                                    {/*                                   type="number"*/}
                                    {/*                                   value={field.value}*/}
                                    {/*                                   disabled={missArticle}*/}
                                    {/*                                   onChange={(e) => field.onChange(e.target.value)}/>*/}
                                    {/*                            <InputRightElement className="h-full pr-4">*/}
                                    {/*                                {missArticle && <LockIcon color="brand.gray.200"*/}
                                    {/*                                                          className="transition-colors"/>*/}
                                    {/*                                }*/}
                                    {/*                            </InputRightElement>*/}
                                    {/*                        </InputGroup>*/}
                                    {/*                        {formState.errors.carbohydrates?.message &&*/}
                                    {/*                            <FormErrorMessage>{formState.errors.carbohydrates.message}</FormErrorMessage>}*/}
                                    {/*                    </FormControl>}*/}
                                    {/*    />*/}
                                    {/*</text>*/}
                                    {/*<text className="flex flex-row w-full relative">*/}
                                    {/*    <Controller name="description" control={control} render={({field}) =>*/}
                                    {/*        <FormControl isInvalid={!!formState.errors.description?.message}*/}
                                    {/*                     className="min-h-[110px]">*/}
                                    {/*            <FormLabel className="text-brand-gray-200 max-xl:!text-sm">Опис</FormLabel>*/}
                                    {/*            <Textarea borderRadius={20} h={170}*/}
                                    {/*                      className="border-brand-gray-200 text-sm"*/}
                                    {/*                      size="xs"*/}
                                    {/*                      resize="none"*/}
                                    {/*                      disabled={missArticle}*/}
                                    {/*                      value={field.value}*/}
                                    {/*                      onChange={(e) => field.onChange(e.target.value)}/>*/}
                                    {/*            {formState.errors.description?.message &&*/}
                                    {/*                <FormErrorMessage>{formState.errors.description.message}</FormErrorMessage>}*/}
                                    {/*        </FormControl>}*/}
                                    {/*    />*/}
                                    {/*</text>*/}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <Button type={"submit"}
                                    isLoading={isLoading}
                                    className="px-6 bg-fd text-xl">
                                Створити
                            </Button>
                        </div>
                    </div>
                    <div className="rounded-[20px] w-full bg-white px-8 py-6 flex flex-col gap-4 h-max">
                        <div className="flex">
                            <div className="w-full flex flex-col gap-4">
                                <div className="text-black font-montserrat text-xl max-xl:text-base font-bold">
                                    Налаштування:
                                </div>
                                {/*<text className="grid grid-cols-2 gap-4 w-full">*/}
                                {/*    <text className="flex flex-col gap-4 w-full relative">*/}
                                {/*        <Controller name="ingredients" control={control} render={({field}) =>*/}
                                {/*            <FormControl isInvalid={!!formState.errors.ingredients?.message}*/}
                                {/*                         className="min-h-[110px]">*/}
                                {/*                <FormLabel*/}
                                {/*                    className="text-brand-gray-200 max-xl:!text-sm">Інгредієнти</FormLabel>*/}
                                {/*                <SelectID options={ingredients.map(item => ({label: item.title, value: item.id.toString()}))}*/}
                                {/*                          selectionMode={'multiple'}*/}
                                {/*                          isSearchable*/}
                                {/*                          justify*/}
                                {/*                          selected={field.value}*/}
                                {/*                          disabled={missArticle || ingredients.length === 0}*/}
                                {/*                          onChange={field.onChange}/>*/}
                                {/*                {formState.errors.ingredients?.message &&*/}
                                {/*                    <FormErrorMessage>{formState.errors.ingredients.message}</FormErrorMessage>}*/}
                                {/*            </FormControl>}*/}
                                {/*        />*/}
                                {/*        <Controller name="filterCategories" control={control} render={({field}) =>*/}
                                {/*            <FormControl isInvalid={!!formState.errors.filterCategories?.message}*/}
                                {/*                         className="min-h-[110px]">*/}
                                {/*                <FormLabel*/}
                                {/*                    className="text-brand-gray-200 max-xl:!text-sm">Фільтри</FormLabel>*/}
                                {/*                <SelectID options={FilterCategories.map(item => ({label: item.name, value: item.id.toString()}))}*/}
                                {/*                          selected={field.value}*/}
                                {/*                          justify*/}
                                {/*                          disabled={(watchCategories === undefined || watchCategories.size === 0 || FilterCategories.length === 0) || missArticle}*/}
                                {/*                          selectionMode={'multiple'}*/}
                                {/*                          onChange={field.onChange}/>*/}
                                {/*                {formState.errors.filterCategories?.message &&*/}
                                {/*                    <FormErrorMessage>{formState.errors.filterCategories.message}</FormErrorMessage>}*/}
                                {/*            </FormControl>}*/}
                                {/*        />*/}
                                {/*    </text>*/}
                                {/*    <text className="flex flex-col gap-4 w-full relative">*/}
                                {/*        <Controller name="categories" control={control}*/}
                                {/*                    rules={{*/}
                                {/*                        required: 'Обязательное поле',*/}
                                {/*                        validate: value => value.size === 0 ? 'Обязательное поле' : true*/}
                                {/*                    }}*/}
                                {/*                    render={({field}) =>*/}
                                {/*                        <FormControl isRequired isInvalid={!!formState.errors.categories?.message}*/}
                                {/*                                     className="min-h-[110px]">*/}
                                {/*                            <FormLabel*/}
                                {/*                                className="text-brand-gray-200 max-xl:!text-sm">Категорія</FormLabel>*/}
                                {/*                            <SelectID options={categories.map(item => ({label: item.name, value: item.id.toString()}))}*/}
                                {/*                                      selected={field.value}*/}
                                {/*                                      justify*/}
                                {/*                                      disabled={missArticle || categories.length === 0}*/}
                                {/*                                      onChange={field.onChange}/>*/}
                                {/*                            {formState.errors.categories?.message &&*/}
                                {/*                                <FormErrorMessage>{formState.errors.categories.message}</FormErrorMessage>}*/}
                                {/*                        </FormControl>}*/}
                                {/*        />*/}
                                {/*        <Controller name="subCategories" control={control} render={({field}) =>*/}
                                {/*            <FormControl isInvalid={!!formState.errors.subCategories?.message}*/}
                                {/*                         className="min-h-[110px]">*/}
                                {/*                <FormLabel className="text-brand-gray-200 max-xl:!text-sm">Підкатегорія</FormLabel>*/}
                                {/*                <SelectID options={subCategories.map(item => ({label: item.name, value: item.id.toString()}))}*/}
                                {/*                          selected={field.value}*/}
                                {/*                          justify*/}
                                {/*                          disabled={(watchCategories === undefined || watchCategories.size === 0 || subCategories.length === 0) || missArticle}*/}
                                {/*                          onChange={field.onChange}/>*/}
                                {/*                {formState.errors.subCategories?.message &&*/}
                                {/*                    <FormErrorMessage>{formState.errors.subCategories.message}</FormErrorMessage>}*/}
                                {/*            </FormControl>}*/}
                                {/*        />*/}
                                {/*    </text>*/}
                                {/*</text>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/*{!missArticle && <PreviewProduct product={productPreview}/>}*/}
        </div>
    )
}

export default ConferenceCreate;