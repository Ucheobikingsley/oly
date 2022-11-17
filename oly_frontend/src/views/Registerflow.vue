<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="view entry registerflow">
    <div class="head_header">
      <h1>Hello! Welcome to Oly!</h1>
      <p>
        Congratulations on successfully registering! Just a few questions before
        we start!
      </p>
    </div>

    <div v-if="activeNav === 'first'" class="section first">
      <h1 class="header">What is your Address</h1>
      <div class="form">
        <form @submit.prevent="onSubmit">
          <div class="group">
            <label for="login_email">Your Country</label>
            <span
              class="input-icon"
              :class="{ 'has-error': country.errorMessage.value }"
            >
              <c-v-select
                id="stage"
                v-model="country.value.value"
                name="jobStage"
                mode="single"
                searchable
                native-support
                :options="asyncCountries"
                resolve-on-load
                :delay="500"
              />
            </span>

            <div v-if="country.errorMessage.value" class="error">
              {{ country.errorMessage.value }}
            </div>
          </div>
          <div class="group">
            <label for="street">Your State</label>
            <span
              class="input-icon"
              :class="{ 'has-error': state.errorMessage.value }"
            >
              <input
                id="street"
                v-model="state.value.value"
                type="text"
                name="street"
              />
            </span>
            <div v-if="state.errorMessage.value" class="error">
              {{ state.errorMessage.value }}
            </div>
          </div>
          <div class="group">
            <label for="street">Street and number</label>
            <span
              class="input-icon"
              :class="{ 'has-error': street.errorMessage.value }"
            >
              <input
                id="street"
                v-model="street.value.value"
                type="text"
                name="street"
              />
            </span>
            <div v-if="street.errorMessage.value" class="error">
              {{ street.errorMessage.value }}
            </div>
          </div>
          <div class="group">
            <label for="zipcode">Zip Code</label>
            <span
              class="input-icon"
              :class="{ 'has-error': zipcode.errorMessage.value }"
            >
              <input
                id="zipcode"
                v-model="zipcode.value.value"
                type="text"
                name="zipcode"
              />
            </span>
            <div v-if="zipcode.errorMessage.value" class="error">
              {{ zipcode.errorMessage.value }}
            </div>
          </div>
          <div class="btn">
            <button class="btn_back">Back</button>
            <button class="btn_back" type="submit">Finish</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="activeNav === 'second'" class="section second">
      <h1 class="header">How old are you?</h1>
      <div class="form">
        <form @submit.prevent="updateDate">
          <div class="date">
            <date-picker
              :model-value="dob.value.value"
              color="#58C294"
              mode="date"
              class="group closing-date"
              :input-debounce="200"
              :masks="{
                input: 'DD/MM/YYYY',
              }"
              @update:modelValue="setDOB"
            >
              <template #default="{ inputValue, inputEvents, togglePopover }">
                <span class="input-icon">
                  <input
                    id="availableDate"
                    :value="inputValue"
                    type="text"
                    name="from"
                    placeholder="DD/MM/YYYY"
                    v-on="inputEvents"
                  />
                  <icon
                    class="icon"
                    data="@/assets/svg-icon/calendar.svg"
                    @click="togglePopover"
                  />
                </span>
                <span v-if="dob.errorMessage.value" class="error">
                  {{ dob.errorMessage.value }}
                </span>
              </template>
            </date-picker>
          </div>

          <div class="btn">
            <button class="btn_back">Skip</button>
            <button class="btn_back" type="submit">Finish</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from "vue";
