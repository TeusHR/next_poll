"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import PublicInformationCreateForm from "../CreateForm";

const ConferenceCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<PublicInformationCreateForm  />}
        tabEnglish={<PublicInformationCreateForm  />}
      />
    </div>
  );
};

export default ConferenceCreate;
