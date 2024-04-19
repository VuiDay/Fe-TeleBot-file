export default defineNuxtRouteMiddleware((to, from) => {
  const cookieToken = useCookie("TKUser");
  if (!cookieToken.value && to.path !== "/accuracy") {
    return navigateTo("/accuracy");
  } else if (cookieToken.value && to.path === "/accuracy") {
    return navigateTo("/");
  } else {
    return;
  }
});
