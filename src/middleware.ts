import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { JWT } from "next-auth/jwt";

type UserRole = "admin" | "user" | "barber";

interface ExtendedJWT extends JWT {
  id: string;
  role: UserRole;
  rememberMe?: boolean;
  exp?: number;
}

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token as ExtendedJWT;
    const isAuthPage = req.nextUrl.pathname === "/login";

    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Verifica se o token expirou ou se não deve ser lembrado
    if (token?.exp && Date.now() >= token.exp * 1000) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isLoginPage = req?.nextUrl?.pathname === "/login";
        return isLoginPage || !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};
