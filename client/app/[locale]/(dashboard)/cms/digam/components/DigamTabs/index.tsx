"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { DigamService } from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import DigamCreate from "../DigamCreate";
import { IDigam } from "@/types/Digam";
import { Language } from "@/types/Language";

export type IDigamLang = {
  [key in Language]?: IDigam | null;
};

const DigamTabs = () => {
  const [initialDigam, setInitialDigam] = useState<IDigamLang>({});

  const { status } = useSession();
  const $apiAuth = useAxiosAuth();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchDigams = async () => {
        const digams: IDigamLang = {};
        const languages = Object.values(Language);

        for (const lang of languages) {
          digams[lang] = await DigamService.getDigam($apiAuth, lang.toUpperCase());
        }
        setInitialDigam(digams);
      };

      fetchDigams();
    }
  }, [$apiAuth, status]);

  return (
    <div className="flex flex-col px-10 max-xl:px-3 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
      <div className="flex items-center justify-between">
        <TitleBack title="Відділ міжнародних грантів та академічної мобільності" isBack={false} />
      </div>
      <DigamCreate digam={initialDigam} />
    </div>
  );
};

export default DigamTabs;
