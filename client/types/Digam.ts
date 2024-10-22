import { Language } from "@/types/Language";

export interface IDigam {
  id: string;
  text: string;
  organizations: IOrganizations[];
  foreignUniversities: IForeignUniversities;
  createAt: string;
  updateAt: string;
  language: Language;
}

export interface ICreateDigam {
  text: string;
  organizations: IOrganizations[];
  foreignUniversities: ICreateForeignUniversities[];
  language: Language;
}

export interface ICreateForeignUniversities {
  country: string;
  title: string;
  description: string;
}

export interface IOrganizations {
  image: string;
  title: string;
  link: string;
}

export interface IForeignUniversities {
  [country: string]: IDescribeUniversities[];
}

export interface IForeignUniversitiesForm {
  country: string;
  item: IDescribeUniversities[];
}

interface IDescribeUniversities {
  title: string;
  description: string;
}

export interface ICreateDigamForm {
  text: string;
  filesOrg: FileList;
  organizations: IOrganizationsForm[];
  foreignUniversities: IForeignUniversitiesForm[];
}

export interface IOrganizationsForm {
  image: string;
  title: string;
  link: string;
}
