<template>
  <Multiselect
    v-bind="$attrs"
    ref="multiselect"
    :mode="mode"
    :close-on-select="localCloseOnSelect"
    class="component multiselect entry"
    @click="openOptions"
    @open="handleOpenOptions"
    @close="handleCloseOptions"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
    @select="handleSelect"
    @search-change="repositionPopper"
  >
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </Multiselect>
</template>

<script lang="ts">
import { createPopper, Instance, Placement } from "@popperjs/core";
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  nextTick,
  ref,
  toRaw,
  watch,
  watchEffect,
} from "vue";
import Multiselect from "@vueform/multiselect";
import { onClickOutside, templateRef } from "@vueuse/core";
import {
  debounce,
  each,
  get,
  isBoolean,
  isNull,
  isString,
  set,
} from "lodash-es";
import isNumeric from "fast-isnumeric";
import until from "until-promise";

export default defineComponent({
  name: "MultiSelect",
  components: {
    Multiselect,
  },
  inheritAttrs: false,
  props: {
    showOptionsOnHover: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    optionsPlacement: {
      type: String as PropType<Placement>,
      default: "bottom",
      required: false,
    },
    closeOnSelect: {
      type: Boolean as PropType<boolean | undefined>,
      required: false,
      default: undefined,
    },
    mode: {
      type: String as PropType<"single" | "multiple" | "tags">,
      required: false,
      default: "single",
    },
    addToOptionsWidth: {
      type: [Number, String] as PropType<number | string>,
      required: false,
      default: 0,
    },
    maxOptionsHeight: {
      type: [Number, String] as PropType<number | string>,
      required: false,
      default: "400px",
    },
    optionsHeight: {
      type: [Number, String] as PropType<number | string>,
      required: false,
      default: "auto",
    },
    refreshOptionsRef: {
      type: [Boolean, Number, String] as PropType<boolean | number | string>,
      required: false,
      default: undefined,
    },
    show: {
      type: Boolean as PropType<boolean | null>,
      required: false,
      default: null,
    },
  },
  emits: ["focus", "blur"],
  setup(props, { emit }) {
    const localIsOpen = ref(false);
    const isShowingOptions = computed({
      get() {
        return localIsOpen.value;
      },

      set(val: boolean) {
        if (isNull(props.show)) {
          localIsOpen.value = !!val;
        }
      },
    });

    watch(
      () => props.show,
      (show) => {
        if (isBoolean(show)) {
          localIsOpen.value = show;
        }
      },
      {
        immediate: true,
      }
    );

    const multiselect = templateRef("multiselect");
    const containerEl = computed<HTMLElement>(() => {
      if (multiselect.value) {
        return get(multiselect, "value.$el");
      }

      return null;
    });

    const optionsEl = computed(() => {
      if (containerEl.value) {
        const optionsEl = containerEl.value.querySelector(
          ".multiselect-dropdown"
        );
        if (optionsEl) return optionsEl as HTMLElement;
      }

      return null;
    });

    const multiselectInstance = computed(() => {
      if (multiselect.value) {
        const instance = multiselect.value as unknown as {
          close: () => void;
          open: () => void;
          select: (option: unknown) => void;
          deselect: (option: unknown) => void;
          remove: (option: unknown) => void;
          setPointer: (option: unknown) => void;
          selectAll: () => void;
          clear: () => void;
          refreshOptions: (
            cb: (...args: unknown[]) => Promise<unknown | void> | unknown | void
          ) => void;
          handleSearchInput: (...args: unknown[]) => void;
          clearSearch: () => void;
          isOpen: boolean;
        };

        return instance;
      }

      return null;
    });

    const popper = ref<Instance>();

    const optionsElStyle = ref<Record<string, string>>({});
    const resizeObserver = new ResizeObserver(() => {
      if (containerEl.value) {
        const rect = containerEl.value.getBoundingClientRect();
        const addedOptionsWidth = isNumeric(props.addToOptionsWidth)
          ? String(props.addToOptionsWidth)
          : "0";

        const maxOptionsHeight = props.maxOptionsHeight
          ? isString(props.maxOptionsHeight)
            ? props.maxOptionsHeight
            : isFinite(props.maxOptionsHeight)
            ? `${props.maxOptionsHeight}px`
            : "300px"
          : "300px";

        const optionsHeight = props.optionsHeight
          ? isString(props.optionsHeight)
            ? props.optionsHeight
            : isFinite(props.optionsHeight)
            ? `${props.optionsHeight}px`
            : "auto"
          : "auto";

        optionsElStyle.value = {
          width: rect.width
            ? `calc(${rect.width}px + ${addedOptionsWidth}px)`
            : "100%",
          height: optionsHeight,
          maxHeight: maxOptionsHeight,
          minHeight: "auto",
          border: "1px solid #9E9E9E",
          borderRadius: "6px",
          boxShadow: "3px 3px 16px 3px rgba(170,170,170, 0.7)",
        };

        repositionPopper();
      }
    });

    const initInstance = async () => {
      if (popper.value) {
        popper.value.destroy();
        await nextTick();
      }

      if (containerEl.value && optionsEl.value) {
        popper.value = createPopper(containerEl.value, optionsEl.value, {
          placement: props.optionsPlacement,
          strategy: "fixed",
          modifiers: [
            {
              name: "offset",
              options: {
                padding: [0, 1],
              },
            },
            {
              name: "flip",
              enabled: true,
              options: {
                padding: [0, 1],
                fallbackPlacements: [
                  "left-start",
                  "right-start",
                  "left-end",
                  "right-end",
                  "auto-start",
                  "auto-end",
                  "auto",
                ],
              },
            },
          ],
        });
      }
    };

    const repositionPopper = debounce(
      async () => {
        if (popper.value) {
          await popper.value.forceUpdate();
        }
      },
      100,
      {
        maxWait: 200,
        leading: true,
      }
    );

    onMounted(() => {
      initInstance();
      resizeObserver.observe(document.body);
    });

    onBeforeUnmount(() => {
      if (popper.value) {
        popper.value.destroy();

        resizeObserver.unobserve(document.body);
      }
    });

    onClickOutside(optionsEl, (e: Event) => {
      const target = get(e, "target") as Node;

      if (containerEl.value && !containerEl.value.contains(target)) {
        isShowingOptions.value = false;
      }
    });

    watch(
      isShowingOptions,
      async (show) => {
        if (show) {
          if (
            containerEl.value &&
            optionsEl.value &&
            multiselectInstance.value
          ) {
            if (!multiselectInstance.value.isOpen) {
              await multiselectInstance.value.open();
            }
          }

          await until(
            () => multiselectInstance.value?.isOpen,
            (isOpen) => !!isOpen,
            {
              wait: 500,
            }
          );

          await nextTick();
          await initInstance();
        } else {
          if (multiselectInstance.value && multiselectInstance.value.isOpen) {
            await multiselectInstance.value.close();
          }

          if (popper.value) {
            popper.value.destroy();
          }
        }
      },
      {
        immediate: true,
      }
    );

    watch(
      () => props.refreshOptionsRef,
      async (val, prev) => {
        if (val !== prev) {
          const instance = multiselectInstance.value;

          if (instance) {
            instance.refreshOptions(() => null);
          }
        }
      }
    );

    const addFocusEventHandler = (e: Event) => {
      emit("focus", get(e, "target.value"));
    };
    const addBlurEventHandler = (e: Event) => {
      emit("blur", get(e, "target.value"));
    };

    watch(containerEl, (containerEl, prevEl) => {
      if (containerEl) {
        resizeObserver.observe(containerEl);

        const search = containerEl.querySelector(
          props.mode === "tags"
            ? ".multiselect-tags-search"
            : ".multiselect-search"
        );

        if (search) {
          search.setAttribute("autocomplete", "off");
          search.setAttribute("name", "unknown_input_field");
          search.addEventListener("focusin", addFocusEventHandler);
          search.addEventListener("focusout", addBlurEventHandler);
        }
      } else if (prevEl) {
        resizeObserver.unobserve(prevEl);

        const search = prevEl.querySelector(
          props.mode === "tags"
            ? ".multiselect-tags-search"
            : ".multiselect-search"
        );

        if (search) {
          search.removeEventListener("focusin", addFocusEventHandler);
          search.removeEventListener("focusout", addBlurEventHandler);
        }
      }
    });

    watchEffect(() => {
      if (
        optionsEl.value &&
        optionsElStyle.value &&
        containerEl.value &&
        props.optionsHeight !== undefined
      ) {
        if (optionsEl.value) {
          const el = toRaw(optionsEl.value);
          each(optionsElStyle.value, (value, name) => {
            set(el.style, name, value);
          });
        }
      }
    });

    const handleMouseOver = function () {
      if (props.showOptionsOnHover && multiselectInstance.value) {
        multiselectInstance.value.open();
      }
    };

    const handleMouseLeave = function () {
      if (props.showOptionsOnHover && multiselectInstance.value) {
        multiselectInstance.value.close();
      }
    };

    const ensureStateIsRespected = async () => {
      const instance = multiselectInstance.value;

      if (instance) {
        if (isShowingOptions.value) {
          if (!instance.isOpen) {
            await instance.open();
          }
        } else {
          if (instance.isOpen) {
            await instance.close();
          }
        }
      }
    };

    const handleOpenOptions = () => {
      isShowingOptions.value = true;

      ensureStateIsRespected();
    };

    const handleCloseOptions = () => {
      isShowingOptions.value = false;

      ensureStateIsRespected();
    };

    const openOptions = (e: Event) => {
      if (!isShowingOptions.value) {
        const instance = multiselectInstance.value;
        const target = e.target as Node;

        if (
          instance &&
          props.mode === "single" &&
          optionsEl.value &&
          !optionsEl.value.contains(target)
        ) {
          instance.open();
          isShowingOptions.value = true;
        }
      }
    };

    const localCloseOnSelect = computed(() => {
      if (isBoolean(props.closeOnSelect)) {
        return props.closeOnSelect;
      } else {
        if (props.mode === "single") return true;
        return false;
      }
    });

    const handleSelect = () => {
      const instance = multiselectInstance.value;

      if (instance && props.mode === "single" && localCloseOnSelect.value) {
        instance.clearSearch();
        instance.close();
      }
    };

    const select = (option: unknown) => {
      if (multiselectInstance.value) {
        multiselectInstance.value.select(option);
      }
    };

    return {
      handleMouseOver,
      handleMouseLeave,
      isShowingOptions,
      openOptions,
      handleSelect,
      localCloseOnSelect,
      select,
      repositionPopper,
      handleOpenOptions,
      handleCloseOptions,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
@use "@/assets/scss/_breakpoints.scss" as breakpoint;

.component.multiselect.entry {
  :deep() {
    > .multiselect-spinner {
      background-color: color.$main-green;
    }

    > .multiselect-dropdown {
      margin: initial;
      margin-left: initial;
      margin-right: initial;
      margin-bottom: initial;
      margin-top: initial;
      left: initial;
      right: initial;
      top: initial;
      bottom: initial;
      position: absolute;

      > .multiselect-options {
        max-height: initial !important;
      }
    }

    > .multiselect-placeholder {
      white-space: nowrap;
      overflow: hidden;
      max-width: 90%;
    }
  }
}
</style>
