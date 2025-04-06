"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import EventsCreateForm from "../CreateForm";

const EventsCreate = ({}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<EventsCreateForm language={Language.UA} />}
        tabEnglish={<EventsCreateForm language={Language.EN} />}
      />
    </div>
  );
};

export default EventsCreate;
