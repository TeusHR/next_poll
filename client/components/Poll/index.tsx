'use client'
import React, {useState} from "react";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Questions from "@/components/PollQuestions";
import {Button, Input, Radio, RadioGroup} from "@heroui/react";
import tableMapping from "@/utils/TableMapping";
import {IFeedbackForm} from "@/types/Feedback";
import {sendMail} from "../../lib/send-mail";

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
    const {handleSubmit, control, formState, reset, watch, setError, clearErrors} = useForm<IPoll>({
        mode: "all",
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

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<IPoll> = async (dataForm) => {

        console.log(dataForm)
        const typeScores = calculatePersonalityDistribution(dataForm.question)
        console.log(calculatePersonalityDistribution(dataForm.question))
        setIsLoading(true);
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

            const descriptions = [
                "Рівень розвитку потреби у високій заробітної плати та матеріальну винагороду. Бажання мати роботу з гарним набором пільг та надбавок.",
                "Рівень розвитку потреби у добрих умовах роботита комфортній навколишній обстановці.",
                "Рівень розвитку потреби у структуруванні роботи, наявності зворотного зв'язку та інформації, що дозволяє судити про результати своєї роботи, потребу в зниженні невизначеності та встановлення правил та директив виконання роботи.",
                "Рівень розвитку потреби в соціальних контактах: спілкування з широким колом людей, легкий ступінь довірливості та зв'язків із колегами.",
                "Рівень розвитку потреби у формуванні та підтримцідовгострокових, стабільних взаємин,мале число колег по роботі, значний ступінь близькості взаємин, довірливості.",
                "Рівень розвитку потреби у завоюванні ппізнання з боку інших людейу тому, щоб оточуючі цінували заслуги, досягнення та успіхи індивідуума.",
                "Рівень розвитку потреби впостановці для себе сміливих, складних цілей та їх досягненні, дотримання поставлених цілей і бути самим мотивованим.",
                "Рівень розвитку потреби у впливовості та владі: прагнення керувати іншими, наполегливе прагнення конкуренції та впливовості.",
                "Рівень розвитку потреби в різноманітності та змінах , прагнення уникати рутини, нудьги.",
                "Рівень розвитку потреби в креативності: потреба бути аналізуючим, думаючим працівником, відкритим для нових ідей.",
                "Рівень розвитку потреби у самовдосконаленні, зростанні та розвитку як особистості.",
                "Рівень розвитку потреби в цікавій суспільно корисній роботі:потреба у роботі наповненій змістом, з елементом суспільної корисності.",
            ];

            const value = [75, 60, 50, 80, 40, 70, 65, 55, 45, 90, 85, 95];

            const descriptionsWithValue = descriptions.map((desc, i) => ({
                number: i + 1,
                text: desc,
                value: value[i],
            }));
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


            const response = await sendMail({
                email: "workemailtemp7@gmail.com",
                subject: "Форма зворотного зв'язку",
                sendTo: process.env.ROOT_EMAIL,
                text: 'test',
                html: generateHtml(feedback,
                    descriptionsWithValue,
                    questionsFormatted,)
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

    const generateHtml = (
        feedback: any,
        descriptionsWithValue: { number: number; text: string; value: number }[],
        questionsFormatted: {
            number: number;
            answers: { letter: string; value: number }[];
        }[],
    ): string => {
        const descHtml = descriptionsWithValue
            .map(
                (d) => `<p><strong>${d.number}.</strong> ${d.text} - ${d.value}%</p>`,
            )
            .join("");

        const questionsHtml = questionsFormatted
            .map(
                (q) =>
                    `<p><strong>Питання - ${q.number}</strong></p>
       <ul style="margin-top: 0; margin-bottom: 0.5rem;">
         ${q.answers.map((a) => `<li>${a.letter} ${a.value}</li>`).join("")}
       </ul>`,
            )
            .join("");

        return `
     <div style="max-width: 600px; margin: 20px auto; padding: 20px; font-family: Roboto, sans-serif; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 8px;">
       <h2>Зворотній зв'язок від ${feedback.name}</h2>
       <label>Пошта: <span>${feedback.email}</span></label>
       <h4>Вік: <span>${feedback.age}</span></h4>
       <h4>Стать: <span>${feedback.gender}</span></h4>
       <div class="result-values">${descHtml}</div>
       <h3>Результати по питаннях:</h3>
       ${questionsHtml}
     </div>
   `;
    }

    const calculatePersonalityDistribution = (answers: Calc[]): number[] => {
        const typeScores = Array(12).fill(0);

        answers.forEach((answer, questionIndex) => {
            for (let typeIndex = 0; typeIndex < 12; typeIndex++) {
                const relevantLetter = tableMapping[questionIndex][typeIndex]; // 'a' | 'b' | 'c' | 'd' | null
                if (relevantLetter && answer[relevantLetter] !== undefined) {
                    typeScores[typeIndex] += Number(answer[relevantLetter]);

                }
            }
        });

        return typeScores;
    };

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
                                            isInvalid={!!formState.errors.name?.message}
                                            errorMessage={formState.errors.name?.message}
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
                                            variant="bordered"
                                            key="gmail"
                                            max="50"
                                            min="2"
                                            label={"Пошта"}
                                            labelPlacement={"inside"}
                                            autoComplete="off"
                                            isInvalid={!!formState.errors.email?.message}
                                            errorMessage={formState.errors.email?.message}
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
                                            variant="bordered"
                                            key="age"
                                            max="50"
                                            min="2"
                                            label={"Ваш вік:"}
                                            labelPlacement={"inside"}
                                            autoComplete="off"
                                            isInvalid={!!formState.errors.age?.message}
                                            errorMessage={formState.errors.age?.message}
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
                                            {formState.errors.gender?.message && (
                                                <div
                                                    className="text-red-600 text-sm relative">{formState.errors.gender.message}</div>
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
                    <div className="flex gap-12 max-2xl:gap-4 flex-col items-center w-full">
                        {!formHidden && (
                            <>
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
                                                   formState={formState}/>))
                                    }
                                </div>
                                <div className="flex justify-center relative items-center">
                                    <Button type={"submit"} isLoading={isLoading} className="px-6 bg-fd text-xl">
                                        Відправити
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </form>
        </>
    );
};

export default Poll;