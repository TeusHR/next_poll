import React from 'react';
import NextImage from "next/image";
import {Image} from "@nextui-org/react";

const Pois = () => {


    return (
        <div className="xl:container xl:mx-auto my-10 px-8 max-md:px-4">
            <div className="block">
                <div className="flex flex-col gap-4 float-left max-w-[200px] mr-8">
                    <Image src={'/image/Todorova.jpg'}
                           width={200}
                           height={300}
                           sizes="100vw"
                           style={{width: '100%', height: '100%'}}
                           classNames={{wrapper: "w-full min-w-[200px]"}}
                           alt={'preview'}
                           radius="none"
                           as={NextImage}
                           fetchPriority={"high"}
                    />
                    <div className="flex flex-col gap-1 text-sm max-md:text-xs text-[#777] text-center">
                        <span>Директор центру міжнародної діяльності</span>
                        <span>к.філос.н.,</span>
                        <span>ТОДОРОВА Світлана Миколаївна</span>
                        <span>кабінет А-339</span>
                        <span>телефон: + 380 48 712 42 92</span>
                        <a href="http://cia.ontu.edu.ua/" className="text-[#0000ff]">САЙТ ЦЕНТРУ</a>
                    </div>
                </div>
                <div className="block gap-4 text-base max-md:text-sm text-black">
                    <div>
                        <ul className="list-decimal py-4">
                            <li className="flex flex-col gap-2">
                                <div className="text-center w-full flex items-center justify-center">
                                    <span className="font-bold list-item">Навчання іноземних громадян і осіб без громадянства в Одеському національному технологічному університеті</span>
                                </div>

                                Одеса заснована більше 200 років тому на березі Чорного моря і є одним з найгарніших
                                міст чорноморського узбережжя, морським і континентальним перехрестям, туристичним і
                                комерційним центром України. З дня заснування Одеси в кінці 18 століття, в її
                                будівництві брали участь кращі архітектори Франції, Італії, Голландії та ін. країн.<br/>

                                <div><span
                                    className="font-bold"> Одеський національний технологічний університет</span> (далі
                                    - ОНТУ) є одним із навчальних
                                    закладів вищої освіти України з понад віковою історією, який готує фахівців і
                                    наукові
                                    кадри для галузей, затребуваних економіками багатьох країн світу. Це і різні сектори
                                    харчової промисловості, які нині є однією з найважливіших галузей економіки
                                    будь-якої
                                    країни, а також туризм, готельно-ресторанний бізнес, різні напрями інформаційних
                                    технологій, холодильна і кріогенна техніка, теплоенергетика, теплофізика,
                                    нетрадиційні і
                                    поновлювані джерела енергії, нафтогазова індустрія, екологія, економіка, маркетинг і
                                    так
                                    далі.<br/>
                                </div>

                                ОНТУ є закладом вищої освіти IV-го, тобто вищого рівня акредитації, і в 2002 році за
                                високі результати в підготовці фахівців для України і багатьох країн світу був
                                удостоєний звання Національного. Нині університет готує фахівців за 22 спеціальностями
                                на 10 факультетах.<br/>

                                ОНТУ здійснює підготовку іноземних фахівців з 1951 року. Нині, згідно з ліцензією,
                                виданою Міністерством освіти і науки України (далі – МОН України), університет здійснює
                                набір іноземних громадян для навчання на підготовчому відділенні, базових факультетах на
                                рівнях "бакалавр", “магістр».<br/>

                                Знання, отримані іноземними громадянами на підготовчому відділенні в ОНТУ, дозволяють їм
                                надалі з успіхом вчитися на факультетах в нашому університеті.<br/>
                            </li>
                            <li className="block py-2">
                                <div className="flex">
                                    <div className="text-center w-full flex items-center justify-center">
                                        <span className="font-bold list-item">Порядок набору іноземних громадян і осіб без громадянства на навчання в ОНТУ</span>
                                    </div>
                                </div>
                                <ul className="py-2">
                                    <li>
                                        <span className="font-bold">2.1.</span> Цей порядок введений наказом
                                        Міністерства освіти і науки України № 1541 від
                                        01.11.2013 р. (зі змінами) визначає Порядок набору і навчання (стажування)
                                        іноземців та осіб без громадянства (далі – іноземні громадяни) у закладах вищої
                                        освіти України незалежно від їх підлеглості та форм власності.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.2.</span> Прийом іноземців в ОНТУ
                                        здійснюється за міжнародними договорами і
                                        державними програмами України на підставі наказу МОН України в порядку,
                                        передбаченому цими договорами і програмами, а також за договорами, укладеними
                                        ОНТУ з юридичними або фізичними особами.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.3.</span> Іноземні громадяни можуть вступати
                                        в ОНТУ на денну або заочну форми
                                        навчання на підставі академічних прав, що надаються документом про здобутий
                                        рівень освіти в країні його походження.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.4..</span> ОНТУ здійснює набір іноземних
                                        громадян на навчання через суб'єкти
                                        господарювання (резидентів та нерезидентів), що мають відповідні договори з
                                        університетом про надання послуг з набору іноземних громадян на навчання,
                                        зареєстрованих в Українському державному центрі міжнародної освіти МОНУ.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.5.</span> Іноземні громадяни, що вступають в
                                        ОНТУ на денну або заочну форми навчання,
                                        повинні отримати Запрошення на навчання, яке є підставою для отримання
                                        довгострокової в'їзної візи "Д", а при перетині державного кордону України
                                        (в'їзді) підтверджує мету прибуття в Україну (на навчання).
                                    </li>
                                    <li>
                                        <span className="font-bold">2.6.</span> Для отримання в'їзної візи
                                        іноземний громадянин повинен звернутися із
                                        Запрошенням в посольство (консульство) України на батьківщині, а за відсутності
                                        такого, в іншій країні, що представляє інтереси України.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.7.</span> Отримання в'їзної візи типу "Д" в
                                        посольствах (консульствах) України
                                        обов'язково, як для іноземних громадян країн, що мають візовий режим з Україною,
                                        так і для громадян наступних країн: Республіка Казахстан, Республіка Киргизстан,
                                        Республіка Таджикистан, Республіка Туркменістан.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.8.</span> Для країн: Азербайджан, Вірменія,
                                        Грузія, Молдова, Узбекистан потрібне
                                        отримання тільки Запрошення на навчання. Громадяни Російської Федерації та
                                        Республіки Білорусь, які не мають посвідки на постійне (тимчасове) проживання в
                                        Україні, приймаються на навчання за індивідуальним дозволом Міністерства освіти
                                        і науки України.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.9.</span> При перетині державного кордону
                                        України іноземні громадяни, запрошені в
                                        університет, зобов'язані інформувати співробітників прикордонної служби України
                                        про мету прибуття (навчання) і пред'явити їм Запрошення на навчання в ОНТУ.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.10.</span> Для отримання Запрошення іноземний
                                        громадянин повинен представити наступні
                                        документи:
                                        <ul className="list-disc pl-8 py-4 flow-root">
                                            <li>скан-копію національного паспорта;</li>
                                            <li>скан-копію документу про освіту з отриманими оцінками (балами) з усіх
                                                дисциплін або академічну довідку;
                                            </li>
                                            <li>згода на збір і обробку персональних даних;</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="font-bold">2.11.</span> Після отримання Запрошення та візи "Д"
                                        кандидат повідомляє університет або суб'єкт господарювання про час і місце
                                        перетину кордону України.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.12.</span> Після прибуття в Україну для
                                        зарахування в університет іноземний громадянин подає в приймальну комісію ОНТУ
                                        наступні документи:
                                        <div className="flex flex-col">
                                            <span><span className="font-bold">1)</span> заява;</span>
                                            <span><span className="font-bold">2)</span> документ (оригінал та його копію) про раніше здобутий освітній (освітньо-кваліфікаційний) рівень, на основі якого здійснюється вступ;</span>
                                            <span><span className="font-bold">3)</span> додаток (оригінал та його копію) до документа про раніше здобутий освітній (освітньо-кваліфікаційний) рівень, на основі якого здійснюється вступ (за наявності);</span>
                                            <span><span className="font-bold">4)</span> академічну довідку, видану іноземним/українським навчальним закладом (у разі переведення або поновлення на навчання, починаючи з другого курсу, додається академічна довідка);</span>
                                            <span><span className="font-bold">5)</span> оригінал та копію документа, в якому міститься інформація про зміст навчальної програми за попереднім ступенем (рівнем) вищої освіти, отримані кредити, тривалість навчання та успішність з навчальних дисциплін (у разі відсутності цієї інформації у додатку до документа про освіту), при вступі для здобуття ступеня магістра, якщо відсутність цієї інформації унеможливлює здійснити визнання кваліфікації за документом;</span>
                                            <span><span className="font-bold">6)</span> поліс медичного страхування, якщо інше не передбачено міжнародними договорами України (стосується лише денної форми навчання);</span>
                                            <span><span className="font-bold">7)</span> копія паспортного документа іноземного громадянина або документа, який посвідчує особу без громадянства;</span>
                                            <span><span className="font-bold">8)</span> 6 фотокарток розміром 30 х 40 мм на матовому фотопапері;</span>
                                            <span><span className="font-bold">9)</span> копія посвідчення закордонного українця (за наявності).</span>
                                            <span>Документи (2-5 та 7) п.2.12 мають бути перекладені українською мовою з нотаріальним засвідченням перекладу.</span>
                                            <span>Документи (2-5) п. 2.12 мають бути засвідчені в країні їх видачі у спосіб, який офіційно застосовується в цій країні для такого засвідчення, та легалізовані відповідною закордонною установою України, якщо інше не передбачено міжнародними договорами України.</span>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="font-bold">2.13.</span> Зарахування на навчання для здобуття
                                        вищої освіти на відповідному рівні вищої освіти здійснюється за результатами
                                        вступних випробувань та на підставі академічних прав на продовження навчання, що
                                        надаються документом про здобутий рівень освіти в країні його походження, та
                                        врахування балів успішності, що дають право для продовження навчання на
                                        наступному рівні вищої освіти відповідно до законодавства країни, що видала
                                        документ про здобутий рівень освіти.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.14.</span> Іноземні громадяни, для яких приймальна
                                        комісія ОНТУ встановила необхідність проходження мовної підготовки до вступу їх
                                        на факультети, проходять цю підготовку на підготовчому відділенні (далі - ПВ)
                                        тільки на денній формі навчання (із використанням технологій дистанційного
                                        навчання).
                                    </li>
                                    <li>
                                        <span className="font-bold">2.15.</span> Зарахування іноземних громадян в ОНТУ
                                        здійснюється наказом ректора.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.16.</span> Усім зарахованим іноземним громадянам
                                        на навчання за денною формою видаються студентські квитки державного зразка.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.17.</span> Оплата освітніх послуг в університеті
                                        (на підготовчому відділенні, факультетах) здійснюється за договорами
                                        (контрактами) за кошти фізичних або юридичних осіб, якщо інше не передбачено
                                        міжнародними договорами України або договорами між вищими навчальними закладами
                                        про міжнародну академічну мобільність.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.18.</span> Документи про освіту іноземних
                                        громадян, зарахованих на навчання в ОНТУ і видані раніше навчальними закладами
                                        інших держав, повинні пройти процедуру визнання в Україні відповідно до
                                        законодавства. Співробітники Центру міжнародної діяльності ОНТУ надають
                                        консультативну допомогу іноземному здобувачу в проходженні цієї процедури в МОН
                                        України. У разі відсутності підтвердження автентичності документу про освіту або
                                        невідповідності рівня отриманої ним освіти, університет відраховує цього
                                        іноземного громадянина.
                                    </li>
                                    <li>
                                        <span className="font-bold">2.19.</span> Університет забезпечує реєстрацію
                                        іноземних громадян, що вступили на навчання, в Україні у встановленому
                                        законодавством порядку з видачею посвідчень на тимчасове проживання (тимчасової
                                        посвідки на проживання).
                                    </li>
                                </ul>
                            </li>
                            <li className="flex flex-col gap-2">
                                <div className="text-center w-full flex items-center justify-center">
                                    <span className="font-bold list-item">В'їзд іноземних громадян та осіб без громадянства в Україну, подання документів в ОНТУ</span>
                                </div>
                                <ul className="py-4 flow-root">
                                    <li>
                                        <span className="font-bold">3.1.</span> Для зарахування на навчання в ОНТУ усім
                                        категоріям вступників необхідно заздалегідь надати до університету (чи
                                        суб'єктові господарювання) документи п. 2.10 для отримання Запрошення на
                                        навчання. Термін дії Запрошення на навчання – 1 рік. В'їзд до України вступників
                                        після закінчення терміну дії Запрошення на навчання заборонений.
                                    </li>
                                    <li>
                                        <span className="font-bold">3.2.</span> Вступники повинні прибути в університет
                                        не пізніше за терміни, вказані нижче:
                                        <ul>
                                            <li>
                                                <span className="font-bold">3.2.1.</span> Іноземні громадяни, що
                                                вступають на підготовче відділення, можуть приїжджати в Університет для
                                                навчання протягом року. Для в'їзду в Україну необхідно мати в'їзну
                                                студентську візу "Д" і оригінал Запрошення (для усіх категорій інозців).
                                            </li>
                                            <li>
                                                <span className="font-bold">3.2.2.</span> Вступники на денну і заочну
                                                форми навчання повинні прибути в ОНТУ з 01 липня до 30 листопада
                                                поточного року.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="font-bold">3.3.</span> Після прибуття, вступники, що вступають
                                        на навчання на контрактній основі, повинні пройти вступні випробування, надати
                                        усі необхідні документи, укласти договір про надання платних освітніх послуг з
                                        університетом і здійснити оплату. Після цього документи представляються в
                                        Приймальну комісію для зарахування в університет.
                                    </li>
                                    <li>
                                        <span className="font-bold">3.4.</span> Для іноземних громадян української
                                        діаспори, направлених на навчання МОН України, зарахування в університет
                                        здійснюється за результатами вступних випробувань з 20 по 30 липня поточного
                                        року. Для цієї категорії іноземних громадян особисті документи (вказані вище і
                                        направлення МОН України) мають бути представлені в приймальну комісію
                                        університету до 20 липня поточного року.
                                    </li>
                                    <li>
                                        <span className="font-bold">3.5.</span> Всім вступникам рекомендовано
                                        заздалегідь зв'язатися з директором Центру міжнародної діяльності ОНТУ -
                                        ТОДОРОВОЮ Світланою Миколаївною - для роз'яснення питань, уточнення термінів
                                        подачі документів, проведення вступних випробувань, зарахування і так далі (див.
                                        розділ "Наша адреса і контакти").
                                    </li>
                                </ul>
                            </li>
                            <li className="flex flex-col gap-2">
                                <div className="text-center w-full flex items-center justify-center">
                                    <span className="font-bold list-item">Навчання на підготовчому відділенні</span>
                                </div>
                                <ul className="py-4 flow-root">
                                    <li>
                                        <span>
                                        На Навчання іноземних громадян в ОНТУ здійснюється на підготовчому відділенні іноземних громадян центру міжнародної діяльності (далі - ПВІГ ЦМД).
                                    </span>
                                    </li>
                                    <li>
                                        <span>
                                    <span className="font-bold">4.1. </span>
                                    На ПВІГ ЦМД здійснюється підготовка іноземних громадян впродовж 10 місяців (набір здійснюється впродовж усього року) відповідно до рекомендацій МОН України за наступними напрямами:
                                </span>
                                    </li>
                                    <li>
                                        <ul className="list-disc pl-8 py-4 flow-root">
                                            <li>математика;</li>
                                            <li>фізика;</li>
                                            <li>механіка;</li>
                                            <li>інженерно-технічні науки;</li>
                                            <li>медичні і біологічні науки;</li>
                                            <li>гуманітарні науки;</li>
                                            <li>економічні науки;</li>
                                            <li>хімія;</li>
                                            <li>психологія;</li>
                                            <li>фізична культура і спорт;</li>
                                            <li>сільськогосподарські науки.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        Після успішного закінчення ПВІГ ЦМД випускники отримують свідоцтво про
                                        закінчення ПВІГ встановленого зразка і мають право вступати до університету на
                                        обрані освітні програми та спеціальності.
                                    </li>
                                    <li>
                                        <span>
                                            <span className="font-bold">4.2. </span>
                                            Навчання в ОНТУ здійснюється на 10 факультетах за багаторівневою системою (бакалавр, магістр).
                                        </span>
                                    </li>
                                </ul>
                            </li>
                            <li className="flex flex-col gap-2">
                                <div className="text-center w-full flex items-center justify-center">
                                    <span className="font-bold list-item">Строки навчання</span>
                                </div>
                                <ul className="py-4 flow-root">
                                    <li className="flex flex-col">
                                        <span>
                                            <span className="font-bold">5.1. </span>
                                        Для слухачів підготовчого відділення, студентів ОНТУ встановлені наступні
                                        терміни навчання :
                                        </span>
                                        <ul>
                                            <li>
                                                <span className="font-bold">
                                                    Для слухачів підготовчого відділення іноземних громадян ЦМД - 10 місяців (лише денна форма навчання);
                                                </span>
                                            </li>
                                            <li>
                                                <span className="font-bold">
                                                    Для студентів денної форми навчання:
                                                    </span>
                                                <ul className="list-disc pl-8 py-4 flow-root">
                                                    <li>рівень підготовки БАКАЛАВР - 4 роки;</li>
                                                    <li>рівень підготовки МАГІСТР – 1рік 4 місяці;</li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <span className="font-bold">Для студентів заочної форми навчання:</span>
                                        <ul className="list-disc pl-8 py-4 flow-root">
                                            <li>рівень підготовки БАКАЛАВР - 4 роки;</li>
                                            <li>рівень підготовки МАГІСТР – 1рік 4 місяці;</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="font-bold">5.2. </span>
                                        Під час навчання здобувачам надаються канікули згідно з графіком учбового
                                        процесу, а також вихідні і святкові дні під час релігійних і національних свят.
                                    </li>
                                    <li>
                                        <span className="font-bold">5.3.</span> По закінченню навчання випускники
                                        отримують дипломи (свідоцтва) зразка, встановленого Міністерством освіти і науки
                                        України.
                                    </li>
                                </ul>
                            </li>
                            <li className="flex flex-col gap-2">
                                <div className="text-center w-full flex items-center justify-center">
                                    <span className="font-bold list-item">Проживання іноземних громадян та осіб без громадянства у гуртожитках ОНТУ</span>
                                </div>
                                <ul>
                                    <li>
                                        На весь період навчання іноземним громадянам надається місце в студентському
                                        гуртожитку університету. В наявності обладнані та укомплектовані необхідними
                                        меблями 2-3-х місцеві кімнати з окремим санітарним вузлом. Вартість проживання
                                        складає – 540 грн один місяць.
                                    </li>
                                </ul>
                            </li>
                            <li className="flex flex-col gap-2">
                                <div className="text-center w-full flex items-center justify-center">
                                    <span className="font-bold list-item">Наша адреса і контакти:</span>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col">
                                        <span className="font-bold">Поштова адреса:</span>
                                        Україна, 65039, м. Одеса-39, вул. Канатна, 112.
                                        <span>E-mail:
                                            <a href="mailto:info@ontu.edu.ua" className="text-[#0000ff]">info@ontu.edu.ua</a>
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span>Проректор з науково-педагогічної роботи та міжнародних зв’язків</span>
                                        <span className="font-bold">д.т.н., професор МАРДАР Марина Ромиківна</span>
                                        <span>кабінет А-130б, телефон: роб. +380 48 712 41 47</span>
                                        <span className="font-bold">E-mail: <a href="mailto:intl_onapt@ukr.net" className="text-[#0000ff]">intl_onapt@ukr.net</a></span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span>Директор Центру міжнародної діяльності,</span>
                                        <span className="font-bold">к.філос.н., ТОДОРОВА Світлана Миколаївна</span>
                                        <span>кабінет А-339, телефон: роб. +380 48 712 42 92.</span>
                                        <span className="font-bold">E-mail: <a href="mailto:sv.todorova1973@gmail.com" className="text-[#0000ff]">sv.todorova1973@gmail.com</a></span>
                                    </div>


                                    <div className="flex flex-col">
                                        <span>Завідувач підготовчого відділення іноземних громадян ЦМД</span>
                                        <span className="font-bold">ШЕВЧУК Олена Володимирівна</span>
                                        <span>м. Одеса, вул. Тіниста, 9/11, кабінет 312</span>
                                        <span>телефон: роб. +380 482 68 30 84.</span>
                                        <span className="font-bold">E-mail: <a href="mailto:milena_che@ukr.net" className="text-[#0000ff]">milena_che@ukr.net</a></span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span>Старший інспектор підготовчого відділення іноземних громадян ЦМД</span>
                                        <span className="font-bold">ПОНОМАРЬОВ Олег Володимирович</span>
                                        <span>м. Одеса, вул. Тіниста, 9/11, кабінет 317 а</span>
                                        <span>телефон: роб. +380 482 68 30 84.</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span>Провідні фахівці відділу освіти іноземних громадян ЦМД</span>
                                        <span className="font-bold">ТКАЧ Наталія Михайлівна,</span>
                                        <span>кабінет А-336, телефон: роб. +380 48 712 40 39.</span>
                                        <span className="font-bold">КАСЬЯНЕНКО Галина Михайлівна,</span>
                                        <span>кабінет А-336, телефон: роб. +380 48 712 40 39.</span>
                                        <span>Методист підготовчого відділення іноземних громадян ЦМД</span>
                                        <span className="font-bold">ПОМАЗАНОВА Олена Федорівна</span>
                                        <span>кабінет А-339, телефон: роб. +380 48 712 42 92.</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pois;