'use client'
import React, {useEffect, useState} from "react";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Questions from "@/components/PollQuestions";
import {Button, Input, Radio, RadioGroup} from "@heroui/react";
import {IFeedbackForm} from "@/types/Feedback";
import {sendMail} from "../../lib/send-mail";
import {
    calculatePersonalityDistribution,
} from "@/utils/calculatePersonalityDistribution";
import {generateHtml} from "@/utils/generateHtml";

export type IPoll = {
    question: Calc[]
    name: string,
    email: string,
    gender: string,
    age: string,
}

export type Calc = {
    a: number,
    b: number,
    c: number,
    d: number,
}


const Poll = () => {
    const {handleSubmit, control, formState: {errors, dirtyFields}, setError, clearErrors, setFocus} = useForm<IPoll>({
        mode: "onSubmit",
        shouldFocusError:true,
        defaultValues: {
            name: "",
            email: "",
            age: "",
            question: [
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,

                }, {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                }, {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
                {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                },
            ]
        }
    });

    const {fields} = useFieldArray({control, name: "question"});
    const [formHidden, setFormHidden] = useState<boolean>(true)

    useEffect(() => {
        const firstError = Object.keys(errors).find((field) => !!errors[field as keyof typeof errors]);
        if (firstError) {
            setFocus(firstError as keyof IPoll);
        }
    }, [errors, setFocus]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<IPoll> = async (dataForm) => {
        setIsLoading(true);
        const typeScores = calculatePersonalityDistribution(dataForm.question)
        try {

            const total = typeScores.reduce((sum, val) => sum + val, 0);
            const totalPercentage = typeScores.map(score => Math.round((score / total) * 100))
            const dataProduct: IFeedbackForm = {
                name: dataForm.name,
                email: dataForm.email,
                gender: dataForm.gender,
                age: dataForm.age,
                question: dataForm.question,
                value: totalPercentage
            };
            const feedback: any = {
                name: dataProduct.name,
                email: dataProduct.email,
                value: dataProduct.value,
                gender: dataProduct.gender === "male" ? "чоловік" : "жінка",
                age: dataProduct.age,
            };

            const questionAnswers = dataProduct.question || [];

            const questionsFormatted = questionAnswers.map((q, i) => {
                return {
                    number: i + 1,
                    answers: Object.entries(q).map(([key, value]) => ({
                        letter: key.toUpperCase(),
                        value,
                    })),
                };
            });

            const html = generateHtml(feedback, dataProduct.value, questionsFormatted);

            const response = await sendMail({
                email: "workemailtemp7@gmail.com",
                subject: "Форма зворотного зв'язку",
                sendTo: process.env.ROOT_EMAIL,
                text: 'test',
                html:html,
            });

            if (response?.messageId) {
                toast.success("Успішно");
            } else {
                toast.error('Failed To send application.');
            }

        } catch (error) {
            console.log(error);
            toast.error("Щось пішло не так");
        } finally {
            setIsLoading(false);
        }
    };

    // const questionsContent = useMemo(() => (
    //     fields.map((item, index) => (
    //         <Questions key={item.id}
    //                    control={control}
    //                    item={item}
    //                    index={index}
    //                    setError={setError}
    //                    clearErrors={clearErrors}
    //                    dirtyFields={formState.dirtyFields?.question?.[index]}
    //         />
    //     ))
    // ), [clearErrors, control, fields, formState.dirtyFields?.question, setError]);
    
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div
                    className="xl:container mx-auto py-10 flex gap-12 max-2xl:gap-4 flex-col items-center w-full px-6 ">
                    <div className="max-w-[400px] rounded-xl flex h-full flex-col">
                        <div className="pt-14 w-full min-h-[500px] text-primary px-4 rounded-xl">
                            <div
                                className="text-3xl max-sm:text-center text-center sm:text-4xl xl:text-2xl md:text-xl relative text-white">
                                <span className="font-semibold">Заповніть форму</span>
                            </div>
                            <div className="flex flex-col mt-4 gap-4">
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: "Обов'язкове поле",
                                        minLength: {value: 3, message: "Мінімальна довжина 3 символи"},
                                        maxLength: {value: 50, message: "Максимальна довжина 50 символів"},
                                    }}
                                    render={({field}) => (
                                        <Input
                                            className="border-none py-2"
                                            type="text"
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            ref={field.ref}
                                            key="name"
                                            classNames={{
                                                input: "focus:outline-none text-xl text-primary",
                                                inputWrapper: "border-2 rounded-full px-6 bg-white data-[hover=true]:border-[#FEC938] data-[focus=true]:!border-[#FEC938]",
                                                label: "text-lg text-primary",
                                                errorMessage: "text-red-600 text-base",
                                            }}
                                            variant="bordered"
                                            max="50"
                                            min="2"
                                            label={"Прізвище та Імʼя"}
                                            labelPlacement={"inside"}
                                            autoComplete="off"
                                            isInvalid={!!errors.name?.message}
                                            errorMessage={errors.name?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Обов'язкове поле",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Невірна адреса електронної пошти",
                                        },
                                    }}
                                    render={({field}) => (
                                        <Input
                                            // className="border-none py-2"
                                            type="email"
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            classNames={{
                                                input: "focus:outline-none text-xl text-primary",
                                                inputWrapper: "border-2 rounded-full px-6 bg-white data-[hover=true]:border-[#FEC938] data-[focus=true]:!border-[#FEC938]",
                                                label: "text-lg text-primary",
                                                errorMessage: "text-red-600 text-base",
                                            }}
                                            ref={field.ref}
                                            variant="bordered"
                                            key="gmail"
                                            max="50"
                                            min="2"
                                            label={"Пошта"}
                                            labelPlacement={"inside"}
                                            autoComplete="off"
                                            isInvalid={!!errors.email?.message}
                                            errorMessage={errors.email?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="age"
                                    control={control}
                                    rules={{
                                        required: "Обов'язкове поле",
                                    }}
                                    render={({field}) => (
                                        <Input
                                            className="border-none py-2"
                                            type="text"
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            classNames={{
                                                input: "focus:outline-none text-xl text-primary",
                                                inputWrapper: "border-2 rounded-full px-6 bg-white data-[hover=true]:border-[#FEC938] data-[focus=true]:!border-[#FEC938]",
                                                label: "text-lg text-primary",
                                                errorMessage: "text-red-600 text-base",
                                            }}
                                            ref={field.ref}
                                            variant="bordered"
                                            key="age"
                                            max="50"
                                            min="2"
                                            label={"Ваш вік:"}
                                            labelPlacement={"inside"}
                                            autoComplete="off"
                                            isInvalid={!!errors.age?.message}
                                            errorMessage={errors.age?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{
                                        required: "Обов'язкове поле",
                                    }}
                                    render={({field}) => (
                                        <div className="w-full">
                                            <RadioGroup label="Стать:"
                                                        value={field.value}
                                                        ref={field.ref}
                                                        color={"warning"}
                                                        classNames={{
                                                            base: "flex flex-row items-center",
                                                            wrapper: 'flex flex-row',
                                                            label: "text-white"
                                                        }}
                                                        onValueChange={field.onChange}>
                                                <Radio value="male"
                                                       classNames={{
                                                           label: "text-lg text-white"
                                                       }}>
                                                    Чоловік
                                                </Radio>
                                                <Radio value="female"
                                                       classNames={{
                                                           label: "text-lg text-white",
                                                       }}>
                                                    Жінка
                                                </Radio>
                                            </RadioGroup>
                                            {errors.gender?.message && (
                                                <div
                                                    className="text-red-600 text-sm relative">{errors.gender.message}</div>
                                            )}
                                        </div>
                                    )}
                                />
                                <Button isLoading={isLoading} onPress={() => setFormHidden(false)}
                                        className="px-6 bg-fd text-xl">
                                    Почати
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={`flex gap-12 max-2xl:gap-4 flex-col items-center w-full ${!formHidden ? 'block' : 'hidden' }`}>
                                <div
                                    className="py-6 rounded-xl test-black bg-white relative px-16 max-xsm:px-4 ">
                                    <span>Вам потрібно розподілити 11 балів між чотирма варіантами кожного із тверджень, про позначені літерами (а), (b), (с) та (d). Усього тверджень 33, отже, виходить загалом 363 бали. Якщо вам здається, що один із факторів найбільш важливий для вас, оцініть його в 11 балів; якщо ж ви вважаєте його зовсім не суттєвим, не присуджуйте йому жодного бала; в інших випадках постарайтеся на власний розсуд розподілити всі 11 балів між чотирма запропонованими у кожному затвердженні факторами. Слідкуйте за тим, щоб було присуджено всі 11 балів. Як приклад розберемо таке твердження:</span>
                                    <br/>
                                    <br/>
                                    <div>
                                        <span className="font-bold">Я хотів би мати таку роботу, на якій:</span>
                                        <ul>
                                            <li>(a) була б хороша заробітна плата та додаткові пільги</li>
                                            <li>(b) я міг би планувати роботу на свій розсуд</li>
                                            <li>(c) мою діяльність змогли б помітити та оцінити інші люди</li>
                                            <li>(d) було б багато різноманітності та змін</li>
                                        </ul>
                                    </div>
                                    <br/>
                                    <span>
                                        Якщо ви вважаєте найбільш важливими для себе твердження (а) та (b), то можете присудити їм, скажімо, 6 і 5 балів відповідно, нічого не залишаючи для оцінки інших двох варіантів – (с) та (d). Цілком неважливо, яким чином ви розподілятимете 11 балів між чотирма варіантами, найголовніше, щоб оцінки важливості кожного варіанту затвердження в сумі становили б 11 балів. Бали, що присуджуються вами кожному фактору, слід вказати безпосередньо у вікні навпроти кожного затвердження.
                                    </span>
                                </div>
                                <div
                                    className="grid grid-cols-1 max-w-[950px] relative gap-10 max-sm:gap-6 justify-center w-full">
                                    {fields.map((item, index) => (
                                        <Questions key={item.id}
                                                   control={control}
                                                   item={item}
                                                   index={index}
                                                   setError={setError}
                                                   clearErrors={clearErrors}
                                                   dirtyFields={dirtyFields?.question?.[index]}
                                                   errors={errors?.question}
                                                   />))
                                    }
                                </div>
                                <div className="flex justify-center relative items-center">
                                    <Button type={"submit"} isLoading={isLoading} className="px-6 bg-fd text-xl">
                                        Відправити
                                    </Button>
                                </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Poll;