"use client";
import React from "react";
import ScienceCreateForm from "../CreateForm";
import { Language } from "@/types/Language";
import TabsLanguage from "@/components/TabsLanguage";

const ScienceCreate = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<ScienceCreateForm language={Language.UA} />}
        tabEnglish={<ScienceCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default ScienceCreate;
