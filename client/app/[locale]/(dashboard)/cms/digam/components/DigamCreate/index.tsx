"use client";
import React, { FC } from "react";
import { Language } from "@/types/Language";
import { IDigamLang } from "../DigamTabs";
import TabsLanguage from "@/components/TabsLanguage";
import DigamFormCreate from "../DigamForm";

type Props = {
  digam: IDigamLang;
};

const DigamCreate: FC<Props> = ({ digam }) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<DigamFormCreate digam={digam.UA} language={Language.UA} />}
        tabEnglish={<DigamFormCreate digam={digam.EN} language={Language.EN} />}
      />
    </div>
  );
};

export default DigamCreate;
