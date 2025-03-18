"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import PublicInformationCreateForm from "../CreateForm";

const ConferenceCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<PublicInformationCreateForm language={Language.UA} />}
        tabEnglish={<PublicInformationCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default ConferenceCreate;
