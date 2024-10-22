"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import ActivityCreateForm from "../CreateForm";

const ActivityCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<ActivityCreateForm language={Language.UA} />}
        tabEnglish={<ActivityCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default ActivityCreate;
