<template>
  <div class="mb-0 position-relative">
    <span class="font-weight-bold title-line">{{text}}</span>
    <div v-if="isLine" class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      required: true,
      type: String
    },
    isLine: {
      required: false,
      type: Boolean,
      default: true
    }
  }
};
</script>