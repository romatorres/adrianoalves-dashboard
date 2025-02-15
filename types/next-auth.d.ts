import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      role: string;
      active: boolean;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    active: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}
