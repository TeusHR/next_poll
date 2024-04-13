export interface ICreateInnovation {
    title:string
    text:string
    images:string[]
    files:string[]
}

export interface IInnovation {
    id:string
    title:string
    text:string
    images:string[]
    files:string[]
    createdAt:string
    updatedAt:string
}

export interface ICreateInnovationForm {
    title:string
    text:string
    images:FileList
    files:FileList
}