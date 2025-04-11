import React, { FC } from "react";
import { Link } from "@/routing/*";
import { MainTranslation } from "../../app/[locale]/(client)/page";

interface ILinkListItemLeft {
  text: keyof MainTranslation['Main']['scientificBlock'] | keyof MainTranslation['Main']['internationalRelationsBlock'];
  link: string;
  external: boolean;
}

const ILinkListItemLeft: ILinkListItemLeft[] = [
  {
    text: 'scientificInstitute',
    link: "/nis",
    external: false,
  },
  {
    text: "consultingCenter",
    link: "/consulting-center",
    external: false,
  },
  {
    text: "scientificLaboratories",
    link: "/laboratory",
    external: false,
  },
  {
    text: "scientificSchools",
    link: "/science",
    external: false,
  },
  {
    text: "studentScience",
    link: "/studentnau",
    external: false,
  },
  {
    text: "innovativeCenter",
    link: "/innovations",
    external: false,
  },
  {
    text: "cys",
    link: "/cys",
    external: false,
  },
  {
    text: "academicCouncil",
    link: "/academic-council",
    external: false,
  },
  {
    text: "scienceCompetition",
    link: "/science-competition",
    external: false,
  },
];

const ILinkListItemRight: ILinkListItemLeft[] = [
  {
    text: "centerActivity",
    link: "/pois",
    external: false,
  },
  {
    text: "departmentMobility",
    link: "/inout",
    external: false,
  },
  {
    text: "internationalProjects",
    link: "/international",
    external: false,
  },
  {
    text: "internationalPractice",
    link: "/international-practice",
    external: false,
  },
  {
    text: "internationalFrenchCooperation",
    link: "http://france.ontu.edu.ua/",
    external: true,
  },
  {
    text: "internationalTurkishCooperation",
    link: "http://ukrturk.ontu.edu.ua/",
    external: true,
  },
  {
    text: "linguisticCenter",
    link: "/language-success",
    external: false,
  },
];

type Props = {
  translation:MainTranslation
}

const LinkList:FC<Props> = ({translation}) => {
  return (
    <div className="w-full flex flex-row max-sm:flex-col px-2 max-sm:gap-12 2xl:gap-x-56 max-2xl:gap-x-40 max-xl:gap-x-12 max-md:gap-x-4">
      <div className="flex flex-col gap-y-8 w-full text-center">
        <div className="uppercase text-4xl max-md:text-2xl font-semibold">
          <div className="relative z-10">
            <span className="relative after:content-[''] after:z-[-1] after:absolute after:top-0 after:left-0 after:w-full after:h-[75%] after:bg-[#99ABA6] after:translate-x-[18px] after:translate-y-[20px] max-sm:after:translate-x-[15px] max-sm:after:translate-y-[13px]">
              {translation.Main.scientificBlock.scientificWork}
            </span>
          </div>
        </div>
        {ILinkListItemLeft.map((item, index) => (
          <div key={index} className="underline uppercase text-[20px]">
            {item.external ? (
              <a href={item.link} target="_blank" referrerPolicy="no-referrer" rel="noopener noreferrer">
                {translation.Main.scientificBlock[item.text as keyof MainTranslation['Main']['scientificBlock']]}
              </a>
            ) : (
              <Link href={item.link}>{translation.Main.scientificBlock[item.text as keyof MainTranslation['Main']['scientificBlock']]}</Link>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-8 w-full text-center">
        <div className="uppercase text-4xl max-md:text-2xl font-semibold">
          <div className="relative z-10">
            <span className="relative after:content-[''] after:z-[-1] after:absolute after:top-0 after:left-0 after:w-full after:h-[75%] after:bg-[#99ABA6] after:translate-x-[18px] after:translate-y-[20px] max-sm:after:translate-x-[15px] max-sm:after:translate-y-[13px]">
             {translation.Main.internationalRelationsBlock.internationalRelations}
            </span>
          </div>
        </div>
        {ILinkListItemRight.map((item, index) => (
          <div key={index} className="underline uppercase text-[20px]">
            {item.external ? (
              <a href={item.link} target="_blank" referrerPolicy="no-referrer" rel="noopener noreferrer">
                {translation.Main.internationalRelationsBlock[item.text as keyof MainTranslation['Main']['internationalRelationsBlock']]}
              </a>
            ) : (
              <Link href={item.link}>{translation.Main.internationalRelationsBlock[item.text as keyof MainTranslation['Main']['internationalRelationsBlock']]}</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkList;
