import { Language } from "@/types/Language";

export interface ICreateEvents {
    title: string;
    roomNumber: string;
    text: string;
    link: string;
    supervisor: string[];
    date: string;
    toDate?: string;
    language: Language;
}

export interface IUpdateEvents {
    title: string;
    roomNumber: string;
    text: string;
    link: string;
    supervisor: string[];
    date: string;
    toDate?: string;
}

export interface IEvents {
    id: string;
    title: string;
    roomNumber: string;
    text: string;
    link: string;
    supervisor: string[];
    date: string;
    toDate?: string | null;
    dateISO: string;
    toDateISO?: string | null;
    createdAt: string;
    updatedAt: string;
}

export type CreateEventsForm = {
    link: string;
    roomNumber: string;
    supervisor: ISupervisorForm[];
    date: string;
    toDate: string;
    title: string;
    text: string;
};

export type UpdateEventsForm = {
    link: string;
    roomNumber: string;
    supervisor: ISupervisorForm[];
    date: string;
    toDate: string;
    title: string;
    text: string;
};

export interface ISupervisorForm {
    name:string
}
