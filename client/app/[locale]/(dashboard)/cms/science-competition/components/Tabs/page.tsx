"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import ScienceCompetitionCreateForm from "../CreateForm";

const ScienceCompetitionCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<ScienceCompetitionCreateForm language={Language.UA} />}
        tabEnglish={<ScienceCompetitionCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default ScienceCompetitionCreate;
