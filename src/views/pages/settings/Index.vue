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
              เกี่ยวกับเงินคืน
            </h1>
            <span class="text-secondary"
              >(จำนวนการคิดเปอร์เซ็นต์เงินคืนสำหรับแต่ละระดับ)</span
            >
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="ขั้นต่ำค่าเงินคืนระดับ Silver"
              placeholder="ขั้นต่ำค่าเงินคืนระดับ Silver"
              type="text"
              name="silver"
              @onKeypress="isNumber($event)"
              isRequired
              v-model="form.commissionCashback.silver"
              :isValidate="$v.form.commissionCashback.silver.$error"
              :v="$v.form.commissionCashback.silver"
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="ขั้นต่ำค่าเงินคืนระดับ Gold"
              placeholder="ขั้นต่ำค่าเงินคืนระดับ Gold"
              type="text"
              name="gold"
              @onKeypress="isNumber($event)"
              isRequired
              v-model="form.commissionCashback.gold"
              :isValidate="$v.form.commissionCashback.gold.$error"
              :v="$v.form.commissionCashback.gold"
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="ขั้นต่ำค่าเงินคืนระดับ Platinum"
              placeholder="ขั้นต่ำค่าเงินคืนระดับ Platinum"
              type="text"
              name="platinum"
              isRequired
              v-model="form.commissionCashback.platinum"
              @onKeypress="isNumber($event)"
              :isValidate="$v.form.commissionCashback.platinum.$error"
              :v="$v.form.commissionCashback.platinum"
            />
          </b-col>
        </b-row>

        <hr />

        <b-row class="no-gutters">
          <b-col class="mb-4">
            <h1
              class="font-weight-bold header-main text-uppercase f-20 d-inline-block mr-2"
            >
              เกี่ยวกับคะแนน
            </h1>
            <span class="text-secondary">(จำนวนเงินต่อคะแนนสำหรับแลก)</span>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="ขั้นต่ำค่าคะแนนระดับ Silver"
              placeholder="ขั้นต่ำค่าคะแนนระดับ Silver"
              type="text"
              name="silver"
              @onKeypress="isNumber($event)"
              isRequired
              v-model="form.commissionPoint.silver"
              :isValidate="$v.form.commissionPoint.silver.$error"
              :v="$v.form.commissionPoint.silver"
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="ขั้นต่ำค่าคะแนนระดับ Gold"
              placeholder="ขั้นต่ำค่าคะแนนระดับ Gold"
              type="text"
              name="gold"
              @onKeypress="isNumber($event)"
              isRequired
              v-model="form.commissionPoint.gold"
              :isValidate="$v.form.commissionPoint.gold.$error"
              :v="$v.form.commissionPoint.gold"
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="ขั้นต่ำค่าคะแนนระดับ Platinum"
              placeholder="ขั้นต่ำค่าคะแนนระดับ Platinum"
              type="text"
              name="platinum"
              isRequired
              v-model="form.commissionPoint.platinum"
              @onKeypress="isNumber($event)"
              :isValidate="$v.form.commissionPoint.platinum.$error"
              :v="$v.form.commissionPoint.platinum"
            />
          </b-col>
        </b-row>

        <hr />

        <b-row class="no-gutters">
          <b-col class="mb-4">
            <h1
              class="font-weight-bold header-main text-uppercase f-20 d-inline-block mr-2"
            >
              เกี่ยวกับหัก ณ ที่จ่าย
            </h1>
            <span class="text-secondary"
              >(การตั้งค่าเปอร์เซ็นต์การหัก ณ ที่จ่าย
              ตามประกาศของกรมสรรพากร)</span
            >
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="เปอร์เซ็นต์การหัก ณ ที่จ่าย"
              placeholder="เปอร์เซ็นต์การหัก ณ ที่จ่าย"
              type="text"
              name="percent"
              isRequired
              v-model="form.tax"
              @onKeypress="isNumber($event)"
              :isValidate="$v.form.tax.$error"
              :v="$v.form.tax"
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
      commissionCashback: {
        silver: { required },
        gold: { required },
        platinum: { required },
      },
      commissionPoint: {
        silver: { required },
        gold: { required },
        platinum: { required },
      },
      tax: { required },
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
        `${this.$baseUrl}/api/setting`,
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
        `${this.$baseUrl}/api/setting/save`,
        null,
        this.$headers,
        this.form
      );

      this.$refs.modalLoading.hide();
      this.modalMessage = data.message;
      this.isDisable = false;
      if (data.result == 1) {
        this.$refs.modalAlert.show();
      } else {
        this.$refs.modalAlertError.show();
      }
    },
  },
};
</script>
