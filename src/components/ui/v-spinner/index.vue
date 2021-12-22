<template>
  <div class="spinner"></div>
</template>

<script>
export default {
  name: "VSpinner",
};
</script>

<style scoped lang="less">
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  border: 1.2px solid #fff;
  border-left-color: #333;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1.2s linear infinite;
}
</style>
