<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <EmailVerification v-if="hasSentVerificationMessage" />
  <div v-else class="view entry register">
    <div class="header_section">
      <h1>
        Create <span class="highlight">Patient</span>/<span class="highlight"
          >Therapist</span
        >
        Account
      </h1>
      <p>
        Already have an account?
        <span class="highlight" @click.prevent="">Sign in</span>
      </p>
    </div>
    <form @submit="onSubmit" @change="handleChange">
      <div class="grouped">
        <div class="group small">
          <label for="name">First Name</label>
          <span
            class="input-icon"
            :class="{ 'has-error': name.errorMessage.value }"
          >
            <input
              id="name"
              v-model="name.value.value"
              type="text"
              name="name"
              placeholder="First Name"
            />
            <!-- <span class="edge-text"> Last name </span> -->
          </span>
          <div v-if="name.errorMessage.value" class="error">
            {{ name.errorMessage.value }}
          </div>
        </div>

        <div class="group small">
          <label for="name">Last Name</label>
          <span
            class="input-icon"
            :class="{ 'has-error': lastName.errorMessage.value }"
          >
            <input
              id="name"
              v-model="lastName.value.value"
              type="text"
              name="name"
              placeholder="Last Name"
            />
            <!-- <span class="edge-text"> Last name </span> -->
          </span>
          <div v-if="lastName.errorMessage.value" class="error">
            {{ lastName.errorMessage.value }}
          </div>
        </div>
      </div>

      <div class="group">
        <label for="register_email">email</label>
        <span
          class="input-icon"
          :class="{ 'has-error': email.errorMessage.value }"
        >
          <input
            id="register_email"
            v-model="email.value.value"
            type="email"
            name="email"
          />
          <Icon class="icon" data="@/assets/icons/mail.svg?icon" />
        </span>
        <div v-if="email.errorMessage.value" class="error">
          {{ email.errorMessage.value }}
        </div>
      </div>
      <div class="group">
        <label for="register_password">password</label>
        <span
          class="input-icon"
          :class="{ 'has-error': password.errorMessage.value }"
        >
          <input
            id="register_password"
            v-model="password.value.value"
            :type="showPassword ? 'text' : 'password'"
            name="password"
          />
          <Icon
            class="icon toggle"
            :data="getPasswordIcon(showPassword)"
            @click="showPassword = !showPassword"
          />
        </span>
        <div v-if="password.errorMessage.value" class="error">
          {{ password.errorMessage.value }}
        </div>
      </div>
      <div class="group">
        <label for="register_c_password">password confirmation</label>
        <span
          class="input-icon"
          :class="{ 'has-error': password_confirmation.errorMessage.value }"
        >
          <input
            id="register_c_password"
            v-model="password_confirmation.value.value"
            :type="showConfirmPassword ? 'text' : 'password'"
            name="cpassword"
          />
          <Icon
            class="icon toggle"
            :data="getPasswordIcon(showConfirmPassword)"
            @click="showConfirmPassword = !showConfirmPassword"
          />
        </span>
        <div v-if="password_confirmation.errorMessage.value" class="error">
          {{ password_confirmation.errorMessage.value }}
        </div>
      </div>

      <div class="privacy_policy">
        <label for="privacy_policy">
          <input
            id="privacy_policy"
            v-model="privacyPolicy.value.value"
            type="checkbox"
            name="privacyPolicy"
            :true-value="true"
            :false-value="false"
          />
          <!-- <Icon class="icon" :data="privacyPolicyIcon" original :fill="false" /> -->
          <span class="text">
            Signing in or logging in the Platform, you automaticaaly accept our
            <a
              href="https://www.iubenda.com/privacy-policy/71399601"
              class="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed iub-legal-only iubenda-noiframe link"
              title="Privacy Policy "
            >
              Privacy Policy
            </a>
            Privacy Policy and Terms and Conditions
            <span v-if="privacyPolicy.errorMessage.value" class="error">
              {{ privacyPolicy.errorMessage.value }}
            </span>
          </span>
        </label>
      </div>
      <!-- <div class="information">
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy"
          >Privacy Policy</a
        >
        and
        <a href="https://policies.google.com/terms"
          >Terms of Service</a
        >
        apply.
      </div> -->
      <button class="submitBtn" type="submit" :disabled="!isFormValid">
        Register
      </button>
      <span class="create">
        Already have an account?
        <router-link class="link" :to="{ name: 'login' }"> Login </router-link>
      </span>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, defineAsyncComponent } from "vue";
