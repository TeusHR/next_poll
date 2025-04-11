import { Language } from "@/types/Language";

export interface ICreateCys {
    text: string;
    language: Language;
}

export interface IUpdateCys {
    text: string;
}

export interface ICys {
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateCysForm = {
    text: string;
};

export type UpdateCysForm = {
    text: string;
};