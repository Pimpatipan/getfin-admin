<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$moment.locale("th");
  }
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";
</style>
