import React from "react";
import Title from "@/UI/Title";
import DirectItem from "@/components/DirectItem";
import { DocumentsService } from "@/services/client.service";
import PaginationCustom from "@/components/Pagination";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// export const metadata: Metadata = {
//   title: "Напрямки для співпраці",
//   openGraph: {
//     url: "/cooperation/",
//   },
// };

export async function generateMetadata(
  {params}: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale:params.locale, namespace: 'Page'});

  return {
    title: t('documents'),
    openGraph: {
      url: "/documents/",
    },
  };
}

type Props = {
  params: {
    locale: string;
  };
  searchParams?: { page?: string };
};

const Documents = async ({ params: { locale }, searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const documents = await DocumentsService.getAll(currentPage, 8, "createdAt", undefined, locale.toUpperCase());
  const titlePage = await getTranslations('Page');

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title
          text={titlePage('documents')}
          style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
        />
        {documents.data.map((item, index) => (
          <React.Fragment key={index}>
            <DirectItem
              title={item.title}
              text={item.text}
              files={item.files}
              index={(currentPage - 1) * documents.meta.perPage + index + 1}
            />
            {index !== documents.data.length - 1 && <span className="border border-[#6E8880]"></span>}
          </React.Fragment>
        ))}
        <div className="my-0 mx-auto">
          <PaginationCustom total={documents.meta.total} rowsPerPage={documents.meta.perPage} />
        </div>
      </div>
    </div>
  );
};

export default Documents;
