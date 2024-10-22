import { Language } from "@/types/Language";
import { uploadType } from "app/[locale]/(dashboard)/cms/innovations/components/InnovationsEdit";

export interface ICreateDevelopments {
  title: string;
  text: string;
  images: string[];
  files: string[];
  laboratoryId: string;
  language: Language;
}

export interface IDevelopments {
  id: string;
  title: string;
  text: string;
  images: string[];
  files: string[];
  laboratoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDevelopmentsForm {
  title: string;
  text: string;
  images: uploadType[];
  files: uploadType[];
}
