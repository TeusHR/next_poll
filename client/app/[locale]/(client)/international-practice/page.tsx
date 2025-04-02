import React from "react";
import Title from "components/UI/Title";
import NewsItem from "@/components/NewsItem";
import {InternationalPracticeService} from "@/services/client.service";
import PaginationCustom from "@/components/Pagination";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
  {params}: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale:params.locale, namespace: 'Page'});

  return {
    title: t('international-practice'),
    openGraph: {
      url: "/international-practice/",
    },
  };
}

type Props = {
  params: {
    locale: string;
  };
  searchParams?: { page?: string };
};

const InternationalPractice = async ({ params: { locale }, searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const internationalPractice = await InternationalPracticeService.getAll(currentPage, 8, "createdAt", undefined, locale.toUpperCase());
  const titlePage = await getTranslations('Page');

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title
          text={titlePage('internationalPractice')}
          style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
        />
        <div className="flex flex-col gap-14">
          {internationalPractice.data.map((item, index) => (
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
              showDate={false}
              index={index}
              buttonDetails
              link={`/international-practice/${item.id}`}
              lengthArr={internationalPractice.data.length}
            />
          ))}
        </div>
        <div className="my-0 mx-auto">
          <PaginationCustom total={internationalPractice.meta.total} rowsPerPage={internationalPractice.meta.perPage} />
        </div>
      </div>
    </div>
  );
};

export default InternationalPractice;
