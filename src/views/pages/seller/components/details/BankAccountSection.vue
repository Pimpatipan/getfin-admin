<template>
  <div>
    <form class="form-box">
      <b-row class="no-gutters bg-white px-4 pb-4">
        <b-col>
          <b-row class="my-3">
            <b-col class="d-flex align-items-md-center main-label"
              >บัญชีธนาคาร</b-col
            >
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4 my-auto"
                classInputName="col-lg-6"
                textFloat="ชื่อบัญชี"
                placeholder="ชื่อบัญชี"
                type="text"
                name="accountName"
                v-model="form.bankAccount.accountName"
                isRequired
                :isValidate="$v.form.bankAccount.accountName.$error"
                :v="$v.form.bankAccount.accountName"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4 my-auto"
                classInputName="col-lg-6"
                textFloat="เลขที่บัญชี"
                placeholder="เลขที่บัญชี"
                type="text"
                name="accountNo"
                v-model="form.bankAccount.accountNo"
                isRequired
                :isValidate="$v.form.bankAccount.accountNo.$error"
                :v="$v.form.bankAccount.accountNo"
              />
            </b-col>
          </b-row>

          <b-row class="">
            <b-col>
              <InputSelect
                class=""
                classLabelName="col-lg-4 my-auto"
                classInputName="col-lg-6"
                title="ธนาคาร"
                name="bank"
                valueField="id"
                textField="name"
                v-bind:options="bankLists"
                v-model="form.bankAccount.bankId"
                @onDataChange="handleChangeBankName"
                isRequired
                :isValidate="$v.form.bankAccount.bankId.$error"
                :v="$v.form.bankAccount.bankId"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <UploadFile
                classLabelName="col-lg-4 my-auto"
                classInputName="col-lg-6"
                textFloat="เอกสารทางธนาคาร"
                placeholder="เอกสารทางธนาคาร"
                format="all"
                :fileName="form.bankAccount.bankInformationDocument"
                text="รับรองสกุลไฟล์ .jpg, .png และ .pdf เท่านั้น (สูงสุด 50 MB)"
                v-model="form.bankAccount.bankInformationDocumentFile"
                v-on:onFileChange="onFileChange"
                v-on:delete="deleteFile"
                name="bankDocument"
                isRequired
                :isValidate="$v.form.bankAccount.bankInformationDocument.$error"
                :v="$v.form.bankAccount.bankInformationDocument"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col class="d-flex justify-content-center mt-5">
              <button
                :disabled="isDisable"
                @click="checkForm(0)"
                type="button"
                class="btn btn-main btn-details-set ml-md-2 text-uppercase"
              >
                บันทึก
              </button>
            </b-col>
          </b-row>
          <b-row class="my-4">
            <b-col class="d-flex justify-content-end"
              ><div class="w-100"><hr /></div
            ></b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <label class="font-weight-bold"
                >กรุณาบอกเหตุผลในการปฏิเสธข้อมูล</label
              >
            </b-col>
            <b-col cols="6" class="text-right">
              <label class="font-weight-bold">{{ new Date(dataLog.updatedTime) | moment($formatDate) }}</label>
            </b-col>
            <div class="px-3">
              <p>{{ dataLog.warningLog.note }}</p>
            </div>
          </b-row>
          <b-row class="">
            <b-col class="d-flex justify-content-center"
              ><b-button
                variant="info"
                :disabled="isReject"
                @click="onchangeApproveOrReject(false, 2)"
                class="btn btn-details-set btn-cancel mr-1"
                >ปฏิเสธ</b-button
              ><b-button
                :disabled="isDisable"
                @click="onchangeApproveOrReject(true, 2)"
                class="btn btn-main btn-details-set"
                >ยืนยัน</b-button
              ></b-col
            >
          </b-row>
        </b-col>
      </b-row>
    </form>

    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
  </div>
</template>

<script>
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import InputText from "../../../seller/components/inputs/InputText";
import InputSelect from "../../../seller/components/inputs/InputSelect";
import UploadFile from "../../../seller/components/inputs/UploadFile";
import { required } from "vuelidate/lib/validators";
import axios from "axios";
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
    enable: {
      required: false,
      type: Boolean,
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
    UploadFile,
    InputSelect,
  },
  data() {
    return {
      id: "",
      modalMessage: "",
      activeItem: "seller-account",
      isDisable: false,
      languageList: [],
      bankLists: [],
      form: null,
      noteAdmin: "",
    };
  },
  validations: {
    form: {
      bankAccount: {
        accountName: { required },
        accountNo: { required },
        bankId: { required },
        bankInformationDocument: { required },
      },
    },
  },
  created: async function () {
    this.form = this.dataObject;
    await this.getBankAccounts();
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
    getBankAccounts: async function () {
      let banklists = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/bank/list`,
        null,
        this.$headers,
        null
      );
      if (banklists.result == 1) {
        let list = [{ id: null, name: `กรุณาเลือกธนาคาร` }];
        let datalist = banklists.detail.dataList;
        this.bankLists = list.concat(datalist);

        if (this.form.bankAccount.bankId == 0) {
          this.form.bankAccount.bankId = null;
        }
      }
    },
    deleteFile() {
      this.form.bankAccount.bankInformationDocumentFile = "";
      this.form.bankAccount.bankInformationDocument = "";
    },
    onFileChange(file) {
      this.form.bankAccount.bankInformationDocument = file.name;
      this.dataObject.bankInformationDocument = file.name;
      this.isDisable = false;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.bankAccount.bankInformationDocumentFile = reader.result;
      };
    },
    handleChangeBankName: async function (value) {
      this.form.bankAccount.bankId = value;
      let name = this.bankLists.find((item) => item.id === value).name;
      this.form.bankAccount.bankName = name;
    },
    checkForm: async function (flag) {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        return;
      }
      //this.modalAlertShow = false;
      this.isDisable = true;
      this.flag = flag;
      this.submit();
    },
    submit: async function () {
      let body = {
        Id: this.form.bankAccount.sellerId,
        Enabled: this.enable,
        IsUpdateBankAccount: true,
        bankAccount: {
          id: this.form.bankAccount.id,
          bankId: this.form.bankAccount.bankId,
          accountName: this.form.bankAccount.accountName,
          accountNo: this.form.bankAccount.accountNo,
          bankInformationDocument: this.form.bankAccount
            .bankInformationDocument,
          bankInformationDocumentFile: this.form.bankAccount
            .bankInformationDocumentFile,
        },
      };

      let data = await this.$callApi(
        "patch",
        `${this.$baseUrl}/api/Seller/Detail`,
        null,
        this.$headers,
        body
      );

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