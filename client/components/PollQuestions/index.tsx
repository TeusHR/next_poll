import React, {FC} from 'react';
import Title from "@/UI/Title";
import {
    Control,
    Controller,
    FieldArrayWithId,
    FieldPath,
    FormState,
    UseFormSetError,
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
    formState: FormState<IPoll>,
    setError: UseFormSetError<IPoll>,
    clearErrors: (name?: (FieldPath<IPoll> | FieldPath<IPoll>[] | `root.${string}` | "root")) => void,
}

const Questions: FC<Props> = ({index, control, formState, item, clearErrors, setError}) => {

    return (
        <div className="flex flex-col gap-2 p-4 bg-[rgba(43,42,40,0.85)] text-white rounded-xl">
            <Title text={questions[index].label} style="font-black text-xl max-bg:text-base"/>
            <div className="space-y-2" key={`${item.id}`}>
                {questions[index].items.map((itemQuest, idxQues) => (
                    <div key={`${item.id}-${idxQues}`} className="flex items-center gap-4 justify-between max-xsm:items-start max-xsm:flex-col">
                        <span className="text-bold">{itemQuest.key}. {itemQuest.text}</span>
                        <Controller
                            name={`question.${index}.${itemQuest.key}` as const}
                            control={control}
                            rules={{
                                validate: async (value, formValues) => {
                                    const sum = Object.values(formValues.question[index] || {}).reduce((acc, val) => acc + (Number(val) || 0), 0);
                                    if (sum !== 11) {
                                        setError(`question.${index}`, {
                                            type: 'custom',
                                            message: 'Сума повинна дорівнювати 11'
                                        })
                                        return true
                                    }
                                    clearErrors(`question.${index}`)
                                    return true
                                },
                            }}
                            defaultValue={0}
                            render={({field}) => (
                                <NumberInput
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value)
                                    }}
                                    aria-label={itemQuest.text}
                                    classNames={{base: "max-w-[85px]"}}
                                    minValue={0}
                                    maxValue={11}
                                    step={1}
                                />
                            )}
                        />
                    </div>
                ))}
            </div>
            {formState.errors.question && (<p className="text-red-600 text-sm">
                {formState.errors?.question?.[index]?.message}
            </p>)}
        </div>
    );
};

export default Questions;