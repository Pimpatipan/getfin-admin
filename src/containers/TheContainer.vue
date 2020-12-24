<template>
  <div class="c-app">
    <TheSidebar />
    <div class="c-wrapper">
      <TheHeader />
      <div class="c-body">
        <b-overlay :show="!$isLoading" rounded="sm" spinner-type="grow">
          <main class="c-main" :aria-hidden="$isLoading ? 'true' : null">
            <CContainer fluid>
              <transition name="fade">
                <router-view></router-view>
              </transition>
            </CContainer>
          </main>
        </b-overlay>
      </div>
      <TheFooter />
    </div>
  </div>
</template>

<script>
import TheSidebar from "./TheSidebar";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";
import { mapState } from "vuex";

export default {
  name: "TheContainer",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
  },
  computed: {
    ...mapState({
      globalLanguages: (state) => state.globalLanguages,
    }),
  },
  methods: {
    getLanguages: async function () {
      let languages = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/language`,
        null,
        this.$headers,
        null
      );
      if (languages.result == 1) {
        this.$store.commit("setGlobalLanguages", languages.detail);
      }
    },
  },
  created: async function () {
    this.getLanguages();
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
