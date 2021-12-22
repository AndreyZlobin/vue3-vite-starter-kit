<template>
  <transition name="modal" @after-enter="afterEnter" @after-leave="afterLeave">
    <div
      v-if="show"
      :class="{ 'w-screen h-screen fixed inset-0 bg-dark-50 bg-opacity-50 z-100': overlay }"
      @click.self="handlerOverlayClose"
    >
      <transition :name="fullscreen ? 'bounce-up' : 'bounce'">
        <section
          v-if="isOpenContent"
          v-bind="$attrs"
          tabindex="0"
          class="
            max-h-screen
            h-full
            bg-light-50
            border-1
            z-1000
            absolute
            top-0
            right-0
            overflow-y-auto
            py-5
            px-4
            shadow-sm
            outline-none
          "
          :class="fullscreen ? 'w-full' : 'w-md  rounded-lg'"
          @keydown.esc="handlerEscClose"
        >
          <aside class="relative flex flex-col h-full">
            <v-icon
              name="close"
              class="absolute right-0 cursor-pointer"
              height="24"
              width="24"
              @click="handleClose"
            />
            <div v-if="hasHeader" class="mb-3">
              <slot name="header"></slot>
            </div>
            <div class="flex-1" :class="{ 'mt-5': fullscreen }">
              <slot></slot>
            </div>
            <div v-if="hasFooter">
              <slot name="footer"></slot>
            </div>
          </aside>
        </section>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, nextTick } from "vue";
import VIcon from "~/components/ui/v-icon/index.vue";

export default defineComponent({
  name: "SideModal",
  components: { VIcon },
  props: {
    show: { type: Boolean as PropType<boolean>, required: false, default: false },
    overlay: { type: Boolean as PropType<boolean>, required: false, default: false },
    overlayClose: { type: Boolean as PropType<boolean>, required: false, default: true },
    fullscreen: { type: Boolean as PropType<boolean>, required: false, default: false },
    escClose: { type: Boolean as PropType<boolean>, required: false, default: true },
  },
  emits: {
    "update:toggle": null,
  },
  setup(props, { emit, slots }) {
    const isOpenContent = ref(false);
    const hasHeader = !!slots.header;
    const hasFooter = !!slots.footer;

    async function handlerOverlayClose() {
      props.overlayClose && (await handleClose());
    }

    async function handlerEscClose() {
      props.escClose && (await handleClose());
    }

    async function handleClose() {
      isOpenContent.value = false;
      await nextTick();
      emit("update:toggle", false);
    }

    function afterEnter() {
      isOpenContent.value = true;
    }

    function afterLeave() {
      isOpenContent.value = false;
    }

    return {
      afterEnter,
      afterLeave,
      handlerOverlayClose,
      handlerEscClose,
      handleClose,
      isOpenContent,
      hasHeader,
      hasFooter,
    };
  },
});
</script>

<style scoped lang="less">
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}

.modal-enter-active,
.modal-leave-active {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.3s;
}

.bounce-leave-to {
  animation: bounce-out 0.3s;
}

@keyframes bounce-in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes bounce-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

//

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}

.modal-enter-active,
.modal-leave-active {
  opacity: 0;
}

.bounce-up-enter-active {
  animation: bounce-up-in 0.3s;
}

.bounce-up-leave-to {
  animation: bounce-up-out 0.3s;
}

@keyframes bounce-up-in {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes bounce-up-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
