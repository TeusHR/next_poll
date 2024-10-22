"use client";
import React, { FC } from "react";
import { IConsultingLang, ITrainingLang } from "../ConsultingTabs";
import TabsLanguage from "@/components/TabsLanguage";
import { Language } from "@/types/Language";
import ConsultingFormCreate from "../ConsultingForm";

type Props = {
  consulting: IConsultingLang;
  training: ITrainingLang;
};

const ConsultingCreate: FC<Props> = ({ consulting, training }) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <TabsLanguage
        tabUkraine={
          <ConsultingFormCreate consulting={consulting.UA} training={training.UA || []} language={Language.UA} />
        }
        tabEnglish={
          <ConsultingFormCreate consulting={consulting.EN} training={training.EN || []} language={Language.EN} />
        }
      />
    </div>
  );
};

export default ConsultingCreate;
