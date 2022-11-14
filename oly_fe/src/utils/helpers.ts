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
  String(process.env.NODE_ENV).toLowerCase() === "development";
export const isProduction =
  String(process.env.NODE_ENV).toLowerCase() === "production";

export const cookie = (Cookies as Cookie).withAttributes({
  path: "/",
  domain: isDevelopment
    ? undefined
    : `${process.env.VUE_APP_UI_DOMAIN}.${process.env.VUE_APP_UI_TOPLEVELDOMAIN}`,
});
