import { Language } from "@/types/Language";

export interface ICreateConferences {
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

export interface IUpdateConferences {
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

export interface IConferences {
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

export type CreateConferenceForm = {
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

export interface IConferencesFile {
  "id": string,
  "files": string[],
  "language": string,
  "createdAt": string,
  "updatedAt": string
}

export interface ICreateConferencesFile {
  files: string[];
  language: Language;
}

export type CreateConferenceFileForm = {
  files: FileList;
};

export type UpdateConferenceForm = {
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

export enum ConferenceType {
  SEMINAR,
  COMPETITION,
  CONFERENCT,
}

export interface IConferenceTypeSelect extends NewSetSelect {}

export interface IMonth extends NewSetSelect {}

export interface NewSetSelect {
  label: string;
  value: string;
}

export interface IResponseMeta<T> {
  data: T;
  meta: {
    currentPage: number;
    lastPage: number;
    next: number;
    perPage: number;
    prev: number;
    total: number;
  };
}

export interface IGroupConference {
  month: string;
  items: IConferences[];
}

export interface ILiftGroupConference extends IConferences {
  month: string;
}
