<template>
  <div v-if="form">
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0 mb-3">
        <b-col sm="6" class="text-center text-sm-left">
          <h1 class="mr-sm-4 header-main text-uppercase">รายละเอียดบัญชี</h1>
          <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
        </b-col>
        <b-col sm="6" class="text-center text-sm-right">
          <span class="label-text mr-3 txt-relative">สถานะบัญชี</span>
          <b-form-checkbox
            switch
            size="lg"
            class="d-inline-block mb-1"
            @change="onChangeEnableAffiliate"
            v-model="form.user.enabled"
            :value="false"
            :unchecked-value="true"
            ><span class="ml-2 main-label">{{
              form.user.enabled ? "ใช้งานปกติ" : "ระงับบัญชี"
            }}</span></b-form-checkbox
          >
        </b-col>
      </CRow>

      <b-row class="pb-sm-4 position-relative mx-3 mx-sm-0">
        <b-col cols="12" class="bg-white py-3">
          <b-row>
            <b-col sm="2" class="text-center">
              <div>
                <div
                  v-bind:style="{
                    'background-image':
                      'url('+form.user.imageUrl+')',
                  }"
                  class="preview-box border-0 mb-2 affiliate-img"
                ></div>
                <span class="f-10 one-line"
                  >เป็นสมาชิกวันที่
                  {{
                    new Date(form.user.createdTime) | moment($formatDate)
                  }}</span
                >
              </div>
            </b-col>
            <b-col sm="5" class="m-auto">
              <div class="w-100">
                <b-row class="">
                  <b-col cols="4" class="font-weight-bold one-line"
                    >ชื่อตัวแทน :</b-col
                  >
                  <b-col class="mb-2 mb-sm-0 one-line" cols="8">
                    {{ form.user.firstname }} {{ form.user.lastname }}
                    <!-- {{ form.user.displayNameTranslation[0].name }} -->
                  </b-col>
                </b-row>

                <b-row class="">
                  <b-col cols="4" class="font-weight-bold one-line"
                    >เบอร์ติดต่อ :</b-col
                  >
                  <b-col class="mb-2 mb-sm-0 one-line" cols="8">
                    {{ form.user.telephone }}
                    <!-- {{ form.user.firstname }} {{ form.user.lastname }} -->
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col sm="5" class="m-auto">
              <b-row class="">
                <b-col cols="4" class="font-weight-bold one-line"
                  >อีเมล :</b-col
                >
                <b-col class="mb-2 mb-sm-0 one-line" cols="8">
                  {{ form.user.email }}
                  <!-- {{ form.user.firstname }} {{ form.user.lastname }} -->
                </b-col>
              </b-row>

              <b-row class="">
                <b-col cols="4" class="font-weight-bold one-line"
                  >วันเกิด :</b-col
                >
                <b-col class="mb-2 mb-sm-0 one-line" cols="8">
                  {{ form.user.birthday | moment($formatDate)}}
                  <!-- {{ form.user.firstname }} {{ form.user.lastname }} -->
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-3 no-gutters">
        <b-col class="bg-white p-3">
          <h1
            class="font-weight-bold header-main text-uppercase f-20 d-inline-block mb-3"
          >
            ข้อมูลสำหรับรับเงิน
          </h1>
          <b-row>
            <b-col md="6">
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
              />
            </b-col>
            <b-col md="6">
              <InputText
                textFloat="เลขที่บัญชี"
                placeholder="เลขที่บัญชี"
                type="text"
                name="gold"
                isRequired
                v-model="form.bankAccount.accountNo"
              />
            </b-col>
            <b-col md="6">
              <InputText
                textFloat="ชื่อบัญชี"
                placeholder="ชื่อบัญชี"
                type="text"
                name="platinum"
                isRequired
                v-model="form.bankAccount.accountName"
              />
            </b-col>
          </b-row>

          <h1
            class="font-weight-bold header-main text-uppercase f-20 d-inline-block mb-3"
          >
            เอกสารยืนยันตัวตน
          </h1>

          <b-row>
            <b-col md="6">
              <UploadFile
                textFloat="บัตรประชาชน"
                placeholder="กรุณาเลือกไฟล์เพื่ออัพโหลด"
                format="all"
                name="thumbnail"
                :fileName="form.bankAccount.idCardDocument"
                text="*กรุณาอัพโหลดไฟล์สกุล .pdf .png, .jpg ขนาด 1140 x 450 px หรือ .mp4 ขนาดไม่เกิน 50 MB"
                isRequired
                v-on:onFileChange="onImageChange"
                v-on:delete="deleteImage"
                v-model="form.bankAccount.idCardDocument"
              />
              <div
                class="preview-box b-contain"
                v-bind:style="{
                  'background-image': 'url(' + showPreviewIdCard + ')',
                }"
              >
                <img
                  src="/img/loading.svg"
                  class="loading"
                  alt="loading"
                  v-if="isLoadingImage"
                />
              </div>
            </b-col>
            <b-col md="6">
              <UploadFile
                textFloat="หน้าบัญชีธนาคาร"
                placeholder="กรุณาเลือกไฟล์เพื่ออัพโหลด"
                format="all"
                name="thumbnail"
                :fileName="form.bankAccount.bookBankDocument"
                text="*กรุณาอัพโหลดไฟล์สกุล .pdf .png, .jpg ขนาด 1140 x 450 px หรือ .mp4 ขนาดไม่เกิน 50 MB"
                isRequired
                v-on:onFileChange="onBankImageChange"
                v-on:delete="deleteBankImage"
                v-model="form.bankAccount.bookBankDocument"
              />
              <div
                class="preview-box b-contain"
                v-bind:style="{
                  'background-image': 'url(' + showPreviewBank + ')',
                }"
              >
                <img
                  src="/img/loading.svg"
                  class="loading"
                  alt="loading"
                  v-if="isLoadingImageBank"
                />
              </div>
            </b-col>
          </b-row>

          <b-row class="mt-5">
            <b-col md="6">
              <b-button
                :href="'/affiliate/details/' + id"
                :disabled="isDisable"
                class="btn-details-set btn-cancel"
                >ย้อนกลับ</b-button
              >
            </b-col>
            <b-col md="6" class="text-sm-right">
              <button
                type="button"
                @click="checkForm(0)"
                :disabled="isDisable"
                class="btn btn-main btn-details-set ml-md-2 text-uppercase"
              >
                บันทึก/ยืนยันบัญชี
              </button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>

    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
    <ModalLoading ref="modalLoading" :hasClose="false" />
  </div>
