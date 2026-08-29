import { NextRequest, NextResponse } from "next/server";

// Requests arriving on menu.urbanredchillies.com are always served the
// dine-in ordering menu, no matter what path was requested — this keeps
// the QR-code subdomain a focused, single-purpose ordering experience,
// completely separate from the main marketing site.
const MENU_SUBDOMAIN = "menu.urbanredchillies.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (host === MENU_SUBDOMAIN || host.startsWith("menu.localhost")) {
    const url = request.nextUrl.clone();
    if (!url.pathname.startsWith("/menu")) {
      url.pathname = "/menu";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|json)).*)"],
};
