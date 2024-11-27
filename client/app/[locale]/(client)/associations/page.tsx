import React, { FC } from "react";
import Title from "@/UI/Title";
import MemberOrganizations from "@/components/MemberOrganizations";
import { AssociationService } from "@/services/client.service";
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
    const associations = await AssociationService.getAll(locale.toUpperCase());
    if (!associations) throw new Error("Could not find digam");

    return {
      title: t('associations'),
      openGraph: {
        url: "/associations/",
      },
    };
  } catch (e) {
    return {
      title: t('associations'),
      openGraph: {
        title: t('associations'),
        url: `/associations/`,
      },
    };
  }
}

const Associations: FC<Props> = async ({ params: { locale } }) => {
  const associations = await AssociationService.getAll(locale.toUpperCase());
  const titlePage = await getTranslations('Page');

  // if (associations === null) return notFound();

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title
          text={titlePage('associations')}
          style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
        />
        {associations && <MemberOrganizations organizations={associations.organizations} title={titlePage("memberOrganizations")} />}
      </div>
    </div>
  );
};

export default Associations;
