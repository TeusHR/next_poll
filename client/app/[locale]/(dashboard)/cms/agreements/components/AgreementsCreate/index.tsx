"use client";
import React, { FC } from "react";
import { Language } from "@/types/Language";
import { IAgreementsLang } from "../AgreementsTabs";
import TabsLanguage from "@/components/TabsLanguage";
import AgreementsFormCreate from "../AgreementsForm";

type Props = {
  agreements: IAgreementsLang;
};

const AgreementsCreate: FC<Props> = ({ agreements }) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<AgreementsFormCreate agreements={agreements.UA} language={Language.UA} />}
        tabEnglish={<AgreementsFormCreate agreements={agreements.EN} language={Language.EN} />}
      />
    </div>
  );
};

export default AgreementsCreate;
