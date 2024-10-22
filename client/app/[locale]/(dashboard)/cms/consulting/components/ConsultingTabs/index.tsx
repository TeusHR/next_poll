"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { ConsultingService, TrainingService } from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import { IConsulting, ITraining } from "@/types/Consulting";
import ConsultingCreate from "../ConsultingCreate";
import { Language } from "@/types/Language";

export type IConsultingLang = {
  [key in Language]?: IConsulting | null;
};

export type ITrainingLang = {
  [key in Language]?: ITraining[];
};

const ConsultingTabs = ({}) => {
  const [initialConsulting, setInitialConsulting] = useState<IConsultingLang>({});
  const [initialTraining, setInitialTraining] = useState<ITrainingLang>({});

  const { status } = useSession();
  const $apiAuth = useAxiosAuth();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        const consultings: { [key in Language]?: IConsulting } = {};
        const trainings: { [key in Language]?: ITraining[] } = {};
        const languages = Object.values(Language);

        for (const lang of languages) {
          const consultingRes = await ConsultingService.getConsulting($apiAuth, lang.toUpperCase());
          const trainingRes = await TrainingService.getTrainingAll($apiAuth, lang.toUpperCase());

          consultings[lang] = consultingRes;
          trainings[lang] = trainingRes.data;
        }

        setInitialConsulting(consultings);
        setInitialTraining(trainings);
      };

      fetchData();
    }
  }, [$apiAuth, status]);

  return (
    <div className="flex flex-col px-10 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
      <div className="flex items-center justify-between">
        <TitleBack title="Консалтинговий центр НДІ" isBack={false} />
      </div>
      <ConsultingCreate consulting={initialConsulting} training={initialTraining} />
    </div>
  );
};

export default ConsultingTabs;
