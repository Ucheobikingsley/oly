<script setup lang="ts">
import { ref, computed } from "vue";
import footerComp from "@/components/footer.vue";
import logo from "@/components/icons/logo.vue";
import { DxPopover } from "devextreme-vue/popover";
import { useRouter } from "vue-router";
import { getModule } from "vuex-module-decorators";
import User from "@/store/modules/User";
import { store } from "@/store";

const router = useRouter();
const showPopOver = ref(false);
const popoverActionTarget = ref<HTMLElement | null>();

const canCloseActionsPopover = (e: Event) => {
  const target = e.target as HTMLElement;

  if (
    target &&
    (target.classList.contains("icon") || target.closest("svg.icon_"))
  ) {
    return false;
  }

  return true;
};

const user = getModule(User, store);
const isLogged = computed(() => user.isLogged);

const animationConfig = ref({
  show: {
    type: "pop",
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
  },
  hide: {
    type: "fade",
    from: 1,
    to: 0,
  },
});

const openPopOver = () => {
  showPopOver.value = true;
  return;
};

const aboutPage = () => {
  router.push({ name: "about" });
};

const gotoHome = () => {
  router.push({ name: "home" });
};

const signIn = () => {
  router.push({ name: "login" });
};

const goTopricingPage = () => {
  router.push({ name: "pricing" });
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
</script>
<template>
  <div class="component entry unlogged">
    <header class="header">
      <ul class="header-list">
        <li @click.stop="gotoHome"><logo /></li>
        <li @click.stop="goToDisease">Disease</li>
        <li @click.stop="goToTherapists">Therapists</li>
        <li @click.stop="goToTherapies">Therapies</li>
        <li>Providers items</li>
      </ul>

      <ul class="header-list">
        <li class="other" id="other" @mouseenter="openPopOver">
          <span>Other</span>
          <font-awesome-icon icon="fa-solid fa-angle-down" id="icon" />
        </li>
        <button class="sigin_button" v-if="!isLogged" @click.stop="signIn">
          Sign-in
        </button>
        <button v-else class="sigin_button" @click.stop="signIn">
          Go to Dashboard
        </button>
        <DxPopover
          ref="actionsPopover"
          v-model:visible="showPopOver"
          :hide-on-parent-scroll="true"
          :width="150"
          :hide-on-outside-click="canCloseActionsPopover"
          :animation="animationConfig"
          target="#icon"
          position="bottom"
          container=".dx-viewport"
          @hidden="popoverActionTarget = null"
        >
          <div
            id="about"
            class="about"
            :style="{ cursor: 'pointer' }"
            @click.stop="aboutPage"
          >
            About Us
          </div>
          <div
            id="howitworks"
            :style="{ cursor: 'pointer' }"
            @click="router.push({ name: 'how.it.works' })"
            class="how"
          >
            How it works
          </div>
          <div id="faq" :style="{ cursor: 'pointer' }" class="faq">FAQ</div>
          <div
            id="pricing"
            :style="{ cursor: 'pointer' }"
            @click.stop="goTopricingPage"
            class="pricing"
          >
            pricing
          </div>
          <div id="contact" :style="{ cursor: 'pointer' }" class="contact">
            Contact Us
          </div>
        </DxPopover>
      </ul>
    </header>
    <div class="body">
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
  height: 68px;
  :deep() {
    .header {
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
    > .body {
      width: 100%;
      height: fit-content;
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
