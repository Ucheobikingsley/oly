import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Loader from "@/components/Loader.vue";
import vue3StarRatings from "vue3-star-ratings";
import "spin.js/spin.css";
import { VueSvgIconPlugin } from "@yzfe/vue3-svgicon";
import "@yzfe/svgicon/lib/svgicon.css";
import "nprogress/nprogress.css";
import { NProgressOptions } from "nprogress";
import { useNProgress } from "@vueuse/integrations/useNProgress";
import { VueReCaptcha } from "vue-recaptcha-v3";
import CustomMultiselect from "@/components/MultiSelect.vue";
import Multiselect from "@vueform/multiselect";
export const nprogress = useNProgress(0.5, {
  minimum: 0.1,
  showSpinner: true,
  trickle: true,
} as NProgressOptions);

nprogress.isLoading.value = true;
//Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faAngleDown,
  faToggleOff,
  faToggleOn,
  faCartShopping,
  faFileMedical,
  faStar,
  faDisease,
  faGear,
  faMessage,
  faWallet,
  faBell,
  faPowerOff,
  faUserDoctor,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUserDoctor);
library.add(faPowerOff);
library.add(faCalendarDays);
library.add(faBell);
library.add(faWallet);
library.add(faMessage);
library.add(faStar);
library.add(faGear);
library.add(faDisease);
library.add(faFileMedical);
library.add(faEnvelope);
library.add(faAngleDown);
library.add(faToggleOff);
library.add(faToggleOn);
library.add(faCartShopping);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Toast, {
  PluginOptions as ToastPluginOptions,
  TYPE,
  POSITION,
} from "vue-toastification";

import "vue-toastification/dist/index.css";
//Devextreme
import "devextreme/dist/css/dx.light.css";
const options: ToastPluginOptions = {
  position: POSITION.TOP_LEFT,
  toastDefaults: {
    [TYPE.ERROR]: {
      timeout: 5000,
    },
    [TYPE.SUCCESS]: {
      timeout: 3000,
      hideProgressBar: true,
    },
  },
};
import "v-calendar/dist/style.css";

export const app = createApp(App);
app.use(Toast, options);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Loader", Loader);

app.component("vue3-star-ratings", vue3StarRatings);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);

app.use(VueSvgIconPlugin, {
  tagName: "icon",
});

app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_GOOGLE_RECAPTACH_SITE_KEY,
});
router.isReady().then(() => {
  console.log("router is ready");
  app.component("VSelect", Multiselect);
  app.component("CVSelect", CustomMultiselect);
  app.mount("#app");
});
