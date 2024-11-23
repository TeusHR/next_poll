import React from "react";
import CellItem from "@/components/Cell/CellItem";
import { ActivityService, ResearchWorkService } from "@/services/client.service";

type Props = {
  style: string;
  params: {
    locale: string;
  };
};

const Cell = async ({ style, params: { locale } }: Props) => {
  const researchWorks = await ResearchWorkService.getAll(1, 2, "createdAt", undefined, locale.toUpperCase());
  const activities = await ActivityService.getAll(1, 2, "createdAt", undefined, locale.toUpperCase());

  return (
    <div className={style}>
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-28 max-md:gap-16 max-xl:gap-16 mt-6 text-4xl max-sm:text-3xl text-center gap-y-12 w-full items-end">
        <div className="flex flex-col gap-12 max-xl:gap-6 mt-6 w-full justify-end">
          <span>Наукова робота ОНТУ</span>
          {/*{researchWorks.data.map((researchWork, index) => (*/}
          {/*  <CellItem*/}
          {/*    key={researchWork.id}*/}
          {/*    text={researchWork.title}*/}
          {/*    image={index % 2 === 0 ? "/image/helmet.png" : "/image/atom.png"}*/}
          {/*    // link={`research/${researchWork.id}`}*/}
          {/*    link={`research`}*/}
          {/*  />*/}
          {/*))}*/}
        </div>
        <div className="flex flex-col gap-12 max-xl:gap-6 mt-6 w-full justify-end">
          <span>Міжнародна діяльність ОНТУ</span>
          {/*{activities.data.map((item, index) => (*/}
          {/*  <CellItem*/}
          {/*    key={item.id}*/}
          {/*    text={item.title}*/}
          {/*    image={index % 2 !== 0 ? "/image/helmet.png" : "/image/atom.png"}*/}
          {/*    link={`international`}*/}
          {/*    // link={`international/${item.id}`}*/}
          {/*  />*/}
          {/*))}*/}
        </div>
      </div>
    </div>
  );
};

export default Cell;
