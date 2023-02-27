import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "src/lib/prismadb";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "",
    signOut: "",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/sign-up", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    session: async ({ session, user }: { session: Session; user: User }) =>
      session?.user
        ? {
            ...session,
            user: {
              ...session.user,
              id: user.id,
            },
          }
        : session,
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
