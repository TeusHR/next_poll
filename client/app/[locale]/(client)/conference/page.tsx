import React from "react";
import Title from "@/UI/Title";
import {ConferencesService} from "@/services/client.service";
import {StringConferenceType} from "@/utils/ConferenceType";
import ButtonDetails from "@/UI/ButtonDetails";
import {Metadata} from "next";
import ReactCountryFlag from "react-country-flag";
import {getCountryCodeByLabel} from "@/utils/CountrySet";
import {getTranslations} from "next-intl/server";
import Document from "@/components/Document";
import {Tooltip} from "@nextui-org/react";

// export const metadata: Metadata = {
//   title: "Заходи",
//   openGraph: {
//     url: "/conference/",
//   },
// };

export async function generateMetadata(
    {params}: { params: { locale: string } }
): Promise<Metadata> {
    const t = await getTranslations({locale: params.locale, namespace: "Page"});

    return {
        title: t("conference"),
        openGraph: {
            url: "/conference/"
        }
    };
}

type Props = {
    params: {
        locale: string;
    };
};

const monthNamesUkr = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень"
];


const Conference = async ({params: {locale}}: Props) => {
    const conferences = await ConferencesService.getAll(locale.toUpperCase());
    const conferencesFiles = await ConferencesService.getAllFiles(locale.toUpperCase());
    const titlePage = await getTranslations("Page");
    const isStudent = await getTranslations("Conference");

    console.log(conferencesFiles);

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4 flex flex-col gap-14 max-sm:gap-8">
            <Title
                text={titlePage("conference")}
                style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
            />
            <div className="flex flex-col relative w-max gap-3">
                {conferencesFiles?.files.map(item => (<Document key={item} link={item} title={item}/>))}
            </div>
            <div className="my-16 flex flex-col gap-8">
                <div className="flex flex-col">
                    <div
                        className="grid grid-cols-[max-content_1fr] max-md:grid-cols-1 gap-x-40 max-xl:gap-x-16 max-lg:gap-y-6 max-xl:justify-between text-[#111318] text-xl">
                        {conferences.sort((a, b) => monthNamesUkr.indexOf(b.month) - monthNamesUkr.indexOf(a.month)).map((conference, index) => (
                            <React.Fragment key={conference.month}>
                                <Title
                                    text={conference.month}
                                    style={"text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-bold"}
                                />
                                <div className="flex flex-col gap-9 w-full">
                                    {conference.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex flex-row justify-between max-sm:flex-col gap-y-6 gap-x-24 max-xl:gap-x-8"
                                        >
                                            <div className="flex flex-col gap-3">
                                                <div className="flex flex-row gap-2 flex-wrap items-center">
                                                    <span className="text-nowrap">
                                                        {item.date} {item.toDate ? ` - ${item.toDate}` : ""}
                                                    </span>
                                                    <span className="text-[#D9D9D9]">&#8226;</span>
                                                    <span
                                                        className="text-nowrap">{StringConferenceType(item.type)}</span>
                                                    <span className="text-[#D9D9D9]">&#8226;</span>
                                                    <div className="flex flex-row gap-2">
                                                        <span>{item.country}</span>
                                                        <span className="min-w-[20px]">
                                                            {getCountryCodeByLabel(item.country) ? (
                                                                <ReactCountryFlag
                                                                    countryCode={getCountryCodeByLabel(item.country) ?? ""}
                                                                    svg
                                                                    aria-label={item.country}
                                                                />
                                                            ) : null}
                                                        </span>
                                                    </div>
                                                    {item.isLogo &&
                                                        <>
                                                            <span className="text-[#D9D9D9]">&#8226;</span>
                                                            <span>
                                                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M16.6662 0L12.4998 3.06312L8.33312 0L0 6.12623V17.8731L8.33312 23.9994L16.6662 17.8731V15.2413L8.33312 21.3672L2.13433 16.81V7.18937L8.33312 2.63216L10.7096 4.37919L8.33344 6.12592H8.33312V8.14815L12.0851 10.9066V8.27446L10.538 7.13766L12.4998 5.69558L14.4613 7.13766L12.9149 8.27446V10.9066L16.6666 8.14815V6.12623H16.6662L14.2901 4.37919L16.6666 2.63216L22.8657 7.18937V16.8106L16.6666 21.3678L14.7044 19.9258L12.9146 21.2418L16.6666 24L25 17.8738V6.12623L16.6662 0Z" fill="#40916C"/>
                                                                    <path d="M12.0851 17.9995L10.2949 19.3156L8.33307 17.8735V15.2417L12.0851 17.9995Z" fill="#40916C"/>
                                                                    <path d="M12.0851 14.7577V17.3898L8.33307 14.6317V11.9998L12.0851 14.7577Z" fill="#40916C"/>
                                                                    <path d="M16.6662 11.9998V14.6317L12.9145 17.3898V14.7577L16.6662 11.9998Z" fill="#40916C"/>
                                                                    <path d="M12.0851 11.516V14.1481L8.33307 11.39V8.75813L12.0851 11.516Z" fill="#40916C"/>
                                                                    <path d="M16.6662 8.75813V11.39L12.9145 14.1481V11.516L16.6662 8.75813Z" fill="#40916C"/>
                                                                    <path d="M8.33307 15.2417V17.8735L10.2949 19.3156L12.0851 17.9995L8.33307 15.2417Z" fill="#40916C"/>
                                                                </svg>
                                                            </span>
                                                        </>
                                                    }
                                                    {item.isStudent &&
                                                        <>
                                                            <span className="text-[#D9D9D9]">&#8226;</span>
                                                            <Tooltip content={isStudent('isStudent')} showArrow>
                                                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4 10.18V14.18L11 18L18 14.18V10.18L11 14L4 10.18ZM11 0L0 6L11 12L20 7.09V14H22V6L11 0Z" fill="#111318"/>
                                                                </svg>
                                                            </Tooltip>
                                                        </>
                                                    }
                                                </div>
                                                <div>
                                                    <span className="font-medium">{item.title}</span>
                                                </div>
                                            </div>
                                            <ButtonDetails link={`/conference/${item.id}`}>
                                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M0.714045 0.285955L0.714045 1.94766L7.29603 1.95355L0.124789 9.12479L1.3033 10.3033L8.47454 3.13206L8.48043 9.71404L10.1421 9.71405V0.285955H0.714045Z"
                                                        fill="#111318"
                                                    />
                                                </svg>
                                            </ButtonDetails>
                                        </div>
                                    ))}
                                </div>
                                {index !== conferences.length - 1 && conferences.length !== 0 ? (
                                    <span className="my-14 border col-span-2 border-[#6E8880]"></span>
                                ) : (
                                    ""
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conference;
