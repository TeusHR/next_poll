import React from "react";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import Document from "@/components/Document";
import Title from "@/UI/Title";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

const linkDocument = [
  {
    link: "https://ontu.edu.ua/download/pubinfo/provision_consulting_center-22.pdf",
    title: "Положення про консалтинговий центр ОНТУ",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-17-09-24-27-09-24.pdf",
    title:
      "Курси ПК 17.09.24 р.-27.09.24 р. за спеціальною професійною (сертифікатною) програмою для державних службовців категорії «Б» і «В»",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-26-06-24-05-07-24.pdf",
    title: "Курси ПК 26.06.24 р.-05.07.24 р. за програмою «Мистецтво створення високоефективних рецептів комбікормів»",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-25-06-24-28-06-24.pdf",
    title:
      "Курси ПК 25.06.24 р.-28.06.24 р. за програмою «Ділова та професійна українська мова» в режимі онлайн на платформі Zoom",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-10-06-24-20-06-24.pdf",
    title:
      "Курси ПК 10.06.24 р.-20.06.24 р. за програмою «Технологія сушіння та зберігання зерна» в режимі онлайн на платформі Zoom",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-27-05-24-30-05-24.pdf",
    title: "Тренінг 27-30 травня 2024 р. за програмою «Технологія і контроль зберігання та сушіння зерна»",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-14-05-24-25-05-24.pdf",
    title:
      "Курси ПК 14.05.24 р.-25.05.24 р. за програмою «Технологія сушіння та зберігання зерна» в режимі онлайн на платформі Zoom",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-29-04-24-20-05-24.pdf",
    title:
      "Курси ПК 29.04.24 р.-20.05.24 р. за програмою «Технології виробництва олії соняшникової та шроту соняшникового» в режимі онлайн на платформі Zoom",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-12-02-24-30-04-24.pdf",
    title:
      "Курси ПК 12.02.24 р.-30.04.24 р. за програмою «Комп’ютерні системи та програмна інженерія в автоматизації» у змішаному режимі",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-08-04-24-18-04-24.pdf",
    title:
      "Курси ПК 08.04.24 р.-18.04.24 р. за програмою «Технологія зберігання, консервування та переробки риби і морепродуктів» в режимі онлайн на платформі Zoom",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-01-04-24-13-04-24.pdf",
    title: "Курси ПК 01.04.24 р.-13.04.24 р. за програмою «Мистецтво створення високоефективних рецептів комбікормів»",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-18-03-24-30-03-24.pdf",
    title:
      "Курси ПК 18.03.24 р.-30.03.24 р. за програмою «Технології зберігання зерна» в режимі онлайн на платформі Zoom",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-04-03-24-16-03-24.pdf",
    title:
      "Курси ПК 04.03.24 р.-16.03.24 р. за програмою «Технологія післязбиральної обробки зерна та експлуатація будівель і споруд у галузі зберігання зерна» в режимі онлайн на платформі Zoom",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-19-02-24-29-02-24.pdf",
    title:
      "Курси ПК 19.02.24 р.-29.02.24 р. за програмою «Теоретичні основи виробництва хлібобулочних виробів» в режимі онлайн на платформі Zoom",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Momot-Broker.pdf",
    title: "Momot Broker",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/broker-course.pdf",
    title: "Курс митного брокера",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-22-01-24-31-01-24.pdf",
    title: "Курси ПК 22.01.24 р.-31.01.24 р. в режимі онлайн",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-27-10-23-12-12-23.pdf",
    title: "Курси ПК 27.10.23 р.-12.12.23 р. за програмою «Техніка та технологія сушіння зерна» у змішаному режимі",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-27-11-06-12-23.pdf",
    title:
      "Курси ПК 27.11.23 р.-06.12.23 р. за програмою «Сенсорний аналіз у технології продуктів бродіння, напоїв та виноробства»",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-22-11-01-12-23.pdf",
    title:
      "Курси ПК 22.11.23 р.-01.12.23 р. за програмою «ХАССП – система управління безпечністю харчової продукції» в режимі онлайн на платформі Zoom",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-25-28-10-23.pdf",
    title: "Курси ПК 25.10.23 р.-28.10.23 р. за програмою: «Визначення показників якості зерна за різними методами»",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-18-29-07-23.pdf",
    title:
      "Курси ПК 18.07.23 р.-29.07.23 р. за програмою: «Технологія зберігання зерна» та «Управління персоналом в галузі зберігання зерна»",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-12-22-06-23.pdf",
    title:
      "Курси ПК 12.06.23 р.-22.06.23 р. за програмою: «Технологія виробництва і зберігання зернових, бобових та олійних культур»",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-29-05-23-09-06-23.pdf",
    title: "Курси ПК 29.05.23 р.-09.06.23 р. за програмою: «Техніка та технологія сушіння зерна»",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-15-26-05-23.pdf",
    title: "Курси ПК 15.05.23 р.-26.05.23 р. за програмою: «Технології зберігання зерна» в режимі онлайн",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-10-21-04-23.pdf",
    title: "Курси ПК 10.04.23 р.-21.04.23 р. за програмою: «Технології зберігання зерна» в режимі онлайн",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-16-26-01-23.pdf",
    title:
      "Курси ПК 16.01.23 р.-26.01.23 р. за програмами «Технології зберігання зерна» та «Управління персоналом в галузі зберігання зерна» в режимі онлайн",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-28-11-22-09-12-22-ua.pdf",
    title: "Курси ПК 28.11.22 р.-09.12.22 р. за програмою «Технологія зберігання зерна» в режимі онлайн",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Training-Inform-05-15-09-22_ua.pdf",
    title: "Курси ПК 05-15 вересня 2022 р. за програмою «Технологія консервного виробництва»",
  },
  {
    link: "https://ontu.edu.ua/download/NDI/Seminar-Inform-23-24-11-21-ua.pdf",
    title:
      "Семінар 23-24-11.2021 р. за програмою «Виробництво хлібобулочних виробів з використанням технологій заморозки»",
  },
  {
    link: "https://ontu.edu.ua/download/new/2021/Training-Inform-18-28-10-21_ua.pdf",
    title: "Курси ПК 18-28 жовтня 2021 р. за програмою «Технологія зберігання зерна»",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/2021/Training-Inform-27-09-07-10-21_ua.pdf",
    title: "Курси ПК 27 вересня-7 жовтня 2021 р. за програмою «Технологія зберігання зерна»",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/2021/Training-Inform-June-24-25-21_ua.pdf",
    title: "Тренінг 24-25 червня 2021 р. за програмою «Біохімія зерна»",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/2021/Training-Inform-18-28-05-21_ua.pdf",
    title: "Курси ПК 18-28 травня 2021 р. за програмою «Технологія зберігання зерна»",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/2021/Training-Inform-15-25-03-21_ua.pdf",
    title: "Курси ПК 15-25 березня 2021 р. за програмою «Технологія зберігання зерна»",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/2021/Training-Inform-10-20-02-21_ua.pdf",
    title: "Курси ПК 10-20 лютого 2021 р. за програмою «Технологія зберігання зерна» в режимі онлайн",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/2021/Training-Inform-1-10-02-21_ua.pdf",
    title:
      "Курси ПК 1-10 лютого 2021 р. за програмою «Технологія виробництва та зберігання жирів і олій рослинних та тваринних, зернових, зернобобових і олійних культур та продуктів їх переробки»",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/2020/Training-Inform-16-14-11-20_ua.pdf",
    title: "Курси ПК 16-27 листопада 2020 р. за програмою «Технологія зберігання зерна»",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-10-03--14-03-20-16-03--18-03-20_ua.pdf",
    title:
      'Виїзний тренінг для представників Фермерського господарства "Органік Сістемс"10.03.-14.03.20р.-16.03-18.03.20р. за програмою "Технологія харчових виробництв"',
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-02-12-03-20_ua.pdf",
    title:
      "Курси ПК 2-12 березня 2020 р. за трьома програмами: 'Технології зберігання і переробки зерна', 'Технології зберігання та сушіння зерна', 'Мікробіологічний контроль харчових продуктів'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-28-31-01-20_ua.pdf",
    title:
      "Тренінг 28-31 січня 2020 р. для представників фермерського господарства 'Інтегровані агросистеми' за програмою 'Сенсорний аналіз томатної пасти'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-04-14-11-19_ua.pdf",
    title: "Курси ПК 4-14 листопада 2019 р. за програмою 'Технології зберігання і переробки зерна'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-June-24-26-06-19_ua.pdf",
    title:
      "Тренінг 24-26 червня 2019 р. за програмою 'Технологія консервування та переробки плодів, овочів та фруктів'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-June-18-27-06-19_ua.pdf",
    title: "Курси ПК 18-27 червня 2019 р. за програмою 'Економіка підприємства'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-04-14-11-19_ua.pdf",
    title: "Курси ПК 4-14 червня 2019 р. за програмою 'Технології зберігання і переробки зерна'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-May-22-23-05-19_ua.pdf",
    title: "Тренінг 22-23 травня 2019 р. за програмою 'Інноваційні технології у зерновій галузі'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/2019/advanced-training-courses-April-16-20-and-May-21-25-19-ua.pdf",
    title: "Курси ПК 16-20 квітня та 21-25 травня 2019 р. за програмою 'Енергетичний менеджмент'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Inform-courses-April-8.17.019_ua.pdf",
    title: "Курси ПК 8-17 квітня 2019 р. за програмою 'Аналітичний та санітарно-мікробіологічний контроль якості води'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-March-21-22-03-19_ua.pdf",
    title: "Тренінг 21-22 березня 2019 р. для представників дочірнього підприємства 'Кондитерська корпорація Рошен'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-March-12-13-03-19_ua.pdf",
    title:
      "Тренінг 12-13 березня 2019 р. за програмою 'Сучасний стан та перспективи розвитку елеваторної промисловості'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-March-12-22-01-19_ua.pdf",
    title: "Курси ПК 12-22 січня 2019 р. за програмою 'Сенсорний аналіз м'ясних продуктів'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-13-28-02-18_ua.pdf",
    title: "Курси ПК 13-28 лютого 2018 р. за програмою 'Сенсорний аналіз харчових продуктів'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Seminar-Inform-21-02-18-ua.pdf",
    title:
      "Виїзний семінар для представників ПП 'Західний Буг' 21 лютого 2018 р. за програмою 'Сучасні проблеми сушіння зерна'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-17-27-04-18_ua.pdf",
    title: "Курси ПК 17-27 квітня 2018 р. за програмою 'Технології зберігання і переробки зерна'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Seminar-Inform-18-04-18-ua.pdf",
    title:
      "Виїзний семінар для представників ПрАТ 'Новокаховський комбінат хлібопродуктів' 18 квітня 2018 р. за програмою 'Технологія сушіння зерна'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-15-29-05-18_ua.pdf",
    title: "Курси ПК 15-29 травня 2018 р. за програмою 'Організація сенсорного аналізу виноробної промисловості'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-30-05-14-06-05-15-06-18_ua.pdf",
    title:
      "Курси ПК 30.05-14.06.2018 р. та 5-15.06.2018 р. за програмами: 'Сенсорний аналіз харчових продуктів', 'Технології зберігання і переробки зерна', 'Інноваційні технології і готельно-ресторанний бізнес'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-12-24-11-18_ua.pdf",
    title: "Курси ПК 12-24 листопада 2018 р. за програмою 'Сенсорний аналіз у виноробній промисловості'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-13-21-11-18_ua.pdf",
    title: "Курси ПК 13-21 листопада 2018 р. за програмою 'Технології зберігання і переробки зерна'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Seminar-Inform-21-23-11-04-06-12-18-ua.pdf",
    title: "Семінари 21-23 листопада та 4-6 грудня 2018 р. для співробітників ТОВ 'Квас бевериджис'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Seminar-Inform-29-11-01-12-18-ua.pdf",
    title: "Семінар 29.11-01.12.2018 р. за програмою 'Сенсорний аналіз харчових продуктів та смакових добавок'",
  },
  {
    link: "https://ontu.edu.ua/download/konfi/Training-Inform-6-15-12-18_ua.pdf",
    title:
      "Курси ПК 6-15 грудня 2018 р. за програмою 'Підвищення ефективності та безпеки кріогенних повітророзподільних установок'",
  },
];

