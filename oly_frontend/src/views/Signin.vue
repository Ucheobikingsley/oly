<template>
  <div class="view entry signin">
    <p class="welcome">Welcome Back</p>
    <p class="hint">
      Don't have any account yet?
      <span @click="goToRegister">Register here</span>
    </p>
    <div class="form">
      <form @submit.prevent="onSubmit">
        <div class="group">
          <label for="login_email">email</label>
          <span
            class="input-icon"
            :class="{ 'has-error': email.errorMessage.value }"
          >
            <input
              id="login_email"
              v-model="email.value.value"
              type="email"
              name="email"
            />
            <icon class="icon" data="@/assets/svg-icon/mail.svg?icon" />
          </span>
          <div v-if="email.errorMessage.value" class="error">
            {{ email.errorMessage.value }}
          </div>
        </div>
        <div class="group">
          <label for="login_password">password</label>
          <span
            class="input-icon"
            :class="{ 'has-error': password.errorMessage.value }"
          >
            <input
              id="login_password"
              v-model="password.value.value"
              :type="showPassword ? 'text' : 'password'"
              name="password"
            />
            <icon
              class="icon toggle"
              :data="getPasswordIcon(showPassword)"
              @click="showPassword = !showPassword"
            />
          </span>
          <div v-if="password.errorMessage.value" class="error">
            {{ password.errorMessage.value }}
          </div>
        </div>
        <div class="prompt">
          Signing in or logging in the platform, you automatically accept our
          <span class="highlight">privacy</span> and
          <span class="highlight">Terms and Conditions</span>
        </div>
        <div class="remember_me">
          <input type="checkbox" name="" id="" />
          <span>Remember me</span>
        </div>
        <button class="btn_signin">Sign in</button>
      </form>
      <div class="forget_password">Forget your password?</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useForm, useField } from "vee-validate";
import { getPasswordIcon } from "@/utils/helpers";
import { object, string, boolean } from "yup";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useReCaptcha } from "vue-recaptcha-v3";
import { get, isArray, isEmpty, values } from "lodash-es";
import { HTTPError, TimeoutError } from "ky-universal";
import { computed, defineComponent, nextTick, onMounted, ref } from "vue";
import { getModule } from "vuex-module-decorators";
import User from "@/store/modules/User";
import { store } from "@/store";
import { isDevelopment, isProduction } from "@/utils/helpers";
import {
  isErrorResponse,
  hasSentTokenResponse,
  isValidationErrorResponse,
  TokenCreationReasons,
  hasLoggedInResponse,
  isAuthorizationError,
} from "@/types/logged";
import { api } from "@/utils/requests";
import { nprogress } from "@/main";

const validationSchema = object({
  email: string()
    .email("Please input a valid email address")
    .required("Please input a valid email address"),
  password: string().required("Please input a valid password"),
  keepMeLogged: boolean(),
});

const form = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

const email = useField("email", undefined, {
  validateOnValueUpdate: true,
});
const password = useField("password", undefined, {
  validateOnValueUpdate: true,
});

const showPassword = ref(false);

const toastId = ref("login");
const toast = useToast();
const user = getModule(User, store);
const recaptcha = useReCaptcha();
const router = useRouter();
const isSaving = ref(false);
const goToRegister = () => {
  router.push({ name: "register" });
};

