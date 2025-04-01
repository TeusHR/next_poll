import { Language } from "@/types/Language";

export interface ICreateInternationalPractice {
  title: string;
  text: string;
  images: string[];
  files: string[];
  language: Language;
}

export interface IUpdateInternationalPractice {
  title: string;
  text: string;
  images: string[];
  files: string[];
}

export interface IInternationalPractice {
  id: string;
  title: string;
  text: string;
  images: string[];
  files: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreateInternationalPracticeForm {
  title: string;
  text: string;
  images: FileList;
  files: FileList;
}

export interface IUpdateInternationalPracticeForm {
  title: string;
  text: string;
  images: FileList;
  files: FileList;
}
