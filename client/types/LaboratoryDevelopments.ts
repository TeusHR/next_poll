import {uploadType} from "../app/(dashboard)/cms/innovations/components/InnovationsEdit";


export interface ICreateDevelopments {
    title:string
    text:string
    images:string[]
    files:string[]
    laboratoryId:string
}

export interface IDevelopments {
    id:string
    title:string
    text:string
    images:string[]
    files:string[]
    laboratoryId:string
    createdAt:string
    updatedAt:string
}

export interface IDevelopmentsForm {
    title:string
    text:string
    images:uploadType[]
    files:uploadType[]
}