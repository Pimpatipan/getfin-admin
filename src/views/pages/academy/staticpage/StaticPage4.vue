<template>
  <div v-if="form">
    <b-container class="container-box">
      <b-row class="no-gutters">
        <b-col>
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            เกี่ยวกับเรา
          </h1>
        </b-col>
      </b-row>

      <div class="bg-white p-3">
        <b-row class="pl-1">
          <b-col cols="6">
            <!-- <div class="panel d-flex align-items-md-center">
              <b-form-checkbox size="lg" id="highlight">เป็นไฮไลท์</b-form-checkbox>
            </div> -->
            <div class="panel">
              <b-form-checkbox
                size="lg"
                id="sameLang"
                class="mt-0 mt-sm-3"
                @change="useSameLanguage"
                v-model="form.staticPage.isSameLanguage"
                >ใช้เหมือนกันทุกภาษา
              </b-form-checkbox>
            </div>
          </b-col>
          <b-col class="text-right">
            <div class="panel">
              <b-button
                type="button"
                class="btn btn-language"
                v-for="(language, index) in languageList"
                v-bind:key="index"
                v-bind:class="[languageActive == language.id ? 'active' : '']"
                @click="changeLanguage(language.id, index)"
                :disabled="form.staticPage.isSameLanguage ? true : false"
              >
                <span class="text-uppercase">{{ language.nation }}</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <div
              v-for="(item, index) in form.staticPage.translationList"
              v-bind:key="index"
            >
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none',
                ]"
              >
                <b-row class="mt-3">
                  <b-col>
                    <InputText
                      textFloat="ชื่อ"
                      placeholder="ชื่อ"
                      type="text"
                      name="name"
                      :img="imageLogoLang"
                      v-model="item.name"
                      isRequired
                      :isValidate="
                        $v.form.staticPage.translationList.$each.$iter[index]
                          .name.$error
                      "
                      :v="
                        $v.form.staticPage.translationList.$each.$iter[index]
                          .name
                      "
                    />

                    <TextEditor
                      v-if="item.description != null"
                      textFloat="คำอธิบาย"
                      :rows="8"
                      :value="item.description"
                      :name="'description_' + item.languageId"
                      :img="imageLogoLang"
                      placeholder="Type something..."
                      isRequired
                      :v="
                        $v.form.staticPage.translationList.$each.$iter[index]
                          .description
                      "
                      @onDataChange="(val) => (item.description = val)"
                    />
                  </b-col>
                </b-row>
              </div>
            </div>

            <b-row class="mt-2">
              <b-col md="6">
                <UploadFile
                  textFloat="ภาพหน้าปก"
                  placeholder="กรุณาเลือกไฟล์เพื่ออัพโหลด"
                  format="image"
                  name="thumbnail"
                  text="*กรุณาอัพโหลดไฟล์สกุล .png, .jpg ขนาด 500 x 500 px ขนาดไม่เกิน 10 MB"
                  isRequired
                  v-on:onFileChange="onImageChange"
                  v-on:delete="deleteImage"
                  :fileName="form.staticPage.imageUrl"
                />
              </b-col>
              <b-col md="6">
                <div
                  class="preview-box b-contain"
                  v-bind:style="{
                    'background-image': 'url(' + form.staticPage.imageUrl + ')',
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
import InputText from "@/components/inputs/InputText";
import UploadFile from "@/components/inputs/UploadFile";
import TextEditor from "@/components/inputs/TextEditor";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalLoading from "@/components/modal/alert/ModalLoading";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
export default {
  name: "AboutUs",
  components: {
    InputText,
    UploadFile,
    TextEditor,
    ModalAlert,
    ModalAlertError,
    ModalLoading
  },
  data() {
    return {
      languageList: [],
      imageLogoLang: "",
      languageActive: 1,
      isEdit: false,
      isDisable: false,
      imgModal: null,
      modalMessage: "",
      msgModal: null,
      isSuccess: false,
      urlkey: this.$route.params.urlkey,
      id: 14,
      modalAlertShow: false,
      form: null,
      isLoadingImage: false,
    };
  },
  validations: {
    form: {
      staticPage: {
        urlKey: { required },
        translationList: {
          $each: {
            name: { required },
            description: { required },
          },
        },
      },
    },
  },
  created: async function () {
    this.$isLoading = false;
    //await this.checkAcademy();
    await this.getDatas();
  },
  methods: {
    checkAcademy() {
      if (this.urlkey == "Academy-01") this.id = 11;
      else if (this.urlkey == "Academy-02") this.id = 12;
      else if (this.urlkey == "Academy-03") this.id = 13;
      else this.id = 14;
    },
    getDatas: async function () {
      let languages = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/language `,
        null,
        this.$headers,
        null
      );

      if (languages.result == 1) {
        this.languageList = languages.detail;
        this.changeLanguage(1, 0);
      }

      let data = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/staticPage/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.form = data.detail;
        this.$v.form.$reset();

        if (this.form.staticPage.id > 0) {
          this.isEdit = true;
        }

        if (this.form.staticPage.isSameLanguage) {
          this.imageLogoLang = "";
        } else {
          var index = this.languageList
            .map(function (x) {
              return x.id;
            })
            .indexOf(this.languageActive);
          this.imageLogoLang = this.languageList[index].imageUrl;
        }

        this.$isLoading = true;
      }
    },
    changeLanguage(id, index) {
      this.languageActive = id;
      this.imageLogoLang = this.languageList[index].imageUrl;
    },
    useSameLanguage: async function () {
      Vue.nextTick(() => {
        if (this.form.staticPage.isSameLanguage) {
          this.imageLogoLang = "";
          this.form.staticPage.mainLanguageId = this.languageActive;
          let data = this.form.staticPage.translationList.filter(
            (val) => val.languageId == this.form.staticPage.mainLanguageId
          );

          if (this.id == 0) {
            if (data.length == 1) {
              data = data[0];
              for (
                let index = 0;
                index < this.form.staticPage.translationList.length;
                index++
              ) {
                this.form.staticPage.translationList[index].name = data.name;
                this.form.staticPage.translationList[index].description =
                  data.description;
              }
            }
          }
        } else {
          var index = this.languageList
            .map(function (x) {
              return x.id;
            })
            .indexOf(this.languageActive);
          this.imageLogoLang = this.languageList[index].imageUrl;

          let data = this.form.staticPage.translationList.filter(
            (val) => val.languageId != this.form.staticPage.mainLanguageId
          );

          if (this.id == 0) {
            if (data.length == 1) {
              data = data[0];
              data.description = "";
              data.name = "";
            }
          }
        }
      });
    },
    checkValidateTranslationList: async function () {
      let isError = false;
      this.languageList.forEach((element, index) => {
        if (!isError) {
          if (
            this.$v.form.staticPage.translationList.$each.$iter[index].$error
          ) {
            this.languageActive = this.$v.form.staticPage.translationList.$model[
              index
            ].languageId;

            this.imageLogoLang = this.languageList[index].imageUrl;

            isError = true;
          }
        }
      });
    },
    checkForm: async function (flag) {
      if (this.form.staticPage.isSameLanguage) {
        await this.useSameLanguage();
      }
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        await this.checkValidateTranslationList();
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
        `${this.$baseUrl}/api/staticPage/save`,
        null,
        this.$headers,
        this.form
      );

      //this.modalAlertShow = true;
      this.$refs.modalLoading.hide();
      this.modalMessage = data.message;
      this.isDisable = false;
      if (data.result == 1) {
        this.modalMessage = "สำเร็จ";
        this.$refs.modalAlert.show();
        this.getDatas();
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    onImageChange(img) {
      this.isLoadingImage = true;
      this.isDisable = true;

      var reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = async () => {
        this.images = await this.saveImagetoDb(reader.result);
        this.isLoadingImage = false;
        this.isDisable = false;

        this.form.staticPage.imageUrl = this.images;
        this.form.imageBase64 = reader.result;
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
    deleteImage(value) {
      this.form.staticPage.imageUrl = "";
      this.form.imageBase64 = "";
    },
  },
};
</script>
