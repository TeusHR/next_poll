import React from "react";
import Title from "@/UI/Title";
import NewsItem from "@/components/NewsItem";
import { ActivityService } from "@/services/client.service";
import PaginationCustom from "@/components/Pagination";
import { Metadata } from "next";
import pageTitle from '@/messages/ua/pageTitle.json'
import {getTranslations} from 'next-intl/server';

// export const metadata: Metadata = {
//   title: "Міжнародна діяльність ОНТУ",
//   openGraph: {
//     url: "/activity/",
//   },
// };

export async function generateMetadata(
  {params}: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale:params.locale, namespace: 'Page'});

  return {
    title: t('activity'),
    openGraph: {
      url: "/activity/",
    },
  };
}

type Props = {
  params: {
    locale: string;
  };
  searchParams?: { page?: string };
};

export type PageTitleTranslation = typeof pageTitle

const Activity = async ({ params: { locale }, searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const activity = await ActivityService.getAll(currentPage, 8, "createdAt", undefined, locale.toUpperCase());

  const titlePage = await getTranslations('Page');

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title
          text={titlePage('activity')}
          style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
        />
        <div className="flex flex-col gap-14">
          {activity.data.map((item, index) => (
            <NewsItem
              title={item.title}
              imageObj={{
                image: item.image,
                width: 400,
                height: 210,
                imageStyle: `max-h-[210px]`,
              }}
              key={index}
              text={item.text}
              date={item.createAt}
              index={index}
              lengthArr={activity.data.length}
            />
          ))}
        </div>
        <div className="my-0 mx-auto">
          <PaginationCustom total={activity.meta.total} rowsPerPage={activity.meta.perPage} />
        </div>
      </div>
    </div>
  );
};

export default Activity;
