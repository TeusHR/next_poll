import React from "react";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import Title from "@/UI/Title";

const Organization = [
  {
    id: 1,
    img: "/image/org-eua.png",
    title: "Європейська асоціація університетів",
    linkTitle: "European Universities Association",
    link: "http://www.eua.be/",
    abbr: "EUA",
  },
  {
    id: 2,
    img: "/image/org-bsun.png",
    title: "Асоціація університетів Чорноморського басейну",
    linkTitle: "Black Sea Universities Association",
    link: "http://www.bsun.org/",
    abbr: "BSUN",
  },
  {
    id: 3,
    img: "/image/org-icode.png",
    title: "Міжнародна асоціація заочного та дистанційного навчання",
    linkTitle: "International Council for Open and Distance Education",
    link: "http://www.icde.org/",
    abbr: "ICDE",
  },
  {
    id: 4,
    img: "/image/org-effost.png",
    title: "Європейська федерація харчової науки і технологі",
    linkTitle: "European Federation of Food Science and Technology",
    link: "http://www.effost.org/",
    abbr: "EFFoST",
  },
  {
    id: 5,
    img: "/image/org-magnahartia.png",
    title: "Міжнародна Асоціація університетів, що підписали Університетську Хартію",
    linkTitle: "The Magna Charta Observatory",
    link: "http://www.magna-charta.org/",
    abbr: "",
  },
  {
    id: 6,
    img: "/image/org-euchems.png",
    title: "Європейська асоціація з хімії та молекулярних наук",
    linkTitle: "European Association for Chemical and Molecular Sciences",
    link: "http://www.eua.be/",
    abbr: "EuCheMS",
  },
  {
    id: 7,
    img: "/image/org-lfpf.png",
    title: "Фонд розвитку освіти в сфері готельного сервісу в Центральній і Східній Європі",
    linkTitle: "La fondation pour la formation hôtelière",
    link: "http://www.lafondation.org/",
    abbr: "",
  },
  {
    id: 8,
    img: "/image/org-ifa.png",
    title: "Міжнародна асоціація харчових продуктів",
    linkTitle: "ISEKI Food Association",
    link: "https://www.iseki-food.net/",
    abbr: "",
  },
  {
    id: 9,
    img: "/image/org-oenodoc.png",
    title: "Міжнародна організація для вищої освіти і досліджень в області енології і виноградарства",
    linkTitle: "OENOVITI INTERNATIONAL",
    link: "http://www.oenoviti.univ-bordeauxsegalen.fr/",
    abbr: "",
  },
];

const langGallery = [
  {
    img: "/image/langvich-1.jpg",
  },
  {
    img: "/image/langvich-2.jpg",
  },
  {
    img: "/image/langvich-3.jpg",
  },
  {
    img: "/image/langvich-4.jpg",
  },
];

