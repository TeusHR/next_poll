"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { AgreementsService } from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import AgreementsCreate from "../AgreementsCreate";
import { Language } from "@/types/Language";
import { IAgreements } from "@/types/Agreements";

export type IAgreementsLang = {
  [key in Language]?: IAgreements | null;
};

const AgreementsTabs = () => {
  const [initialAgreements, setInitialAgreements] = useState<IAgreementsLang>({});

  const { status } = useSession();
  const $apiAuth = useAxiosAuth();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchAgreements = async () => {
        const agreements: IAgreementsLang = {};
        const languages = Object.values(Language);

        for (const lang of languages) {
          agreements[lang] = await AgreementsService.getAgreements($apiAuth, lang.toUpperCase());
        }
        setInitialAgreements(agreements);
      };

      fetchAgreements();
    }
  }, [$apiAuth, status]);

  return (
    <div className="flex flex-col px-10 max-xl:px-3 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
      <div className="flex items-center justify-between">
        <TitleBack title="Договори про співпрацю" isBack={false} />
      </div>
      <AgreementsCreate agreements={initialAgreements} />
    </div>
  );
};

export default AgreementsTabs;
