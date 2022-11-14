import { store } from "@/store";
import ky from "ky-universal";
import { getModule } from "vuex-module-decorators";
import User from "@/store/modules/User";
import { isUauthenticatedErrorResponse } from "@/types/logged";
import router from "@/router";
console.log("log", import.meta.env.VITE_API_URL);
export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  throwHttpErrors: true,
  hooks: {
    beforeRequest: [
      async (request) => {
        const user = getModule(User, store);
        request.headers.set("Authorization", `Bearer ${user.token}`);
        request.headers.set("Accept", `application/vnd.api+json`);
        request.headers.set("Content-Type", `application/vnd.api+json`);
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        const user = getModule(User, store);

        if (response.headers.has("NEW_AUTH_TOKEN")) {
          const token = response.headers.get("NEW_AUTH_TOKEN");

          if (token) {
            await user.setToken(token);
          }
        }

        if ([401, 403].includes(response.status)) {
          const resp = await response.json();
          if (isUauthenticatedErrorResponse(resp)) {
            await user.logout();
            await router.push({
              name: "login",
            });
          }
        }
      },
    ],
  },
  retry: {
    limit: 10,
    methods: ["get"],
    statusCodes: [413],
  },
  timeout: 30000,
});
