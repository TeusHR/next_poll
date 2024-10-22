import { Language } from "@/types/Language";

export interface ICreateInternational {
  title: string;
  text: string;
  images: string[];
  files: string[];
  language: Language;
}

export interface IUpdateInternational {
  title: string;
  text: string;
  images: string[];
  files: string[];
}

export interface IInternational {
  id: string;
  title: string;
  text: string;
  images: string[];
  files: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreateInternationalForm {
  title: string;
  text: string;
  images: FileList;
  files: FileList;
}

export interface IUpdateInternationalForm {
  title: string;
  text: string;
  images: FileList;
  files: FileList;
}
