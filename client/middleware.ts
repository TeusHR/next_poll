import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { ADMIN_PAGES, USER_PAGES, LOCALE_PREFIX, LOCALES } from "@/config/constants";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  localePrefix: LOCALE_PREFIX,
  defaultLocale: LOCALES[0],
  localeDetection: false,
});

const authMiddleware = withAuth(function onSuccess(req) {
  const isAdminPage = validatePath(ADMIN_PAGES, req.nextUrl.pathname);
  if (isAdminPage && !req.nextauth.token?.user) return NextResponse.redirect(new URL(`404`, req.nextUrl.origin));
  return intlMiddleware(req);
});

export default function middleware(req: NextRequest) {
  const route = req.nextUrl.pathname;
  const isProtectedPage = validatePath(USER_PAGES, route) || validatePath(ADMIN_PAGES, route);

  if (!isProtectedPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|images|uploads|v1/api|.*\\..*).*)"],
};

function validatePath(paths: string[], route: string) {
  const publicPathnameRegex = RegExp(`^(${paths.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`, "i");
  return publicPathnameRegex.test(route);
}
