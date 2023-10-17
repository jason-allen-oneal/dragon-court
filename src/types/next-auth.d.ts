import NextAuth, { DefaultSession, JWT, DefaultUser, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      hasChar: boolean;
      firstRun: boolean;
      chat: number;
    };
  }

  interface User extends Omit<DefaultUser, "id"> {
    id: number;
    name: string;
    email: string;
    hasChar: boolean;
    firstRun: boolean;
    chat: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    email: string;
    hasChar: boolean;
    firstRun: boolean;
    chat: number;
  }
}
