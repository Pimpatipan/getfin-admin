<template>
  <div>
    <b-container class="container-box">
      <b-row class="no-gutters">
        <b-col>
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            จัดการโลโก้
          </h1>
        </b-col>
      </b-row>

      <div class="bg-white p-3">
        <!-- <b-row v-if="isLoadingData">
          <b-col class="px-4 px-sm-5 py-4 vh-100">
            <img src="/img/loading.svg" class="loading" alt="loading" />
          </b-col>
        </b-row> -->

        <b-row>
          <b-col md="6">
            <UploadFile
              textFloat="โลโก้"
              placeholder="กรุณาเลือกไฟล์เพื่ออัพโหลด"
              format="image"
              name="thumbnail"
              :fileName="filename"
              text="*กรุณาอัพโหลดไฟล์สกุล .png, .jpg ขนาด 100 x 100 px ขนาดไม่เกิน 10 MB"
              isRequired
              v-on:onFileChange="onImageChange"
              v-on:delete="deleteImage"
              :v="$v.img"
            />

            <div
              class="preview-box b-contain logo-img"
              v-bind:style="{ 'background-image': 'url(' + img + ')' }"
            >
              <img
                src="/img/loading.svg"
                class="loading"
                alt="loading"
                v-if="isLoadingImage"
              />
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-5">
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
import UploadFile from "@/components/inputs/UploadFile";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalLoading from "@/components/modal/alert/ModalLoading";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
export default {
  name: "Logo",
  components: {
    UploadFile,
    ModalAlert,
    ModalAlertError,
    ModalLoading
  },
  data() {
    return {
      isLoadingData: false,
      isLoadingImage: false,
      isDisable: false,
      modalMessage: "",
      img: "",
      filename: "",
    };
  },
  validations: {
    img: { required },
  },
  created: async function () {
    await this.getDatas();
  },
  methods: {
    getDatas: async function () {
      this.isLoadingData = true;

      let resData = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/setting/getLogo`,
        null,
        this.$headers,
        null
      );
      this.img = resData.detail;
      this.filename = resData.detail;
      this.$isLoading = true;
    },
    onImageChange(img) {
      this.filename = img.name;
      this.isLoadingImage = true;

      var reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = async () => {
        this.img = reader.result;
        this.isLoadingImage = false;
      };
    },
    deleteImage() {
      this.img = null;
      this.filename = null;
    },
    checkForm: async function (flag) {
      this.$v.img.$touch();
      if (this.$v.img.$error) {
        return;
      }
      this.submit();
    },
    submit: async function () {
      this.isDisable = true;
      this.$refs.modalLoading.show();

      let body = { "base64": this.img  }

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/setting/saveLogo`,
        null,
        this.$headers,
        body
      );

      this.modalMessage = data.message;
      this.isDisable = false;
      this.$refs.modalLoading.hide();
      if (data.result == 1) {
        this.$refs.modalAlert.show();
          setTimeout(function () {
          location.reload();
        }, 3000);
      } else {
        this.modalMessage = data.detail[0];
        this.$refs.modalAlertError.show();
      }
    },
  },
};
</script>

<style scoped>
.logo-img {
  width: 100px;
  padding-bottom: 100px;
  background-size: contain;
}
</style>