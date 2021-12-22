<template>
  <div class="loader" :class="full && 'loader--full'">
    <div class="loader-item"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "VLoader",
  props: {
    full: { type: Boolean as PropType<boolean>, default: false },
  },
});
</script>

<style scoped lang="less">
.loader {
  &--full {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.loader-item {
  animation: rotate 1s infinite;
  height: 50px;
  width: 50px;
}

.loader-item:before,
.loader-item:after {
  border-radius: 50%;
  content: "";
  display: block;
  height: 20px;
  width: 20px;
}

.loader-item:before {
  animation: ball1 1s infinite;
  background-color: #ef4444;
  box-shadow: 30px 0 0 #f8b334;
  margin-bottom: 10px;
}

.loader-item:after {
  animation: ball2 1s infinite;
  background-color: #4ade80;
  box-shadow: 30px 0 0 #b8de34;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) scale(0.8);
    -moz-transform: rotate(0deg) scale(0.8);
  }
  50% {
    -webkit-transform: rotate(360deg) scale(1.2);
    -moz-transform: rotate(360deg) scale(1.2);
  }
  100% {
    -webkit-transform: rotate(720deg) scale(0.8);
    -moz-transform: rotate(720deg) scale(0.8);
  }
}

@keyframes ball1 {
  0% {
    box-shadow: 30px 0 0 #fbbf24;
  }
  50% {
    box-shadow: 0 0 0 #fbbf24;
    margin-bottom: 0;
    -webkit-transform: translate(15px, 15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #fbbf24;
    margin-bottom: 10px;
  }
}

@keyframes ball2 {
  0% {
    box-shadow: 30px 0 0 #84cc16;
  }
  50% {
    box-shadow: 0 0 0 #84cc16;
    margin-top: -20px;
    -webkit-transform: translate(15px, 15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #84cc16;
    margin-top: 0;
  }
}
</style>
