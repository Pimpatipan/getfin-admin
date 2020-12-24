<template>
  <CHeader with-subheader>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand
      class="mx-lg-auto d-lg-none"
      src="/img/brand/logo_skl.svg"
      width="97"
      height="46"
      alt="CoreUI Logo"
    />
    <div>
      <h1 class="text-uppercase ml-2 theheader-txt font-weight-bold">
        Admin Site
      </h1>
    </div>
    <CHeaderNav class="d-md-down-none mr-auto">
      <!-- <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/dashboard">
          Dashboard
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/users" exact>
          Users
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink>
          Settings
        </CHeaderNavLink>
      </CHeaderNavItem>-->
    </CHeaderNav>
    <CHeaderNav class="mr-1 mr-sm-4">
      <!-- <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <ul>
            <li v-for="lang in languages" :key="lang" @click="changeLang(lang)">{{lang}}</li>
          </ul>
        </CHeaderNavLink>
      </CHeaderNavItem>-->
      <!-- <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-bell" class="text-warning" />
        </CHeaderNavLink>
      </CHeaderNavItem> -->
      <!-- <CHeaderNavItem class="d-md-down-none mx-2">
        <div>
          <img src="@/assets/images/cat.png" /> ร้าน Sample
        </div>
      </CHeaderNavItem>-->
      <CHeaderNavItem class="d-md-down-none mx-2">
        <b-dropdown class="m-2 lang-dd border-0" right>
          <template v-slot:button-content>{{displayName}}</template>
          <b-dropdown-item-button @click="handleLogout"
            >Logout</b-dropdown-item-button
          >
        </b-dropdown>
      </CHeaderNavItem>
      <!-- <TheHeaderDropdownAccnt /> -->
      <!-- <CHeaderNavItem class="mr-2">
        <a href="#" @click.prevent="logout">
          <CIcon name="cil-lock-locked" />
          <span class="ml-1">Logout</span>
        </a>
      </CHeaderNavItem>-->
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0" />
    </CSubheader>

    <b-modal
      ref="logOutModal"
      id="logOutModal"
      centered
      hide-header
      hide-footer
    >
      <div class="modal-header">
        <h4>ออกจากระบบ</h4>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$bvModal.hide('logOutModal')"
        >
          ×
        </button>
      </div>
      <div class="text-center px-md-5 py-4">
        <p class="text-text font-weight-bold">
          คุณแน่ใจหรือไม่ว่าคุณต้องการออกจากระบบ?
        </p>
      </div>
      <div class="form-inline justify-content-center mt-2">
        <b-button
          class="mr-2 btn-modal"
          variant="secondary"
          @click="$bvModal.hide('logOutModal')"
          >ไม่</b-button
        >
        <b-button class="ml-2 btn-modal" variant="primary" @click="logout"
          >ใช่</b-button
        >
      </div>
    </b-modal>

    <b-modal
      ref="alertModal"
      id="alertModal"
      hide-header
      hide-footer
      centered
      size="sm"
      no-close-on-backdrop
    >
      <div class="text-center">
        <img
          src="@/assets/images/icons/loading.svg"
          alt="loading"
          class="mb-3 img"
        />
        <p class="text-text font-weight-bold">กรุณารอสักครู่...</p>
      </div>
    </b-modal>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
import ModalLoading from "@/components/modal/alert/ModalLoading";
import VueCookies from "vue-cookies";

export default {
  name: "TheHeader",
  data() {
    return {
      displayName: "",
      name: "",
      modalMessage: "Are you sure you want to log out ?",
      // languages: ["en", "th"]
    };
  },
  created: async function () {
    this.name = VueCookies.get("username");
    await this.getProfile();
  },
  methods: {
    //   changeLang(lang) {
    //     this.$i18n.locale = lang;
    //   },
    getProfile: async function () {
      let resData = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/shortProfile`,
        null,
        this.$headers,
        null
      );
      if (resData.result == 1) {
        this.displayName =
          resData.detail.userDetail.firstname + " " + resData.detail.userDetail.lastname;
      }
    },
    handleLogout() {
      this.$refs.logOutModal.show();
    },
    logout: async function () {
      this.$refs.logOutModal.hide();
      this.$refs.alertModal.show();

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
  },
  components: {
    TheHeaderDropdownAccnt,
  },
};
</script>

<style scoped>
::v-deep .lang-dd button {
  background-color: transparent;
  border: none;
  padding: 0;
}

::v-deep .lang-dd button:focus,
::v-deep .lang-dd button:active,
::v-deep .lang-dd.show > .btn-secondary.dropdown-toggle,
::v-deep .lang-dd button:hover {
  background-color: transparent !important;
  border: none;
  padding: 0;
}

.lang-dd {
  border: 1px solid #dcdcdc;
  padding: 5px 10px;
}

::v-deep .lang-dd ul {
  width: 100px;
}

.modal-header {
  font-family: "Kanit-SemiBold";
  border-bottom: 0 !important;
  margin: 0px;
  padding: 0px;
  padding-bottom: 0.25rem;
}

.text-msg {
  font-family: "Kanit-SemiBold";
  font-size: 2rem;
  color: #4a4a4a;
}

.btn-modal {
  width: 100px;
  font-weight: bold;
}

.text-text {
  color: #4a4a4a;
  margin-bottom: 0;
  font-size: 1.2rem;
}

.img {
  width: 100px;
}

</style>
