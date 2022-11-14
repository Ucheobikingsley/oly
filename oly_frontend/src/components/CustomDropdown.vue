<template>
  <div
    ref="container"
    class="component entry customdropdown"
    @click="showOptions = !showOptions"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <slot name="button-content">
      <button class="dropdown">
        <slot />
        <Icon class="icon" data="@/assets/icons/caret-down.svg?icon" />
      </button>
    </slot>
    <teleport v-if="showOptions" to="#afterApp">
      <div ref="options" class="options" :style="optionsWrapperStyles">
        <slot
          v-for="option in options"
          :key="option?.id || option?.value || option"
          name="option"
          :option="option"
          :select="getSelect(option)"
        >
          <button
            class="option"
            :class="{ active: isSelected(option) }"
            :style="optionStyles"
            @click="getSelect(option)()"
          >
            {{ option.name || option?.label || option }}
          </button>
        </slot>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { createPopper, Instance, Placement } from "@popperjs/core";
import { onClickOutside, templateRef } from "@vueuse/core";
import { get, isString } from "lodash-es";
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watch,
} from "vue";

export default defineComponent({
  name: "ComponentCustomDropdown",
  props: {
    options: {
      type: Array as PropType<
        { id: string; name: string; label: string; value: string }[]
      >,
      required: true,
    },
    selectedOption: {
      type: String as PropType<unknown>,
      required: false,
      default: undefined,
    },
    placement: {
      type: String as PropType<Placement>,
      default: "bottom",
      required: false,
    },
    showOptionsOnHover: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    optionsWrapperStyles: {
      type: Object as PropType<Record<string, string>>,
      required: false,
      default: () => ({}),
    },
    optionStyles: {
      type: Object as PropType<Record<string, string>>,
      required: false,
      default: () => ({}),
    },
    show: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: undefined,
    },
  },
  emits: ["select", "clicked-outside"],
  setup(props, { emit }) {
    const getSelect = function (option: unknown) {
      return function () {
        emit("select", get(option, "id", get(option, "value", option)));
      };
    };

    const isSelected = computed(
      () => (data: string | Record<string, string>) => {
        if (isString(data)) return props.selectedOption === data;
        else return props.selectedOption === (data.id || data.value || data);
      }
    );

    watch(
      () => props.show,
      (show) => {
        if (show === undefined) showOpts.value = false;
      }
    );

    const showOpts = ref(false);
    const showOptions = computed({
      get(): boolean {
        if (props.show !== undefined) {
          return props.show;
        }

        return !!(props.options.length && showOpts.value);
      },
      set(value: boolean) {
        showOpts.value = value;
      },
    });

    const containerEl = templateRef<HTMLElement>("container");
    const optionsEl = templateRef<HTMLElement>("options");
    const popper = ref<Instance>();

    const initInstance = async () => {
      if (popper.value) {
        popper.value.destroy();
        await nextTick();
      }

      if (containerEl.value && optionsEl.value) {
        popper.value = createPopper(containerEl.value, optionsEl.value, {
          placement: props.placement,
          strategy: "fixed",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
            {
              name: "flip",
              enabled: true,
              options: {
                padding: 8,
                fallbackPlacements: ["top", "bottom", "left"],
              },
            },
          ],
        });
      }
    };

    onMounted(() => {
      initInstance();
    });

    onBeforeUnmount(() => {
      if (popper.value) {
        popper.value.destroy();
      }
    });

    onClickOutside(optionsEl, (e) => {
      showOptions.value = false;
      emit("clicked-outside", e);
    });

    watch(
      showOptions,
      async (show) => {
        if (show) {
          await nextTick();

          initInstance();
        } else if (popper.value) {
          popper.value.destroy();
        }
      },
      {
        immediate: true,
      }
    );

    const handleMouseOver = function () {
      if (props.showOptionsOnHover) {
        showOptions.value = true;
      }
    };

    const handleMouseLeave = function () {
      if (props.showOptionsOnHover) {
        showOptions.value = false;
      }
    };

    return {
      getSelect,
      showOptions,
      handleMouseOver,
      handleMouseLeave,
      isSelected,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:color" as sasscolor;
@use "@/assets/scss/_colors.scss" as color;
@use "@/assets/scss/_breakpoints.scss" as breakpoint;
@use "@/assets/scss/_viewport.scss" as viewport;

.component.entry.customdropdown {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  > .dropdown {
    display: inline-flex;
    outline: initial;
    padding: 6px 10px;
    margin: 0;
    border-radius: 6px;
    flex-wrap: nowrap;
    white-space: nowrap;
    text-transform: capitalize;
    border: 1px solid color.$brown-2;
    background-color: color.$white-1;

    cursor: pointer;

    > .icon {
      display: inline-flex;
      width: 12px;
      height: 20px;
      margin: 0 0 0 10px;
    }
  }
}

.options {
  display: inline-flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid color.$brown-2;
  background-color: color.$white-1;
  color: color.$brown-2;
  align-items: stretch;
  box-shadow: 1px 1px 5px 0 rgba(color.$ash-1, 0.3);
  padding: 0;

  > .option {
    display: inline-flex;
    outline: initial;
    padding: 10px 30px;
    margin: 0;
    width: 100%;
    flex-wrap: nowrap;
    white-space: nowrap;
    border: none;
    border-top: 1px solid color.$brown-2;
    background-color: color.$white-1;
    color: color.$brown-2;
    text-transform: capitalize;
    cursor: pointer;

    &:first-child {
      border-top: none;
    }

    &:hover,
    &.active {
      background-color: rgba(color.$brown-2, 0.1);
    }
  }
}
</style>