export async function generateMetadata(
  {params}: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale:params.locale, namespace: 'Page'});

  return {
    title: t('consultingCenter'),
    openGraph: {
      url: "/consultingCenter/",
    },
  };
}

const ConsultingCenter = () => {
  const titlePage = useTranslations('Page');

  return (
    <div className="xl:container xl:mx-auto my-10 px-8 max-md:px-4">
      <div className="flex flex-col gap-10">
        <Title text={titlePage('consultingCenter')} style="text-[#111318] text-5xl max-xl:text-3xl font-semibold" />
        <div className="flow-root max-md:flex max-md:flex-col-reverse max-md:gap-4">
          <div className="flex flex-col float-left gap-4 max-w-[200px] max-md:max-w-full justify-center items-center md:mr-8">
            <Image
              src={"/image/valevska.jpg"}
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
              <span>Директор Консалтингового центру НДІ ОНТУ</span>
              <span>к.т.н., доц.</span>
              <span>Валевська Людмила Олександрівна</span>
              <span>тел. (048) 712-40-40,</span>
              <span>моб.: (067) 682-85-16,</span>
              <span className="flex flex-wrap justify-center">
                Email:
                <a href="mailto:ludmila_valev@ukr.net" className="text-[#0000ff]">
                  ludmila_valev@ukr.net
                </a>
              </span>
            </div>
          </div>
          <div className="block gap-4 text-base max-md:text-sm text-black">
            <div className="flex flex-col text-center">
              <span className="text-[#000080] text-lg max-bg:text-base font-bold">
                СКЛАД КОНСАЛТИНГОВОГО ЦЕНТРУ НДІ ОНТУ
              </span>
              <span className="underline">Директор Консалтингового центру НДІ ОНТУ</span>
              <span className="underline">Кандидат технічних наук, доцент Валевська Людмила Олександрівна</span>
            </div>
            <div className="flex flex-col max-lg:block">
              <span>
                <p className="indent-4">
                  Закінчила Одеський національний технологічний університет у 2007 році та здобула кваліфікацію магістра
                  з відзнакою з технології зберігання і переробки зерна.
                </p>
              </span>
              <span>
                <p className="indent-4">
                  Пройшла навчання в аспірантурі (ОНТУ) за фахом 05.18.15 – товарознавство. У 2011 році Валевська
                  Людмила Олександрівна успішно захистила кандидатську дисертацію у спеціалізованій вченій раді
                  Харківського державного університету харчування та торгівлі МОН України, м. Харків.
                </p>
              </span>
              <span>
                <p className="indent-4">
                  З 2007 до 2015 р. займала посаду асистента кафедри товарознавства та експертизи товарів; з 2015 до
                  2016 р. – асистента кафедри технології зберігання зерна; з 2016 до 2018 р. – старшого викладача
                  кафедри технології зберігання зерна; з 2018 року по теперішній час – доцента кафедри технології
                  зберігання зерна.
                </p>
              </span>
              <span className="indent-4">
                <p className="indent-4">
                  За час роботи проходила стажування на ПрАТ “Укрелеваторпром” (м. Одеса) (2013 р. та 2019 р.), отримала
                  посвідчення “Вищої школи педагогічної майстерності” ОНТУ (2014 р.), підвищувала кваліфікацію у
                  Лодзинському технічному університеті (м. Лодзь, Польща) та отримала сертифікат про проходження
                  стажування (2017 р.), в 2018 році – підвищувала кваліфікацію в науково-дослідному інституті ОНТУ за
                  програмою “Сенсорний аналіз харчових продуктів”.
                </p>
              </span>
              <span>
                <p className="indent-4">
                  Має 279 публікацій, з них 239 наукових та 40 навчально-методичного характеру (з них 1 навчальний
                  посібник, 5 колективних монографій, 30 патентів на корисну модель, 31 наукових статей у фахових
                  виданнях України та закордоном, 2 – у виданні, що входить у Scopus та 3 – що входить у Web of Science
                  та 121 тези доповідей міжнародних, всеукраїнських, наукових, науково-практичних та науково-методичних
                  конференцій).
                </p>
              </span>
              <span>
                <p className="indent-4">
                  Нагороди: стипендіат Кабінету Міністрів України (2011-2013 рр), переможець конкурсу «Кращий молодий
                  винахідник» (2008 р.), грамота проректора з наукової роботи та міжнародних зв’язків «За плідну наукову
                  діяльність» (2011 р.), диплом за перемогу у конкурсі на звання «Кращий куратор ОНТУ» (2018 р.),
                  грамота проректора з наукової роботи «За ініціативну і наполегливу роботу в Консалтинговому центрі НДІ
                  ОНТУ з організації та проведення курсів та виїзних навчально-практичних семінарів з підвищення
                  кваліфікації» (2018 р.).
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row max-md:flex-col max-md:gap-4">
          <div className="flex flex-col gap-4 text-base max-md:text-sm text-black">
            <div className="flex flex-col text-center">
              <span className="underline">Провідний інженер Консалтингового центру НДІ ОНТУ</span>
              <span className="underline">Терземан Ганна Миколаївна</span>
            </div>
            <div className="flex flex-col">
              <span className="indent-4">
                Закінчила Інститут холоду, кріотехнологій і екоенергетики ім. Мартиновського ОНТУ (в минулому - Одеську
                державну академію холоду) у 2007 році (Факультет прикладної екології, енергетики та нафтогазових
                технологій) та здобула кваліфікацію магістра з екології та охорони навколишнього середовища.
              </span>
              <span className="indent-4">
                У 2007 році після закінчення вищого навчального закладу почала працювати в ОНТУ в Інституті
                післядипломної освіти на факультеті підвищення кваліфікації методистом 1 категорії та пропрацювала до
                2018 року до ліквідації інституту. Отримала два посвідчення про закінчення Школи комп’ютерних
                технологій. Отримала дві грамоти від директора Інституту ПДО за сумлінну працю, високі професійні
                якості, вагомий внесок і активну участь в організації навчального процесу.
              </span>
              <span className="indent-4">
                На базі Інституту післядипломної освіти ОНТУ у 2011 році отримала другу вищу освіту та здобула
                кваліфікацію спеціаліста з економіки підприємства.
              </span>
              <span className="indent-4">
                З лютого 2018 року по теперішній час працює провідним інженером у Консалтинговому центрі
                Науково-дослідного інституту ОНТУ.
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col text-center">
                <span className="text-[#000080] text-lg max-bg:text-base font-bold">
                  МЕТА ТА НАПРЯМИ ДІЯЛЬНОСТІ КОНСАЛТИНГОВОГО ЦЕНТРУ НДІ ОНТУ
                </span>
              </div>
              <div className="flex flex-col">
                <span className="indent-4">Основними напрямами діяльності Центру є:</span>
                <ul className="list-disc py-4 pl-8">
                  <li>організація освітньої діяльності;</li>
                  <li>
                    підвищення кваліфікації керівників, провідних фахівців, фахівців харчової і зернопереробної
                    промисловості та галузей по базовим спеціальностям, акредитованим в ОНТУ;
                  </li>
                  <li>
                    організація і проведення професійних навчальних семінарів, курсів, тренінгів, вебінарів, циклів
                    лекцій, ділових зустрічей та інших заходів з підвищення кваліфікації в онлайн та офлайн режимах;
                  </li>
                  <li>надання консультацій з напрямків діяльності Центру.</li>
                </ul>
                <span className="indent-4">
                  Центр може здійснювати підвищення кваліфікації фахівців в онлайн та офлайн режимах у таких формах:
                </span>
                <ul className="list-disc py-4 pl-8">
                  <li>
                    підвищення кваліфікації на курсах підвищення кваліфікації (тривалістю не менше 90 аудиторних годин
                    або 3-х кредитів ЄКТС), на професійних семінарах, тренінгах, вебінарах, циклах лекцій, ділових
                    зустрічах (тривалістю менше 90 аудиторних годин або менше 3-х кредитів ЄКТС) з метою підвищення їх
                    освітнього ступеня відповідно розвитку різних галузей знань та досягнень науково-технічного
                    прогресу.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-[200px] max-md:max-w-full justify-center items-center md:ml-8">
            <Image
              src={"/image/terzeman.jpg"}
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
              <span>Провідний інженер Консалтингового центру НДІ ОНТУ</span>
              <span>Терземан Ганна Миколаївна</span>
              <span>тел. (048) 712-40-40,</span>
              <span>моб.: (098) 497 96 79</span>
              <span className="flex flex-wrap justify-center">
                Email:
                <a href="mailto:konsalting.centr.ontu@gmail.com" className="text-[#0000ff]">
                  konsalting.centr.ontu@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-center">КОНСАЛТИНГОВИЙ ЦЕНТР НДІ ОНТУ</span>
          <span className="font-bold indent-4">
            Запрошує керівників та співробітників харчових, зернопереробних підприємств та інших організацій на наступні
            заходи з підвищення кваліфікації в онлайн та офлайн режимах:
          </span>
          <ul className="list-disc py-4 pl-8">
            <li>
              курси підвищення кваліфікації (за результатами успішного закінчення курсів видається свідоцтво про
              підвищення кваліфікації державного зразка);
              <a href="https://ontu.edu.ua/download/NDI/Testimony-NDI-example.pdf" className="underline text-[#0000ff]">
                Зразок свідотства
              </a>
            </li>
            <li>
              навчально-практичні та корпоративні семінари і тренінги (по закінченню видається відповідний сертифікат);
            </li>
            <li>
              консультативні послуги за всіма спеціальностями різних галузей промисловості, акредитованими в ОНТУ.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <span className="font-bold indent-4">
              Необхідні документи для зарахування на заходи з підвищення кваліфікації в онлайн та офлайн режимах (курси,
              тренінги, навчально-практичні семінари):
            </span>
            <ul className="list-disc py-4 pl-8">
              <li>
                заява на проведення заходу з підвищення кваліфікації (на ім’я директора КЦ НДІ, або проректора з НР, або
                ректора ОНТУ);
              </li>
              <li>копія паспорта та ідентифікаційного податкового номеру (для фізичної особи);</li>
              <li>договір про надання платних освітніх послуг між ОНТУ та фізичною (або юридичною особою).</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <span className="font-bold indent-4">
              З початку заснування Консалтингового центру Науково-дослідного інституту (з 2018 р.) підвищили
              кваліфікацію 487 слухачів, більш ніж з 50 різних підприємств:
            </span>
            <span className="font-bold indent-4">
              За 2018 рік підвищили свою кваліфікацію слухачі з наступних підприємств:
            </span>
            <span>
              ПП «Західний Буг», ТОВ «ТІС-ЗЕРНО», СГ ТзОВ «Дубенська аграрна компанія», ПрАТ «Новокаховський комбінат
              хлібопродуктів», ПАТ «Крюківський вагонобудівний завод», ТОВ «Грейн-Інновейшн Системз», ТОВ «Гределіс», ПП
              «Бурякорадгосп цукрокомбінат ім. Халтуріна», ПрАТ «АПК-ІНВЕСТ», ПАТ «Державна продовольчо-зернова
              корпорація України» «Роївський елеватор», «Дубенський комбінат хлібопродуктів», ДП «Радивилівський
              комбінат хлібопродуктів», ДП «Агросервіс 2000», ТОВ «Квас Бевериджиз», ПП «Алма-Веко, Фуд», ТОВ «Інститут
              низькотемпературних енерготехнологій» (134 слухача).
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold indent-4">
              За 2019 рік підвищили свою кваліфікацію слухачі з таких підприємств:
            </span>
            <span>
              ПрАТ «Миронівський хлібопродукт», ТОВ «ЗЕРНО-АГРОТРЕЙД», ТОВ «Агрофірма ім. Довженка», ДП КК «РОШЕН», ПАТ
              ЦЕНТРЕНЕРГО «Вуглегірська ТЕС», Палетна Асоціація України, ТОВ «Українська елеваторна компанія», ПАТ ДПЗКУ
              Філія «Дубенський комбінат хлібопродуктів», Філія «Роївський елеватор», ТОВ МСП «Ніка-Тера», ТОВ
              «Традєкс», ПАТ «Крюківський вагонобудівний завод», ТОВ «Яблуневий дар», ПАТ «ІНСПЕКТОРАТ УКРАЇНИ» (76
              слухачів).
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold indent-4">
              За 2020 рік підвищили свою кваліфікацію слухачі з таких підприємств:
            </span>
            <span>
              ФГ «Інтегровані Агросистеми», ДП «Сантрейд» ФГ «Органік Сістемс», АТ ДПЗКУ Філія «Дубенський комбінат
              хлібопродуктів», АТ ДПЗКУ Філія «Великолепетиський елеватор», ТОВ МСП «Ніка-Тера», ПАТ «Любашівський
              елеватор» ТОВ «Літа», ТОВ «Агрофірма» «Трипілля», ТОВ «Агрохолдинг «Зоря», ФГ «Органік Сістемс», СТОВ
              «Ратнівський аграрій», ТОВ «ТІС-Зерно», ТОВ «Невель», ТОВ «Самбірський елеватор» (53 слухача).
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold indent-4">
              За 2021 рік підвищили свою кваліфікацію слухачі з таких підприємств:
            </span>
            <span>
              ТОВ «БАСТІКО УКРАЇНА», ТОВ «Кононівський елеватор», Філія АТ «ДПЗКУ» «Великолепетиський елеватор», ТОВ
              «МСП Ніка-Тера», ДП «Златодар», ТОВ «Краншип», ТОВ «ЄВТ ГРЕЙН», ТОВ «ВІТЧИЗНА», ТОВ «ХАНЗЕ АГРІ УКРАЇНА»,
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              ТОВ «АГРО-РОСЬ-ІНВЕСТ», ТОВ «ІНТЕРАГРОІНВЕСТ», ТОВ «ЗЕРНО-АГРОТРЕЙД», ТОВ "Зерновий термінал Ніка-Тера",
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              ТОВ "БАКІТО" (204 слухача).
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold indent-4">
              За 2022 рік підвищили свою кваліфікацію слухачі з таких підприємств:
            </span>
            <span>ТОВ «Новоукраїнське», ТОВ «Сієфджі трейдинг», СТОВ «Ратнівський аграрій» (12 слухачів).</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold indent-4">
              За 2023 рік підвищили свою кваліфікацію слухачі з таких підприємств:
            </span>
            <span>ПрАТ «Українське Дунайське Пароплавство»(28 слухачів).</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 text-center">
            <div>
              <span className="font-bold block">Шановні наші майбутні слухачі!</span>
              <span className="font-bold block">
                Ми пропонуємо Вам якісні послуги для покращення Вашої подальшої роботи. Пам’ятайте: підвищення
                кваліфікації – це не стаття витрат у Вашому бюджеті, а ефективне і цілеспрямоване вкладання коштів!!!
              </span>
            </div>
            <div>
              <span className="underline block">За більш детальною інформацією звертайтесь за адресою:</span>
              <span className="underline block">65039, м. Одеса, вул. Канатна, 112, головний корпус, каб. А-207</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Контактні дані:</span>
            <span>Директор КЦ НДІ ОНТУ</span>
            <span className="italic">к.т.н., доцент Валевська Людмила Олександрівна</span>
            <span>тел. (048) 712-40-40, моб.: (067) 682-85-16;</span>
            <span>Провідний інженер КЦ НДІ ОНТУ</span>
            <span>Терземан Ганна Миколаївна</span>
            <span>тел. (048) 712-40-40, моб.: (098) 497 96 79</span>
            <span>
              E-mail:
              <a href="mailto:konsalting.centr.ontu@gmail.com" className="text-[#0000ff]">
                konsalting.centr.ontu@gmail.com
              </a>
            </span>
            <span>
              <a href="mailto:konsalting.centr.onaft@ukr.net" className="text-[#0000ff]">
                konsalting.centr.onaft@ukr.net
              </a>
            </span>
            <span>
              <a href="mailto:ludmila_valev@ukr.net" className="text-[#0000ff]">
                ludmila_valev@ukr.net
              </a>
            </span>
            <span>
              Ми також є у мережі
              <a href="https://www.facebook.com/groups/193728101379118/?ref=share" className="text-[#0000ff]">
                Facebook
              </a>
            </span>
            <span>Проїзд: від залізничного вокзалу – маршрутне таксі № 127, 175, 210, тролейбус №10.</span>
            <span>Зупинка: перша станція Великого Фонтану</span>
            <span>
              <a href="https://ontu.edu.ua/map" className="text-[#0000ff]">
                Посилання на карту проїзду
              </a>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {linkDocument.map((item, idx) => (
            <Document link={item.link} title={item.title} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultingCenter;
