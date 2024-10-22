"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import ConsultingCreateForm from "../CreateForm";

const ConferenceCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<ConsultingCreateForm language={Language.UA} />}
        tabEnglish={<ConsultingCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default ConferenceCreate;
