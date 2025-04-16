import React, {FC, useEffect} from 'react';
import Title from "@/UI/Title";
import {
    Control,
    Controller,
    FieldArrayWithId, FieldError, FieldErrorsImpl,
    FieldPath,
    Merge,
    UseFormSetError,
    useWatch,
} from "react-hook-form";
import {IPoll} from "@/components/Poll";
import {questions} from "@/utils/TableMapping";
import {NumberInput} from "@heroui/react";

export type IQuestion = {
    label: string,
    items: IQuestionItems[]
};

export type IQuestionItems = {
    key: 'a' | 'b' | 'c' | 'd',
    text: string,
}

type Props = {
    index: number,
    item: FieldArrayWithId<IPoll, "question", "id">,
    control: Control<IPoll, any>,
    setError: UseFormSetError<IPoll>,
    clearErrors: (name?: (FieldPath<IPoll> | FieldPath<IPoll>[] | `root.${string}` | "root")) => void,
    dirtyFields: {
        a?: boolean | undefined
        b?: boolean | undefined
        c?: boolean | undefined
        d?: boolean | undefined
    } | undefined,
    errors: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{
        a: number
        b: number
        c: number
        d: number
    }>> | undefined)[]> | undefined,
}

const Questions: FC<Props> = ({index, control, item, clearErrors, setError, dirtyFields, errors}) => {

    const watchQuestion = useWatch({
        control,
        name: `question.${index}`
    });

    useEffect(() => {
        if (!dirtyFields) return;

        const sum = Object.values(watchQuestion || {}).reduce((acc, val) => acc + (Number(val) || 0), 0);

        if (sum !== 11) {
            setError(`question.${index}`, {
                type: "manual",
                message: "Сума повинна дорівнювати 11"
            });
        } else {
            clearErrors(`question.${index}`);
        }

    }, [index, setError, clearErrors, dirtyFields, watchQuestion]);

    return (
        <div className="flex flex-col gap-2 p-4 test-black bg-white rounded-xl">
            <Title text={`${index + 1}. ${questions[index].label}`} style="font-black text-xl max-bg:text-base"/>
            <div className="space-y-2" key={`${item.id}`}>
                {questions[index].items.map((itemQuest, idxQues) => (
                    <div key={`${item.id}-${idxQues}`}
                         className="flex items-center gap-4 justify-between max-xsm:items-start max-xsm:flex-col">
                        <span className="text-bold">{itemQuest.key}. {itemQuest.text}</span>
                        <Controller
                            name={`question.${index}.${itemQuest.key}` as const}
                            control={control}
                            rules={{
                                validate: async (value, formValues) => {
                                    const sum = Object.values(formValues.question[index] || {}).reduce((acc, val) => acc + (Number(val) || 0), 0);
                                    if (sum !== 11) {
                                        return `Сума повинна дорівнювати 11`
                                    }
                                    return undefined
                                },
                            }}
                            defaultValue={0}
                            render={({field}) => (
                                <NumberInput
                                    value={field.value}
                                    ref={field.ref}
                                    onChange={(value) => {
                                        const raw = typeof value === 'number' ? value : Number(value.target.value);

                                        if (isNaN(raw)) {
                                            return;
                                        }

                                        const newValue = Math.max(0, Math.min(11, raw));
                                        field.onChange(newValue);
                                    }}
                                    aria-label={itemQuest.text}
                                    classNames={{base: "max-w-[85px]"}}
                                    step={1}
                                />
                            )}
                        />
                    </div>
                ))}
            </div>
            <p className="text-red-600 text-sm">
                {errors && errors[index]?.message || errors?.[index]?.a?.message}
            </p>
        </div>
    );
};

export default Questions;