import { map, merge } from "lodash-es";
import { RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        "@/views/Home.vue"
      ),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        "@/views/About.vue"
      ),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        "@/views/Signin.vue"
      ),
  },
  {
    path: "/pricing",
    name: "pricing",
    component: () =>
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        "@/views/Pricing.vue"
      ),
  },
  {
    path: "/disease",
    name: "disease",
    component: () =>
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        "@/views/Home.vue"
      ),
  },
  {
    path: "/therapists",
    name: "therapists",
    component: () =>
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        "@/views/Home.vue"
      ),
  },
  {
    path: "/therapies",
    name: "therapies",
    component: () =>
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        "@/views/Home.vue"
      ),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        "@/views/Register.vue"
      ),
  },
  {
    path: "/flow",
    name: "register.flow",
    component: () =>
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        "@/views/Registerflow.vue"
      ),
  },
  {
    path: "/howitworks",
    name: "how.it.works",
    component: () =>
      import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        "@/views/HowItWorks.vue"
      ),
  },

  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import("../views/AboutView.vue"),
  // },
];

export default map(routes, (route) => {
  route.meta = merge(
    {
      requiresAuth: false,
      needsFrame: false,
    },
    route.meta || {}
  );

  return route;
});