import { useForm, useField } from "vee-validate";
import { object, string, boolean } from "yup";
import { createChangeHandler } from "@/utils/validator";
import { get } from "lodash-es";
import { useToast } from "vue-toastification";
import { api } from "@/utils/requests";
import {
  isErrorResponse,
  isValidationErrorResponse,
  TokenCreationReasons,
  hasSentTokenResponse,
  isAuthorizationError,
} from "@/types/logged";
import { getModule } from "vuex-module-decorators";
import User from "@/store/modules/User";
import { store } from "@/store";
import { HTTPError, TimeoutError } from "ky-universal";
import { useReCaptcha } from "vue-recaptcha-v3";
import { getPasswordIcon, isDevelopment, isProduction } from "@/utils/helpers";
import { useRoute } from "vue-router";

const toastId = ref("register");
const toast = useToast();
const isSaving = ref(false);
const user = getModule(User, store);
const recaptcha = useReCaptcha();
const route = useRoute();

const EmailVerification = defineAsyncComponent({
  loader: () =>
    import(
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      "@/components/emailVerification.vue"
    ),
});

const validationSchema = object({
  name: string().required("Please input your first name"),
  lastName: string().required("Please input you last name"),
  email: string()
    .email("Please input a valid email address")
    .required("Please input a valid email address"),
  password: string().required("Please input a valid password"),
  password_confirmation: string()
    .required("Please confirm your password")
    .test({
      name: "confirm_password",
      exclusive: true,
      params: {},
      message: "Password confirmation must match password",
      test: function (value) {
        return value === this.parent.password;
      },
    }),
  privacyPolicy: boolean()
    .required("Please accept to continue")
    .oneOf([true], "Please accept to continue"),
});

const form = useForm({
  validationSchema,
  initialValues: {
    name: "",
    lastName: "",
    email: get(route, "query.email", "") || "",
    password: "",
    password_confirmation: "",
    privacyPolicy: false,
  },
});

const name = useField("name", undefined, {
  validateOnValueUpdate: true,
});
const lastName = useField("lastName", undefined, {
  validateOnValueUpdate: true,
});
const email = useField("email", undefined, {
  validateOnValueUpdate: true,
});
const password = useField("password", undefined, {
  validateOnValueUpdate: true,
});
const password_confirmation = useField("password_confirmation", undefined, {
  validateOnValueUpdate: true,
});
const privacyPolicy = useField<boolean>("privacyPolicy", undefined, {
  validateOnValueUpdate: true,
  validateOnMount: true,
});

// const privacyPolicyIcon = computed(() =>
//   privacyPolicy.value.value
//     ? "@/assets/icons/checkbox-checked.svg?icon"
//     : "@/assets/icons/checkbox.svg?icon"
// );

// const termsOfUse = useField<boolean>("termsOfUse", undefined, {
//   validateOnValueUpdate: true,
//   validateOnMount: true,
// });

const isFormValid = computed(() => {
  console.log("log", form.meta.value.valid);
  console.log("log", privacyPolicy.value.value);
  return form.meta.value.valid && privacyPolicy.value.value;
});

const hasSentVerificationMessage = ref(false);

const onSubmit = async (e: Event) => {
  e.preventDefault();

  if (isSaving.value) return;
  const { valid } = await form.validate();

  if (!valid) {
    toast.error(
      "Ooops... some input / selection is invalid. Please verify inputed / selected data",
      {
        timeout: 7000,
        id: toastId.value,
      }
    );

    return;
  }

  if (
    !(
      isDevelopment ||
      (isProduction && recaptcha && (await recaptcha.recaptchaLoaded()))
    )
  ) {
    toast.error(
      "Ooops.. cannot submit request at this time.. PLease refresh this page",
      {
        id: toastId.value,
        timeout: 5000,
      }
    );
    return false;
  }

  isSaving.value = true;
  toast.info("Saving user data...", {
    id: toastId.value,
    timeout: 0,
  });

  try {
    // const name = form.values.name?.split(' ');
    const token = isProduction
      ? await recaptcha?.executeRecaptcha("register")
      : "token";

    let response = await api.post("register", {
      json: {
        ...form.values,
        firstName: name.value.value,
        lastName: lastName.value.value,
        "g-captcha-key": token,
      },
    });

    if (response.status === 200) {
      const data = (await response.json()) as Record<string, unknown>;

      if (hasSentTokenResponse(data)) {
        user.setToken(data.data.token);
        user.setState({ userData: data.data.user });
        hasSentVerificationMessage.value = true;
        console.log("log", user.token);
        console.log("log", user);
      }
    }

    toast.dismiss(toastId.value);
  } catch (e: unknown) {
    toast.dismiss(toastId.value);
    if (!e) window.location.reload();

    (async () => {
      if (e instanceof HTTPError) {
        const status = get(e, "response.status");
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
        } else if (e instanceof TimeoutError) {
          return toast.error(
            "Ooops.. An error occured while sending request.. PLease check your internet connection",
            {
              id: toastId.value,
            }
          );
        }
      }
      // toast.error(
      //   "An error occurred while creating account. Please ensure that your email address has been registered.",
      //   {
      //     id: toastId.value,
      //   }
      // );

      console.dir(e);
    })();
  }

  toast.dismiss(toastId.value);
  isSaving.value = false;
};

