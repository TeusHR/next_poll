import { Language } from "@/types/Language";

export interface ICreateAcademicCouncil {
    title: string;
    text: string;
    language: Language;
}

export interface IUpdateAcademicCouncil {
    title: string;
    text: string;
}

export interface IAcademicCouncil {
    id: string;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateAcademicCouncilForm = {
    title: string;
    text: string;
};

export type UpdateAcademicCouncilForm = {
    title: string;
    text: string;
};