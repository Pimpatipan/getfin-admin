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
          <b-col class="mb-4">
            <h1
              class="font-weight-bold header-main text-uppercase f-20 d-inline-block mr-2"
            >
              เกี่ยวกับการจัดส่ง
            </h1>
            <span class="text-secondary"
              >(สำหรับระงับการจัดส่งแบบเก็บเงินปลายทาง)</span
            >
          </b-col>
        </b-row>

        <div>
          <h1
            class="font-weight-bold header-main text-uppercase f-16 d-inline-block mr-2"
          >
            สำหรับระดับ Silver
          </h1>
        </div>

        <b-row>
          <b-col lg="6">
            <InputText
              textFloat="จำนวนปฏิเสธการรับสินค้า (ครั้ง)"
              placeholder="จำนวนปฏิเสธการรับสินค้า (ครั้ง)"
              type="text"
              name="silver"
              @onKeypress="isNumber($event)"
              isRequired
              v-model="form.silver.count"
              :isValidate="$v.form.silver.count.$error"
              :v="$v.form.silver.count"
            />
          </b-col>
          <b-col lg="6">
            <InputText
              textFloat="ระยะเวลาระงับการจัดส่งแบบเก็บเงินปลายทาง (วัน)"
              placeholder="ระยะเวลาระงับการจัดส่งแบบเก็บเงินปลายทาง (วัน)"
              type="text"
              name="gold"
              @onKeypress="isNumber($event)"
              isRequired
              v-model="form.silver.day"
              :isValidate="$v.form.silver.day.$error"
              :v="$v.form.silver.day"
            />
          </b-col>
        </b-row>

        <hr />

        <div>
          <h1
            class="font-weight-bold header-main text-uppercase f-16 d-inline-block mr-2"
          >
            สำหรับระดับ Gold
          </h1>
        </div>

        <b-row>
          <b-col lg="6">
            <InputText
              textFloat="จำนวนปฏิเสธการรับสินค้า (ครั้ง)"
              placeholder="จำนวนปฏิเสธการรับสินค้า (ครั้ง)"
              type="text"
              name="silver"
              @onKeypress="isNumber($event)"
              isRequired
              v-model="form.gold.count"
              :isValidate="$v.form.gold.count.$error"
              :v="$v.form.gold.count"
            />
          </b-col>
          <b-col lg="6">
            <InputText
              textFloat="ระยะเวลาระงับการจัดส่งแบบเก็บเงินปลายทาง (วัน)"
              placeholder="ระยะเวลาระงับการจัดส่งแบบเก็บเงินปลายทาง (วัน)"
              type="text"
              name="gold"
              @onKeypress="isNumber($event)"
              isRequired
              v-model="form.gold.day"
              :isValidate="$v.form.gold.day.$error"
              :v="$v.form.gold.day"
            />
          </b-col>
        </b-row>

        <hr />

        <div>
          <h1
            class="font-weight-bold header-main text-uppercase f-16 d-inline-block mr-2"
          >
            สำหรับระดับ Platinum
          </h1>
        </div>

        <b-row>
          <b-col lg="6">
            <InputText
              textFloat="จำนวนปฏิเสธการรับสินค้า (ครั้ง)"
              placeholder="จำนวนปฏิเสธการรับสินค้า (ครั้ง)"
              type="text"
              name="silver"
              @onKeypress="isNumber($event)"
              isRequired
              v-model="form.platinum.count"
              :isValidate="$v.form.platinum.count.$error"
              :v="$v.form.platinum.count"
            />
          </b-col>
          <b-col lg="6">
            <InputText
              textFloat="ระยะเวลาระงับการจัดส่งแบบเก็บเงินปลายทาง (วัน)"
              placeholder="ระยะเวลาระงับการจัดส่งแบบเก็บเงินปลายทาง (วัน)"
              type="text"
              name="gold"
              @onKeypress="isNumber($event)"
              isRequired
              v-model="form.platinum.day"
              :isValidate="$v.form.platinum.day.$error"
              :v="$v.form.platinum.day"
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
      form: null,
    };
  },
  validations: {
    form: {
      silver: {
        day: { required },
        count: { required },
      },
      gold: {
        day: { required },
        count: { required },
      },
      platinum: {
        day: { required },
        count: { required },
      },
    },
  },
  created: async function () {
    await this.getDatas();
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
    getDatas: async function () {
      //this.isLoadingData = true;

      let data = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/setting/COD`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.form = data.detail;
        //this.isLoadingData = false;
        this.$v.form.$reset();
        this.$isLoading = true;
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
        `${this.$baseUrl}/api/setting/COD/save`,
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
      } else {
        this.$refs.modalAlertError.show();
      }
    },
  },
};
</script>