const handleChange = createChangeHandler(form);

onMounted(() => {
  if (user.tokenCreationReason !== TokenCreationReasons.SIGNUP) {
    user.setState({
      email: "",
      tokenCreationReason: null,
      mode: user.mode === "token-sent" ? "unlogged" : user.mode,
    });
  }
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
</script>

<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
@use "@/assets/scss/_breakpoints.scss" as breakpoint;

::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: color.$ash-7;
}

.view.entry.register {
  width: 70%;
  margin: 0 auto;
  overflow: hidden;
  overflow-y: auto;
  padding: 250px 0 0 30px;

  > .header_section {
    margin-top: 140px;
    width: 100%;
    h1 {
      font-weight: bold;

      > .highlight {
        color: color.$main-green;
      }
    }
    > p {
      font-weight: 600;
      > .highlight {
        color: color.$purple;
        cursor: pointer;
      }
    }
  }
  > form {
    width: 100%;
    // flex-direction: column;
    // align-items: center;
    padding: 0 10px 0 0;
    overflow: hidden;
    overflow-y: auto;
    height: calc(80vh - 150px);

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
        color: color.$purple;
        text-decoration: none;
      }
    }

    > .privacy_policy,
    > .terms_of_use {
      position: relative;
      margin: 30px 0 0 0;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      width: 100%;

      > * {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
      }

      > label {
        color: color.$brown-1;
        font-size: 14px;
        cursor: pointer;

        // > input {
        //   display: inline-flex;
        //   position: absolute;
        //   opacity: 0;
        //   z-index: 0;
        // }

        // > .icon {
        //   display: inline-flex;
        //   min-width: 16px;
        //   max-width: 16px;
        //   min-height: 16px;
        //   max-height: 16px;
        //   z-index: 1;
        //   transform: scale(0.9);
        //   margin: 0 10px 0 0;
        //   flex-shrink: 0;
        //   border: 1px solid #c85310;
        //   border-radius: 3.5px;

        //   @include breakpoint.respond-below(xi) {
        //     margin: 0 5px 0 0;
        //   }

        //   rect {
        //     stroke: none;
        //   }
        // }

        > .text {
          color: rgba(color.$black-1, 0.8);

          > .link {
            cursor: pointer;
            outline: initial;
            color: color.$purple;
            font-size: 14px;
            text-transform: capitalize;
            text-decoration: underline;

            &:hover {
              color: rgba(color.$brown-1, 1);
            }
          }

          > .error,
          > .info {
            display: flex;
            width: 100%;
            justify-content: flex-start;
            align-items: center;
            font-size: 12px;
            font-weight: normal;
            color: rgba(color.$ash-1, 0.7);
            margin: 8px 0 0 0;
            flex-wrap: wrap;
          }

          > .error {
            color: color.$red-1;
          }
        }
      }
    }

    > .grouped {
      display: flex;
      justify-content: space-between;
      > .group {
        flex-direction: column;

        &.small {
          width: 46%;
        }

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
            border: 1px solid color.$ash-7;
            border-radius: 7px;
            transition: all 0.3s ease-in-out;
            outline: initial;

            &:focus {
              box-shadow: 1px 1px 5px 0 rgba(color.$ash-1, 0.4);
            }

            &:not(:placeholder-shown) {
              & ~ .edge-text {
                display: none;
              }
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

          > .edge-text {
            padding: 3px;
            position: absolute;
            right: 30px;
            font-size: 13px;
            display: flex;
            color: color.$ash-1;
            text-transform: capitalize;
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
    }

    > .group {
      flex-direction: column;

      &.small {
        width: 46%;
      }

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
          border: 1px solid color.$ash-7;
          border-radius: 7px;
          transition: all 0.3s ease-in-out;
          outline: initial;

          &:focus {
            box-shadow: 1px 1px 5px 0 rgba(color.$ash-1, 0.4);
          }

          &:not(:placeholder-shown) {
            & ~ .edge-text {
              display: none;
            }
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

        > .edge-text {
          padding: 3px;
          position: absolute;
          right: 30px;
          font-size: 13px;
          display: flex;
          color: color.$ash-1;
          text-transform: capitalize;
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

    > .submitBtn {
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

      &:disabled {
        background-color: color.$ash-3;
        color: color.$black-1;
        cursor: not-allowed;
      }

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
}
</style>
