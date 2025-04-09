"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import AcademicCouncilCreateForm from "../CreateForm";

const AcademicCouncilCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<AcademicCouncilCreateForm language={Language.UA} />}
        tabEnglish={<AcademicCouncilCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default AcademicCouncilCreate;
