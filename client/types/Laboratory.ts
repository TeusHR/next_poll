import {IDevelopments, IDevelopmentsForm} from "@/types/LaboratoryDevelopments";

export interface ICreateLaboratory {
    title:string
    text:string
    images:string[]
    files:string[]
}


export interface ILaboratory {
    id:string
    title:string
    text:string
    images:string[]
    files:string[]
    developments:IDevelopments[]
    createdAt:string
    updatedAt:string
}

export interface ILaboratoryForm {
    title:string
    text:string
    images:FileList
    files:FileList
    developments:IDevelopmentsForm[]
}