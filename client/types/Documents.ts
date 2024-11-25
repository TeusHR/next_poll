import { Language } from "@/types/Language";

export interface ICreateDocuments {
  title: string;
  text: string;
  files: string[];
  language: Language;
}

export interface IUpdateDocuments {
  title: string;
  text: string;
  files: string[];
}

export interface ICreateDocumentsForm {
  title: string;
  text: string;
  files: FileList;
}

export interface IDocuments {
  id: string;
  title: string;
  text: string;
  files: string[];
  createdAt: string;
  updatedAt: string;
}
