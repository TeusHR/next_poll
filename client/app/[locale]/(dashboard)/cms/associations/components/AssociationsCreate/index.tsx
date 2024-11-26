"use client";
import React, { FC } from "react";
import { Language } from "@/types/Language";
import { IAssociationsLang } from "../AssociationsTabs";
import TabsLanguage from "@/components/TabsLanguage";
import AssociationsFormCreate from "../AssociationsForm";

type Props = {
  associations: IAssociationsLang;
};

const Associations: FC<Props> = ({ associations }) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={<AssociationsFormCreate associations={associations.UA} language={Language.UA} />}
        tabEnglish={<AssociationsFormCreate associations={associations.EN} language={Language.EN} />}
      />
    </div>
  );
};

export default Associations;
