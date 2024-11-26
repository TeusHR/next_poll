import { Language } from "@/types/Language";

export interface IAssociations {
  id: string;
  organizations: IOrganizations[];
  createAt: string;
  updateAt: string;
  language: Language;
}

export interface ICreateAssociations {
  organizations: IOrganizations[];
  language: Language;
}

export interface IOrganizations {
  image: string;
  title: string;
  files?: string[];
  link: string;
}

export interface ICreateAssociationsForm {
  organizations: IOrganizationsForm[];
  filesOrg: FileList;
}

export interface IOrganizationsForm {
  image: string;
  title: string;
  files?: FileList;
  link: string;
}
