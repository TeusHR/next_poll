import React from "react";
import Title from "@/UI/Title";
import {ScienceCompetitionService} from "@/services/client.service";
import ButtonDetails from "@/UI/ButtonDetails";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(
    {params}: { params: { locale: string } }
): Promise<Metadata> {
    const t = await getTranslations({locale: params.locale, namespace: "Page"});

    return {
        title: t("scienceCompetition"),
        openGraph: {
            url: "/science-competition/"
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


const ScienceCompetition = async ({params: {locale}}: Props) => {
    const data = await ScienceCompetitionService.getAll(locale.toUpperCase());

    const titlePage = await getTranslations("Page");

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4 flex flex-col gap-14 max-sm:gap-8">
            <Title
                text={titlePage("scienceCompetition")}
                style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
            />
            <div className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <div
                        className="flex flex-col gap-9 max-xl:justify-between text-[#111318] text-xl">
                        {data.sort((a, b) => monthNamesUkr.indexOf(b.month) - monthNamesUkr.indexOf(a.month)).map((conference, index) => (
                            <React.Fragment key={conference.month}>
                                <div className="flex flex-col gap-9 w-full">
                                    {conference.items.map((item) => (
                                        <div key={item.id}
                                             className="flex flex-row justify-between max-sm:flex-col gap-y-6 gap-x-24 max-xl:gap-x-8">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex flex-row gap-2 flex-wrap items-center">
                                                    <span className="text-nowrap">
                                                        {item.date} {item.toDate ? ` - ${item.toDate}` : ""}
                                                    </span>
                                                    <span className="text-[#D9D9D9]">&#8226;</span>
                                                    <div className="flex flex-row gap-2">
                                                        <span>{item.country}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="font-medium">{item.title}</span>
                                                </div>
                                            </div>
                                            <ButtonDetails link={`/science-competition/${item.id}`}>
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
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScienceCompetition;
