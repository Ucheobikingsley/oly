<template>
  <div class="component entry airbtn">
    <button
      :class="[
        props.element === 'air'
          ? 'air'
          : props.element === 'fire'
          ? 'fire'
          : props.element === 'water'
          ? 'water'
          : props.element === 'earth'
          ? 'earth'
          : props.element === 'hot'
          ? 'hot'
          : '',
      ]"
    >
      {{
        props.element === "air"
          ? "AIR"
          : props.element === "fire"
          ? "FIRE"
          : props.element === "water"
          ? "WATER"
          : props.element === "hot"
          ? "HOT"
          : "Not set"
      }}
    </button>
  </div>
</template>
<script lang="ts" setup>
export interface Props {
  element: "air" | "water" | "fire" | "earth" | "hot";
}
const props = defineProps<Props>();
</script>
<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
@use "@/assets/scss/_breakpoints.scss" as breakpoint;
.component.entry.airbtn {
  width: fit-content;
  height: fit-content;
  > button {
    padding: 1px 13px;
    background-color: color.$ash-7;
    color: color.$white-1;
    border-style: none;
    font-size: 12px;
    border-radius: 6px;

    &.air {
      background: transparent linear-gradient(122deg, #ffbb09 0%, #ff6633 100%)
        0% 0% no-repeat padding-box;
    }

    &.fire {
      background: transparent linear-gradient(122deg, #ff3f3f 0%, #d90c0c 100%)
        0% 0% no-repeat padding-box;
    }

    &.water {
      background: transparent linear-gradient(122deg, #00ccff 0%, #2680b3 100%)
        0% 0% no-repeat padding-box;
    }

    &.earth {
      background: transparent linear-gradient(122deg, #66ffcc 0%, #1fb862 100%)
        0% 0% no-repeat padding-box;
    }

    &.hot {
      background: color.$purple;
    }
  }
}
</style>
