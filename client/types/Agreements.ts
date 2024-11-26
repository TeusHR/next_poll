import { Language } from "@/types/Language";

export interface IAgreements {
  id: string;
  foreignUniversities: IForeignUniversities;
  createAt: string;
  updateAt: string;
  language: Language;
}

export interface IForeignUniversities {
  [country: string]: IDescribeUniversities[];
}

export interface IDescribeUniversities {
  title: string;
  description: string;
  files: string[];
}

export interface ICreateAgreements {
  foreignUniversities: ICreateForeignUniversities[];
  language: Language;
}

export interface ICreateForeignUniversities {
  country: string;
  title: string;
  description: string;
  files: string[];
}

export interface ICreateAgreementsForm {
  foreignUniversities: IForeignUniversitiesForm[];
}

export interface IForeignUniversitiesForm {
  country: string;
  item: IDescribeUniversitiesForm[];
}

interface IDescribeUniversitiesForm {
  title: string;
  description: string;
  files?: FileList;
}
