declare const APP_LAST_UPDATE_DATE: string;
import { createStore } from "vuex";
import VuexPersistence, { AsyncStorage } from "vuex-persist";
import { getStoreInstance } from "@/utils/localforage";
import { omit } from "lodash-es";
import User from "@/store/modules/User";

export const localStore = getStoreInstance(
  "vuex",
  "vuex-local-store",
  "vuex local storage to store vuex state locally"
);

const vuexLocal = new VuexPersistence({
  storage: localStore as unknown as AsyncStorage,
  supportCircular: true,
  asyncStorage: true,
  async saveState(key, state, storage) {
    if (!storage) return;

    await localStore.setItem("_version", APP_LAST_UPDATE_DATE);
    await storage.setItem(key, JSON.parse(JSON.stringify(state)));
  },
  async restoreState(key, storage) {
    if (!storage) return;
    const version = await localStore.getItem("_version");
    if (!version || version !== APP_LAST_UPDATE_DATE) {
      return null;
    }

    const data = await storage.getItem(key);
    return data;
  },
});

export const store = createStore({
  strict: true,
  modules: {
    User,
  },
  plugins: [vuexLocal.plugin],
});
