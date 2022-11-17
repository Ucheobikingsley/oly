<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="view entry account">
    <h3>
      Account Details <span>Patient</span
      ><font-awesome-icon icon="fa-solid fa-user-doctor" class="icon" />
    </h3>
    <div class="basic_info">
      <p>
        <span class="basic">Basic info</span
        ><span class="sub">(Same as Patient)</span>
      </p>
      <div class="form">
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
        <div class="grouped">
          <div class="group small">
            <label for="name">Username</label>
            <span
              class="input-icon"
              :class="{ 'has-error': username.errorMessage.value }"
            >
              <input
                id="username"
                v-model="username.value.value"
                type="text"
                name="name"
                placeholder="First Name"
              />
              <!-- <span class="edge-text"> Last name </span> -->
            </span>
            <div v-if="username.errorMessage.value" class="error">
              {{ username.errorMessage.value }}
            </div>
          </div>

          <div class="group small">
            <label for="name">Birthdate</label>
            <div class="date">
              <date-picker
                v-model="dob.value.value"
                color="#58C294"
                mode="date"
                class="group closing-date"
                :input-debounce="200"
                :masks="{
                  input: 'DD/MM/YYYY',
                }"
              >
                <template v-slot="{ inputValue, inputEvents, togglePopover }">
                  <span class="input-icon">
                    <input
                      id="closingDate"
                      :value="inputValue"
                      type="text"
                      name="closingDate"
                      placeholder="DD/MM/YYYY"
                      v-on="inputEvents"
                    />
                    <svg
                      class="icon"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      @click="togglePopover"
                    >
                      <path
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>

                    <!-- <icon
                      class="icon"
                      data="@/assets/svg-icon/calendar.svg"
                      @click="togglePopover"
                    /> -->
                  </span>
                  <span v-if="dob.errorMessage.value" class="error">
                    {{ dob.errorMessage.value }}
                  </span>
                </template>
              </date-picker>
            </div>
          </div>
        </div>
        <div class="grouped">
          <div class="group small">
            <label for="register_password">New Password</label>
            <span
              class="input-icon"
              :class="{ 'has-error': password.errorMessage.value }"
            >
              <input
                id="register_password"
                v-model="password.value.value"
                placeholder="new password"
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

          <div class="group small">
            <label for="register_c_password">password confirmation</label>
            <span
              class="input-icon"
              :class="{ 'has-error': password_confirmation.errorMessage.value }"
            >
              <input
                id="register_c_password"
                v-model="password_confirmation.value.value"
                placeholder="Confirm password"
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
        </div>
        <div class="btn">
          <button class="cancel">Cancel</button>
          <button class="save">Save Changes</button>
        </div>
      </div>
      <AddressInfo />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import { object, string, date } from "yup";
import { DatePicker } from "v-calendar";
import { getPasswordIcon } from "@/utils/helpers";
import AddressInfo from "@/components/Account/AddressInfo.vue";

const validationSchema = object({
  name: string().required("Please input your first name"),
  lastName: string().required("Please input you last name"),
  email: string()
    .email("Please input a valid email address")
    .required("Please input a valid email address"),
  username: string().required("Please input a valid username"),
  dob: date().transform((value) => (!value ? undefined : value)),
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
});

const form = useForm({
  validationSchema,
  initialValues: {
    name: "",
    lastName: "",
    email: "",
    username: "",
    dob: new Date(),
    password: "",
    password_confirmation: "",
  },
});

const name = useField("name", undefined, {
  validateOnValueUpdate: true,
});
const lastName = useField("lastName", undefined, {
  validateOnValueUpdate: true,
});

const username = useField("username", undefined, {
  validateOnValueUpdate: true,
});

const dob = useField("dob", undefined, {
  validateOnValueUpdate: true,
});
const password = useField("password", undefined, {
  validateOnValueUpdate: true,
});
const password_confirmation = useField("password_confirmation", undefined, {
  validateOnValueUpdate: true,
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
</script>
<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
@use "@/assets/scss/_breakpoints.scss" as breakpoint;
// ::-webkit-scrollbar {
//   width: 20px;
// }

// /* Track */
// ::-webkit-scrollbar-track {
//   box-shadow: inset 0 0 5px grey;
//   border-radius: 10px;
// }

// /* Handle */
// ::-webkit-scrollbar-thumb {
//   background: rgba(255, 255, 255, 0.4);
//   border-radius: 10px;
// }

// /* Handle on hover */
// ::-webkit-scrollbar-thumb:hover {
//   background: color.$ash-7;
// }
.view.entry.account {
  width: 100%;
  padding-left: 100px;
  // height: calc(100vh - 150px);
  // overflow: hidden;
  // overflow-y: auto;
  > .basic_info {
    > p {
      > .basic {
        font-size: 20px;
        font-weight: bold;
        color: color.$main-green;
        margin-right: 6px;
      }
    }
    .form {
      width: 100%;
      // flex-direction: column;
      // align-items: center;
      //   overflow: hidden;
      //   overflow-y: auto;
      //   height: calc(80vh - 150px);

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

          > .date {
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

      > .btn {
        margin-top: 40px;
        width: 100%;
        display: flex;
        justify-content: flex-end;

        > * {
          padding: 12px 36px;
          border-radius: 6px;
          outline: none;
          border-style: none;
          cursor: pointer;
          transition: all 0.3s ease-in-out;

          &:hover:not(:disabled) {
            box-shadow: 1px 1px 5px 0 color.$ash-1;
          }
        }
        > .cancel {
          margin-right: 8px;
        }

        > .save {
          background-color: color.$main-green;
          color: color.$white-1;
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
}
</style>