import { useForm, useField } from "vee-validate";
import { object, string, date } from "yup";
import { DatePicker } from "v-calendar";
import { useToast } from "vue-toastification";
import { LocationQueryValue, useRoute, useRouter } from "vue-router";
import { getModule } from "vuex-module-decorators";
import User from "@/store/modules/User";
import { store } from "@/store";
import { isArray, isString, orderBy, get } from "lodash-es";
import { api } from "@/utils/requests";
import { useReCaptcha } from "vue-recaptcha-v3";
import { HTTPError, Options, TimeoutError } from "ky-universal";
import ucwords from "locutus/php/strings/ucwords";
import { hasDataResponseList, SelectListItemType } from "@/types/logged";
import { format as dateFnsFormat, isValid as isDateValid } from "date-fns";
import isNumeric from "fast-isnumeric";
import {
  isErrorResponse,
  isValidationErrorResponse,
  hasLoggedInResponse,
  isAuthorizationError,
} from "@/types/logged";
import { isDevelopment, isProduction } from "@/utils/helpers";
import * as qs from "qs";
// import { stat } from "fs";
// import dxOverlay from "devextreme/ui/overlay";
const toast = useToast();
const toastId = ref("login");
const route = useRoute();
const router = useRouter();
const user = getModule(User, store);
const routeName = computed(() => route.query.email_verify_url);
const recaptcha = useReCaptcha();

const validationSchema = object({
  state: string().max(255),
  street: string().max(1000),
  zipcode: string().max(255),
  dob: date().transform((value) => (!value ? undefined : value)),
  country: string()
    .test({
      name: "check-country",
      exclusive: true,
      params: {},
      message: "Please select a valid country",
      test: function (value) {
        return value ? isNumeric(value) : false;
      },
    })
    .transform((value) => (!value ? undefined : value)),
});

const setDOB = (date: Date | null) => {
  dob.value.value = date ? date : undefined;
};

const asyncCountries = async () => {
  try {
    const options: Options = {};
    const response = await api.get("countries", options);
    const responseJson = (await response.json()) as Record<string, unknown>;

    if (hasDataResponseList<SelectListItemType>(responseJson)) {
      return orderBy(
        responseJson.data.map((item) => ({
          value: item.id,
          label: ucwords(item.name),
        })),
        ["label"],
        ["asc"]
      );
    }
  } catch {
    return [];
  }
};

const form = useForm({
  validationSchema,
  initialValues: {
    state: "",
    street: "",
    zipcode: "",
    country: "",
    dob: new Date(),
  },
});

const state = useField("state", undefined, {
  validateOnValueUpdate: false,
});
const street = useField("street", undefined, {
  validateOnValueUpdate: false,
});
const zipcode = useField("zipcode", undefined, {
  validateOnValueUpdate: false,
});
const country = useField("country", undefined, {
  validateOnValueUpdate: false,
});

const dob = useField("dob", undefined, {
  validateOnValueUpdate: false,
});

const navigationArray = ref(["first", "second", "third"]);
const activeNav = ref("first");

