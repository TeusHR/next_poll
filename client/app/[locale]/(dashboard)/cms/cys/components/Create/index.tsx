"use client";
import React, { FC } from "react";
import { Language } from "@/types/Language";
import TabsLanguage from "@/components/TabsLanguage";
import { ICysLang } from "../Tabs";
import CYSFormCreate from "../Form";

type Props = {
  cys: ICysLang;
};

const CreateCYS: FC<Props> = ({ cys }) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<CYSFormCreate cys={cys.UA} language={Language.UA} />}
        tabEnglish={<CYSFormCreate cys={cys.EN} language={Language.EN} />}
      />
    </div>
  );
};

export default CreateCYS;
