export interface ICreateConferences {
    type:string
    country:string
    date:string
    title:string
    text:string
    files:string[]
}

export interface IConferences {
    id:string
    type:string
    country:string
    date:string
    title:string
    text:string
    files:string[]
    "createdAt": string
    "updatedAt": string
}

export type CreateConferenceForm = {
    type:string
    country:string
    date:string
    title:string
    text:string
    files:FileList[],
}

export enum ConferenceType {
    SEMINAR,
    COMPETITION,
    CONFERENCT,
}

export interface IResponseMeta<T> {
    data:T
    meta: {
        currentPage: number
        lastPage: number
        next: number
        perPage: number
        prev: number
        total: number
    }
}