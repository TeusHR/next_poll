import React from "react";
import Title from "@/UI/Title";
import {EventsService} from "@/services/client.service";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import EventsItem from "@/components/EventsItem";

export async function generateMetadata(
    {params}: { params: { locale: string } }
): Promise<Metadata> {
    const t = await getTranslations({locale: params.locale, namespace: "Page"});

    return {
        title: t("events"),
        openGraph: {
            url: "/events/"
        }
    };
}

type Props = {
    params: {
        locale: string;
    };
};

const Events = async ({params: {locale}}: Props) => {
    const data = await EventsService.getAll("date", "asc", locale.toUpperCase());

    const titlePage = await getTranslations("Page");

    const now = new Date();

    const upcomingOrOngoingEvents = data.filter(event => {
        const start = new Date(event.date);
        const end = event.toDate ? new Date(event.toDate) : start;

        return end >= now;
    });

    const pastEvents = data.filter(event => {
        const end = event.toDate ? new Date(event.toDate) : new Date(event.date);
        return end < now;
    });

    return (
        <div className="xl:container mx-auto my-16 px-8 max-md:px-4 flex flex-col gap-14 max-sm:gap-8">
            <div className="flex flex-col gap-14">
                <Title
                    text={titlePage("events")}
                    style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
                />
                <div className="flex flex-col gap-9 text-[#111318] text-xl">
                    {upcomingOrOngoingEvents.map(event => (
                        <EventsItem key={event.id} event={event} linkAvailable={true} />
                    ))}
                </div>
            </div>

            {pastEvents.length > 0 && <div className="flex flex-col gap-14">
                <Title
                    text={titlePage("archive")}
                    style="text-[#111318] text-5xl max-xl:text-3xl max-sm:text-2xl font-semibold"
                />
                <div className="flex flex-col gap-9 text-[#111318] text-xl">
                    {pastEvents.map(event => (
                        <EventsItem key={event.id} event={event} linkAvailable={false}/>
                    ))}
                </div>
            </div>}
        </div>
    );
};

export default Events;
