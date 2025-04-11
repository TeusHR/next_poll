import { Language } from "@/types/Language";

export interface ICreateScienceCompetition {
    type: string;
    country: string;
    date: string;
    title: string;
    text: string;
    files: string[];
    toDate?: string;
    isStudent:boolean;
    isLogo:boolean;
    language: Language;
}

export interface IUpdateScienceCompetition {
    type: string;
    country: string;
    date: string;
    title: string;
    text: string;
    files: string[];
    isStudent:boolean;
    isLogo:boolean;
    toDate?: string;
}

export interface IScienceCompetition {
    id: string;
    type: string;
    country: string;
    date: string;
    toDate?: string | null;
    dateISO: string;
    toDateISO?: string | null;
    title: string;
    text: string;
    files: string[];
    isStudent:boolean;
    isLogo:boolean;
    createdAt: string;
    updatedAt: string;
}

export type CreateScienceCompetitionForm = {
    type: Set<string>;
    country: Set<string>;
    date: string;
    toDate: string;
    title: string;
    text: string;
    isStudent:boolean;
    isLogo:boolean;
    files: FileList;
};

export type UpdateScienceCompetitionForm = {
    type: Set<string>;
    country: Set<string>;
    date: string;
    toDate: string;
    title: string;
    text: string;
    isStudent:boolean;
    isLogo:boolean;
    files: FileList;
};

export interface IGroupScienceCompetition {
    month: string;
    items: IScienceCompetition[];
}
