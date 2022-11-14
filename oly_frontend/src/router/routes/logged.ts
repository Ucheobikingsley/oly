import { map, merge } from "lodash-es";
import { RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  //   {
  //     path: "/flow",
  //     name: "register.flow",
  //     component: () =>
  //       import(
  //         /* webpackMode: "lazy" */
  //         /* webpackPrefetch: true */
  //         "@/views/Registerflow.vue"
  //       ),
  //   },
  {
    path: "/dashboard",
    name: "patient.dashboard",
    component: import(
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      "@/views/Patient/dashboard.vue"
    ),
  },
  {
    path: "/yourtherapies",
    name: "patient.therapies",
    component: import(
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      "@/views/Patient/your_therapies.vue"
    ),
  },
  {
    path: "/account",
    name: "patient.account",
    component: import(
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      "@/views/Patient/account.vue"
    ),
  },
];

export default map(routes, (route) => {
  route.meta = merge(
    {
      requiresAuth: true,
      needsFrame: true,
    },
    route.meta || {}
  );

  return route;
});
