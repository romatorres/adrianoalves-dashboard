import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize attempt for:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          throw new Error("Credenciais incompletas");
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          console.log("User found:", user ? "yes" : "no");

          if (!user || !user.password) {
            console.log("User not found or no password");
            throw new Error("Email não encontrado");
          }

          if (!user.active) {
            console.log("User is inactive");
            throw new Error("Usuário desativado");
          }

          const isPasswordValid = await compare(credentials.password, user.password);
          console.log("Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            throw new Error("Senha incorreta");
          }

          const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            active: user.active,
          };

          console.log("Auth successful, returning user");
          return userResponse;
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback:', { token, user });
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback:', { session, token });
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined,
      },
    },
  },
}; 