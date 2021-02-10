<template>
  <div v-if="form">
    <b-container class="container-box">
      <b-row class="no-gutters">
        <b-col>
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            ตั้งค่าระบบ
          </h1>
        </b-col>
      </b-row>

      <div class="bg-white p-3">
        <!-- <b-row v-if="isLoadingData">
          <b-col class="px-4 px-sm-5 py-4 vh-100">
            <img src="/img/loading.svg" class="loading" alt="loading" />
          </b-col>
        </b-row> -->

        <b-row class="no-gutters">
          <b-col class="mb-3">
            <h1
              class="font-weight-bold header-main text-uppercase f-20 d-inline-block mr-2"
            >
              สำหรับจัดการบัญชี
            </h1>
          </b-col>
        </b-row>

        <div>
          <h1
            class="font-weight-bold header-main text-uppercase f-16 d-inline-block mr-2 mb-3"
          >
            กรุณาระบุอีเมลเพื่อทำการปรับหรือกำหนดระดับให้กับบัญชี
          </h1>
        </div>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="ระบุอีเมลที่ต้องการปรับ"
              placeholder="ระบุอีเมลที่ต้องการปรับ"
              type="text"
              name="silver"
              isRequired
              v-model="form.email"
              :isValidate="$v.form.email.$error"
              :v="$v.form.email"
            />
          </b-col>
          <b-col md="6">
            <label class="main-label"
              >ระดับที่ต้องการปรับ <span class="text-danger">*</span></label
            >
            <b-form-group class="my-1" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                id="radio-group-2"
                v-model="form.tierId"
                :aria-describedby="ariaDescribedby"
                name="radio-sub-component"
                class="font-weight-normal"
              >
                <b-form-radio value="3">Silver</b-form-radio>
                <b-form-radio value="2">Gold</b-form-radio>
                <b-form-radio value="1">Platinum</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="ระบุยอดซื้อย้อนหลัง (บาท)"
              placeholder="ระบุยอดซื้อย้อนหลัง (บาท)"
              type="text"
              name="silver"
              @onKeypress="isNumber($event)"
              isRequired
              v-model="form.total"
              :isValidate="$v.form.total.$error"
              :v="$v.form.total"
            />
          </b-col>
        </b-row>

        <hr />

        <b-row class="mt-3">
          <b-col md="6"></b-col>
          <b-col md="6" class="text-sm-right">
            <button
              type="button"
              @click="checkForm(1)"
              :disabled="isDisable"
              class="btn btn-main btn-details-set ml-md-2 text-uppercase"
            >
              บันทึก
            </button>
          </b-col>
        </b-row>
      </div>
      <ModalAlert ref="modalAlert" :text="modalMessage" />
      <ModalAlertError ref="modalAlertError" :text="modalMessage" />
      <ModalLoading ref="modalLoading" :hasClose="false" />
    </b-container>
  </div>
</template>

<script>
import InputText from "@/components/inputs/InputText";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalLoading from "@/components/modal/alert/ModalLoading";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    InputText,
    ModalAlert,
    ModalAlertError,
    ModalLoading,
  },
  data() {
    return {
      isDisable: false,
      modalMessage: "",
      form: {
        email: "",
        tierId: 1,
        total: 0,
      },
    };
  },
  validations: {
    form: {
      email: { required },
      total: { required },
    },
  },
  created: async function () {
    //await this.getDatas();
    this.$isLoading = true;
  },
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        if (charCode == 46) return true;
        evt.preventDefault();
      } else {
        return true;
      }
    },
    checkForm: async function (flag) {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        return;
      }
      this.modalAlertShow = false;
      this.flag = flag;
      this.submit();
    },
    submit: async function () {
      this.isDisable = true;
      this.$refs.modalLoading.show();

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Affiliate/Profile/SettingTier`,
        null,
        this.$headers,
        this.form
      );

      this.$refs.modalLoading.hide();
      this.modalMessage = data.message;
      this.isDisable = false;
      if (data.result == 1) {
        this.$refs.modalAlert.show();
        setTimeout(() => {
            this.$refs.modalAlert.hide();
          }, 3000);
        this.$v.form.$reset();
        this.form = {
          email: "",
          tierId: 1,
          total: 0,
        };
      } else {
        this.$refs.modalAlertError.show();
      }
    },
  },
};
</script>