const onSubmit = async (e: Event) => {
  e.preventDefault();

  if (isSaving.value) return;
  const { valid } = await form.validate();

  if (!valid) {
    toast.error("Ooops... invalid login credentials", {
      timeout: 7000,
      id: toastId.value,
    });

    return;
  }

  if (
    !(
      isDevelopment ||
      (isProduction && recaptcha && (await recaptcha.recaptchaLoaded()))
    )
  ) {
    toast.error(
      "Oops! Cannot submit request at this time.. Please refresh this page",
      {
        id: toastId.value,
        timeout: 5000,
      }
    );

    return false;
  }

  isSaving.value = true;
  toast.info("Logging user...", {
    id: toastId.value,
    timeout: 0,
  });

  try {
    const token = isProduction
      ? await recaptcha?.executeRecaptcha("login")
      : "token";

    const response = await api.post("login", {
      json: {
        ...form.values,
        "g-captcha-key": token,
      },
    });

    if (response.status === 200) {
      const data = (await response.json()) as Record<string, unknown>;

      if (hasLoggedInResponse(data)) {
        nprogress.isLoading.value = true;

        await user.setToken(data.data.token);
        await user.setState({ userData: data.data.user });
        toast.success("User logged successfully", {
          id: toastId.value,
          timeout: 3500,
        });

        await user.goToDashboard();
        return;
      }
    } else {
      toast.error("Please refresh this page...", {
        id: toastId.value,
        timeout: 4000,
      });
    }
  } catch (e: unknown) {
    toast.dismiss(toastId.value);
    if (!e) window.location.reload();

    (async () => {
      if (e instanceof HTTPError) {
        const status = get(e, "response.status");
        console.log("status", status);
        if (status >= 400) {
          const errResp = await e.response.json();
          console.log("status", status);
          if (isValidationErrorResponse(errResp)) {
            toast.error(errResp.message, {
              id: toastId.value,
              timeout: 4000,
            });
          } else if (isErrorResponse(errResp)) {
            return toast.error(errResp.error.message, {
              id: toastId.value,
            });
          } else if (isAuthorizationError(errResp)) {
            return toast.error("Authorization Error", {
              id: toastId.value,
            });
          }
        }
      } else if (e instanceof TimeoutError) {
        return toast.error(
          "Oops! An error occured while sending request. Please check your internet connection",
          {
            id: toastId.value,
          }
        );
      } else {
        toast.error("An error occurred while logging in user", {
          id: toastId.value,
        });
      }
    })();
  }

  isSaving.value = false;
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
@use "@/assets/scss/_breakpoints.scss" as breakpoint;
.view.entry.signin {
  width: 70%;
  margin: 0 auto;
  padding: 250px 0 0 30px;
  > .welcome {
    color: color.$darker-black;
    font-size: 35px;
    font-weight: bolder;
    margin-top: 20px;
  }

  > .hint {
    font-size: 14px;
    color: color.$text-black-0;
    cursor: pointer;
    > span {
      color: #696cf1;
    }
  }

  > .form {
    width: 100%;

    > form {
      width: 100%;
      flex-direction: column;
      align-items: center;

      @include breakpoint.respond-below(sm) {
        margin: 0;
      }

      > * {
        display: flex;
        width: 100%;
        margin: 30px 0 0 0;
      }

      > .create {
        justify-content: center;
        color: color.$black-1;
        border-radius: 10px;
        font-size: 14px;
        white-space: nowrap;

        > .link {
          display: inline-flex;
          margin: 0 0 0 5px;
          color: color.$brown-1;
          text-decoration: none;
        }
      }

      > .group {
        flex-direction: column;

        > * {
          display: flex;
          width: 100%;
          justify-content: flex-start;
        }

        > label {
          margin: 0;
          font-weight: normal;
          text-transform: capitalize;
          font-size: 14px;
          font-weight: 600;

          @include breakpoint.respond-below(sm) {
            font-size: 16px;
          }
        }

        > .input-icon {
          border: none;
          position: relative;
          align-items: center;
          margin: 6px 0 0 0;

          > input {
            width: 100%;
            height: 50px;
            padding: 0 0 0 30px;
            font-size: 13px;
            color: color.$ash-1;
            border: 1px solid rgba(color.$ash-7, 0.8);
            border-radius: 7px;
            transition: all 0.3s ease-in-out;
            outline: initial;

            &:focus {
              box-shadow: 1px 1px 5px 0 rgba(color.$ash-1, 0.4);
            }
          }

          > .icon {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 30px;
            color: color.$ash-2;
            transition: all 0.3s ease-in-out;

            &.toggle {
              cursor: pointer;
            }
          }

          &.has-error {
            > input {
              border-color: color.$red-1;
            }

            > .icon {
              color: color.$red-1;
            }
          }
        }

        > .error {
          display: flex;
          width: 100%;
          justify-content: flex-start;
          align-items: center;
          font-size: 12px;
          font-weight: normal;
          color: color.$red-1;
          margin: 8px 0 0 0;
          flex-wrap: wrap;
        }
      }

      > .information {
        width: 100%;
        background-color: color.$ash-3;
        font-size: 13px;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: color.$ash-1;
        padding: 10px 20px;
        flex-wrap: wrap;

        > a {
          margin: 0 5px;
          color: color.$main-green;
        }
      }

      > .prompt {
        font-size: 13px;
        display: block;
        > .highlight {
          color: color.$purple;
        }
      }

      > .btn_signin {
        width: 100%;
        margin: 40px 0 0 0;
        justify-content: center;
        align-items: center;
        background-color: color.$main-green;
        color: #fff;
        border-radius: 10px;
        font-size: 17px;
        white-space: nowrap;
        text-transform: capitalize;
        padding: 15px;
        outline: initial;
        border: initial;
        transition: all 0.3s ease-in-out;
        cursor: pointer;

        &:hover:not(:disabled) {
          box-shadow: 1px 1px 5px 0 color.$ash-1;
        }

        @include breakpoint.respond-below(msl) {
          width: 100%;
          font-size: 16px;
        }

        @include breakpoint.respond-below(sm) {
          font-size: 16px;
        }
      }
    }

    > .forget_password {
      margin-top: 30px;
      width: 100%;
      text-align: center;
      color: #696cf1;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
  }
}
</style>
