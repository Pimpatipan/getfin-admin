<template>
  <div>
    <b-container class="container-box">
      <b-row class="no-gutters">
        <b-col>
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            ข้อมูลข่าวสารโปรโมชั่น
          </h1>
        </b-col>
      </b-row>

      <div class="bg-white p-3">
        <b-row class="pl-1">
          <b-col cols="6">
            <div class="panel d-flex align-items-md-center">
              <b-form-checkbox size="lg" id="highlight"
                >เป็นไฮไลท์</b-form-checkbox
              >
            </div>
          </b-col>
          <b-col cols="6" class="text-right">
            <div class="panel">
              <b-form-checkbox size="lg" id="sameLang"
                >ใช้เหมือนกันทุกภาษา</b-form-checkbox
              >
            </div>
            <!-- <b-button
              type="button"
              class="btn btn-language"
              v-for="(language, index) in languageList"
              v-bind:key="index"
              v-bind:class="[ languageActive == language.id ? 'active' : '' ]"
              @click="changeLanguage(language.id,index)"
              :disabled="form.product.isSameLanguage ? true : false "
            >
              <span class="text-uppercase">{{language.nation}}</span>
            </b-button>-->
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col>
            <InputText
              textFloat="ชื่อข่าวสารโปรโมชั่น"
              placeholder="ชื่อข่าวสารโปรโมชั่น"
              type="text"
              name="name"
              isRequired
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
              isRequired
              rows="8"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="ลำดับการแสดง"
              placeholder="ลำดับการแสดง"
              type="text"
              name="name"
              isRequired
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="URL Key"
              placeholder="URL Key"
              type="text"
              name="name"
              isRequired
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <label class="label-text">
              วันแสดงผลโปรโมชั่นนี้
              <span class="text-danger">*</span>
            </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy"
              value-zone="local"
            ></datetime>
            <p class="text-danger" v-if="error">
              วันแสดงผลโปรโมชั่นนี้ต้องมาก่อนวันที่หมดเขตของโปรโมชั่นนี้
            </p>
          </b-col>
          <b-col md="6">
            <label class="label-text">
              วันที่หมดเขตของโปรโมชั่นนี้
              <span class="text-danger">*</span>
            </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy"
              value-zone="local"
            ></datetime>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <UploadFile
              textFloat="ภาพหน้าปก"
              placeholder="กรุณาเลือกไฟล์เพื่ออัพโหลด"
              format="all"
              name="thumbnail"
              text="*กรุณาอัพโหลดไฟล์สกุล .png, .jpg ขนาด 1140 x 450 px ขนาดไม่เกิน 10 MB"
              isRequired
              v-on:onFileChange="onImageChange"
              v-on:delete="deleteImage"
            />
          </b-col>
          <b-col md="6">
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
        </b-row>

        <b-row>
          <b-col>
            <TextEditor
              textFloat="รายละเอียด"
              :rows="8"
              :name="'description'"
              placeholder="กรอกข้อมูลที่นี่..."
              isRequired
            />
          </b-col>
        </b-row>

        <div class="mt-3">
          <h4 class="f-16 font-weight-bold">
            เพิ่มสินค้าแนะนำ
            <span>(เลือก 23 รายการ)</span>
          </h4>

          <!-- <div class="bg-gray-box p-3 d-flex">
            <div class="d-flex">
              <b-input-group class="panel-input-serach search-pro mr-1">
                <b-form-input class="input-serach" placeholder="ชื่อโปรโมชั่น"></b-form-input>
                <b-input-group-prepend>
                  <span class="icon-input m-auto pr-2">
                    <font-awesome-icon icon="search" title="View" />
                  </span>
                </b-input-group-prepend>
              </b-input-group>
              <b-form-select v-model="selected" :options="options" class="search-pro mr-1"></b-form-select>
              <b-form-select v-model="selected" :options="options" class="search-pro"></b-form-select>
            </div>

            <div class="text-right"><b-form-checkbox size="lg" id="selectedPro">แสดงเฉพาะที่เลือก</b-form-checkbox></div>
          </div> -->
          <b-table
            striped
            responsive
            hover
            :items="items"
            :fields="fields"
            :busy="isBusy"
            show-empty
            empty-text="ไม่พบข้อมูล"
            class="table-list"
          ></b-table>
        </div>

        <SEOSection />

        <b-row class="mt-5">
          <b-col md="6">
            <b-button
              v-if="isEdit"
              class="btn btn-danger btn-details-set mr-md-2"
              :disabled="isDisable"
              @click="deleteData()"
              >][</b-button
            >
            <b-button
              href="/promotion"
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
              บันทึกและออก
            </button>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import InputText from "@/components/inputs/InputText";
import InputTextArea from "@/components/inputs/InputTextArea";
import UploadFile from "@/components/inputs/UploadFile";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
import TextEditor from "@/components/inputs/TextEditor";
import SEOSection from "@/components/inputs/SEOSection";

export default {
  name: "BannerDetails",
  components: {
    InputText,
    InputTextArea,
    UploadFile,
    TextEditor,
    SEOSection,
  },
  data() {
    return {
      isLoadingImage: false,
      coverImgType: 1,
      showVideo: "",
      showPreview: "",
      isEdit: false,
      isDisable: false,
      fields: [
        {
          key: "questionTime",
          label: "ภาพประกอบ",
          class: "w-100px",
        },
        {
          key: "questionTime1",
          label: "รายละเอียดสินค้า",
          class: "w-100px",
        },
        {
          key: "question",
          label: "รหัสสินค้า",
          class: "w-200",
        },
        {
          key: "questionBy",
          label: "รายละเอียดพาร์ทเนอร์",
          class: "w-100px",
        },
        {
          key: "isVerify",
          label: "ราคาขาย",
          class: "w-100px",
        },
        {
          key: "isVerifyๅ",
          label: "คลัง",
          class: "w-100px",
        },
        {
          key: "id",
          label: "สถานะ",
        },
      ],
      items: [],
      isBusy: false,
      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
    };
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
        window.location.href = "/banner";
      } else {
        if (this.id > 0) {
          this.getDatas();
        } else {
          this.form.banner.id = this.existId;
          this.id = this.existId;
          this.isEdit = true;
          this.$router.push({ path: `/banner/details/${this.existId}` });
        }
      }
    },
    getDatas: async function() {
      this.isLoadingData = true;

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
        `${this.$baseUrl}/api/banner/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.form = data.detail;
        this.isLoadingData = false;
        this.$v.form.$reset();

        if (this.form.banner.id > 0) {
          this.isEdit = true;
          this.form.imageBase64 = "";

          this.showPreview = this.form.banner.imageUrl;

          let vdo = this.form.banner.imageUrl.split(".").pop();
          if (vdo == "mp4") {
            this.coverImgType = 2;
            var vid = this.$refs.videoRef;
            if (vid != undefined) {
              vid.load();
            }
          }
        }
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
        this.images = await this.saveImagetoDb(reader.result);
        this.isLoadingImage = false;
        this.isDisable = false;

        this.showPreview = this.images;
        this.form.banner.imageUrl = this.images;

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
    deleteImage(value) {
      this.form.banner.imageUrl = null;
      this.form.imageBase64 = null;
      this.showPreview = null;

      if (this.coverImgType == 2) {
        var vid = this.$refs.videoRef;
        vid.load();
        this.coverImgType = 1;
      }
    },
    checkForm: async function(flag) {
      if (this.form.isSameLanguage) {
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
    submit: async function() {
      this.isDisable = true;

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/banner/save`,
        null,
        this.$headers,
        this.form
      );

      this.modalAlertShow = true;
      if (data.result == 1) {
        this.imgModal = "/img/icon-check-green.png";
        this.msgModal = data.message;
        this.isSuccess = true;
        this.existId = data.detail.id;
      } else {
        this.imgModal = "/img/icon-unsuccess.png";
        this.msgModal = data.detail[0];
        this.isSuccess = false;
      }

      this.isDisable = false;
    },
    useSameLanguage: async function() {
      Vue.nextTick(() => {
        if (this.form.isSameLanguage) {
          this.imageLogoLang = "";
          this.form.banner.mainLanguageId = this.languageActive;
          let data = this.form.bannerTranslationList.filter(
            val => val.languageId == this.form.banner.mainLanguageId
          );

          if (this.id == 0) {
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
          }
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
    deleteData: async function() {
      if (confirm("Are you sure you want to delete this data?") == true) {
        let data = await this.$callApi(
          "delete",
          `${this.$baseUrl}/api/banner/remove/${this.id}`,
          null,
          this.$headers,
          null
        );

        if (data.result == 1) {
          window.location.href = "/banner";
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
.search-pro {
  border: 0;
  border-radius: 0;
}
</style>
