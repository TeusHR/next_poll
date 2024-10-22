import { Language } from "@/types/Language";

export interface ICreateCooperation {
  title: string;
  text: string;
  language: Language;
}

export interface IUpdateCooperation {
  title: string;
  text: string;
}

export interface ICreateCooperationForm {
  title: string;
  text: string;
}

export interface ICooperation {
  id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
