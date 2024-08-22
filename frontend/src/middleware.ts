import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { privateRoutes } from "./constants/routes";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("tmAccessToken")?.value;
  const requestUrl = new URL(request.url);
  const path = requestUrl.pathname;

  const isPrivateRoute = privateRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/:[^\s/]+/g, "[^/]+")}$`);
    return regex.test(path);
  });

  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
