import React, { Suspense } from "react";
import TitleBack from "@/components/CMS/TitleBack";
import Loading from "@/components/Loading";
import LaboratoryEdit from "../components/LaboratoryEdit";
import LaboratoryCreate from "../components/LaboratoryCreate";
import { Language } from "@/types/Language";

const CMSLaboratory = async ({ params }: { params: { id: string; locale: string } }) => {
  if (params.id === "new") {
    return (
      <div>
        <div className="flex flex-col px-12 py-12 max-xl:px-4">
          <TitleBack title="Створення" />
          <div className="w-full flex flex-row flex-wrap">
            <Suspense fallback={<Loading transparent />}>
              <LaboratoryCreate />
            </Suspense>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col px-12 py-12 max-xl:px-4">
        <TitleBack title="Редагування" />
        <div className="w-full flex flex-row flex-wrap">
          <Suspense fallback={<Loading transparent />}>
            <LaboratoryEdit laboratoryId={params.id} language={params.locale.toUpperCase() as Language} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CMSLaboratory;
