<template>
  <div v-if="form">
    <b-container class="container-box">
      <b-row class="no-gutters">
        <b-col>
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            สร้างรีวิว
          </h1>
        </b-col>
      </b-row>

      <div class="bg-white p-3">
        <b-row>
          <b-col>
            <InputText
              textFloat="ชื่อผู้รีวิว"
              placeholder="ชื่อผู้รีวิว"
              type="text"
              name="name"
              v-model="form.name"
              isRequired
              :isValidate="$v.form.name.$error"
              :v="$v.form.name"
            />
          </b-col>
          <b-col>
            <InputText
              textFloat="อาชีพ"
              placeholder="อาชีพ"
              type="text"
              name="job"
              v-model="form.occupation"
              isRequired
              :isValidate="$v.form.occupation.$error"
              :v="$v.form.occupation"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <InputText
              textFloat="อายุ"
              placeholder="อายุ"
              type="text"
              name="age"
              v-model="form.age"
              isRequired
              :isValidate="$v.form.age.$error"
              :v="$v.form.age"
              @onKeypress="isNumber($event)"
            />
          </b-col>
          <b-col>
            <InputText
              textFloat="ลำดับการแสดง"
              placeholder="ลำดับการแสดง"
              type="text"
              name="sortOrder"
              @onKeypress="isNumber($event)"
              v-model="form.sortOrder"
              isRequired
              :isValidate="$v.form.sortOrder.$error"
              :v="$v.form.sortOrder"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <InputTextArea
              class="mb-4"
              textFloat="คำบรรยาย"
              placeholder="คำบรรยาย"
              type="text"
              name="desc"
              rows="8"
              v-model="form.comment"
              isRequired
              :isValidate="$v.form.comment.$error"
              :v="$v.form.comment"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <UploadFile
              textFloat="ภาพหน้าปก"
              placeholder="ภาพหน้าปก"
              format="image"
              name="thumbnail"
              :fileName="form.imageUrl"
              text="*กรุณาอัพโหลดไฟล์สกุล .png, .jpg ขนาด 1280 x 800 px ขนาดไม่เกิน 10 MB"
              isRequired
              v-on:onFileChange="onImageChange"
              v-on:delete="deleteImage"
              :v="$v.form.imageUrl"
            />
            <div
              class="preview-box previre-ratio-5625"
              v-bind:style="{
                'background-image': 'url(' + form.imageUrl + ')',
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
        </b-row>

        <b-row class="mt-5">
          <b-col md="6">
            <b-button
              :href="'/review/details/' + form.reviewHomePageId"
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
              บันทึก
            </button>
            <button
              type="button"
              @click="checkForm(1)"
              :disabled="isDisable"
              class="btn btn-main btn-details-set ml-md-2 text-uppercase"
            >
              บันทึกและออก
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
import InputTextArea from "@/components/inputs/InputTextArea";
import { required } from "vuelidate/lib/validators";
import UploadFile from "@/components/inputs/UploadFile";
import Vue from "vue";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import VueCookies from "vue-cookies";
import ModalLoading from "@/components/modal/alert/ModalLoading";

export default {
  name: "CommentDetails",
  components: {
    InputText,
    InputTextArea,
    UploadFile,
    ModalAlert,
    ModalAlertError,
    ModalLoading
  },
  data() {
    return {
      isEdit: false,
      isBusy: false,
      existId: "",
      showPreview: "",
      isLoadingData: false,
      isLoadingImage: false,
      isDisable: false,
      modalMessage: "",
      id: this.$route.params.id,
      form: null,
    };
  },
  validations: {
    form: {
      sortOrder: { required },
      imageUrl: { required },
      comment: { required },
      name: { required },
      occupation: { required },
      age: { required },
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
        evt.preventDefault();
      } else {
        return true;
      }
    },
    getDatas: async function () {
      this.isLoadingData = true;

      let data = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/review/comment/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.form = data.detail;
        this.isLoadingData = false;
        this.$v.form.$reset();

        if (this.form.id > 0) {
          this.isEdit = true;
        }

        this.$isLoading = true;
      }
    },
    checkForm: async function (flag) {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        return;
      }
      this.flag = flag;
      this.submit();
    },
    submit: async function () {
      this.isDisable = true;
      this.$refs.modalLoading.show();

      if(this.form.reviewHomePageId == 0) this.form.reviewHomePageId = VueCookies.get("review_topic_id");

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/review/comment/save`,
        null,
        this.$headers,
        this.form
      );
      this.$refs.modalLoading.hide();
      this.modalMessage = data.message;
      if (data.result == 1) {
        this.existId = data.detail.reviewId;
        this.modalMessage = "สำเร็จ";
        this.$refs.modalAlert.show();

        var id = this.form.reviewHomePageId;

        if (this.flag == 1) {
          setTimeout(function () {
            window.location.href = `/review/details/${id}`;
          }, 3000);
        } else {
          if (this.id > 0) {
            this.getDatas();
          } else {
            this.form.id = this.existId;
            this.id = this.existId;
            this.isEdit = true;
            this.$router.push({
              path: `/review/details/reviews/${this.existId}`,
            });
            this.getDatas();
          }
        }
      } else {
        this.$refs.modalAlertError.show();
      }

      this.isDisable = false;
    },
    onImageChange(img) {
      this.isLoadingImage = true;
      this.isDisable = true;

      var reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = async () => {
        //this.images = reader.result;
        this.images = await this.saveImagetoDb(reader.result);
        this.isLoadingImage = false;
        this.isDisable = false;

        this.form.imageUrl = this.images;
      };
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
    deleteImage() {
      this.form.imageUrl = null;
    },
  },
};
</script>