const nextNav = () => {
  const currentIndex = navigationArray.value.findIndex(
    (list) => list === activeNav.value
  );
  if (currentIndex + 1 < navigationArray.value.length) {
    activeNav.value = navigationArray.value[currentIndex + 1];
  }
};
const paramsObject: Record<string, unknown> = {};
const onSubmit = async (e: Event) => {
  e.preventDefault();

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
  toast.info("Validating Field...", {
    id: toastId.value,
    timeout: 0,
  });

  try {
    const token = isProduction
      ? await recaptcha?.executeRecaptcha("profile")
      : "token";

    const response = await api.post("profile", {
      json: {
        country_id: country.value.value,
        state: state.value.value,
        street: street.value.value,
        zip_code: zipcode.value.value,
        "g-captcha-key": token,
      },
    });

    if (response.status === 200) {
      const data = (await response.json()) as Record<string, unknown>;

      if (hasLoggedInResponse(data)) {
        toast.success("Profile Updated", {
          id: toastId.value,
          timeout: 3500,
        });
        await nextNav();
        await nextTick();
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
};

// const formatDate = (value: instanceof date) => {
//   if (value) {
//     const fDate = new Date(value);
//     return format(fDate, "yyyy-MM-dd");
//   }
// };

const formatDate = (date: string | Date) => {
  if (date) {
    date = new Date(date);
    if (isDateValid(date)) {
      return dateFnsFormat(date, "yyyy-MM-dd");
    }
  }

  return "";
};

const updateDate = async () => {
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
  toast.info("Validating Field...", {
    id: toastId.value,
    timeout: 0,
  });
  try {
    // const token = isProduction
    //   ? await recaptcha?.executeRecaptcha("profile")
    //   : "token";

    const response = await api.patch("profile", {
      json: {
        dob: formatDate(dob.value.value as Date),
      },
    });

    if (response.status === 200) {
      const data = (await response.json()) as Record<string, unknown>;

      if (hasLoggedInResponse(data)) {
        toast.success("Profile Updated", {
          id: toastId.value,
          timeout: 3500,
        });
        router.push({ name: "patient.dashboard" });
        await nextTick();
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
};
const getUrlParams = (url: string | LocationQueryValue[]) => {
  const paramsUrl = typeof url === "string" && url.split("?")[1];

  const urlObjectArray = isString(paramsUrl) && paramsUrl?.split("&");
  isArray(urlObjectArray) &&
    urlObjectArray?.map((list) => {
      const a = list.split("=");
      paramsObject[`${a[0]}`] = a[1];
    });
  return paramsObject;
};

const hasValidatedEmail = ref(false);
watch(
  routeName,
  async (value) => {
    if (value && !hasValidatedEmail.value) {
      paramsObject["signature"] = route.query.signature;
      getUrlParams(value);
      const email_verify_url = route.query.email_verify_url?.toString();
      const splitArray = email_verify_url?.split("/");

      const searchParams: Record<string, unknown> = {};
      searchParams.signature = paramsObject.signature;
      searchParams.expires = paramsObject.expires;
      console.log("logger");
      try {
        const response = await api.get(
          `verify-email/${Number(splitArray![splitArray!.length - 2])}/${
            splitArray![splitArray!.length - 1]
          }
        `,
          {
            searchParams: qs.stringify(searchParams),
          }
        );

        // console.log("log", await response.json());
        console.log("log", await response.json());
        if (response.status === 200) {
          hasValidatedEmail.value = true;
          return toast.success("Email Verified", {
            id: toastId.value,
            timeout: 2000,
          });
        }
      } catch (e: unknown) {
        const status = get(e, "response.status");
        console.log("status", status);
        if (Number(status) >= 400) {
          await user.logout();
          return toast.error("Couldn't verify email Address", {
            id: toastId.value,
            timeout: 2000,
          });
        }
      }
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
@use "@/assets/scss/_breakpoints.scss" as breakpoint;

.view.entry.registerflow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 250px 0 0 30px;
  width: 70%;

  > .head_header {
    width: 100%;
    margin-top: 100px;
    > h1 {
      font-weight: bolder;
    }
  }
  > .section {
    width: 100%;

    > .header {
      color: color.$main-green;
      font-weight: bold;
    }

    > .form {
      width: 100%;

      > form {
        width: 100%;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        overflow-y: auto;
        height: calc(90vh - 300px);

        @include breakpoint.respond-below(sm) {
          margin: 0;
        }

        > * {
          display: flex;
          width: 100%;
          margin: 20px 0 0 0;
        }

        > .date {
          :deep() {
            > .group {
              width: 100%;
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
                  height: 43px;
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
          }
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
              height: 43px;
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
        > .btn {
          width: 100%;
          display: flex;
          align-items: center;
          margin: 40px 0 0 0;
          > button {
            width: 33%;
            margin-right: 10px;
            justify-content: center;
            align-items: center;
            background-color: color.$main-green;
            color: #fff;
            border-radius: 10px;
            font-size: 17px;
            white-space: nowrap;
            text-transform: capitalize;
            padding: 11px;
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

            &:first-child {
              background-color: color.$ash-0;
              color: color.$black-0;
            }
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
}
</style>
