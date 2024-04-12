export interface ICreateResearch {
    title:string
    text:string
    image:string
}

export interface ICreateResearchForm {
    title:string
    text:string
    image:FileList
}

export interface IResearch {
    id:string
    title:string
    text:string
    image:string
    createAt:string
    updateAt:string
}