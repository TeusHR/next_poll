import { Language } from "@/types/Language";

export interface ICreateCooperation {
  title: string;
  text: string;
  files:string[],
  language: Language;
}

export interface IUpdateCooperation {
  title: string;
  text: string;
  files:string[],
}

export interface ICreateCooperationForm {
  title: string;
  text: string;
  files:FileList,
}

export interface ICooperation {
  id: string;
  title: string;
  text: string;
  files:string[],
  createdAt: string;
  updatedAt: string;
}
