import {createNavigation} from 'next-intl/navigation';
import { LOCALE_PREFIX, LOCALES } from "@/config/constants";

export const {Link, redirect, usePathname, useRouter} =
  createNavigation({locales: LOCALES, localePrefix: LOCALE_PREFIX,   defaultLocale: 'ua'});
