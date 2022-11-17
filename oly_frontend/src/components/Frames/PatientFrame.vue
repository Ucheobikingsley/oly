<script lang="ts" setup>
import { ref, computed } from "vue";
import footerComp from "@/components/footer.vue";
import logo from "@/components/icons/logo.vue";
// import { DxPopover } from "devextreme-vue/popover";
import { useRouter, useRoute } from "vue-router";
import { getModule } from "vuex-module-decorators";
import User from "@/store/modules/User";
import { store } from "@/store";
import { useToast } from "vue-toastification";

const user = getModule(User, store);

const route = useRoute();

const routeName = computed(() => route.name);

const userDetails = computed(() => user.userData);
const router = useRouter();

const switchActive = ref(false);
const toast = useToast();

const gotoHome = () => {
  router.push({ name: "home" });
};

const goToDisease = () => {
  router.push({ name: "disease" });
};

const goToTherapists = () => {
  router.push({ name: "therapists" });
};
const goToTherapies = () => {
  router.push({ name: "therapies" });
};
const logout = async () => {
  await user.logout();
  toast.error("User Logged out", {
    timeout: 3000,
  });
  console.log("here");
  router.push({ name: "login" });
  return;
};

const setActiveSwitch = () => {
  return (switchActive.value = !switchActive.value);
};
</script>
<template>
  <div class="component entry unlogged">
    <div class="header">
      <header>
        <ul class="header-list">
          <li @click.stop="gotoHome"><logo /></li>
          <li @click.stop="goToDisease">Disease</li>
          <li @click.stop="goToTherapists">Therapists</li>
          <li @click.stop="goToTherapies">Therapies</li>
          <li>Providers items</li>
        </ul>

        <ul class="header-list">
          <li>
            Patient
            <font-awesome-icon
              :icon="
                !switchActive
                  ? 'fa-solid fa-toggle-off'
                  : 'fa -solid fa-toggle-on'
              "
              class="icon"
              @click="setActiveSwitch"
            />
            <span>Therapist</span>
          </li>
          <button class="btn">
            <font-awesome-icon
              icon="fa-solid fa-cart-shopping"
              class="icon"
            /><span>Cart</span>
          </button>
        </ul>
      </header>
    </div>
    <div class="body">
      <div class="side_nav">
        <div class="profile">
          <div class="img">
            <img src="@/assets/images/pngs/Rectangle.png" alt="" />
          </div>
          <div class="profile_info">
            <h3>{{ `${userDetails?.firstName} ${userDetails?.lastName}` }}</h3>
            <p>{{ userDetails?.email }}</p>
          </div>
        </div>

        <div class="nav">
          <div
            class="list_item"
            :class="[routeName === 'patient.dashboard' ? 'active' : '']"
            @click="() => router.push({ name: 'patient.dashboard' })"
          >
            Wall
          </div>
          <div
            class="list_item"
            :class="[routeName === 'patient.account' ? 'active' : '']"
            @click="() => router.push({ name: 'patient.account' })"
          >
            <font-awesome-icon icon="fa-solid fa-gear" /><span
              >Account Details</span
            >
          </div>
          <div class="list_item">
            <font-awesome-icon icon="fa-solid fa-message" /><span
              >Messages</span
            >
          </div>
          <div
            class="list_item"
            :class="[routeName === 'patient.therapies' ? 'active' : '']"
            @click="() => router.push({ name: 'patient.therapies' })"
          >
            <font-awesome-icon icon="fa-solid fa-file-medical" />

            <span>Your Therapies</span>
          </div>
          <div class="list_item">
            <font-awesome-icon icon="fa-solid fa-disease" />
            <span>Your Diseases</span>
          </div>
          <div class="list_item">
            <font-awesome-icon icon="fa-solid fa-wallet" /> <span>Wallet</span>
          </div>
          <div class="list_item">
            <font-awesome-icon icon="fa-solid fa-bell" /><span
              >Notifications</span
            >
          </div>
          <div class="list_item" @click.stop="logout">
            <font-awesome-icon icon="fa-solid fa-power-off" /><span
              >Sign Out</span
            >
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
    <div class="component_footer">
      <footerComp />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
.component.entry.unlogged {
  width: 100%;

  :deep() {
    > .header {
      width: 100%;
      height: 68px;
      box-shadow: 0px 3px 20px #00000029;
      > header {
        width: 70%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;

        > * {
          .icon {
            width: 20px;
            height: 20px;
          }
          & .sigin_button {
            border-radius: 6px;
            background: color.$main-green;
            box-shadow: 0px 3px 6px color.$shadow-color;
            padding: 10px 30px;
            border-style: none;
            white-space: nowrap;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            color: color.$white-1;

            &:hover {
              box-shadow: 3px 3px 6px 0
                sasscolor.adjust(color.$ash-3, $lightness: -10%);
            }
          }
        }
        .header-list {
          height: 100%;
          list-style: none;
          display: flex;
          align-items: center;

          &:nth-child(2n) {
            > li {
              display: flex;
              align-items: center;

              > * {
                margin-left: 6px;
              }
              > .icon {
                color: color.$main-green;
              }
            }
            > .btn {
              border-radius: 6px;
              background: color.$main-green;
              box-shadow: 0px 3px 6px color.$shadow-color;
              padding: 10px 30px;
              border-style: none;
              white-space: nowrap;
              cursor: pointer;
              transition: 0.3s ease-in-out;
              color: color.$white-1;
              display: flex;
              align-items: center;

              > .icon {
                margin-right: 4px;
              }

              &:hover {
                box-shadow: 3px 3px 6px 0
                  sasscolor.adjust(color.$ash-3, $lightness: -10%);
              }
            }
          }
          .dx-popup-content {
            cursor: pointer;
          }
          > .other {
            flex: flex;
            align-items: center;

            span {
              margin-right: 6px;
            }
          }
          li {
            margin: 0 10px 0 6px;
            font-weight: 600;
            color: color.$text-black-0;
            cursor: pointer;
            &:first-child {
              margin: 0 15px 0 0;
            }
          }
        }
      }
    }
    > .body {
      width: 70%;
      margin: 0 auto;
      height: fit-content;
      margin-top: 40px;
      display: flex;
      align-items: flex-start;

      > .side_nav {
        width: 20%;
        // border-right: 1px solid color.$ash-7;

        > .profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          > .img {
            width: 100px;
            height: 100px;
            overflow: hidden;
            > img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              border-radius: 50px;
            }
          }
          > .profile_info {
            margin-top: 10px;
            text-align: center;

            > h3 {
              font-weight: bold;
              margin: 0;
              padding: 0;
            }
            > p {
              margin-top: 5px;
            }
          }
        }

        > .nav {
          width: 100%;
          flex-direction: column;
          align-items: center;
          margin-top: 22px;

          > * {
            margin-bottom: 10px;
            transition: 0.3s ease-in-out;
            width: 100%;
            padding: 15px;
            cursor: pointer;

            > span {
              margin-left: 6px;
            }

            &.active {
              background-color: color.$main-green;
              border-radius: 6px;
              color: color.$white-1;
            }
            &:hover {
              background-color: color.$main-green;
              border-radius: 6px;
              color: color.$white-1;
            }
          }
        }
      }
    }
    > .component_footer {
      margin-top: 40px;
      height: 380px;
      background-color: color.$darker-black;
      padding: 30px 0 0 0;
    }
  }
}
</style>
