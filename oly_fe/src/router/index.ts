import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocation,
} from "vue-router";
import unloggedRoutes from "./routes/unlogged";
import loggedRoutes from "./routes/logged";
import { nprogress } from "@/main";
import { concat } from "lodash-es";
import { store } from "@/store/index";
import { Store } from "vuex";
import User from "@/store/modules/User";
import { getModule } from "vuex-module-decorators";
import { RouteLocationRaw } from "vue-router";
import { useToast } from "vue-toastification";
import sleep from "sleep-promise";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: concat(unloggedRoutes, loggedRoutes),
});

const toast = useToast();
export const isEntry = (route: RouteLocation): boolean => {
  return !route.name && route.path === "/";
};
router.beforeEach(
  async (to: RouteLocation, from: RouteLocation, next: NavigationGuardNext) => {
    const toRouteName = String(to.name);
    const fromRouteName = String(from.name);
    const fromRouteFullPath = String(from.fullPath);
    const toRouteFullPath = String(to.fullPath);
    if (
      toRouteName === fromRouteName &&
      toRouteFullPath === fromRouteFullPath
    ) {
      return false;
    }
    const vuexStore = store as Store<unknown> & {
      restored: Promise<void>;
    };
    await vuexStore.restored;
    const user = getModule(User, store);

    await user.syncToken();
    const authRoute = ["login", "register"];
    const requiresAuth = to.matched.some(
      (route) => route.meta.requiresAuth === true
    );

    const doesntRequiresAuth = to.matched.some(
      (route) => route.meta.requiresAuth === false
    );

    const isNeutral = to.matched.some(
      (route) => route.meta.requiresAuth === null
    );
    if (requiresAuth && !user.isLogged) {
      return await generateRouteRequestError(
        from,
        next,
        "Ooops... please login to access page",
        { name: "login" }
      );
    }

    if (user.isLogged && authRoute.includes(to.name as string)) {
      return router.push({ name: "patient.dashboard" });
    }

    if (!!user.token && !user.isLogged) {
      toast.error("You are logout...", {
        timeout: 5000,
      });
    }

    if (!nprogress.isLoading.value) nprogress.isLoading.value = true;

    next();
  }
);

export const generateRouteRequestError = async (
  from: RouteLocation,
  next: NavigationGuardNext,
  errorMsg = "",
  redirectTo: RouteLocationRaw = {
    name: "dashboard",
  }
): Promise<void> => {
  toast.error(errorMsg, {
    timeout: 5000,
  });

  await sleep(4000);

  if (isEntry(from)) {
    return next(redirectTo);
  }

  return next(false);
};

router.afterEach(async (to: RouteLocation) => {
  if (router.currentRoute.value === to && nprogress.isLoading.value) {
    nprogress.isLoading.value = false;
  }
});

export default router;
