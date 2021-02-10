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
          <b-col md="6">
            <InputTextArea
              class="mb-4"
              textFloat="คำบรรยาย"
              placeholder="คำบรรยาย"
              type="text"
              name="desc"
              rows="8"
              v-model="form.review.description"
              isRequired
              :isValidate="$v.form.review.description.$error"
              :v="$v.form.review.description"
            />

            <InputText
              textFloat="ลำดับการแสดง"
              placeholder="ลำดับการแสดง"
              type="text"
              name="sortOrder"
              @onKeypress="isNumber($event)"
              v-model="form.review.sortOrder"
              isRequired
              :isValidate="$v.form.review.sortOrder.$error"
              :v="$v.form.review.sortOrder"
            />
          </b-col>
          <b-col md="6">
            <UploadFile
              textFloat="ภาพหน้าปก"
              placeholder="ภาพหน้าปก"
              format="image"
              name="thumbnail"
              :fileName="form.review.mediaUrl"
              text="*กรุณาอัพโหลดไฟล์สกุล .png, .jpg ขนาด 1280 x 800 px ขนาดไม่เกิน 10 MB"
              isRequired
              v-on:onFileChange="onImageChange"
              v-on:delete="deleteImage"
              :v="$v.form.review.mediaUrl"
            />
            <div
              class="preview-box previre-ratio-5625"
              v-bind:style="{
                'background-image': 'url(' + form.review.mediaUrl + ')',
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
        <div v-if="id > 0">
          <b-row>
            <b-col sm="6">
              <h4 class="f-16 font-weight-bold mt-3">รายการรีวิว</h4>
            </b-col>
            <b-col sm="6">
              <div class="text-right">
                <router-link to="/review/details/reviews/0">
                  <b-button class="btn-main mb-3">สร้างรีวิว</b-button>
                </router-link>
              </div>
            </b-col>
          </b-row>

          <div>
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
            >
              <template v-slot:cell(updatedTime)="data">
                <span>{{
                  new Date(data.item.updatedTime) | moment($formatDate)
                }}</span>
              </template>
              <template v-slot:cell(sortOrder)="data">
                <div v-if="data.item.sortOrder == 0">-</div>
                <div v-else>{{ data.item.sortOrder }}</div>
              </template>
              <template v-slot:cell(name)="data">
                <p class="m-0 two-lines">
                  {{ data.item.name }}, {{ data.item.occupation }},
                  {{ data.item.age }} ปี
                </p>
              </template>
              <template v-slot:cell(comment)="data">
                <p class="m-0 two-lines">
                  {{ data.item.comment }}
                </p>
              </template>
              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <router-link
                    :to="{ path: '/review/details/reviews/' + data.item.id }"
                  >
                    <b-button variant="link" class="text-dark px-1 py-0">
                      <!-- <font-awesome-icon icon="pencil-alt" title="Edit" /> -->
                      แก้ไข
                    </b-button>
                  </router-link>
                </div>
              </template>
              <template v-slot:table-busy>
                <div class="text-center text-black my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong class="ml-2">Loading...</strong>
                </div>
              </template>
            </b-table>
          </div>
        </div>

        <b-row class="mt-5">
          <b-col md="6">
            <router-link to="/review">
              <b-button :disabled="isDisable" class="btn-details-set btn-cancel"
                >ย้อนกลับ</b-button
              ></router-link
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
  name: "ReviewDetails",
  components: {
    InputText,
    InputTextArea,
    UploadFile,
    ModalAlert,
    ModalAlertError,
    ModalLoading,
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
      isSuccess: false,
      imgModal: null,
      msgModal: null,
      languageList: [],
      requestDeleteUser: {
        userId: null,
      },
      modalMessage: "",
      items: [],
      imageLogoLang: "",
      languageActive: 1,
      modalAlertShow: false,
      id: this.$route.params.id,
      fields: [
        {
          key: "comment",
          label: "รายละเอียดรีวิว",
          class: "w-200",
        },
        {
          key: "name",
          label: "ผู้รีวิว",
          class: "w-100px",
        },
        {
          key: "sortOrder",
          label: "สำดับการแสดง",
          class: "w-100px",
        },
        {
          key: "updatedTime",
          label: "วันที่ทำการอัพเดท",
          class: "w-100px",
        },
        {
          key: "id",
          label: "",
          class: "w-100px",
        },
      ],
      form: null,
    };
  },
  validations: {
    form: {
      review: {
        sortOrder: { required },
        mediaUrl: { required },
        description: { required },
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
        evt.preventDefault();
      } else {
        return true;
      }
    },
    getDatas: async function () {
      this.isLoadingData = true;

      let data = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/review/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.form = data.detail;
        this.isLoadingData = false;
        this.$v.form.$reset();

        if (this.form.review.id > 0) {
          this.isEdit = true;
          this.items = data.detail.review.commentReviews;
        }

        this.$isLoading = true;
      }

      await this.$cookies.set("review_topic_id", this.id, 60 * 60 * 24 * 30);
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
        `${this.$baseUrl}/api/review/save`,
        null,
        this.$headers,
        this.form
      );
      this.modalMessage = data.message;
      this.$refs.modalLoading.hide();
      if (data.result == 1) {
        this.existId = data.detail.reviewId;
        this.modalMessage = "สำเร็จ";
        this.$refs.modalAlert.show();

        if (this.flag == 1) {
          setTimeout(() => {
            this.$router.push({
              path: `/review`,
            });
          }, 3000);
        } else {
          setTimeout(() => {
            this.$refs.modalAlert.hide();
          }, 3000);
          if (this.id > 0) {
            this.getDatas();
          } else {
            this.form.review.id = this.existId;
            this.id = this.existId;
            this.isEdit = true;
            this.$router.push({ path: `/review/details/${this.existId}` });
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

        this.form.review.mediaUrl = this.images;
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
      this.form.review.mediaUrl = null;
    },
  },
};
</script>