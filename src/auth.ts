import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { authConfig } from "./auth.config";

// Create a version of auth that doesn't directly use Mongoose in edge contexts
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user, profile }) {
      // JWT callback runs on server side
      if (user && profile && process.env.NEXT_RUNTIME !== "edge") {
        const { connectToDb } = await import("./lib/connectToDb");
        const { User } = await import("./models/user.model");

        await connectToDb();
        const dbUser = await User.findOne({ username: profile.login });
        if (dbUser) {
          token.id = dbUser._id;
          token.username = dbUser.username;
        }
      }
      return token;
    },

    session({ session, token }) {
      if (token) {
        session.user._id = token.id;
        session.user.username = token.username;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      if (
        account &&
        account.provider === "github" &&
        process.env.NEXT_RUNTIME !== "edge"
      ) {
        try {
          const { connectToDb } = await import("./lib/connectToDb");
          const { User } = await import("./models/user.model");

          await connectToDb();
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) user._id = dbUser._id;
          else {
            const newDbUser = await User.create({
              email: user.email,
              name: user.name,
              avatar: user.image,
              username: profile.login,
            });
            user._id = newDbUser._id;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return true;
    },

    async authorized({ request, auth }) {
      //define where we are
      const isOnHomePage =
        request.url === `${process.env.NEXT_PUBLIC_BASE_URL}/`;
      const isOnLoginPage = request.url.includes("/login");
      const isOnProjectsPage =
        request.url === `${process.env.NEXT_PUBLIC_BASE_URL}/projects`;
      const isOnNewProjectPage = request.url.endsWith("/new");

      //action taken depending on where we are
      if (isOnLoginPage && auth) {
        const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
        if (callbackUrl) {
          return Response.redirect(new URL("/", callbackUrl));
        }
        return Response.redirect(new URL("/", request.nextUrl));
      }
      if (isOnNewProjectPage && !auth) {
        return false;
      }

      //provide no auth access for all other pages
      return true;
    },
  },
});
