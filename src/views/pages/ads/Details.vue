<template>
  <div>
    <b-container class="container-box">
      <b-row class="no-gutters">
        <b-col>
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            ข้อมูลโฆษณา
          </h1>
        </b-col>
      </b-row>

      <div class="bg-white p-3" v-if="$isLoading">
        <b-row class="pl-1">
          <b-col cols="6">
            <div class="panel d-flex align-items-md-center">
              <!-- <b-form-checkbox size="lg" id="highlight"
                >เป็นไฮไลท์</b-form-checkbox
              > -->
              <b-form-checkbox
                size="lg"
                id="sameLang"
                class="mt-0 mt-sm-3"
                @change="useSameLanguage"
                v-model="form.isSameLanguage"
                >ใช้เหมือนกันทุกภาษา
              </b-form-checkbox>
            </div>
          </b-col>
          <b-col cols="6" class="text-right">
            <div class="panel">
              <b-button
                type="button"
                class="btn btn-language"
                v-for="(language, index) in languageList"
                v-bind:key="index"
                v-bind:class="[languageActive == language.id ? 'active' : '']"
                @click="changeLanguage(language.id, index)"
                :disabled="form.isSameLanguage ? true : false"
              >
                <span class="text-uppercase">{{ language.nation }}</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col md="6">
            <div
              v-for="(item, index) in form.bannerTranslationList"
              v-bind:key="index"
            >
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none',
                ]"
              >
                <InputText
                  textFloat="ชื่อโฆษณา"
                  placeholder="ชื่อโฆษณา"
                  type="text"
                  name="name"
                  v-model="form.banner.name"
                  @onKeyup="setAlttagByLang(form.banner.name, index)"
                  isRequired
                  :isValidate="$v.form.banner.name.$error"
                  :v="$v.form.banner.name"
                />
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div
              v-for="(item, index) in form.bannerTranslationList"
              v-bind:key="index"
            >
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none',
                ]"
              >
                <InputText
                  textFloat="Alt tag"
                  placeholder="Alt tag"
                  type="text"
                  name="name"
                  :img="imageLogoLang"
                  v-model="item.altTag"
                  @onKeyup="setAlttagByLang(item.altTag, index)"
                  isRequired
                  :isValidate="
                    $v.form.bannerTranslationList.$each.$iter[index].altTag
                      .$error
                  "
                  :v="$v.form.bannerTranslationList.$each.$iter[index].altTag"
                />
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="ลำดับการแสดง"
              placeholder="ลำดับการแสดง"
              type="text"
              name="sortorder"
              @onKeypress="isNumber($event)"
              v-model="form.banner.sortOrder"
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="ลิ้งค์ไปยังภายนอก"
              placeholder="ลิ้งค์ไปยังภายนอก"
              type="text"
              name="linkurl"
              v-model="form.banner.linkUrl"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <UploadFile
              textFloat="ภาพโฆษณาสำหรับคอมพิวเตอร์"
              placeholder="กรุณาเลือกไฟล์เพื่ออัพโหลด"
              format="all"
              name="thumbnail"
              :fileName="fileNameComputer"
              text="*กรุณาอัพโหลดไฟล์สกุล .png, .jpg ขนาด 1140 x 450 px หรือ .mp4 ขนาดไม่เกิน 50 MB"
              isRequired
              v-on:onFileChange="onImageChange"
              v-on:delete="deleteImage"
              :v="$v.fileNameComputer"
            />
            <div
              class="preview-box b-contain"
              v-if="coverImgType == 1"
              v-bind:style="{ 'background-image': 'url(' + showPreview + ')' }"
            >
              <img
                src="/img/loading.svg"
                class="loading"
                alt="loading"
                v-if="isLoadingImage"
              />
            </div>
            <div
              class="preview-box position-relative p-0 embed-responsive embed-responsive-16by9 banner-video"
              v-else
            >
              <video ref="videoRef" class="w-100 video-box" controls>
                <source :src="showPreview" type="video/mp4" />
              </video>
            </div>
          </b-col>
          <b-col md="6">
            <UploadFile
              textFloat="ภาพโฆษณาสำหรับมือถือ"
              placeholder="กรุณาเลือกไฟล์เพื่ออัพโหลด"
              format="all"
              name="thumbnail"
              :fileName="fileNameMobile"
              text="*กรุณาอัพโหลดไฟล์สกุล .png, .jpg ขนาด 1140 x 450 px หรือ .mp4 ขนาดไม่เกิน 50 MB"
              isRequired
              v-on:onFileChange="onMobileImageChange"
              v-on:delete="deleteMobileImage"
              :v="$v.fileNameMobile"
            />
            <div
              class="preview-box b-contain"
              v-if="mobileCoverImgType == 1"
              v-bind:style="{
                'background-image': 'url(' + mobileShowPreview + ')',
              }"
            >
              <img
                src="/img/loading.svg"
                class="loading"
                alt="loading"
                v-if="isLoadingMobileImage"
              />
            </div>
            <div
              class="preview-box position-relative p-0 embed-responsive embed-responsive-16by9 banner-video"
              v-else
            >
              <video ref="videoMobileRef" class="w-100 video-box" controls>
                <source :src="mobileShowPreview" type="video/mp4" />
              </video>
            </div>
          </b-col>
        </b-row>

        <!-- <b-row>
          <b-col md="6">
     
          </b-col>
          <b-col md="6">
       
          </b-col>
        </b-row> -->

        <b-row class="mt-4">
          <b-col>
            <label class="font-weight-bold main-label">
              สถานะการแสดงผล
              <span class="text-danger">*</span>
            </label>
            <div>
              <b-form-checkbox
                switch
                v-model="form.banner.display"
                class="radio-active"
                size="lg"
              >
                <span class="ml-2 main-label">{{
                  form.banner.display ? "ใช้งาน" : "ไม่ใช้งาน"
                }}</span>
              </b-form-checkbox>
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col md="6">
            <b-button
              v-if="isEdit"
              class="btn btn-danger btn-details-set mr-md-2"
              :disabled="isDisable"
              @click="openModalDelete(form.banner.name)"
              >ลบ</b-button
            >
            <b-button
              href="/ads"
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
    </b-container>
    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
    <ModalAlertConfirm
      msg="ยืนยันการลบ ?"
      :text="modalMessage"
      btnConfirm="ลบ"
      colorBtnConfirm="danger"
      btnCancel="ยกเลิก"
      ref="isModalAlertConfirm"
      @confirm="btnDelete"
    />
    <ModalLoading ref="modalLoading" :hasClose="false" />
  </div>
