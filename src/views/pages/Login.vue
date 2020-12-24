<template>
  <div class="d-flex align-items-center min-vh-100 login-container">
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="9" lg="6" class="login">
          <b-card-group>
            <b-card class="p-4 shadow-lg">
              <b-card-body class="login-box">
                <b-form>
                  <div class="text-center">
                    <!-- <img src="/logo.png" alt /> -->
                    <div
                      class="imgLogo"
                      v-bind:style="{
                        'background-image': 'url(' + imgLogo + ')',
                      }"
                    ></div>
                    <hr class="my-4" />
                  </div>
                  <InputText
                    class="my-3 login-input"
                    v-model="form.email"
                    textFloat="Email"
                    placeholder="Email"
                    type="email"
                    name="email"
                    isRequired
                    :isValidate="$v.form.email.$error"
                    :v="$v.form.email"
                    @onKeyup="submitFormOnInput"
                  />
                  <InputText
                    class="my-3 login-input"
                    v-model="form.password"
                    textFloat="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    isRequired
                    :isValidate="$v.form.password.$error"
                    :v="$v.form.password"
                    @onKeyup="submitFormOnInput"
                  />
                  <b-row v-if="error != ''" class="m-2 text-center">
                    <span class="text-danger w-100">
                      {{ error }}
                      <br />
                      {{ " " }}
                    </span>
                  </b-row>
                  <b-row>
                    <c-col>
                      <b-button
                        type="button"
                        class="px-4 login-btn"
                        @click="checkForm"
                        :disabled="isDisable"
                        >Login</b-button
                      >
                    </c-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import InputText from "@/components/inputs/InputText";
import VueCookies from "vue-cookies";

export default {
  name: "Login",
  components: {
    InputText,
  },
  data() {
    return {
      imgLogo: "",
      error: "",
      form: {
        email: "",
        password: "",
      },
      isLoading: false,
      isDisable: false,
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required },
      },
    };
  },
  mounted: async function () {
    await this.getLogo();
  },
  methods: {
    getLogo: async function () {
      let resData = await this.$callApi(
       "get",
        `${this.$baseUrl}/api/setting/getLogo`,
        null,
        this.$headers,
        null
      );
      this.imgLogo = resData.detail;
    },
    checkForm: async function () {
      this.$v.form.$touch();
      if (this.$v.form.$error) return;

      this.isLoading = true;
      this.isDisable = true;
      this.error = "";
      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/login`,
        null,
        null,
        this.form
      );
      this.isLoading = false;
      this.isDisable = false;
      if (data.result == 1) {
        await this.$cookies.set("admin-token", data.detail.token, 60 * 60 * 24 * 30);
        await this.$cookies.set(
          "username",
          data.detail.userDetail.firstname +
            " " +
            data.detail.userDetail.lastname,
          60 * 60 * 24 * 30
        );
        window.location.href = "/";
      } else {
        this.error = data.message;
      }
    },
    submitFormOnInput: function (e) {
      if (e.keyCode === 13) {
        this.checkForm();
      }
    },
  },
};
</script>
