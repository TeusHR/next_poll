"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import ConferenceCreateForm from "../CreateForm";

const ConferenceCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<ConferenceCreateForm language={Language.UA} />}
        tabEnglish={<ConferenceCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default ConferenceCreate;