</template>

<script>
import InputText from "@/components/inputs/InputText";
import UploadFile from "@/components/inputs/UploadFile";
import { required } from "vuelidate/lib/validators";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalAlertConfirm from "@/components/modal/alert/ModalAlertConfirm";
import ModalLoading from "@/components/modal/alert/ModalLoading";
import Vue from "vue";

export default {
  name: "BannerDetails",
  components: {
    InputText,
    UploadFile,
    ModalAlert,
    ModalAlertError,
    ModalAlertConfirm,
    ModalLoading
  },
  data() {
    return {
      id: this.$route.params.id,
      isLoadingImage: false,
      isLoadingMobileImage: false,
      coverImgType: 1,
      showVideo: "",
      showPreview: "",
      mobileCoverImgType: 1,
      mobileShowVideo: "",
      mobileShowPreview: "",
      isEdit: false,
      images: "",
      mobileImages: "",
      modalMessage: "",
      isDisable: false,
      fileNameComputer: "",
      fileNameMobile: "",
      languageList: [],
      languageActive: 1,
      imageLogoLang: "",
      form: {
        banner: {
          id: 0,
          name: null,
          linkUrl: null,
          imageUrl: "",
          mobileImageUrl: "",
          isVideo: false,
          isMobileVideo: false,
          display: false,
          sortOrder: 0,
          mainLanguageId: 0,
        },
        imageBase64: null,
        mobileImageBase64: null,
        isSameLanguage: false,
        bannerTranslationList: [
          {
            bannerId: 0,
            languageId: 1,
            altTag: null,
          },
          {
            bannerId: 0,
            languageId: 2,
            altTag: null,
          },
        ],
      },
    };
  },
  validations: {
    fileNameComputer: { required },
    fileNameMobile: { required },
    form: {
      banner: {
        name: { required },
        // imageUrl: { required },
      },
      bannerTranslationList: {
        $each: {
          altTag: { required },
        },
      },
    },
  },
  created: async function() {
    await this.getDatas();
  },
  methods: {
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    changeSameLang: function(value) {
      this.form.isSameLanguage = value;
    },
    setAlttag: function(value) {
      this.languageList.forEach((element, index) => {
        this.form.bannerTranslationList[index].altTag = value.replace(
          / /g,
          "-"
        );
      });
    },
    setAlttagByLang: function(value, index) {
      this.form.bannerTranslationList[index].altTag = value.replace(/ /g, "-");
    },
    handleCloseModal: function() {
      if (this.flag == 1) {
        window.location.href = "/ads";
      } else {
        if (this.id > 0) {
          this.getDatas();
        } else {
          this.form.banner.id = this.existId;
          this.id = this.existId;
          this.isEdit = true;
          this.$router.push({ path: `/ads/details/${this.existId}` });
        }
      }
    },
    getDatas: async function() {
      this.$isLoading  = false;

      let languages = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/language`,
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
        `${this.$baseUrl}/api/bannerAds/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.form = data.detail;
        
        //this.$v.form.$reset();

        if (this.form.banner.id > 0) {
          this.isEdit = true;
          this.form.imageBase64 = "";
          this.showPreview = this.form.banner.imageUrl;
          this.fileNameComputer = this.form.banner.imageUrl;
          this.form.mobileImageBase64 = "";
          this.mobileShowPreview = this.form.banner.mobileImageUrl;
          this.fileNameMobile = this.form.banner.mobileImageUrl;

          let vdo = this.form.banner.imageUrl.split(".").pop();
          if (vdo == "mp4") {
            this.coverImgType = 2;
            var vid = this.$refs.videoRef;
            if (vid != undefined) {
              vid.load();
            }
          }
        }

        this.$isLoading  = true;
      }

      if (this.form.isSameLanguage) {
        this.imageLogoLang = "";
      } else {
        var index = this.languageList
          .map(function(x) {
            return x.id;
          })
          .indexOf(this.languageActive);
        this.imageLogoLang = this.languageList[index].imageUrl;
      }
    },
    changeLanguage(id, index) {
      this.languageActive = id;
      this.imageLogoLang = this.languageList[index].imageUrl;
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

        this.showPreview = this.images;
        this.form.banner.imageUrl = this.images;
        this.fileNameComputer = this.images;

        if (img.type == "video/mp4") {
          this.coverImgType = 2;
          this.form.banner.isVideo = true;
          var vid = this.$refs.videoRef;
          if (vid != undefined) {
            vid.load();
          }
        } else {
          this.coverImgType = 1;
          this.form.banner.isVideo = false;
        }
      };
    },
    saveImagetoDb: async function(img) {
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
      this.form.banner.imageUrl = null;
      this.form.imageBase64 = null;
      this.fileNameComputer = "";
      this.showPreview = null;

      if (this.coverImgType == 2) {
        var vid = this.$refs.videoRef;
        vid.load();
        this.coverImgType = 1;
      }
    },
    onMobileImageChange(img) {
      this.isLoadingMobileImage = true;
      this.isDisable = true;

      var reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = async () => {
        //this.mobileImages = reader.result;
        this.mobileImages = await this.saveImagetoDb(reader.result);
        this.isLoadingMobileImage = false;
        this.isDisable = false;

        this.mobileShowPreview = this.mobileImages;
        this.form.banner.mobileImageUrl = this.mobileImages;
        this.fileNameMobile = this.mobileImages;

        if (img.type == "video/mp4") {
          this.mobileCoverImgType = 2;
          this.form.banner.isMobileVideo = true;
          var vid = this.$refs.videoMobileRef;
          if (vid != undefined) {
            vid.load();
          }
        } else {
          this.mobileCoverImgType = 1;
          this.form.banner.isMobileVideo = false;
        }
      };
    },
    deleteMobileImage() {
      this.form.banner.mobileImageUrl = null;
      this.form.mobileImageBase64 = null;
      this.fileNameMobile = "";
      this.mobileShowPreview = null;

      if (this.mobileCoverImgType == 2) {
        var vid = this.$refs.videoMobileRef;
        vid.load();
        this.mobileCoverImgType = 1;
      }
    },
    checkForm: async function(flag) {
      if (this.form.isSameLanguage) {
        await this.useSameLanguage();
      }
      this.$v.$touch();
      if (this.$v.$error) {
        await this.checkValidateTranslationList();
        return;
      }
      this.modalAlertShow = false;
      this.flag = flag;
      this.submit();
    },
    submit: async function() {
      this.isDisable = true;
      this.$refs.modalLoading.show();

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/bannerAds/save`,
        null,
        this.$headers,
        this.form
      );

      this.modalMessage = data.message;
      this.isDisable = false;
      this.$refs.modalLoading.hide();
      if (data.result == 1) {
        this.existId = data.detail;
        this.modalMessage = "สำเร็จ";
        this.$refs.modalAlert.show();

        if (this.flag == 1) {
          setTimeout(function() {
            window.location.href = "/ads";
          }, 3000);
        } else {
          if (this.id > 0) {
            this.getDatas();
          } else {
            this.form.banner.id = this.existId;
            this.id = this.existId;
            this.isEdit = true;
            this.$router.push({ path: `/ads/details/${this.existId}` });
          }
        }
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    useSameLanguage: async function() {
      Vue.nextTick(() => {
        if (this.form.isSameLanguage) {
          this.imageLogoLang = "";
          this.form.banner.mainLanguageId = this.languageActive;
          let data = this.form.bannerTranslationList.filter(
            val => val.languageId == this.form.banner.mainLanguageId
          );

          //if (this.id == 0) {
            if (data.length == 1) {
              data = data[0];
              for (
                let index = 0;
                index < this.form.bannerTranslationList.length;
                index++
              ) {
                this.form.bannerTranslationList[index].altTag = data.altTag;
              }
            }
          //}
        } else {
          var index = this.languageList
            .map(function(x) {
              return x.id;
            })
            .indexOf(this.languageActive);
          this.imageLogoLang = this.languageList[index].imageUrl;

          let data = this.form.bannerTranslationList.filter(
            val => val.languageId != this.form.banner.mainLanguageId
          );
          if (this.id == 0) {
            if (data.length == 1) {
              data = data[0];
              data.altTag = "";
            }
          }
        }
      });
    },
    checkValidateTranslationList: async function() {
      let isError = false;
      this.languageList.forEach((element, index) => {
        if (!isError) {
          if (this.$v.form.bannerTranslationList.$each.$iter[index].$error) {
            this.languageActive = this.$v.form.bannerTranslationList.$model[
              index
            ].languageId;

            this.imageLogoLang = this.languageList[index].imageUrl;

            isError = true;
          }
        }
      });
    },
    btnDelete: async function() {
      this.$refs.isModalAlertConfirm.hide();

      let resData = await this.$callApi(
        "delete",
        `${this.$baseUrl}/api/bannerAds/remove/${this.id}`,
        null,
        this.$headers,
        null
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        this.$refs.modalAlert.show();
        setTimeout(function() {
          window.location.href = "/ads";
        }, 3000);
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    openModalDelete(name) {
      this.modalMessage = "คุณต้องการลบ " + name + " ใช่หรือไม่?";
      this.$refs.isModalAlertConfirm.show();
    },
    deleteData: async function() {
      if (confirm("Are you sure you want to delete this data?") == true) {
        let data = await this.$callApi(
          "delete",
          `${this.$baseUrl}/api/bannerAds/remove/${this.id}`,
          null,
          this.$headers,
          null
        );

        if (data.result == 1) {
          window.location.href = "/ads";
        }
      }
    },
  },
};
</script>

<style scoped>
.panel {
  font-size: 17px;
  color: #16274a;
}
.b-contain {
  padding-bottom: 42.9%;
}
.banner-video::before {
  padding-top: 42.9%;
}
</style>
