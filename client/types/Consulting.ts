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
}