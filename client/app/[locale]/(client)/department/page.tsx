import React, { FC } from "react";
import Title from "@/UI/Title";
import CountryCoop from "@/components/CountryCoop";
import MemberOrganizations from "@/components/MemberOrganizations";
import { DIGAMService } from "@/services/client.service";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { stripHtml } from "@/utils/StripHtml";
import { getTranslations } from "next-intl/server";
import { IForeignUniversities } from "@/types/Agreements";

type Props = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({locale:locale, namespace: 'Page'});
  try {
    const digam = await DIGAMService.getAll(locale.toUpperCase());
    if (!digam) throw new Error("Could not find digam");

    return {
      title: t('department'),
      description: stripHtml(digam.text, 197),
      openGraph: {
        url: "/department/",
      },
    };
  } catch (e) {
    return {
      title: t('notFound'),
      openGraph: {
        title: t('notFound'),
        url: `/department/`,
      },
    };
  }
}

const Department: FC<Props> = async ({ params: { locale } }) => {
  const digam = await DIGAMService.getAll(locale.toUpperCase());
  const titlePage = await getTranslations('Page');

  if (digam === null) return notFound();

  console.log(digam)

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title
          text={titlePage('department')}
          style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
        />
        <div className="text-base" dangerouslySetInnerHTML={{ __html: digam.text }}></div>
        <MemberOrganizations organizations={digam.organizations} title={titlePage('memberOrganizations')}/>
        <CountryCoop foreignUniversities={digam.foreignUniversities as IForeignUniversities} title={titlePage('countryCoop')}/>
      </div>
    </div>
  );
};

export default Department;
