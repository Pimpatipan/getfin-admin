<template>
  <div v-if="form">
    <form class="form-box">
      <b-row class="no-gutters bg-white px-4 pb-4">
        <b-col>
          <b-row class="my-3">
            <b-col class="d-flex align-items-md-center main-label"
              >บัญชีผู้ขาย</b-col
            >
          </b-row>
          <b-row class="my-2">
            <b-col cols="6" lg="4" class="main-label">
              <span>เลขที่ผู้ขาย :</span>
            </b-col>
            <b-col cols="6" lg="6">
              <span>{{ form.seller.id }}</span>
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4"
                classInputName="col-lg-6"
                textFloat="ชื่อ"
                placeholder="ชื่อ"
                type="text"
                name="sellerName"
                v-model="form.firstname"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4"
                classInputName="col-lg-6"
                textFloat="นามสกุล "
                placeholder="นามสกุล "
                type="text"
                name="sellerName"
                v-model="form.lastname"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4"
                classInputName="col-lg-6"
                textFloat="อีเมล"
                placeholder="อีเมล"
                type="text"
                name="sellerEmail"
                v-model="form.email"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4"
                classInputName="col-lg-6"
                textFloat="เบอร์โทรศัพท์"
                placeholder="เบอร์โทรศัพท์"
                type="text"
                name="sellerPhoneNumber"
                v-model="form.telephone"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4"
                classInputName="col-lg-6"
                textFloat="ชื่อร้านค้า (TH)"
                placeholder="ชื่อร้านค้า (TH)"
                type="text"
                name="sellerDisplayName"
                v-model="form.displayNameTranslation[0].name"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4"
                classInputName="col-lg-6"
                textFloat="ชื่อร้านค้า (EN)"
                placeholder="ชื่อร้านค้า (EN)"
                type="text"
                name="sellerDisplayName"
                v-model="form.displayNameTranslation[1].name"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="my-4">
            <b-col class="d-flex justify-content-end"
              ><div class="w-100"><hr /></div
            ></b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <label class="font-weight-bold"
                >กรุณาบอกเหตุผลในการปฏิเสธข้อมูล</label
              >
            </b-col>
            <div class="px-3"><p>{{ dataLog.warningLog.note }}</p></div>
          </b-row>
          <b-row class="">
            <b-col class="d-flex justify-content-center"
              ><b-button
                variant="info"
                :disabled="isReject"
                @click="onchangeApproveOrReject(false, 0)"
                class="btn btn-details-set btn-cancel mr-1"
                >ปฏิเสธ</b-button
              ><b-button
                :disabled="isDisable"
                @click="onchangeApproveOrReject(true, 0)"
                class="btn btn-main btn-details-set"
                >ยืนยัน</b-button
              ></b-col
            >
          </b-row>
        </b-col>
      </b-row>
    </form>
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
      type: Object,
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