</template>

<script>
import InputText from "@/components/inputs/InputText";
import InputSelect from "@/components/inputs/InputSelect";
import UploadFile from "@/components/inputs/UploadFile";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalLoading from "@/components/modal/alert/ModalLoading";
import { required } from "vuelidate/lib/validators";

export default {
  name: "AffiliateDetails",
  components: {
    InputText,
    InputSelect,
    UploadFile,
    ModalAlert,
    ModalAlertError,
    ModalLoading,
  },
  data() {
    return {
      id: this.$route.params.id,
      form: null,
      bankLists: [],
      modalMessage: "",
      showPreviewBank: "",
      fileNameBank: "",
      showPreviewIdCard: "",
      fileNameIdCard: "",
      isLoadingImageBank: false,
      isLoadingImage: false,
      isDisable: false,
    };
  },
  created: async function () {
    await this.getData();
    await this.getBankAccounts();
    this.$isLoading = true;
  },
  validations: {
    form: {
      bankAccount: {
        accountName: { required },
        accountNo: { required },
        bankId: { required },
        idCardDocument: { required },
        bookBankDocument: { required },
      },
    },
  },
  methods: {
    getData: async function () {
      let resData = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Affiliate/Profile/` + this.id,
        null,
        this.$headers,
        null
      );
      if (resData.result == 1) {
        this.form = resData.detail.result;
        this.showPreviewBank = this.form.bankAccount.bookBankDocument;
        this.showPreviewIdCard = this.form.bankAccount.idCardDocument;
      }
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
    saveImagetoDb: async function (img) {
      var imgData = {
        base64: img,
      };

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/image/save`,
        null,
        this.$headers,
        imgData
      );

      if (data.result == 1) {
        return data.detail.url;
      }
    },
    handleChangeBankName: async function (value) {
      this.form.bankAccount.bankId = value;
      let name = this.bankLists.find((item) => item.id === value).name;
      this.form.bankAccount.bankName = name;
    },
    onImageChange(img) {
      this.isLoadingImage = true;
      this.isDisable = true;

      var reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = async () => {
        //this.mobileImages = reader.result;
        var images = await this.saveImagetoDb(reader.result);
        this.isLoadingImage = false;
        this.isDisable = false;

        this.showPreviewIdCard = images;
        this.form.bankAccount.idCardDocument = images;
        this.fileNameIdCard = images;
      };
    },
    onBankImageChange(img) {
      this.isLoadingImageBank = true;
      this.isDisable = true;

      var reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = async () => {
        //this.mobileImages = reader.result;
        var images = await this.saveImagetoDb(reader.result);
        this.isLoadingImageBank = false;
        this.isDisable = false;

        this.showPreviewBank = images;
        this.form.bankAccount.BookBankDocument = images;
        this.fileNameBank = images;
      };
    },
    deleteImage() {
      this.form.bankAccount.idCardDocument = null;
      //this.form.bankAccount = null;
      this.fileNameIdCard = "";
      this.showPreviewIdCard = null;
    },
    deleteBankImage() {
      this.form.bankAccount.bookBankDocument = null;
      //this.form.bankAccount = null;
      this.fileNameBank = "";
      this.showPreviewBank = null;
    },
    checkForm: async function (flag) {
      this.$v.form.$touch();

      if (this.$v.$error) {
        return;
      }

      this.modalAlertShow = false;
      this.submit();
    },
    submit: async function () {
      this.$refs.modalLoading.show();

      this.isDisable = true;

      let dataRequest = {
        userId: this.id,
        Enabled: true,
        bankAccount: {
          id: this.form.bankAccount.id,
          bankId: this.form.bankAccount.bankId,
          accountName: this.form.bankAccount.accountName,
          accountNo: this.form.bankAccount.accountNo,
          IDCardDocument: this.form.bankAccount.idCardDocument,
          IDCardDocumentFile: null,
          BookBankDocument: this.form.bankAccount.bookBankDocument,
          BookBankDocumentFile: null,
        },
      };

      let data = await this.$callApi(
        "patch",
        `${this.$baseUrl}/api/Affiliate/Bankaccount/Update`,
        null,
        this.$headers,
        dataRequest
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
    onChangeEnableAffiliate: async function (value) {
      let body = {
        Enabled: value,
        UserId: this.id,
      };

      let resData = await this.$callApi(
        "patch",
        `${this.$baseUrl}/api/Affiliate/Profile/Enbled`,
        null,
        this.$headers,
        body
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        //his.getData();
      } else {
        this.$refs.modalAlertError.show();
      }
    },
  },
};
</script>

<style scoped>
.affiliate-img {
  width: 75%;
  padding-bottom: 75%;
  margin: auto;
}
</style>