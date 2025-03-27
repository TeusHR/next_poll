export interface IInnovationFilter {
    "id": string
    "name": string
    "language": string
    "createdAt": string
    "updatedAt": string
}

export interface ICreateInnovationFilterForm {
    "name": string
    "language": string
}

export interface IUpdateInnovationFilterForm {
    "name": string
    "language": string
    filterId: Set<string>
}