declare module "next-auth" {
  interface User {
    id: string;
    role: "admin";
    active: boolean;
  }

  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      role: "admin";
      active: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "admin";
  }
}
