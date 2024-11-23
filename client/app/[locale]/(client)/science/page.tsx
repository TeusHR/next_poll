import React from "react";
import Title from "@/UI/Title";
import DirectItem from "@/components/DirectItem";
import { ScienceService } from "@/services/client.service";
import PaginationCustom from "@/components/Pagination";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// export const metadata: Metadata = {
//   title: "Наукові школи",
//   openGraph: {
//     url: "/science/",
//   },
// };

export async function generateMetadata(
  {params}: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale:params.locale, namespace: 'Page'});

  return {
    title: t('science'),
    openGraph: {
      url: "/science/",
    },
  };
}

type Props = {
  params: {
    locale: string;
  };
  searchParams?: { page?: string };
};

const Science = async ({ params: { locale }, searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const science = await ScienceService.getAll(currentPage, 8, "createdAt", undefined, locale.toUpperCase());
  const titlePage = await getTranslations('Page');

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title text={titlePage('science')} style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold" />
        {science.data.map((item, index) => (
          <React.Fragment key={index}>
            <DirectItem title={item.title} text={item.text} index={index + 1} />
            {index !== science.data.length - 1 && <span className="border border-[#6E8880]"></span>}
          </React.Fragment>
        ))}
        <div className="my-0 mx-auto">
          <PaginationCustom total={science.meta.total} rowsPerPage={science.meta.perPage} />
        </div>
      </div>
    </div>
  );
};

export default Science;
