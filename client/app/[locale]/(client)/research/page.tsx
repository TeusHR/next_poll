import React from "react";
import Title from "components/UI/Title";
import NewsItem from "@/components/NewsItem";
import { ResearchWorkService } from "@/services/client.service";
import PaginationCustom from "@/components/Pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Наукова робота ОНТУ",
  openGraph: {
    url: "/research/",
  },
};

type Props = {
  params: {
    locale: string;
  };
  searchParams?: { page?: string };
};

const Research = async ({ params: { locale }, searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const researchWorks = await ResearchWorkService.getAll(currentPage, 8, "createdAt", undefined, locale.toUpperCase());

  return (
    <div className="xl:container mx-auto my-16 px-8 max-md:px-4">
      <div className="flex flex-col gap-14 max-sm:gap-8">
        <Title
          text="Наукова робота ОНТУ"
          style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
        />
        <div className="flex flex-col gap-14">
          {researchWorks.data.map((item, index) => (
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
              lengthArr={researchWorks.data.length}
            />
          ))}
        </div>
        <div className="my-0 mx-auto">
          <PaginationCustom total={researchWorks.meta.total} rowsPerPage={researchWorks.meta.perPage} />
        </div>
      </div>
    </div>
  );
};

export default Research;
