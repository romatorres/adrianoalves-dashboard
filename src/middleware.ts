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
  function middleware(req) {
    console.log("Middleware - Verificando rota:", req.nextUrl.pathname);
    console.log("Middleware - Token:", req.nextauth.token);
    
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
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"]
};
