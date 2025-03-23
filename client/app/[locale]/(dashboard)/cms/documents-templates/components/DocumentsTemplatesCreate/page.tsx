"use client";
import React from "react";
import TabsLanguage from "@/components/TabsLanguage";
import DocumentsTemplatesCreateForm from "../CreateForm";

const ConferenceCreate = ({}) => {

    return (
        <div className="flex flex-col gap-8 w-full">
            <TabsLanguage
                tabUkraine={<DocumentsTemplatesCreateForm />}
                tabEnglish={<DocumentsTemplatesCreateForm />}
            />
        </div>
    );
};

export default ConferenceCreate;
