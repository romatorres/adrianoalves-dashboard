import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { Session } from "next-auth/";

const prisma = new PrismaClient();

interface Token {
  sub?: string;
  email?: string | null;
  name?: string | null;
}

// Add this interface to extend the default Session type
interface ExtendedSession extends Session {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (user && credentials.password && user.password) {
            const isValid = await compare(credentials.password, user.password);

            if (isValid) {
              return {
                id: user.id.toString(),
                email: user.email,
                name: user.name,
              };
            }
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: ExtendedSession; token: Token }) {
      if (token.sub && session.user) {
        // Get user data from Prisma
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true }
        });

        session.user.id = token.sub;
        if (user) {
          session.user.role = user.role;
        }
      }
      return session;
    },
  }
});

export { handler as GET, handler as POST };
