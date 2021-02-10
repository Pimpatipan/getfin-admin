<template>
  <div class="w-100">
    <b-container class="p-0">
      <b-row class="bg-white p-3 no-gutters mt-2">
        <b-col>
          <b-row class="my-3">
            <b-col>
              <div class="main-label">เลขที่คำสั่งซื้อ</div>
            </b-col>
          </b-row>
          <form class="">
            <b-row class="">
              <b-col>
                <InputText
                  classLabelName="col-lg-4"
                  classInputName="col-lg-6"
                  textFloat="คำนำหน้าคำสั่งซื้อ"
                  placeholder="คำนำหน้าคำสั่งซื้อ"
                  type="text"
                  name="invoiceprefix"
                  v-model="form"
                  :disabled="true"
                />
              </b-col>
            </b-row>
          </form>

          <b-row class="my-4">
            <b-col class="d-flex justify-content-end"
              ><div class="w-100"><hr /></div
            ></b-col>
          </b-row>
          <b-row class="bg-white">
            <b-col cols="12">
              <label class="font-weight-bold"
                >กรุณาบอกเหตุผลในการปฏิเสธข้อมูล</label
              >
            </b-col>
            <div class="px-3">
              <p>{{ dataLog.warningLog.note }}</p>
            </div>
          </b-row>
          <b-row class="my-3">
            <b-col class="d-flex justify-content-center"
              ><b-button
                variant="info"
                :disabled="isReject"
                @click="onchangeApproveOrReject(false, 6)"
                class="btn btn-details-set btn-cancel mr-1"
                >ปฏิเสธ</b-button
              ><b-button
                :disabled="isDisable"
                @click="onchangeApproveOrReject(true, 6)"
                class="btn btn-main btn-details-set"
                >ยืนยัน</b-button
              ></b-col
            >
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import InputText from "../../../seller/components/inputs/InputText";
export default {
  name: "user",
  props: {
    dataObject: {
      required: false,
      type: String,
    },
    dataLog: {
      required: false,
      type: Object || Array,
    },
    isReject: {
      required: false,
      type: Boolean
    },
  },
  components: {
    ModalAlert,
    ModalAlertError,
    InputText,
  },
  data() {
    return {
      id: "",
      modalMessage: "",
      activeItem: "seller-account",
      isDisable: false,
      languageList: [],
      form: null,
      noteAdmin: "",
    };
  },
  created: async function () {
    this.form = this.dataObject;
  },
  watch: {
    dataObject: function () {
      this.form = this.dataObject;
    },
    note: function () {
      this.noteAdmin = this.note;
    },
  },
  methods: {
    onchangeApproveOrReject: async function (status, index) {
      this.$emit("onchangeApproveOrReject", status, index);
    },
  },
};
</script>