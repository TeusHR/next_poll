"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import LaboratoryCreateForm from "../CreateForm";

const LaboratoryCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<LaboratoryCreateForm language={Language.UA} />}
        tabEnglish={<LaboratoryCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default LaboratoryCreate;
