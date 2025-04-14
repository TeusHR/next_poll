import React from "react";
import {setRequestLocale} from 'next-intl/server';
import mainJson from '@/messages/ua/main.json'

type Props = {
    params: { locale: string }
}

export type MainTranslation = typeof mainJson

export default function Home({params: {locale}}: Props) {
    setRequestLocale(locale);

    return (
        <>
            <div></div>
        </>
    );
}
