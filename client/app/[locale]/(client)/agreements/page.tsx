import React, { FC } from "react";
import Title from "@/UI/Title";
import CountryCoop from "@/components/CountryCoop";
import { AgreementsService, DIGAMService } from "@/services/client.service";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({locale:locale, namespace: 'Page'});
  try {
    const agreements = await DIGAMService.getAll(locale.toUpperCase());
    if (!agreements) throw new Error("Could not find agreements");

    return {
      title: t('agreements'),
      openGraph: {
        url: "/agreements/",
      },
    };
  } catch (e) {
    return {
      title: t('agreements'),
      openGraph: {
        title: t('agreements'),
        url: `/agreements/`,
      },
    };
  }
}

const Agreements: FC<Props> = async ({ params: { locale } }) => {
  const agreements = await AgreementsService.getAll(locale.toUpperCase());
  const titlePage = await getTranslations('Page');

  // if (agreements === null) return notFound();

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title
          text={titlePage('agreementsTitle')}
          style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
        />
        {agreements && <CountryCoop foreignUniversities={agreements.foreignUniversities} title={titlePage("countryCoop")} />}
      </div>
    </div>
  );
};

export default Agreements;
