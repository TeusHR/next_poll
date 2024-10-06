import React from "react";
import Link from "next/link";

interface ILinkListItemLeft {
  text: string;
  link: string;
  external: boolean;
}

const ILinkListItemLeft: ILinkListItemLeft[] = [
  {
    text: "НАУКОВО-ДОСЛІДНИЙ ІНСТИТУТ",
    link: "/nis",
    external: false,
  },
  {
    text: "КОНСАЛТИНГОВИЙ ЦЕНТР",
    link: "/consulting-center",
    external: false,
  },
  {
    text: "НАУКОВО-ДОСЛІДНІ ЛАБОРАТОРІЇ",
    link: "/laboratory",
    external: false,
  },
  {
    text: "НАУКОВІ ШКОЛИ",
    link: "/science",
    external: false,
  },
  {
    text: "СТУДЕНТСЬКА НАУКА",
    link: "/studentnau",
    external: false,
  },
  {
    text: "ІННОВАЦІЙНІ РОЗРОБКИ",
    link: "/innovations",
    external: false,
  },
];

const ILinkListItemRight: ILinkListItemLeft[] = [
  {
    text: "ЦЕНТР МІЖНАРОДНОЇ ДІЯЛЬНОСТІ ",
    link: "/pois",
    external: false,
  },
  {
    text: "ВІДДІЛ МІЖНАРОДНИХ ГРАНТІВ ТА АКАДЕМІЧНОЇ МОБІЛЬНОСТІ",
    link: "/inout",
    external: false,
  },
  {
    text: "ЦЕНТР ЛІНГВІСТИЧНОЇ ПІДГОТОВКИ",
    link: "/langvich_success",
    external: false,
  },
  {
    text: "ЦЕНТР УКРАЇНО-ФРАНЦУЗЬКОГО СПІВРОБІТНИЦТВА",
    link: "http://france.ontu.edu.ua/",
    external: true,
  },
  {
    text: "ЦЕНТР УКРАЇНО-ТУРЕЦЬКОГО СПІВРОБІТНИЦТВА",
    link: "http://ukrturk.ontu.edu.ua/",
    external: true,
  },
  {
    text: "МІЖНАРОДНІ ПРОЄКТИ",
    link: "/international",
    external: false,
  },
];

const LinkList = ({}) => {
  return (
    <div className="w-full flex flex-row max-sm:flex-col px-2 max-sm:gap-12 2xl:gap-x-56 max-2xl:gap-x-40 max-xl:gap-x-12 max-md:gap-x-4">
      <div className="flex flex-col gap-y-8 w-full text-center">
        <div className="uppercase text-4xl max-md:text-2xl font-semibold">
          <div className="relative z-10">
            <span className="relative after:content-[''] after:z-[-1] after:absolute after:top-0 after:left-0 after:w-full after:h-[75%] after:bg-[#99ABA6] after:translate-x-[18px] after:translate-y-[20px] max-sm:after:translate-x-[15px] max-sm:after:translate-y-[13px]">
              наукова робота
            </span>
          </div>
        </div>
        {ILinkListItemLeft.map((item, index) => (
          <div key={index} className="underline uppercase text-[20px]">
            {item.external ? (
              <a href={item.link} target="_blank" referrerPolicy="no-referrer" rel="noopener noreferrer">
                {item.text}
              </a>
            ) : (
              <Link href={item.link}>{item.text}</Link>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-8 w-full text-center">
        <div className="uppercase text-4xl max-md:text-2xl font-semibold">
          <div className="relative z-10">
            <span className="relative after:content-[''] after:z-[-1] after:absolute after:top-0 after:left-0 after:w-full after:h-[75%] after:bg-[#99ABA6] after:translate-x-[18px] after:translate-y-[20px] max-sm:after:translate-x-[15px] max-sm:after:translate-y-[13px]">
              міжнародна діяльність
            </span>
          </div>
        </div>
        {ILinkListItemRight.map((item, index) => (
          <div key={index} className="underline uppercase text-[20px]">
            {item.external ? (
              <a href={item.link} target="_blank" referrerPolicy="no-referrer" rel="noopener noreferrer">
                {item.text}
              </a>
            ) : (
              <Link href={item.link}>{item.text}</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkList;
