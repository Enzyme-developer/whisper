import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/send/(.*)",
    "/vote/(.*)",
    "/api/webhook(.*)",
    "/api/message/create-message",
    "/api/poll/vote-poll",
  ],
  ignoredRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/send/(.*)",
    "/vote/(.*)",
    "/api/webhook(.*)",
  ],
  // afterAuth(auth, req, evt) {
  //   if (auth.isApiRoute || auth.isPublicRoute) {
  //     return;
  //   }
  // },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
