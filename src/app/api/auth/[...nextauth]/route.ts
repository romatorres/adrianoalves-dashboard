import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import type { JWT } from "next-auth/jwt";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET must be set");
}

type UserRole = "admin" | "user" | "barber";

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais incompletas");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("Email não encontrado");
        if (!user.active) throw new Error("Usuário desativado");

        const isValidPassword = await compare(credentials.password, user.password!);
        if (!isValidPassword) throw new Error("Senha incorreta");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: ExtendedUser | undefined }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: ExtendedSession; token: JWT & { role: UserRole } }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  debug: process.env.NODE_ENV === "development",
}) satisfies NextAuthOptions;

export { handler as GET, handler as POST };
