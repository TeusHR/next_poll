import { Language } from "@/types/Language";
import {IInnovationFilter} from "@/types/InnovationFilter";

export interface ICreateInnovation {
  title: string;
  text: string;
  images: string[];
  files: string[];
  filter:string[];
  language: Language;
}

export interface IUpdateInnovation {
  title: string;
  text: string;
  filter:string[];
  images: string[];
  files: string[];
}

export interface IInnovation {
  id: string;
  title: string;
  text: string;
  images: string[];
  files: string[];
  filter: IInnovationFilter[]
  createdAt: string;
  updatedAt: string;
}

export interface ICreateInnovationForm {
  title: string;
  text: string;
  filter:Set<string>;
  images: FileList;
  files: FileList;
}

export interface IUpdateInnovationForm {
  title: string;
  text: string;
  filter:Set<string>;
  images: FileList;
  files: FileList;
}
