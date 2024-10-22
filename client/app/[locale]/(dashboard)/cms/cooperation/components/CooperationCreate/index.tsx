"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import CooperationCreateForm from "../CreateForm";

const CooperationCreate = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<CooperationCreateForm language={Language.UA} />}
        tabEnglish={<CooperationCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default CooperationCreate;
