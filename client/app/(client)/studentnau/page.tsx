import React from "react";
import Document from "@/components/Document";
import Title from "@/UI/Title";

const linkDocument = [
  {
    link: "https://ontu.edu.ua/download/order_327-01_06-10-21.pdf",
    title: "Наказ про склад наукових студентських гуртків від 06.10.2021",
  },
  {
    link: "https://ontu.edu.ua/download/sbornik_st-2020.pdf",
    title: "Збірник наукових праць молодих вчених, аспірантів і студентів",
  },
  {
    link: "https://ontu.edu.ua/download/pubinfo/nakaz_konkurs_stud_rabot.pdf",
    title:
      "Витяг з переліку переможців Всеукраїнського конкурсу студентських наукових робіт з природничих, технічних та гуманітарних наук 2015/2016 навчального року",
  },
  {
    link: "https://ontu.edu.ua/download/order-365-01-15-10-20.pdf",
    title:
      "Наказ про підсумки Всеукраїнського конкурсу студентських наукових робіт з галузей знань і спеціальностей у 2019-2020 н.р.",
  },
  {
    link: "https://ontu.edu.ua/download/order-420-01-29-09-22-1.pdf",
    title: "Наказ про склад наукових гуртків і клубів здобувачів вищої освіти від 22.09.2022",
  },
  {
    link: "https://ontu.edu.ua/download/order-338-01-25-09-23.pdf",
    title: "Наказ про склад наукових гуртків і клубів здобувачів вищої освіти від 25.09.2023",
  },
];

