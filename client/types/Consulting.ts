import {uploadType} from "../app/(dashboard)/cms/innovations/components/InnovationsEdit";

export interface IConsulting {
    id: string
    title: string
    text: string
    images:IConsultingImages[]
    "createdAt": string
    "updatedAt": string
}

export interface IConsultingImages  {
    image:string,
    description:string
}

export interface ICreateConsulting {
    title: string
    text: string
    images:IConsultingImages[]
}

export type ICreateConsultingForm = {
    title: string
    text: string
    files: FileList,
    images:IConsultingImages[]
    training:ICreateTrainingForm[]
}

export type ICreateTrainingForm  = {
    title:string
    text:string
    images:uploadType[]
    files:uploadType[]
}

export interface ICreateTraining {
    title:string
    text:string
    images:string[]
    files:string[]
}


export type ITraining  = {
    id:string
    title:string
    text:string
    images:string[]
    files:string[]
    createdAt:string
    updatedAt:string
}