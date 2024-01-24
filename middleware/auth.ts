// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // get the user
  const user = await getCurrentUser();

  // redirect the user to the login page
  if (!user) {
    return await navigateTo({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