const InOut = () => {
  return (
    <div className="xl:container xl:mx-auto my-10 px-8 max-md:px-4">
      <div className="flex flex-col gap-10">
        <Title
          text="Відділ міжнародних грантів та академічної мобільності"
          style="text-[#111318] text-5xl max-xl:text-3xl font-semibold"
        />
        <div className="flow-root max-md:flex max-md:flex-col-reverse max-md:gap-4">
          <div className="flex flex-col float-left gap-4 max-w-[200px] max-md:max-w-full justify-center items-center md:mr-8">
            <div className="flex flex-col gap-6 text-sm max-md:text-xs text-[#777] text-center justify-center h-[200px]">
              <a href="http://inter.onaft.edu.ua/" className="text-[#0000ff]">
                САЙТ ВІДДІЛУ
              </a>
              <a href="mailto:intl_onapt@ukr.net" className="text-[#0000ff]">
                intl_onapt@ukr.net
              </a>
            </div>
          </div>
          <div className="block gap-4 text-base max-md:text-sm text-black">
            <div className="flex flex-col max-lg:block">
              <span className="font-bold text-center">
                Відділ міжнародних грантів та академічної мобільності виконує такі функції:
              </span>
              <span>
                <ul className="list-disc py-1 pl-8 indent-0">
                  <li>
                    Складає плани міжнародного співробітництва з урахуванням плану роботи ОНТУ та звіти про виконану
                    роботу;
                  </li>
                  <li>
                    Складає та оновлює список зарубіжних університетів, що ведуть підготовку фахівців у галузі харчової
                    науки і технології;
                  </li>
                  <li>
                    Розробляє документацію, необхідну для вступу ОНТУ в міжнародні спілки та асоціації, та угоди про
                    співробітництво ОНТУ із зарубіжними університетами і організаціями. Контролює виконання підписаних
                    договорів;
                  </li>
                  <li>
                    Проводить роботу з викладачами та студентами, аспірантами щодо направлення їх на навчання,
                    стажування за програмами двостороннього обміну і в рамках міжнародних організацій та проектів;
                  </li>
                  <li>
                    Проводить в ОНТУ організаційну та інформаційну роботу зі студентами та аспірантами щодо можливості
                    продовження навчання в зарубіжних університетах;
                  </li>
                  <li>
                    Бере участь у конкурсному відборі кандидатів для направлення на навчання студентів та стажування
                    аспірантів, наукових і науково-педагогічних працівників у передові зарубіжні університети;
                  </li>
                  <li>
                    Надає допомогу співробітникам, студентам та аспірантам у оформленні документів на іноземній мові для
                    участі в конкурсах на отримання грантів, публікації статей в зарубіжних журналах, поданні доповідей
                    на міжнародних конференціях;
                  </li>
                  <li>
                    Складає списки міжнародних конференцій з харчової науки та технологій і доводить їх до відома
                    співробітників, студентів і аспірантів;
                  </li>
                  <li>Розробляє пропозиції керівництву ОНТУ щодо підвищення ефективності роботи відділу.</li>
                </ul>
              </span>
              <span className="font-bold text-center">ОНТУ є дійсним членом наступних міжнародних організацій:</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-[1.5fr,1.5fr,1fr] border border-gray-300">
            {/* Headers */}
            <div className="bg-[#d5d5d5] p-2 border text-center flex items-center justify-center font-bold text-base max-md:text-sm" />
            <div className="bg-[#d5d5d5] p-2 border text-center flex items-center justify-center font-bold text-base max-md:text-sm">
              Назва асоціації
            </div>
            <div className="bg-[#d5d5d5] p-2 border text-center font-bold text-base max-md:text-sm">Сайт асоціації</div>

            {/* Rows */}
            {Organization.map((org, index) => (
              <React.Fragment key={org.id}>
                <div
                  className={`border p-4 max-te:p-1 text-center flex items-center justify-center text-base max-md:text-sm ${index % 2 ? "bg-[#f0f8ff]" : ""}`}
                >
                  <Image
                    src={org.img}
                    fill
                    sizes="100vw"
                    style={{ width: "100%", height: "100%" }}
                    className="object-contain"
                    classNames={{
                      wrapper:
                        "w-full min-w-[200px] !max-w-none h-[150px] max-md:h-[100px] min-w-[100px] max-xsm:h-[70px] max-xsm:min-w-[60px]",
                    }}
                    alt={"preview"}
                    radius="none"
                    quality={100}
                    as={NextImage}
                    fetchPriority={"high"}
                  />
                </div>
                <div
                  className={`border p-2 max-te:p-0 text-center flex items-center justify-center text-base max-md:text-sm max-te:text-xs ${index % 2 ? "bg-[#f0f8ff]" : ""}`}
                >
                  {org.title}
                </div>
                <div
                  className={`flex items-center justify-center border p-2 max-te:p-0 text-center ${index % 2 ? "bg-[#f0f8ff]" : ""}`}
                >
                  <div className="block text-base max-md:text-sm max-te:text-xs">
                    <a href={org.link} className="text-[#0000ff]">
                      {org.linkTitle}
                    </a>
                    {org.abbr ? " (" + org.abbr + ")" : ""}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-4 max-lg:grid-cols-2 max-xsm:grid-cols-1 gap-2">
            {langGallery.map((item, idx) => (
              <Image
                key={idx}
                src={item.img}
                fill
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
                className="object-cover"
                classNames={{ wrapper: "w-full min-w-[200px] !max-w-none h-[250px]" }}
                alt={"preview"}
                radius="none"
                quality={100}
                as={NextImage}
                fetchPriority={"high"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InOut;
