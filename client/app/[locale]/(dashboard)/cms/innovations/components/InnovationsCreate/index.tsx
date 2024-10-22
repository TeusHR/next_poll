"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import InnovationsCreateForm from "../CreateForm";

const InnovationsCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<InnovationsCreateForm language={Language.UA} />}
        tabEnglish={<InnovationsCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default InnovationsCreate;
