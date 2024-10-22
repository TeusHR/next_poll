import React, { FC } from "react";
import Title from "@/UI/Title";
import CountryCoop from "@/components/CountryCoop";
import MemberOrganizations from "@/components/MemberOrganizations";
import { DIGAMService } from "@/services/client.service";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { stripHtml } from "@/utils/StripHtml";

type Props = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  try {
    const digam = await DIGAMService.getAll(locale.toUpperCase());
    if (!digam) throw new Error("Could not find digam");

    return {
      title: "Відділ міжнародних грантів та академічної мобільності",
      description: stripHtml(digam.text, 197),
      openGraph: {
        url: "/department/",
      },
    };
  } catch (e) {
    return {
      title: "Сторінка не знайдена",
      openGraph: {
        title: "Сторінка не знайдена",
        url: `/department/`,
      },
    };
  }
}

const Department: FC<Props> = async ({ params: { locale } }) => {
  const digam = await DIGAMService.getAll(locale.toUpperCase());

  if (digam === null) return notFound();

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title
          text="Відділ міжнародних грантів та академічної мобільності"
          style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
        />
        <div className="text-base" dangerouslySetInnerHTML={{ __html: digam.text }}></div>
        <MemberOrganizations organizations={digam.organizations} />
        <CountryCoop foreignUniversities={digam.foreignUniversities} />
      </div>
    </div>
  );
};

export default Department;
