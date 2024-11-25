"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import DocumentsCreateForm from "../CreateForm";

const DocumentsCreate = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<DocumentsCreateForm language={Language.UA} />}
        tabEnglish={<DocumentsCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default DocumentsCreate;
