export interface ICreateConferences {
    type:ConferenceType
    country:string
    date:string
    title:string
    text:string
    files:string[]
}

export interface IConferences {
    id:string
    type:ConferenceType
    country:string
    date:string
    title:string
    text:string
    files:string[]
    "createdAt": string
    "updatedAt": string
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