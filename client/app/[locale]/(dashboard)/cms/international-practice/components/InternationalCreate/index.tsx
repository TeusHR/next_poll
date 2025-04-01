"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import InternationalPracticeCreateForm from "../CreateForm";

const InternationalPracticeCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<InternationalPracticeCreateForm language={Language.UA} />}
        tabEnglish={<InternationalPracticeCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default InternationalPracticeCreate;
