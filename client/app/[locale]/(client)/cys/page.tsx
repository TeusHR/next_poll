import React, { FC } from "react";
import Title from "@/UI/Title";
import {CysService} from "@/services/client.service";
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
    const cys = await CysService.getAll(locale.toUpperCase());
    if (!cys) throw new Error("Could not find agreements");

    return {
      title: t('cys'),
      openGraph: {
        url: "/cys/",
      },
    };
  } catch (e) {
    return {
      title: t('cys'),
      openGraph: {
        title: t('cys'),
        url: `/cys/`,
      },
    };
  }
}

const CYS: FC<Props> = async ({ params: { locale } }) => {
  const cys = await CysService.getAll(locale.toUpperCase());
  const titlePage = await getTranslations('Page');

  // if (cys === null) return notFound();

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title
          text={titlePage('cys')}
          style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
        />
        <div dangerouslySetInnerHTML={{ __html: cys?.text || '' }} />
      </div>
    </div>
  );
};

export default CYS;
