"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { AssociationsService } from "@/services/CMS.service";
import TitleBack from "@/components/CMS/TitleBack";
import Associations from "../AssociationsCreate";
import { Language } from "@/types/Language";
import { IAssociations } from "@/types/Associations";

export type IAssociationsLang = {
  [key in Language]?: IAssociations | null;
};

const AssociationsTabs = () => {
  const [initialAssociations, setInitialAssociations] = useState<IAssociationsLang>({});

  const { status } = useSession();
  const $apiAuth = useAxiosAuth();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchAssociations = async () => {
        const associations: IAssociationsLang = {};
        const languages = Object.values(Language);

        for (const lang of languages) {
          associations[lang] = await AssociationsService.getAssociations($apiAuth, lang.toUpperCase());
        }
        setInitialAssociations(associations);
      };

      fetchAssociations();
    }
  }, [$apiAuth, status]);

  return (
    <div className="flex flex-col px-10 max-xl:px-3 max-md:px-2 py-10 min-h-[calc(100vh_-_82px)]">
      <div className="flex items-center justify-between">
        <TitleBack title="Асоціації та членства" isBack={false} />
      </div>
      <Associations associations={initialAssociations} />
    </div>
  );
};

export default AssociationsTabs;
