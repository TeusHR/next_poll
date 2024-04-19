export interface IDigam {
    id:string,
    text:string,
    organizations:IOrganizations[]
    foreignUniversities:IForeignUniversities[]
    createAt:string,
    updateAt:string,
}


export interface ICreateDigam {
    text:string,
    organizations:IOrganizations[]
    foreignUniversities:IForeignUniversities[]
}


export interface IOrganizations {
    image:string,
    title:string
    link:string,
}


export interface IForeignUniversities {
    country:string,
    title:string
    description:string,
}

