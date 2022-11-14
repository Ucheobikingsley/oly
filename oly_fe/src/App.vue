<template>
  <div class="app class container">
    <component :is="Frame">
      <suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <Loader id="#framed-loader" />
        </template>
      </suspense>
    </component>
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { get } from "lodash-es";
import router from "./router";
import { getModule } from "vuex-module-decorators";
import User from "@/store/modules/User";
import { store } from "@/store";
const UnloggedFrame = defineAsyncComponent({
  loader: () =>
    import(
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      "@/components/Frames/Unlogged.vue"
    ),
});

const AuthUnloggedFrame = defineAsyncComponent({
  loader: () =>
    import(
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      "@/components/Frames/AuthUnlogged.vue"
    ),
});

const PatientFrame = defineAsyncComponent({
  loader: () =>
    import(
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      "@/components/Frames/PatientFrame.vue"
    ),
});

onMounted(async () => {
  await user.getAuthUser();
});

const route = useRoute();
const authPages = ["login", "register", "forgot-password", "register.flow"];
const isAuthPage = computed(() => {
  if (route && route.name && typeof route.name === "string") {
    return authPages.includes(route.name);
  }

  return false;
});

const isLoggedInPages = computed(() => {
  if (route && route.name && typeof route.name === "string") {
    console.log("re", route.meta);
    return get(route.meta, "requiresAuth") === true;
  }

  return false;
});

const Frame = computed(() => {
  if (isAuthPage.value) return AuthUnloggedFrame;
  if (isLoggedInPages.value) return PatientFrame;
  return UnloggedFrame;
});

const user = getModule(User, store);
// const isLogged = computed(() => user.isLogged);
// watch(isLogged, (value) => {
//   if (!value) {
//     router.push({ name: "login" });
//   }
// });
</script>
//
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
@use "@/assets/scss/montserrat.scss";
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;

:root {
  --ms-radius: 7px;
  --ms-tag-bg: #{color.$shaded-black-1};
  --ms-tag-color: #{color.$white-1};
  --ms-tag-radius: 7px;
  --ms-tag-font-weight: 400;
  --ms-border-color: #{color.$ash-1};
  --ms-option-bg-selected-pointed: #{color.$main-green};
  --ms-option-bg-selected: #{color.$ash-7};
  --ms-ring-color: #{rgba(color.$green-1, 0.5)};
  --ms-font-size: 13px;
}

* {
  font-family: "Montserrat";
  box-sizing: border-box;
}

ul,
p,
ol {
  margin: 0;
  padding: 0;
}

body,
#app,
.app.class.container {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 100%;
  align-content: flex-start;
  justify-content: center;
}
.multiselect {
  min-height: 43px;

  > .multiselect-tags {
    max-width: 100%;
    overflow-x: auto;
  }

  > .multiselect-spinner {
    border-left: 1px solid color.$main-green;
    border-radius: 50%;
    border-top: 1px solid color.$main-green;
    background-image: initial;
    background-position: initial;
  }

  > .multiselect-dropdown {
    overflow: hidden;
    overflow-y: auto;
  }
}

/* Make clicks pass-through */
.v-popper__popper {
  display: block !important;
  z-index: 10000;

  > .v-popper__wrapper {
    > .v-popper__inner {
      background: color.$ash-1;
      color: color.$white-1;
      border-radius: 16px;
      padding: 5px 10px;
      font-size: 13px;
    }

    > .v-popper__arrow-container {
      > .v-popper__arrow-outer {
        width: 0;
        height: 0;
        margin: 0;
        border-style: solid;
        position: absolute;
        border-color: color.$ash-3;
        z-index: 1;
      }
    }
  }

  &[data-popper-placement^="top"] {
    > .v-popper__wrapper {
      margin-bottom: 10px;
    }
  }

  &[data-popper-placement^="bottom"] {
    > .v-popper__wrapper {
      > .v-popper__arrow-container {
        > .v-popper__arrow {
          border-width: 0 5px 5px 5px;
          border-left-color: transparent !important;
          border-right-color: transparent !important;
          border-top-color: transparent !important;
          top: -5px;
          left: calc(50% - 5px);
          margin-top: 0;
          margin-bottom: 0;
        }
      }
    }
  }

  &[data-popper-placement^="right"] {
    > .v-popper__wrapper {
      > .v-popper__arrow-container {
        left: -3px;

        > .v-popper__arrow-outer,
        > .v-popper__arrow-innter {
          left: -1px;
        }
      }
    }
  }

  &[data-popper-placement^="left"] {
    > .v-popper__wrapper {
      > .v-popper__arrow-container {
        right: -9px;
      }
    }
  }

  &[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>
