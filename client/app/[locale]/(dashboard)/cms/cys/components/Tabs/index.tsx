"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { CysService} from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack"
import { Language } from "@/types/Language";
import {ICys} from "@/types/CYS";
import CreateCYS from "../Create";

export type ICysLang = {
  [key in Language]?: ICys | null;
};

const CYSTabs = () => {
  const [initialData, setInitialData] = useState<ICysLang>({});

  const { status } = useSession();
  const $apiAuth = useAxiosAuth();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchCYS = async () => {
        const cys: ICysLang = {};
        const languages = Object.values(Language);

        for (const lang of languages) {
          cys[lang] = await CysService.get($apiAuth, lang.toUpperCase());
        }
        setInitialData(cys);
      };

      fetchCYS();
    }
  }, [$apiAuth, status]);

  return (
    <div className="flex flex-col px-10 max-xl:px-3 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
      <div className="flex items-center justify-between">
        <TitleBack title="Рада молодих вчених" isBack={false} />
      </div>
      <CreateCYS cys={initialData} />
    </div>
  );
};

export default CYSTabs;
