import LinkList from "@/components/LinkList";
import CellItem, {ICellItem} from "@/components/Cell/CellItem";
import React, {Suspense} from "react";
import Partners from "@/components/Partners";
import Feedback from "@/components/Feedback";
import {setRequestLocale} from 'next-intl/server';
import { Link } from "@/routing/*";
import { GetTranslationsForJson } from "@/utils/getTranslationKeys";
import mainJson from '@/messages/ua/main.json'

const cellItemsRow: ICellItem[] = [
    {
        text: 'blackScience',
        image: '/image/manCell.png',
        link: '/'
    },
    {
        text: 'conferencesCompetitions',
        image: '/image/womanCell.png',
        link: '/conference'
    },
    {
        text: 'directionsCooperation',
        image: '/image/wmCell.png',
        link: '/cooperation'
    }
]

const cellItemsRowTwo = [
  {
    text: 'cooperationAgreements',
    link: '/'
  },
  {
    text: 'documentTemplates',
    link: '/'
  },
  {
    text: 'associationsMemberships',
    link: '/'
  }
]

type Props = {
  params: { locale: string }
}

export type MainTranslation = typeof mainJson

export default function Home({params: {locale}}:Props) {

  setRequestLocale(locale);

  const mainPage = GetTranslationsForJson<MainTranslation>('Main', mainJson)

    return (
      <>
        <div className="xl:container mx-auto my-4 px-8 max-md:px-4">
          <div className="mt-6 flex flex-col gap-20">
            {/*<Cell style={"w-full flex flex-row max-sm:flex-col 2xl:gap-x-56 max-2xl:gap-x-40 max-xl:gap-x-12 max-md:gap-x-4"}/>*/}
            <LinkList translation={mainPage} />
          </div>
        </div>
        <div className="flex flex-col gap-12 w-full">
          <div
            className="grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:grid-rows-3 px-24 max-2xl:px-12 max-xl:px-8 mt-20 gap-12">
            {cellItemsRow.map((item, index) =>
              <CellItem key={index}
                        text={item.text as keyof MainTranslation['Main']['carts']}
                        translation={mainPage.Main.carts}
                        image={item.image}
                        link={item.link}
                        styleImage
                        wrapperStyle={`h-full ${index === cellItemsRow.length - 1 ? 'w-[250px]' : 'w-[180px]'} !max-w-full`} />
            )}
          </div>
          <div
            className="grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:grid-rows-3 px-24 max-2xl:px-12 max-xl:px-8 gap-12">
            {cellItemsRowTwo.map((item, index) => <Link key={`${index}-${item.text}`} href={item.link}>
                <div className="min-h-[100px] h-full bg-[#2E2C39] rounded-2xl">
                  <div className="flex items-center justify-between h-full text-2xl max-xl:text-xl px-8">
                    <span className="text-white">
                      {mainPage.Main.carts[item.text as keyof MainTranslation['Main']['carts']]}
                    </span>
                    <span className="rounded-full bg-[#FDFDFD] p-2">
                      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4.39231 0.463867L3.87622 2.38996L11.5036 4.44104L0.964111 10.526L1.96411 12.2581L12.5036 6.1731L10.4662 13.8042L12.3923 14.3203L15.3205 3.39207L4.39231 0.463867Z"
                          fill="#A5C05B" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
        <div className="xl:container mx-auto my-4 px-8 max-md:px-4">
          <Partners />
        </div>
        <Suspense>
          <Feedback translation={mainPage.Main.form} apiKey={process.env.GOOGLE_MAPS_API_KEY || ''} />
        </Suspense>
      </>
    );
}
