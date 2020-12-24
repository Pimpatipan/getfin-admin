<template>
  <div>
    <b-container class="container-box">
      <b-row class="no-gutters">
        <b-col cols="6">
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            รายละเอียดข้อมูลเจ้าหน้าที่
          </h1>
        </b-col>
        <b-col cols="6" class="text-right">
          <span class="label-text mr-3 txt-relative">ระงับการใช้งาน</span>
          <b-form-checkbox
            switch
            size="lg"
            class="d-inline-block mb-1"
          ></b-form-checkbox>
        </b-col>
      </b-row>

      <div class="bg-white p-3">
        <b-row v-if="isLoadingData">
          <b-col class="px-4 px-sm-5 py-4 vh-100">
            <img src="/img/loading.svg" class="loading" alt="loading" />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="ชื่อเจ้าหน้าที่"
              placeholder="ชื่อเจ้าหน้าที่"
              type="text"
              name="name"
              isRequired
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="Username สำหรับเข้าสู่ระบบ"
              placeholder="Username สำหรับเข้าสู่ระบบ"
              type="text"
              name="username"
              isRequired
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="รหัสผ่าน"
              placeholder="รหัสผ่าน"
              type="text"
              name="pass"
              isRequired
              detail="รหัสผ่านต้องประกอบด้วยตัวอักษรพิมพ์ใหญ่และเล็ก พร้อมกับตัวเลข และไม่ต่ำกว่า 6 ตัวอักษร"
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="ยืนยันรหัสผ่าน"
              placeholder="ยืนยันรหัสผ่าน"
              type="text"
              name="confirmpass"
              isRequired
            />
            <span class="f-14 text-primary forget-pass-txt">ลืมรหัสผ่าน</span>
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col>
            <h4 class="f-16 font-weight-bold">
              เมนูที่มีสิทธิ์เข้าถึง
              <span class="text-secondary ml-2 font-weight-normal"
                >(12 เมนู)</span
              >
            </h4>
          </b-col>
          <b-col class="text-right">
            <b-form-checkbox size="lg" v-model="value" class="ml-2"
              >แสดงรายการที่เข้าถึง</b-form-checkbox
            >
          </b-col>
        </b-row>

        <div class="mt-3">
          <b-table
            class="table-list"
            striped
            responsive
            hover
            :items="items"
            :fields="fields"
            :busy="isBusy"
            show-empty
            empty-text="ไม่พบข้อมูล"
          ></b-table>
        </div>

        <b-row class="mt-5">
          <b-col md="6">
            <b-button
              href="/admin"
              :disabled="isDisable"
              class="btn-details-set btn-cancel"
              >ย้อนกลับ</b-button
            >
          </b-col>
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
    </b-container>
  </div>
</template>

<script>
import InputText from "@/components/inputs/InputText";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";

export default {
  components: {
    InputText,
    ModalAlert,
    ModalAlertError,
  },
  data() {
    return {
      isDisable: false,
      isLoadingData: false,
      modalMessage: "",
      items: [],
      isBusy: false,
      value: false,
      rows: 0,
      fields: [
        {
          key: "ids",
          label: "ชื่อหัวข้อ",
          class: "w-100px",
        },
        {
          key: "invoiceNo",
          label: "ชื่อเมนู",
          class: "w-100px",
        },
        {
          key: "description",
          label: "การเข้าถึง",
          class: "w-100px",
        },
      ],
    };
  },
    created: async function () {
    this.$isLoading = true;
    //await this.getDatas();
  },
};
</script>

<style scoped>
.forget-pass-txt {
  position: absolute;
  right: 15px;
  bottom: 30px;
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 600px) {
  .forget-pass-txt {
    bottom: -5px;
  }
}
</style>