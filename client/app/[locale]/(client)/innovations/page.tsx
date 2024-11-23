import React from "react";
import Title from "components/UI/Title";
import NewsItem from "@/components/NewsItem";
import { InnovationService } from "@/services/client.service";
import PaginationCustom from "@/components/Pagination";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// export const metadata: Metadata = {
//   title: "Інноваційні розробки",
//   openGraph: {
//     url: "/innovations/",
//   },
// };

export async function generateMetadata(
  {params}: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale:params.locale, namespace: 'Page'});

  return {
    title: t('innovations'),
    openGraph: {
      url: "/innovations/",
    },
  };
}

type Props = {
  params: {
    locale: string;
  };
  searchParams?: { page?: string };
};

const Innovations = async ({ params: { locale }, searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const innovations = await InnovationService.getAll(currentPage, 8, "createdAt", undefined, locale.toUpperCase());
  const titlePage = await getTranslations('Page');

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title
          text={titlePage('innovations')}
          style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
        />
        <div className="flex flex-col gap-14">
          {innovations.data.map((item, index) => (
            <NewsItem
              title={item.title}
              imageObj={{
                image: item.images[0],
                width: 400,
                height: 210,
                imageStyle: `max-h-[210px]`,
              }}
              lightBoxImage={{
                show: true,
                images: item.images,
              }}
              key={index}
              text={item.text}
              date={item.createdAt}
              index={index}
              buttonDetails
              link={`/innovations/${item.id}`}
              lengthArr={innovations.data.length}
            />
          ))}
        </div>
        <div className="my-0 mx-auto">
          <PaginationCustom total={innovations.meta.total} rowsPerPage={innovations.meta.perPage} />
        </div>
      </div>
    </div>
  );
};

export default Innovations;
