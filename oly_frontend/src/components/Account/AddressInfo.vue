<template>
  <div class="view entry accountinfo">
    <div class="basic_info">
      <p>
        <span class="basic">Address info</span>
      </p>
      <div class="form">
        <div class="grouped">
          <div class="group small">
            <label for="name">Your Country</label>
            <span
              class="input-icon"
              :class="{ 'has-error': country.errorMessage.value }"
            >
              <input
                id="name"
                v-model="country.value.value"
                type="text"
                name="name"
                placeholder="First Name"
              />
              <!-- <span class="edge-text"> Last name </span> -->
            </span>
            <div v-if="country.errorMessage.value" class="error">
              {{ country.errorMessage.value }}
            </div>
          </div>

          <div class="group small">
            <label for="name">Your City</label>
            <span
              class="input-icon"
              :class="{ 'has-error': city.errorMessage.value }"
            >
              <input
                id="city"
                v-model="city.value.value"
                type="text"
                name="name"
                placeholder="Last Name"
              />
              <!-- <span class="edge-text"> Last name </span> -->
            </span>
            <div v-if="city.errorMessage.value" class="error">
              {{ city.errorMessage.value }}
            </div>
          </div>
        </div>
        <div class="grouped">
          <div class="group small">
            <label for="name">Street and number</label>
            <span
              class="input-icon"
              :class="{ 'has-error': street.errorMessage.value }"
            >
              <input
                id="username"
                v-model="street.value.value"
                type="text"
                name="name"
                placeholder="Street and NumberP"
              />
              <!-- <span class="edge-text"> Last name </span> -->
            </span>
            <div v-if="street.errorMessage.value" class="error">
              {{ street.errorMessage.value }}
            </div>
          </div>
          <div class="group small">
            <label for="name">ZipCode</label>
            <span
              class="input-icon"
              :class="{ 'has-error': zipcode.errorMessage.value }"
            >
              <input
                id="username"
                v-model="zipcode.value.value"
                type="text"
                name="name"
                placeholder="Street and NumberP"
              />
              <!-- <span class="edge-text"> Last name </span> -->
            </span>
            <div v-if="zipcode.errorMessage.value" class="error">
              {{ zipcode.errorMessage.value }}
            </div>
          </div>
        </div>

        <div class="btn">
          <button class="cancel">Cancel</button>
          <button class="save">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, onMounted, watch, defineAsyncComponent } from "vue";
import { useForm, useField } from "vee-validate";
import { object, string, boolean, date } from "yup";
import { DatePicker } from "v-calendar";
import { get, isArray, isEmpty, omit, values, zip } from "lodash-es";
import isNumeric from "fast-isnumeric";
const validationSchema = object({
  city: string().max(255),
  street: string().max(1000),
  zipcode: string().max(255),
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

const form = useForm({
  validationSchema,
  initialValues: {
    city: "",
    street: "",
    zipcode: "",
    country: "",
  },
});

const city = useField("city", undefined, {
  validateOnValueUpdate: true,
});
const street = useField("street", undefined, {
  validateOnValueUpdate: true,
});

const zipcode = useField("zipcode", undefined, {
  validateOnValueUpdate: true,
});

const country = useField("country", undefined, {
  validateOnValueUpdate: true,
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
@use "@/assets/scss/_breakpoints.scss" as breakpoint;
.view.entry.accountinfo {
  width: 100%;
  margin-top: 30px;
  > .basic_info {
    > p {
      > .basic {
        font-size: 25px;
        font-weight: bold;
        color: color.$main-green;
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