const Studentnau = () => {
  return (
    <div className="xl:container xl:mx-auto my-10 px-8 max-md:px-4">
      <div className="flex flex-col gap-10">
        <Title text="Студентська наука" style="text-[#111318] text-5xl max-xl:text-3xl font-semibold" />
        <div className="block gap-4 text-base max-md:text-sm text-black">
          <div className="text-center w-full flex items-center justify-center">
            <span className="font-bold">
              Відомості про науково-дослідну та інноваційну діяльність здобувачів вищої освіти
            </span>
          </div>
          <div className="flex flex-col">
            <div className="indent-4">
              Воєнний стан не завадив працювати університету за прогресивною системою навчання, спрямованою на
              формування нової генерації фахівців, від якості підготовки яких значною мірою залежить успіх подальшого
              розвитку країни.
            </div>
            <div className="indent-4">
              За останні роки в університеті розроблено та впроваджено модель підготовки фахівців з вищою технічною
              освітою, яка заснована на отриманні практичних компетенцій у виробничих і лабораторних умовах.
            </div>
            <div className="indent-4">
              В університеті активно застосовуються такі форми науково-дослідної роботи здобувачів вищої освіти: участь
              у наукових конкурсах, науково-дослідних, дипломних і магістерских роботах, семінарах, вебінарах,
              конференціях, круглих столах, у предметних олімпіадах, робота в наукових і творчих гуртках та клубах;
              робота в науково-дослідних лабораторіях тощо.
            </div>
            <div className="indent-4">
              В університеті створена потужна база для проведення науково-дослідної роботи здобувачів вищої освіти.
              Протягом останніх років діють кілька десятків сучасних навчально-наукових лабораторій, до створення яких
              долучилися широко відомі компанії.
            </div>
            <div className="indent-4">
              У 2023 році відкрито Коворкінг-простір (Coworking Space) на базі кафедри торговельного підприємництва,
              товарознавства та управління бізнесом. Він містить декілька локацій – для офіційних заходів, для навчання,
              для тренінгів і спілкування, а також локацію для відпочинку і філіжанки кави. На базі коворкінг-простіру
              будуть проводитися бізнес-консультування, тренінги, круглий стіл «Від start-up до реального проєкту:
              бачення наукової молоді». Коворкінг-простір буде сприяти спілкуванню освітян, науковців, представників
              бізнесу і громадськості для відродження нашої держави в повоєнний період.
            </div>
            <div className="indent-4">
              Також відкрито Коворкінг «Аспірантські студії» Навчально-наукового інституту прикладної економіки і
              менеджменту ім. Г.Е. Вейнштена. Він є платформою для командної та індивідуальної роботи здобувачів вищої
              освіти, всіх ступенів. Метою діяльності є підтримка та стимулювання здобувачів вищої освіти до участі в
              проєктній діяльності як індивідуально, так і в команді, створення комфортних умов для роботи здобувачів за
              всіма напрямами, організація заходів високого рівня, підвищення престижності спеціальності менеджмент,
              розвиток креативного мислення.
            </div>
            <div className="indent-4">
              Коворкінг «Аспірантські студії» дає змогу оволодіти базовими питаннями з теорії проведення наукових
              досліджень, сформувати знання з базових понять прийняття рішень, моделювання, симуляції, порівняльного
              аналізу тощо.
            </div>
            <div className="indent-4">
              За результатами досліджень, під керівництвом викладачів або самостійно, здобувачі вищої освіти публікують
              тези доповідей і статті у наукових виданнях, беруть участь у наукових конференціях, семінарах. З метою
              розширення кругозору і постійної підтримки зв’язків з фахівцями вітчизняних та іноземних підприємств,
              відомих компаній регулярно проводяться тематичні лекції, наукові семінари, майстер-класи, літні школи,
              тренінги тощо.
            </div>
            <div className="indent-4">
              За участю студентів університету опубліковано 570 статей і тез, з яких 240 – самостійно. У 2023 р. в
              електронному виді видано збірник наукових праць молодих учених, аспірантів та студентів ОНТУ у 2 томах і 7
              збірників тез Всеукраїнських конференцій, проведених на базі університету.
            </div>
            <div className="indent-4">
              У 2023 році за участю студентів подано 2 заявки на корисні моделі та отримано 2 патенти, один на винахід,
              один на корисну модель. Викладачі кафедр активно залучали здобувачів вищої освіти до виконання
              держбюджетних і госпдоговірних НДР. Так, у 2023 році за держбюджетною тематикою кафедр без оплати
              працювало 293 студенти.
            </div>
            <div className="indent-4">
              Згідно плану Міністерства освіти і науки України університет проводить 8 традиційних всеукраїнських
              наукових студентських конференцій, а саме: з розділу «Харчові технології», «Проблеми формування здорового
              способу життя у молоді», «Інтеграційні та інноваційні напрями розвитку індустрії гостинності», «Стан
              досягнення і перспективи холодильної техніки і технології», «Стан досягнення і перспективи інформаційних
              системи і технологій», «Еколого-енергетичні проблеми сучасності», «Актуальні аспекти
              соціально-економічного розвитку України: погляд молоді» і «Комп’ютерні ігри та мультимедіа як інноваційний
              підхід до комунікації». Всі заходи були проведені за допомогою платформи Zoom.
            </div>
            <div className="indent-4">
              З метою популяризації спеціальностей факультетів та відбору талановитої молоді до проведення наукових
              досліджень, протягом року забезпечено роботу наукових гуртків та Клубів університету при відповідних
              навчально-наукових інститутах, згідно «Положення про наукову та науково-дослідну роботу здобувачів вищої
              освіти» та «Положення про студентський науковий гурток і студентський науковий клуб».
            </div>
            <div className="indent-4">
              Через тяжкі умови в країні діяльність гуртків зазнала деяких обмежень та ускладнень, але не припиняла
              своєї діяльності. У результаті роботи наукових гуртків студенти отримали систему теоретичних знань і
              прикладних умінь і навичок. Наукові дослідження велися за тематикою випускних, магістерських робіт та
              тематикою практик. Проводилася підготовка тез доповідей для участі у всеукраїнських та міжнародних
              конференціях.
            </div>
            <div className="indent-4">
              Протягом року на всіх кафедрах навчально-наукових інститутів університету працювало 130 наукових гуртків і
              клубів. За результатами роботи у наукових гуртках проведено оформлення робіт на Всеукраїнські наукові
              студентські конкурси, конференції, олімпіади, а також здійснено відбір студентів до вступу в магістратуру
              у 2023 році.
            </div>
            <div className="indent-4">
              Всі студенти які брали участь у І турі Всеукраїнського конкурсу студентських наукових робіт з галузей
              знань і спеціальностей у 2022/2023 навчальному році і посіли призові місця нагороджені за підсумками І
              туру цього конкурсу, відповідно до наказу МОН України від 31 травня 2022 р. № 508, оскільки ІІ тур
              Всеукраїнського конкурсу студентських наукових робіт з галузей знань і спеціальностей у 2022/2023
              навчальному році не проводився у зв’язку із запровадженням в країни воєнного стану. Нагородження дипломами
              переможця здійснено по І туру Конкурсу.
            </div>
            <div className="indent-4">
              Дипломи переможців отримали 22 студенти (I ступеня – 8 студентів, IІ ступеня – 7 студентів, III ступеня –
              7).
            </div>
            <div className="indent-4">
              У вересні – жовтні 2023 р. проведено І тур Всеукраїнського конкурсу студентських наукових робіт з галузей
              знань і спеціальностей 2023-2024 н.р., на конкурс було подано 29 наукових робіт. Здійснено рецензування
              робіт, підведені підсумки І туру Конкурсу, сформовано наказ щодо переможців конкурсу № 384-01 від
              24.10.2023 р. Перемогу одержало 15 здобувачів освіти.
            </div>
          </div>
          <span className="underline pt-2">
            Також, протягом року організована участь здобувачів вищої освіти у таких конкурсах:
          </span>
          <ul className="list-disc py-2 pl-8">
            <li>
              У XVIIІ Загальноуніверситетському конкурсі студентських наукових робіт «Історія мого університету»,
              переможцями стали: номінація «Золотий фонд вітчизняної науки», студентка гр. ТЗХ-11 Графіна Т.А.;
              номінація «Інтелектуальна біографія вченого», Крилов Н.Г. – студент гр. ЕМ-381; номінація «Моя кафедра –
              моє майбутнє», Клименко Д.Р. – студ. гр. ТМ-13; номінація «Наша гордість-випускники університету», Пащенко
              Т.М. – студентка гр. ТЗХ-51.
            </li>
            <li>
              У Всеукраїнському конкурсі кваліфікаційних робіт який відбувся у Хмельницькому кооперативному
              торговельно-економічному інституті 23 червня 2023 р. за підтримки МОН України та Української Асоціації
              маркетологів, студентка СВО «Бакалавр» спеціальності 075 «Маркетинг» Іванцова В. отримала диплом ІІІ
              ступеня і кваліфікаційна робота здобувача СВО «Магістр» Значек Р.Р. зі спеціальності 075 «Маркетинг»,
              також відзначена дипломом ІІІ ступеня другого (магістерського) рівня вищої освіти.
            </li>
            <li>
              У Всеукраїнському конкурсі кваліфікаційних робіт студентів ЗВО, який проходив в Хмельницькому інституті
              Міжрегіональної академії управління персоналом в травні 2023 р. студент СВО «Магістр» факультету ММтаПА
              Беньков Д.О. посів ІІІ місце.
            </li>
            <li>
              У Всеукраїнському конкурсі кваліфікаційних робіт студентів ЗВО, перший (бакалаврський) рівень вищої освіти
              який проходив у червені 2023 р. в Одеській політехніці, студентка СВО «Бакалавр», факультету ММтаПА
              Армашова-Можина Т.А. нагороджена дипломом ІІ ступеня.
            </li>
            <li>
              У Всеукраїнському конкурсі студентських наукових робіт з галузей знань і спеціальностей, який пройшов у
              Національному університеті харчових технологій за спеціальністю «Харчові технології», студентка Пащенко
              Тетяна посіла ІІ місце, студентка Делі-Стоянова Світлана – III.
            </li>
            <li>
              У Всеукраїнському конкурсі студентських наукових робіт зі спеціальності «Екологія», який відбувся в
              Національному університеті «Полтавська політехніка імені Юрія Кондратюка», студентка групи ЕК-445 Гринчак
              Катерина отримала диплом ІІ ступеню.
            </li>
            <li>
              У Всеукраїнському конкурсі студентських наукових робіт зі спеціальності «Туризм», який проходив у
              Київському національному торговельно-економічному університеті, автори двох робіт одержали сертифікати за
              участь.
            </li>
            <li>
              У Хакатоні, який відбувся в Київському національному університеті ім. Тараса Шевченка, проєкт студента
              університету визнано як один з найцікавіших.
            </li>
            <li>У конкурсі WEB-дизайну та комп'ютерної графіки – ІІІ місце у номінації «Краща 3D-графіка».</li>
            <li>
              У Всеукраїнському конкурсі рекламних проектів «Рекламний полігон літо 2023», команда ОНТУ «Самий Цимєс»
              отримала дипломи ІІ ступеня у двох номінаціях.
            </li>
            <li>В он-лайн Кейс-чемпіонаті RE-ENERGIZE UKRAINE студенти університету отримали сертифікати та подяку.</li>
            <li>
              У Всеукраїнських інтелектуальних змаганнях серед студентів, які навчаються за спеціальністю «Менеджмент»,
              змагання проходили в ОНЕУ – 1 місце та сертифікат.
            </li>
            <li>
              У студентському професійному творчому конкурсі «Аграрні науки та продовольство» зі спеціальності 204, який
              відбувся в Миколаївському національному аграрному університеті, отримано дипломом переможця ІІ ступеню й
              два сертифікати за участь.
            </li>
            <li>
              У Global Game Jam (GGJ) в номінації «Комерційний потенціал» і в номінації «Використання диверсифікатора
              Slava Ukraine» – студенти університету вибороли два других місця.
            </li>
            <li>
              У ІХ студентському фестивалі реклами, який проходив у м. Харків 1-2 грудня студенти університету посіли І
              місце, два ІІ місця та отримали 4 сертифікати.
            </li>
            <li>
              У фестивалі-конкурсі «BBQ-2023», який відбувся восени у Одеському національному технологічному
              університеті.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          {linkDocument.map((item, idx) => (
            <Document link={item.link} title={item.title} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Studentnau;
