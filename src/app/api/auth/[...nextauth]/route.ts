import NextAuth, { NextAuthOptions } from "next-auth";
import type { Session } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { JWT } from "next-auth/jwt";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET must be set");
}

type UserRole = "admin" | "user" | "barber";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
}

type CustomJWT = JWT & {
  id: string;
  role: UserRole;
  exp?: number;
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais incompletas");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("Email não encontrado");
        if (!user.active) throw new Error("Usuário desativado");

        const isValidPassword = await compare(
          credentials.password,
          user.password!
        );
        if (!isValidPassword) throw new Error("Senha incorreta");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as UserRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User | null;
    }): Promise<CustomJWT> {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        } as CustomJWT;
      }
      return token as CustomJWT;
    },
    async session({ session, token }: { session: Session; token: CustomJWT }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id,
          role: token.role,
        } as Session["user"] & { id: string; role: UserRole };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 4, // 4 horas de sessão
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
