<template>
  <section :id="`${uId}-popover`" class="popover">
    <div ref="activator" class="popover__activator" :class="{ disabled }">
      <slot name="activator" :on="on" />
    </div>
    <div
      v-if="isOpen"
      :id="uId"
      ref="content"
      v-click-outside="clickOutside"
      :style="styleContent"
      class="popover__content constructor-default-content"
    >
      <section>
        <slot />
      </section>
    </div>
  </section>
</template>

<script lang="ts">
type Position =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "top-left"
  | "top-right";
import { positionPopover } from "./position";
import { PropType } from "vue";
export default {
  name: "VPop",
  props: {
    value: {
      type: Boolean as PropType<boolean>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
    },
    contentWidthActivator: {
      type: Boolean as PropType<boolean>,
    },
    position: {
      type: String as PropType<Position>,
      validator: (val: Position) =>
        [
          "bottom-center",
          "bottom-left",
          "bottom-right",
          "top-center",
          "top-left",
          "top-right",
        ].includes(val),
      default: "bottom-center",
    },
  },
  data() {
    return {
      uId: Math.random() * 1000000,
      isContent: false,
      styleContent: null,
      on: {
        click: this.changeContent,
      },
    };
  },
  computed: {
    isOpen() {
      return this.value || this.isContent;
    },
  },
  watch: {
    value(val: boolean): void {
      this.changeContent(val);
    },
  },
  beforeUnmount(): void {
    const el = document.getElementById(this.uId);
    el && el.remove();
  },
  methods: {
    async getContent() {
      await this.$nextTick();
      const activator = this.$refs.activator.firstElementChild.getBoundingClientRect();
      const content = this.$refs.content.$el || this.$refs.content;
      document.body.insertBefore(content, document.body.firstChild);
      this.$refs.content.style.width = this.contentWidthActivator ? `${activator.width}px` : "auto";

      const contentData = (content as HTMLElement).getBoundingClientRect();
      this.styleContent = positionPopover(activator, contentData, this.position);
    },
    changeContent(val: boolean | string) {
      if (this.disabled) return;
      this.isContent = typeof val === "boolean" ? val : !this.isContent;
      this.isContent && this.getContent();
      this.$emit("input", this.isContent);
    },
    clickOutside(el) {
      const path = el.path || (el.composedPath && el.composedPath());
      const isElement = path.some((e: HTMLElement) => {
        return !!e.classList && e.id === `${this.uId}-popover`;
      });
      if (!isElement) {
        this.isContent = false;
        this.$emit("input", this.isContent);
      }
    },
  },
};
</script>
<style lang="scss">
.popover {
  position: relative;
}
.popover__content {
  z-index: 1000000;
  overflow: hidden;
  position: absolute;
  box-shadow: 0 8px 24px 0 #04153e28;
  border-radius: 8px;
  background-color: #ffffff;
}
.constructor-default-content {
  padding: 20px;
}
</style>
