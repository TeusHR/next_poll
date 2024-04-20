import {uploadType} from "../app/(dashboard)/cms/innovations/components/InnovationsEdit";

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


export interface ICreateDigamForm {
    text: string
    filesOrg:FileList,
    organizations: IOrganizationsForm[],
    foreignUniversities:IForeignUniversities[]
}


export interface IOrganizationsForm {
    image:uploadType,
    title:string
    link:string,
}
