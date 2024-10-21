import { Language } from "./Language";

export interface ICreateScience {
  title: string;
  text: string;
  language: Language;
}

export interface IUpdateScience {
  title: string;
  text: string;
}

export interface ICreateScienceForm {
  title: string;
  text: string;
}

export interface IScience {
  id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
