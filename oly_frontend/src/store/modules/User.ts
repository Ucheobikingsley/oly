import router from "@/router";
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import { hasLoggedInResponse, TokenCreationReasons } from "@/types/logged";
import {
  get,
  set,
  has,
  each,
  isString,
  isNull,
  isArray,
  isObject,
  values,
  keys,
  includes,
  isEmpty,
  omit,
} from "lodash-es";
import { useJwt } from "@vueuse/integrations/useJwt";
import {
  isUserProfile,
  isTherapistProfile,
  UserProfileType,
} from "@/types/logged";
import { api } from "@/utils/requests";
import { isProduction, cookie, isDevelopment } from "@/utils/helpers";
import { toHandlers } from "vue";

@Module({ namespaced: true, name: "User" })
export default class User extends VuexModule {
  tokenExpiryTimer: number | null = null;
  tokenExpiryInterval = 1000;
  hasTokenExpired = true;
  mode: "token-sent" | "logged" | "unlogged" = "unlogged";
  email = "";
  token = "";
  tokenCreationReason: TokenCreationReasons | null = null;
  userData: Record<string, unknown> | null = null;

  get parseToken(): Record<string, unknown> | null {
    const parsedToken = useJwt(this.token, {
      fallbackValue: null,
    });

    return get(parsedToken, "payload.value", null);
  }

  get isLogged(): boolean {
    return this.mode === "logged";
  }

  @Action
  async initTokenCheck(): Promise<void> {
    if (!isNull(this.tokenExpiryTimer) && this.tokenExpiryTimer) {
      clearInterval(this.tokenExpiryTimer);
    }

    const parseToken = this.parseToken || {};
    const timer = setInterval(() => {
      this.context.commit("setState", {
        hasTokenExpired: User.checkTokenExpiry(parseToken),
      });
    }, this.tokenExpiryInterval);

    this.context.commit("setState", {
      tokenExpiryTimer: timer,
      hasTokenExpired: User.checkTokenExpiry(parseToken),
    });
  }

  get profileData(): UserProfileType | null {
    const parsedToken = this.parseToken;
    if (parsedToken) {
      const profile = parsedToken.profile as Record<string, unknown>;

      if (isUserProfile(profile)) return profile;
      else if (isTherapistProfile(profile)) return profile;
    }

    return null;
  }
  get hasProfile(): boolean {
    const profileData = this.profileData;
    if (this.isLogged && profileData) {
      return true;
    }

    return false;
  }

  get userType(): "user" | "therapist" | null {
    const profileData = this.profileData;
    if (profileData) {
      if (isUserProfile(profileData)) return "user";
      else if (isTherapistProfile(profileData)) return "therapist";
    }

    return null;
  }

  @Action
  async getAuthUser(): Promise<void> {
    const response = await api.get("me");
    if (response.status === 200) {
      const data = (await response.json()) as Record<string, unknown>;

      if (hasLoggedInResponse(data)) {
        await this.context.commit("setState", {
          userData: data.data.user,
        });
      }
    }
  }

  @Action
  async logout(): Promise<void> {
    if (this.token) {
      //Clear continue when logging out
      await this.context.commit("setState", {
        continue: null,
      });
    }

    cookie.remove("token");

    this.context.commit("setState", {
      mode: "unlogged",
      email: "",
      token: "",
      tokenCreationReason: null,
    });
  }

  @Action
  async setToken(token: string): Promise<void> {
    //Clear continue when switching profile
    if (!!this.token && !!token && token !== this.token && this.hasProfile) {
      await this.context.commit("setState", {
        continue: null,
      });
    }

    if (!token) {
      await this.context.dispatch("logout");
      return;
    }

    this.context.commit("setState", {
      mode: "logged",
      email: "",
      token,
      tokenCreationReason: null,
    });

    console.log("tokent", this.mode);

    // this.context.commit("setState", {
    //   hasTokenExpired: User.checkTokenExpiry(
    //     this.context.getters["parseToken"]
    //   ),
    // });

    cookie.set("token", token, {
      expires: 60 * 60 * 24 * 7,
    });
  }
  @Action
  async syncToken(): Promise<void> {
    const token = cookie.get("token") || "";
    await this.context.dispatch("setToken", token);
  }
  @Mutation
  setState(data: Partial<User>): void {
    each(data, (value, key) => {
      if (has(this, key)) {
        set(this, key, value);
      }
    });
  }
  @Action
  async goToDashboard(): Promise<void> {
    console.log("mode", this.isLogged, this.mode);
    if (this.isLogged && this.mode === "logged") {
      console.log("here");
      router.push({
        name: "patient.dashboard",
      });
    }
  }

  static checkTokenExpiry(parseToken: Record<string, unknown>): boolean {
    if (parseToken) {
      const expireDate =
        (parseInt((parseToken.exp as string) || "0", 10) || 0) * 1000;

      return Date.now() >= expireDate;
    }

    return true;
  }
}
