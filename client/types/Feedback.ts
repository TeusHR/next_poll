import {Calc} from "@/components/Poll";

export interface IFeedbackForm {
    name: string,
    email: string,
    gender:string,
    age:string,
    value: number[],
    question: Calc[],
}

export interface IFeedback{
    id:string,
    name: string,
    email: string,
    gender:string,
    age:string,
    createAt:string,
}