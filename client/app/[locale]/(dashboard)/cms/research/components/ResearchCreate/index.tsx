"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import ResearchCreateForm from "../CreateForm";

const ResearchCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<ResearchCreateForm language={Language.UA} />}
        tabEnglish={<ResearchCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default ResearchCreate;
