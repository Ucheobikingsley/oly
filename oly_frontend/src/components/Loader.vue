<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="component entry loader" :class="size">
    <div ref="spinnerEl" class="spinner-wrapper" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watch,
} from "vue";

import { Spinner } from "spin.js";

export default defineComponent({
  props: {
    size: {
      type: String as PropType<"very-small" | "small" | "medium" | "large">,
      required: false,
      default: "large",
    },
  },
  setup(props) {
    const spinnerEl = ref<HTMLElement | undefined>();
    const instance = ref<Spinner>();

    const lines = computed(() => {
      if (props.size === "very-small") return 7;
      if (props.size === "small") return 9;
      if (props.size === "medium") return 11;
      if (props.size === "large") return 15;
      return 8;
    });

    const lineLength = computed(() => {
      if (props.size === "very-small") return 13;
      if (props.size === "small") return 15;
      if (props.size === "medium") return 18;
      if (props.size === "large") return 23;
      return 15;
    });

    const lineWidth = computed(() => {
      if (props.size === "very-small") return 4;
      if (props.size === "small") return 4;
      if (props.size === "medium") return 5;
      if (props.size === "large") return 6;
      return 4;
    });

    const radius = computed(() => {
      if (props.size === "very-small") return 8;
      if (props.size === "small") return 8;
      if (props.size === "medium") return 10;
      if (props.size === "large") return 12;
      return 8;
    });

    const speed = computed(() => {
      if (props.size === "very-small") return 1.2;
      if (props.size === "small") return 1;
      if (props.size === "medium") return 0.9;
      if (props.size === "large") return 0.85;
      return 8;
    });

    const launchSpinner = () => {
      if (instance.value) {
        instance.value.stop();
      }

      if (spinnerEl.value) {
        const opts = {
          lines: lines.value, // The number of lines to draw
          length: lineLength.value, // The length of each line
          width: lineWidth.value, // The line thickness
          radius: radius.value, // The radius of the inner circle
          scale: 0.8, // Scales overall size of the spinner
          corners: 1, // Corner roundness (0..1)
          speed: speed.value, // Rounds per second
          rotate: 0, // The rotation offset
          animation: "spinner-line-shrink", // The CSS animation name for the lines
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: "#c85310", // CSS color or array of colors
          fadeColor: "transparent", // CSS color or array of colors
          top: "50%", // Top position relative to parent
          left: "50%", // Left position relative to parent
          shadow: "0 0 1px transparent", // Box-shadow for the lines
          zIndex: 2000000000, // The z-index (defaults to 2e9)
          className: "spinner", // The CSS class to assign to the spinner
          position: "absolute", // Element positioning
        };

        instance.value = new Spinner(opts).spin(spinnerEl.value);
      }
    };

    onMounted(async () => {
      launchSpinner();
    });

    onBeforeUnmount(() => {
      if (instance.value) {
        instance.value.stop();
      }
    });

    watch(() => props, launchSpinner, {
      deep: true,
    });

    return {
      spinnerEl,
    };
  },
});
</script>

<style lang="scss" scoped>
.component.entry.loader {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
  min-height: 150px;
  min-width: 120px;

  &.very-small {
    min-height: 60px;
  }

  &.small {
    min-height: 70px;
  }

  &.medium {
    min-height: 80px;
  }

  &.large {
    min-height: 90px;
  }

  > .spinner-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    :deep() {
      > .spinner[role="progressbar"] {
        z-index: 2 !important;
      }
    }
  }
}
</style>
