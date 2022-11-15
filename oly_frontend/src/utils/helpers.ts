import { computed } from "vue";
import Cookies from "js-cookie";
import type { CookieAttributes, CookiesStatic } from "js-cookie";

export const getPasswordIcon = computed(() => (showPassword: boolean) => {
  return `@/assets/svg-icon/eye${showPassword ? "" : "-slash"}.svg?icon`;
});

type Cookie = CookiesStatic & {
  withAttributes: (...args: Partial<CookieAttributes>[]) => CookiesStatic;
};

export const isDevelopment =
  String(import.meta.env.MODE).toLowerCase() === "development";
export const isProduction =
  String(import.meta.env.MODE).toLowerCase() === "production";
console.log("log", isDevelopment);
export const cookie = (Cookies as Cookie).withAttributes({
  path: "/",
  domain: isDevelopment ? undefined : `${import.meta.env.VITE_APP_UI_DOMAIN}`,
});
