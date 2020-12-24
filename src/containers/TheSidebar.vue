<template>
  <CSidebar
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <!-- <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        id="logo-main"
        size="custom-size"
        :height="56"
        viewBox="0 0 556 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />-->
      <div
        class="m-auto logo-temp text-uppercase text-center w-100"
      >
           <div
          class="imgLogo"
          v-bind:style="{
            'background-image': 'url(' + img + ')',
          }"
        ></div>
      </div>
    </CSidebarBrand>
    <div class="text-center mt-2 pt-2 d-none" :class="[{ 'd-none': minimize }]">
      <img :src="img" alt="logo" class="w-25" />
      <h4 class="font-weight-bold mt-2 username">{{ name }}</h4>

      <b-row class="no-gutters py-3 user-btn mt-4">
        <b-col>
          <div>
            <font-awesome-icon icon="user" />
          </div>
          <p class="m-0">Profile</p>
        </b-col>
        <b-col class="pointer" @click.prevent="handleLogout">
          <div>
            <font-awesome-icon icon="power-off" />
          </div>
          <p class="m-0">Logout</p>
        </b-col>
      </b-row>
    </div>
    <CRenderFunction flat :contentToRender="sidebarItems" />
    <CSidebarMinimizer
      class="c-d-md-down-none"
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />

    <ModalAlertConfirm
      msg="Log out"
      :text="modalMessage"
      colorBtnConfirm="primary"
      btnCancel="Cancel"
      btnConfirm="OK"
      ref="isModalAlertConfirm"
      @confirm="logout"
    />
  </CSidebar>
</template>

<script>
import SidebarItems from "./SidebarItems";
import { mapState } from "vuex";
import ModalAlertConfirm from "@/components/modal/alert/ModalAlertConfirm";
import VueCookies from "vue-cookies";

export default {
  name: "TheSidebar",
  extends: SidebarItems,
  components: {
    ModalAlertConfirm,
  },
  data() {
    return {
      modalMessage: "Are you sure you want to log out ?",
      name: "",
      img: "",
      imgLogo: "",
    };
  },
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    ...mapState({
      minimize: (state) => state.sidebarMinimize,
    }),
  },
  mounted: async function () {
    this.name = VueCookies.get("username");
    this.getLogo();
  },
  methods: {
    handleLogout() {
      this.$refs.isModalAlertConfirm.show();
    },
    logout: async function () {
      this.$refs.isModalAlertConfirm.hide();

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/logout`,
        null,
        this.$headers,
        null
      );
      this.$cookies.remove("admin-token");
      window.location.href = "/login";
    },
    getLogo: async function () {
      let resData = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/setting/getLogo`,
        null,
        this.$headers,
        null
      );
      this.img = resData.detail;
    },
  },
};
</script>

<style scoped>
#logo-main {
  background-image: url("/img/brand/coreui-base-white.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.logo-temp {
  color: #ffb300;
  font-size: 24px;
  font-weight: bold;
}

.user-btn {
  background: #373122;
}

.username {
  font-size: 18px;
}

.w-50px {
  width: 100px;
}
</style>