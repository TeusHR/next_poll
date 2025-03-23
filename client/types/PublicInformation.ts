import { Language } from "@/types/Language";
import {uploadType} from "../app/[locale]/(dashboard)/cms/innovations/components/InnovationsEdit";

export interface IPublicInformation {
    id:string;
    title: string;
    files: string[];
    pages:IPage[];
    language: Language;
    createdAt: string;
    updatedAt: string;
}

export interface ICreatePublicInformation {
    title: string;
    files: string[];
    language: Language;
}

export interface IPublicInformationForm {
    title: string;
    files: FileList;
    pages: IPublicInformationPageForm[]
}

export interface IPublicInformationPageForm {
    title: string;
    files: uploadType[];
}

export interface ICreatePageForm {
    title: string;
    files: string[];
    publicInformationId?:string;
    documentsTemplatesId?:string;
}

export interface IPageForm {
    title: string;
    files: string[];
    publicInformationId?:string;
    documentsTemplatesId?:string;
    createdAt: string;
    updatedAt: string;
}

export interface IPage {
    id: string;
    title: string;
    files: string[];
    createdAt: string;
    updatedAt: string;
}
