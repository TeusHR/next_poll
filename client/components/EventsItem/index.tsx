'use client'
import React, {FC, Fragment} from 'react';
import {IEvents} from "@/types/Events";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import moment from 'moment';
import 'moment/locale/uk'

type Props = {
    linkAvailable: boolean;
    event: IEvents;
}

const EventsItem: FC<Props> = ({linkAvailable, event}) => {

    const utilities = useTranslations("Utilities");
    const locale = useLocale();

    const EventsStart = (startStr: string, endStr?: string | null): boolean => {
        const today = moment().startOf('day');
        const start = moment(startStr).startOf('day');
        const end = endStr ? moment(endStr).endOf('day') : start;

        return today.isBetween(start, end, undefined, '[]');
    };

    const eventStart = EventsStart(event.date, event.toDate)

    const formatEventTime = (dateStr: string) => {
        return moment(dateStr).locale(locale).format('HH:mm');
    };

    const formatEventDateRange = (startISO: string, endISO?: string | null) => {
        const start = moment(startISO);
        const end = endISO ? moment(endISO).locale(locale) : null;

        if (!end) {
            const isToday = start.isSame(new Date(), 'day');
            return isToday
                ? utilities('today')
                : start.format('D MMMM');
        }

        const sameMonth = start.month() === end.month();
        const sameDay = start.day() === end.day();
        if (sameMonth) {
            return sameDay ? start.format('D MMMM') : `${start.date()}–${end.format('D MMMM')}`;
        } else {
            return `${start.format('D MMMM')} – ${end.format('D MMMM')}`;
        }
    };

    return (
        <div className="p-6 rounded-2xl border border-black border-b-3">
            <div className="flex flex-row max-sm:flex-col gap-9">
                <div className={`flex flex-col items-center gap-6 text-xl text-center max-sm:text-base justify-center min-w-[200px] h-[200px] ${eventStart ? 'bg-[#2E2C39] text-white' : 'bg-white text-[#4D4B56] border-1 border-black' } rounded-[9px]`}>
                    <span>{formatEventDateRange(event.date, event.toDate)}</span>
                    <span className="text-5xl max-lg:text-4xl max-sm:text-3xl font-bold">{formatEventTime(event.date)}</span>
                    <span>{event.roomNumber}</span>
                </div>
                <div className="flex flex-row max-lg:flex-col gap-6 w-full justify-between">
                    <div className="flex flex-col gap-4">
                        <span className="font-semibold text-2xl">{event.title}</span>
                        {event.supervisor.length > 0 && (<div className="flex gap-2 max-sm:gap-1 max-sm:text-base text-xl">
                            {event.supervisor.map((item: string, idx: number) => (
                                <Fragment key={idx}>
                                    <span>{item}</span>
                                    {idx !== event.supervisor.length - 1 && (
                                        <span className="text-[#D9D9D9]">&#8226;</span>
                                    )}
                                </Fragment>
                            ))}
                        </div>)}
                        <div className="text-xl max-sm:text-base" dangerouslySetInnerHTML={{ __html: event.text }} />
                    </div>
                    {linkAvailable && event.link && (
                        <div className="text-base">
                        <Link href={event.link} className="flex gap-3 h-full items-center">
                            <span className="bg-[#2E2C39] rounded-full">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                    d="M12.393 9.46484L11.877 11.3909L19.5044 13.442L8.96484 19.527L9.96484 21.2591L20.5044 15.1741L18.467 22.8052L20.393 23.3212L23.3212 12.393L12.393 9.46484Z"
                                    fill="#FDFDFD"/>
                                </svg>
                            </span>
                            <span className="capitalize">
                                {utilities('details')}
                            </span>
                        </Link>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default EventsItem;