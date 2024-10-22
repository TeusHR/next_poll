"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import InternationalCreateForm from "../CreateForm";

const InternationalCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<InternationalCreateForm language={Language.UA} />}
        tabEnglish={<InternationalCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default InternationalCreate;
