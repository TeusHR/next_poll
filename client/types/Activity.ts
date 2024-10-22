import { Language } from "@/types/Language";

export interface ICreateActivity {
  title: string;
  text: string;
  image: string;
  language: Language;
}

export interface IUpdateActivity {
  title: string;
  text: string;
  image: string;
}

export interface ICreateActivityForm {
  title: string;
  text: string;
  image: FileList;
}

export interface IUpdateActivityForm {
  title: string;
  text: string;
  image: FileList | undefined;
}

export interface IActivity {
  id: string;
  title: string;
  text: string;
  image: string;
  createAt: string;
  updateAt: string;
}
