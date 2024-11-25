import {getRequestConfig} from 'next-intl/server';
import { LOCALES } from "@/config/constants";
import { AxiosError } from "axios";

export default getRequestConfig(async ({requestLocale}) => {

  // if (!LOCALES.includes(locale as any)) notFound();

  let locale = await requestLocale;

  if (!locale || !LOCALES.includes(locale as any)) {
    locale = "ua";
  }

  let messages = {
    ...(await import(`/messages/${locale}/pageTitle.json`)).default,
    ...(await import(`/messages/${locale}/main.json`)).default,
  }
  try {
    // const apis = await FileService.downloadFile('translation.json')
    // messages = {...messages, ...apis}
  } catch (e) {
    const error = e as AxiosError
    console.log("Error during get translation from backend", error.response?.data)
  }

  return {
    locale,
    messages: messages,
    timeZone: 'Europe/Kiev',
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }
      },
      number: {
        precise: {
          maximumFractionDigits: 2
        }
      },
    },
  };
});