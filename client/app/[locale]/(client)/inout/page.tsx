import React from "react";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import Title from "@/UI/Title";
import ReactCountryFlag from "react-country-flag";
import { Organization, countryOrg, international } from "./data";

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
        <span className="font-bold text-center">ОНТУ є дійсним членом наступних міжнародних організацій:</span>
        <div className="flex flex-col">
          <div className="grid grid-cols-[max-content,1fr,1.5fr] border border-gray-300">
            <div className="bg-[#d5d5d5] p-2 max-xsm:p-0 border text-center flex items-center justify-center font-bold text-base max-md:text-sm max-xsm:text-xs">
              Країна
            </div>
            <div className="bg-[#d5d5d5] p-2 max-xsm:p-0 border text-center flex items-center justify-center font-bold text-base max-md:text-sm max-xsm:text-xs">
              Навчальний заклад або його підрозділи, з якими підписано угоду про співробітництво
            </div>
            <div className="bg-[#d5d5d5] p-2 max-xsm:p-0 border text-center font-bold text-base max-md:text-sm max-xsm:text-xs">
              Головний напрямок співробітництва
            </div>

            {countryOrg.map((org, index) => (
              <React.Fragment key={org.id}>
                <div
                  className={`border px-12 py-1 max-md:px-4 max-xsm:p-0 text-center flex items-center justify-center text-base max-md:text-sm ${index % 2 ? "bg-[#f0f8ff]" : "bg-[#fff2ea]"}`}
                >
                  <ReactCountryFlag
                    countryCode={org.country}
                    svg
                    className="!w-[4rem] !h-[4rem] max-xsm:!w-[3rem] max-xsm:!h-[3rem]"
                    title={org.country}
                  />
                </div>
                <div
                  className={`border p-2 max-te:p-0 text-center flex items-center justify-center text-base max-md:text-sm max-xsm:text-xs ${index % 2 ? "bg-[#f0f8ff]" : "bg-[#fff2ea]"}`}
                >
                  <div className="block text-base max-md:text-sm max-xsm:text-xs">
                    <a href={org.link} className="text-[#0000ff]">
                      {org.linkTitle}
                    </a>
                    {org.abbr ? " " + org.abbr : ""}
                  </div>
                </div>
                <div
                  className={`border p-2 max-te:p-0 text-center flex items-center justify-center text-base max-md:text-sm max-xsm:text-xs ${index % 2 ? "bg-[#f0f8ff]" : "bg-[#fff2ea]"}`}
                >
                  {org.title}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flow-root max-md:flex max-md:flex-col-reverse max-md:gap-4">
          <div className="block gap-4 text-base max-md:text-sm text-black">
            <div className="flex flex-col max-lg:block">
              <span className="font-bold text-center">Створено базу даних, що містить таку інформацію:</span>
              <span>
                <ul className="list-disc py-1 pl-8 indent-0">
                  <li>Університети Європи, які готують фахівців у галузі харчової науки і технології;</li>
                  <li>Провідні вчені Європи в області харчової науки і технології;</li>
                  <li>
                    Повний список журналів та інших періодичних видань, в яких публікуються статті в галузі харчової
                    науки і технології;
                  </li>
                  <li>Міжнародні організації в області харчової науки і технології;</li>
                  <li>
                    Дані про робочих програмах і навчальних планах провідних Європейських університетів за
                    спеціальностями харчової науки і технології у зв´язку з Болонським процесом.
                  </li>
                </ul>
              </span>
              <span className="font-bold text-center">
                Участь та членство ОНТУ у міжнародних освітніх організаціях, програмах, фондах:
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2 xsm:hidden">
            {international.map((org, index) => (
              <div className="grid grid-rows-1 grid-cols-[min-content,1fr] border border-gray-300" key={org.id}>
                <div className="flex flex-col min-w-[100px]">
                  <div className="bg-[#d5d5d5] p-2 h-full max-xsm:p-0 border text-center flex items-center justify-center font-bold text-base max-md:text-sm max-xsm:text-xs">
                    Назва проекту, програми
                  </div>
                  <div className="bg-[#d5d5d5] p-2 h-full max-xsm:p-0 border text-center flex items-center justify-center font-bold text-base max-md:text-sm max-xsm:text-xs">
                    Партнери
                  </div>
                  <div className="bg-[#d5d5d5] p-2 h-full max-xsm:p-0 border text-center flex items-center justify-center font-bold text-base max-md:text-sm max-xsm:text-xs">
                    Очікуванні результати та їх впровадження
                  </div>
                </div>
                <div>
                  <div
                    className={`border p-2 max-te:px-0 text-center flex items-center justify-center text-base max-md:text-sm max-xsm:text-xs ${index % 2 ? "bg-[#f0f8ff]" : "bg-[#fff2ea]"}`}
                  >
                    {org.name}
                  </div>
                  <div
                    className={`border p-2 max-te:px-0 text-center flex items-center justify-center text-base max-md:text-sm max-xsm:text-xs ${index % 2 ? "bg-[#f0f8ff]" : "bg-[#fff2ea]"}`}
                  >
                    {org.partners}
                  </div>
                  <div
                    className={`border p-2 max-te:px-0 text-center whitespace-break-spaces flex items-center justify-center text-base max-md:text-sm max-xsm:text-xs ${index % 2 ? "bg-[#f0f8ff]" : "bg-[#fff2ea]"}`}
                  >
                    {org.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[1fr,1fr,1fr] border border-gray-300 max-xsm:hidden">
            <div className="bg-[#d5d5d5] p-2 max-xsm:p-0 border text-center flex items-center justify-center font-bold text-base max-md:text-sm max-sm:text-xs">
              Назва проекту, програми
            </div>
            <div className="bg-[#d5d5d5] p-2 max-xsm:p-0 border text-center flex items-center justify-center font-bold text-base max-md:text-sm max-sm:text-xs">
              Партнери
            </div>
            <div className="bg-[#d5d5d5] p-2 max-xsm:p-0 border text-center font-bold text-base max-md:text-sm max-sm:text-xs">
              Очікуванні результати та їх впровадження
            </div>

            {international.map((org, index) => (
              <React.Fragment key={org.id}>
                <div
                  className={`border px-12 py-1 max-md:px-4 max-xsm:p-0 text-center flex items-center justify-center text-base max-md:text-sm max-sm:text-xs ${index % 2 ? "bg-[#f0f8ff]" : "bg-[#fff2ea]"}`}
                >
                  {org.name}
                </div>
                <div
                  className={`border p-2 max-te:p-0 text-center flex items-center justify-center text-base max-md:text-sm max-sm:text-xs ${index % 2 ? "bg-[#f0f8ff]" : "bg-[#fff2ea]"}`}
                >
                  {org.partners}
                </div>
                <div
                  className={`border p-2 max-te:p-0 text-center whitespace-break-spaces flex items-center justify-center text-base max-md:text-sm max-sm:text-xs ${index % 2 ? "bg-[#f0f8ff]" : "bg-[#fff2ea]"}`}
                >
                  {org.result}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flow-root max-md:flex max-md:flex-col-reverse max-md:gap-4">
          <div className="block gap-4 text-base max-md:text-sm text-black">
            <div className="flex flex-col indent-4">
              <span>
                Для забезпечення збільшення зростання кількості публікацій науковців академії у виданнях з високим
                імпакт-індексом складено вичерпний список міжнародних журналів з харчової науки і технології з високим
                імпакт-фактором для відома вчених ОНТУ і розміщено на сайті академії. Регулярно проводяться засідання
                науково-технічної ради ОНТУ, де розглядалось питання щодо публікації статей в закордонних журналах і їх
                реєстрації в базі даних SCOPUS;
              </span>
              <span>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Отримано грант від "Фонду підготовки готельних кадрів - партнерські організації Центральної і Східної
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Європи в галузі гостинності і туризму" в розмірі 5 тисяч євро для створення і обладнання учбової
                лабораторії-кухні на кафедрі ресторанно-готельної справи і туризму ОНТУ.
              </span>
              <span>
                Результати міжнародної співпраці ОНТУ регулярно висвітлюються в газеті «Технолог», у виступах ректора і
                вчених ОНТУ на телебаченні, в інших засобах масової інформації.
              </span>
              <span>
                Забезпечено проведення практики студентів на закордонних підприємствах Греції, Туреччини, Чехії,
                Франції, США.
              </span>
              <span>
                Щорічно під керівництвом ОНТУ проводиться міжнародна наукова конференція{" "}
                <a href="https://ontu.edu.ua/geokonf" className="text-[#0000ff]">
                  «Геометрія в Одесі»
                </a>
                , в якій приймають участь кожного року до 40 іноземних вчених.
              </span>
              <span>
                В ОНТУ проводять семінари видатні іноземні вчені. Так, за підтримки Міжнародного фонду готельного
                бізнесу, членом якого є ОНТУ, регулярно проводяться семінари і майстер-класи провідними вченими в галузі
                туризму проф. І. Алексієвою (Болгарія), проф. Л. Новацькою (Словаччина), видатними вченими
                Манчестерського університету (Велика Британія) проф. E.M. Інесон і проф. Р. Ралстон для викладачів, а
                також менеджерів гостинності та туризму.
              </span>
              <span>
                Про рівень міжнародної співпраці ОНТУ свідчить те, що більш ніж 40 працівників ОНТУ щорічно
                відряджаються закордон, і приблизно така ж кількість іноземців відвідує ОНТУ.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InOut;
