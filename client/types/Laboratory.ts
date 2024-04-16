export interface ICreateLaboratory {
    title:string
    text:string
    images:string[]
    files:string[]
    developments:ICreateDevelopments[]
}

export interface ICreateDevelopments {
    title:string
    text:string
    images:string[]
    files:string[]
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

export interface IDevelopmentsForm {
    title:string
    text:string
    images:FileList
    files:FileList
}