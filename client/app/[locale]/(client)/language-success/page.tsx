import React from "react";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import Title from "@/UI/Title";
import { useTranslations } from "next-intl";

const courses = [
  {
    id: 1,
    name: "Англійська мова (для початківців) English for beginners",
    long: "96 годин (6 місяців)",
    short: "48 годин (3 місяці)",
  },
  {
    id: 2,
    name: "Англійська мова (середній рівень навчання) English for Intermediate students",
    long: "96 годин (6 місяців)",
    short: "48 годин (3 місяці)",
  },
  {
    id: 3,
    name: "Англійська мова (вищий рівень навчання) English for upper-intermediate students",
    long: "96 годин (6 місяців)",
    short: "48 годин (3 місяці)",
  },
  {
    id: 4,
    name: "Німецька мова Grundstufe, Mittelstufe, Fortgeschsittene",
    long: "96 годин (6 місяців)",
    short: "48 годин (3 місяці)",
  },
  {
    id: 5,
    name: "Французька мова (для початківців) Niveau debutant, A1,A2,B1",
    long: "96 годин (6 місяців)",
    short: "48 годин (3 місяці)",
  },
  {
    id: 6,
    name: "Курс підготовки студентів до складання МКТ (чи ЄВІ) для вступу до магістратури, аспірантури (англійська, німецька, французька мови)",
    long: "96 годин (6 місяців)",
    short: "48 годин (3 місяці)",
  },
  {
    id: 7,
    name: "Латинська мова для інженерно-технологічних спеціальностей",
    long: "96 годин (6 місяців)",
    short: "48 годин (3 місяці)",
  },
  {
    id: 8,
    name: "Українська мова (вивчення та підвищення рівня володіння українською мовою)",
    long: "96 годин (6 місяців)",
    short: "48 годин (3 місяці)",
  },
  {
    id: 9,
    name: "Українська мова (підготовка до іспиту на визначення рівня володіння державною мовою для виконання службових обов’язків)",
    long: "96 годин (6 місяців)",
    short: "48 годин (3 місяці)",
  },
  {
    id: 10,
    name: "Українська мова для іноземців",
    long: "96 годин (6 місяців)",
    short: "48 годин (3 місяці)",
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

const LangvichSuccess = () => {
  const titlePage = useTranslations('Page');

  return (
    <div className="xl:container xl:mx-auto my-10 px-8 max-md:px-4">
      <div className="flex flex-col gap-10">
        <Title text={titlePage('languageSuccess')} style="text-[#111318] text-5xl max-xl:text-3xl font-semibold" />
        <div className="flow-root max-md:flex max-md:flex-col-reverse max-md:gap-4">
          <div className="flex flex-col float-left gap-4 max-w-[200px] max-md:max-w-full justify-center items-center md:mr-8">
            <Image
              src={"/image/Philipenko.jpg"}
              width={200}
              height={300}
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
              classNames={{ wrapper: "w-full min-w-[200px]" }}
              alt={"preview"}
              radius="none"
              quality={100}
              as={NextImage}
              fetchPriority={"high"}
            />
            <div className="flex flex-col gap-1 text-sm max-md:text-xs text-[#777] text-center">
              <span>Директор Центру лінгвістичної підготовки</span>
              <span>к.філол.н.</span>
              <span>Філіпенко Ольга Іванівна</span>
              <span>кабінет В-335</span>
              <span>тел.: +380 50 788 91 56</span>
            </div>
          </div>
          <div className="block gap-4 text-base max-md:text-sm text-black">
            <div className="flex flex-col max-lg:block">
              <span className="indent-4">
                <span className="font-bold">Центр лінгвістичної підготовки</span> є структурним підрозділом ОНТУ, що
                надає освітню послугу «вивчення мов» студентам, викладачам, співробітникам університету та коледжів, які
                є структурними підрозділами ОНТУ (Механіко-технологічний фаховий коледж, Фаховий коледж нафтогазових
                технологій, інженерії та інфраструктури сервісу, Фаховий коледж промислової автоматики та інформаційних
                технологій, Одеський технічний фаховий коледж), аспірантам, докторантам ОНТУ у тому числі іноземним
                громадянам, які є студентами ОНТУ чи слухачами підготовчого відділення ОНТУ.
              </span>
              <span className="indent-4">
                <span className="font-bold">Центр лінгвістичної підготовки пропонує курси з вивчення:</span>
                <ul className="list-disc py-1 pl-8 indent-0">
                  <li>іноземної мови (англійська, німецька, французька та ін.);</li>
                  <li>латинської мови для інженерно-технологічних спеціальностей;</li>
                  <li>української мови;</li>
                  <li>української мови для іноземців.</li>
                </ul>
              </span>
              <span className="indent-4">
                <span className="font-bold">Напрями навчання в Центрі:</span>
                <ul className="list-disc py-1 pl-8 indent-0">
                  <li>від початкового (рівень А1) до професійного рівня (рівень C2);</li>
                  <li>підготовка до міжнародних іспитів з іноземних мов за різними рівнями;</li>
                  <li>складання МКТ (чи ЄВІ) для вступу до магістратури, аспірантури;</li>
                  <li>
                    проходження стажування й підвищення кваліфікації відповідно до рівня мовної підготовки з іноземних
                    мов;
                  </li>
                  <li>підготовка осіб до практичної діяльності, яка передбачає використання іноземних мов;</li>
                  <li>вивчення та підвищення рівня володіння українською мовою;</li>
                  <li>
                    підготовка до іспиту на визначення рівня володіння державною мовою для виконання службових
                    обов’язків;
                  </li>
                  <li>розмовний клуб на різноманітні та сучасні теми.</li>
                </ul>
              </span>
              <span className="indent-4">
                <ul className="py-1 pl-8">
                  <li>
                    <span className="font-bold"> Набір слухачів</span>
                    на курси іноземних мов проводиться за результатами попередньої співбесіди, під час якої визначається
                    рівень мовної підготовки та залежить від обраного слухачами напряму навчання.
                  </li>
                  <li>
                    <span className="font-bold"> Набір слухачів</span> на курси української мови залежить від обраного
                    слухачами напряму навчання.
                  </li>
                  <li>
                    Програми навчання на курсах ґрунтуються на рекомендаціях Національної комісії зі стандартів
                    державної мови та Загальноєвропейських рекомендаціях із мовної освіти.
                  </li>
                  <li>Навчальний процес забезпечують висококваліфіковані, досвідчені фахівці ОНТУ.</li>
                  <li>
                    <span className="font-bold">Прийом документів: </span> з 10.00 до 14.00, ауд. В-335.
                  </li>
                  <li>
                    <span className="font-bold">Телефон для довідок: </span> 050 788 91 56 – Ольга Іванівна.
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-[max-content,1fr,min-content] border border-gray-300">
            {/* Headers */}
            <div className="bg-[#d5d5d5] max-te:p-0 p-2 border text-center flex items-center justify-center font-bold text-base max-md:text-sm">
              № п/п
            </div>
            <div className="bg-[#d5d5d5] max-te:p-0 p-2 border text-center flex items-center justify-center font-bold text-base max-md:text-sm">
              Назва навчального курсу
            </div>
            <div className="bg-[#d5d5d5] max-te:p-0 p-2 border text-center font-bold text-base max-md:text-sm">
              Кількість навчальних годин
            </div>

            {/* Rows */}
            {courses.map((course, index) => (
              <React.Fragment key={course.id}>
                <div>
                  <div className="border p-2 max-te:p-0 h-1/2 text-center flex items-center justify-center text-base max-md:text-sm">
                    {index * 2 + 1}
                  </div>
                  <div className="border p-2 max-te:p-0 h-1/2 text-center flex items-center justify-center text-base max-md:text-sm">
                    {index * 2 + 2}
                  </div>
                </div>
                <div className="border p-2 max-te:p-0 text-center flex items-center justify-center text-base max-md:text-sm">
                  {course.name}
                </div>
                <div>
                  <div className="border p-2 max-te:p-0 text-center h-1/2 text-base max-md:text-sm">{course.long}</div>
                  <div className="border p-2 max-te:p-0 text-center h-1/2 text-base max-md:text-sm">{course.short}</div>
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

export default LangvichSuccess;
