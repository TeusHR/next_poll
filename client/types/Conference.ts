import { Language } from "@/types/Language";

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
