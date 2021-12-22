<template>
  <form @submit.prevent="onSubmit">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { formComponentProvide } from "~/components/ui/form-lib";
import { debounce } from "~/utils";

export default defineComponent({
  name: "VForm",
  props: {
    resetFields: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    delay: {
      type: Number as PropType<number>,
      default: 300,
    },
  },
  emits: {
    "on-submit"() {
      return true;
    },
  },
  setup(props, ctx) {
    const { validate, state } = formComponentProvide();
    const submitCallBack = () => {
      if (validate()) {
        ctx.emit("on-submit");
      }
    };
    const onSubmit = debounce(submitCallBack, props.delay);

    return {
      state,
      onSubmit,
    };
  },
});
</script>
