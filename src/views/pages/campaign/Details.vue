<template>
  <div v-if="form">
    <b-container class="container-box">
      <b-row class="no-gutters">
        <b-col>
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            ข้อมูลแคมเปญ
          </h1>
        </b-col>
      </b-row>

      <div class="bg-white p-3" v-if="$isLoading">
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
                v-model="form.isSameLanguage"
                >ใช้เหมือนกันทุกภาษา
              </b-form-checkbox>
            </div>
          </b-col>
          <b-col cols="6" class="text-right">
            <!-- <div class="panel">
              <b-form-checkbox size="lg" id="sameLang">ใช้เหมือนกันทุกภาษา</b-form-checkbox>
            </div> -->
            <b-button
              type="button"
              class="btn btn-language"
              v-for="(language, index) in languageList"
              v-bind:key="index"
              v-bind:class="[languageActive == language.id ? 'active' : '']"
              @click="changeLanguage(language.id, index)"
            >
              <span class="text-uppercase">{{ language.nation }}</span>
            </b-button>
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col>
            <div v-for="(item, index) in form.translations" v-bind:key="index">
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none'
                ]"
              >
                <InputText
                  textFloat="ชื่อแคมเปญ"
                  placeholder="ชื่อแคมเปญ"
                  type="text"
                  name="name"
                  :img="imageLogoLang"
                  v-model="item.name"
                  @onKeyup="setAlttag(item.name)"
                  isRequired
                />
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <div v-for="(item, index) in form.translations" v-bind:key="index">
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none'
                ]"
              >
                <InputTextArea
                  class="mb-4"
                  rows="8"
                  textFloat="คำบรรยาย"
                  placeholder="คำบรรยาย"
                  type="text"
                  name="desc"
                  :img="imageLogoLang"
                  v-model="item.shortDescription"
                  isRequired
                />
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <label class="label-text">
              วันแสดงแคมเปญ
              <span class="text-danger">*</span>
            </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy HH:mm"
              value-zone="local"
              type="datetime"
              v-model="form.startDateCampaign"
            ></datetime>
            <p class="text-danger" v-if="error">
              วันแสดงผลโปรโมชั่นนี้ต้องมาก่อนวันที่หมดเขตของโปรโมชั่นนี้
            </p>
          </b-col>
          <b-col md="6">
            <label class="label-text"> </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy HH:mm"
              value-zone="local"
              type="datetime"
              v-model="form.endDateCampaign"
            ></datetime>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col md="6">
            <label class="label-text">
              วันที่เข้าร่วมแคมเปญ
              <span class="text-danger">*</span>
            </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy HH:mm"
              value-zone="local"
              type="datetime"
              v-model="form.startDateJoinCampaign"
            ></datetime>
            <p class="text-danger" v-if="error">
              วันแสดงผลโปรโมชั่นนี้ต้องมาก่อนวันที่หมดเขตของโปรโมชั่นนี้
            </p>
          </b-col>
          <b-col md="6">
            <label class="label-text"> </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy HH:mm"
              value-zone="local"
              type="datetime"
              v-model="form.endDateJoinCampaign"
            ></datetime>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col md="6">
            <InputText
              textFloat="URL Key"
              placeholder="URL Key"
              type="text"
              name="urlKey"
              isRequired
              v-model="form.urlKey"
              @onKeyup="onUrlkeyChange"
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="ส่วนลดขั้นต่ำ (%)"
              placeholder="กรุณาระบุเป็นเปอร์เซน"
              type="text"
              name="sortorder"
              isRequired
              @onKeypress="isNumber($event)"
              v-model="form.discount"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="จำนวนสินค้าในคลัง (ขั้นต่ำ)"
              placeholder="จำนวนสินค้าในคลัง (ขั้นต่ำ)"
              type="text"
              name="sortorder"
              isRequired
              @onKeypress="isNumber($event)"
              v-model="form.minQuantity"
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="จำนวนชิ้นเข้าร่วมเพื่อเข้าร่วม (ขั้นต่ำ)"
              placeholder="จำนวนชิ้นเข้าร่วมเพื่อเข้าร่วม (ขั้นต่ำ)"
              type="text"
              name="sortorder"
              @onKeypress="isNumber($event)"
              v-model="form.minStock"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="ยอดขายขั้นต่ำ (365 วันที่ผ่านมา)"
              placeholder="ยอดขายขั้นต่ำ (365 วันที่ผ่านมา)"
              type="text"
              name="sortorder"
              @onKeypress="isNumber($event)"
              v-model="form.minSales"
            />
          </b-col>
          <b-col md="6" class="my-auto">
            <button
              type="button"
              class="btn btn-main text-uppercase w-auto"
              @click="showCategoryModal"
            >
              เลือกหมวดหมู่ที่เข้าร่วม
            </button>
            <div class="d-inline-block">
              <span class="ml-2">สามารถเข้าร่วมได้ {{ count }} หมวดหมู่</span>
              <!-- <span class="text-underline ml-2 text-primary">ดูทั้งหมด</span> -->
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col md="6">
            <UploadFile
              textFloat="ภาพหน้าปก"
              placeholder="กรุณาเลือกไฟล์เพื่ออัพโหลด"
              format="image"
              name="thumbnail"
              text="*กรุณาอัพโหลดไฟล์สกุล .png, .jpg ขนาด 1140 x 450 px ขนาดไม่เกิน 10 MB"
              isRequired
              v-on:onFileChange="onImageChange"
              v-on:delete="deleteImage"
              :fileName="form.banner.imageUrl"
            />
          </b-col>
          <b-col md="6">
            <div
              class="preview-box b-contain"
              v-if="coverImgType == 1"
              v-bind:style="{
                'background-image': 'url(' + form.banner.imageUrl + ')'
              }"
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
            <div v-for="(item, index) in form.translations" v-bind:key="index">
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none'
                ]"
              >
                <b-row class="mt-3">
                  <b-col>
                    <TextEditor
                      v-if="$isLoading"
                      textFloat="คำอธิบาย"
                      :rows="8"
                      :value="item.description"
                      :name="'description_' + item.languageId"
                      :img="imageLogoLang"
                      placeholder="Type something..."
                      isRequired
                      @onDataChange="val => (item.description = val)"
                    />
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>

      <div class="bg-white p-3 mt-2">
        <SEOSection
          :data="form.translations"
          :v="$v.form.translations"
          :isValidate="$v.form.translations"
          :langActive="languageActive"
          :img="imageLogoLang"
        />

        <b-row class="mt-5">
          <b-col md="6">
            <b-button
              v-if="isEdit"
              class="btn btn-danger btn-details-set mr-md-2"
              :disabled="isDisable"
              @click="openModalDelete(form.translations[0].name)"
              >ลบ</b-button
            >
            <b-button
              href="/campaign"
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
      <ModalAlertConfirm
        msg="ยืนยันการลบ ?"
        :text="modalMessage"
        btnConfirm="ลบ"
        colorBtnConfirm="danger"
        btnCancel="ยกเลิก"
        ref="isModalAlertConfirm"
        @confirm="btnDelete"
      />

      <b-modal
        id="selectCategoryModal"
        ref="selectCategoryModal"
        hide-header
        hide-footer
        centered
        size="lg"
      >
        <div class="modal-header border-0 p-0">
          <div>
            <h4 class="font-weight-bold">เลือกหมวดหมู่เข้าร่วมแคมเปญ</h4>
            <p class="main-label">หมวดหมู่ {{ catLevel }}</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            class="close"
            @click="$bvModal.hide('selectCategoryModal')"
          >
            ×
          </button>
        </div>
        <div class="">
          <b-row>
            <b-col lg="10">
              <b-form-input
                placeholder="ค้นหาชื่อหมวดหมู่"
                @keyup="handleSearch"
              ></b-form-input>
            </b-col>
            <b-col lg="2">
              <b-form-checkbox
                id="checkboxs-3"
                class="p-0 ml-4 mt-2 mt-lg-0"
                v-model="isInCat"
              >
                แสดงที่เลือก
              </b-form-checkbox></b-col
            >
          </b-row>

          {{ form.categories }}

          <b-row class="ml-2 mt-3">
            <b-col
              cols="6"
              sm="4"
              class="mb-3"
              v-for="(item, index) in catLists"
              :key="index"
            >
              <b-form-checkbox
                :id="'checkbox-' + index"
                v-model="form.categories[catIndex]"
                :value="item.id"
                :unchecked-value="item.id"
                :class="[
                  'p-0',
                  {
                    'd-none':
                      form.categories[catIndex].indexOf(item.id) == -1 &&
                      isInCat
                  }
                ]"
                @change="val => onChangeCategory(val, item, index)"
              >
                {{ item.name }}
              </b-form-checkbox>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col md="6">
              <b-button
                @click="$bvModal.hide('selectCategoryModal')"
                class="btn-details-set btn-cancel"
                >ปิด</b-button
              >
              <button
                type="button"
                class="btn btn-main btn-details-set ml-md-2 text-uppercase"
                v-if="catLevel > 1"
                @click="goBackSubCategoryAnotherLevel"
              >
                ย้อนกลับ
              </button>
            </b-col>
            <b-col md="6" class="text-sm-right">
              <button
                type="button"
                class="btn btn-main btn-details-set ml-md-2 text-uppercase"
                @click="getSubCategoryAnotherLevel"
                :disabled="disableIsLast"
              >
                ต่อไป
              </button>
              <button
                type="button"
                class="btn btn-main btn-details-set ml-md-2 text-uppercase"
                @click="$bvModal.hide('selectCategoryModal')"
              >
                บันทึก
              </button>
            </b-col>
          </b-row>
        </div>
      </b-modal>
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
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalAlertConfirm from "@/components/modal/alert/ModalAlertConfirm";
import InputSelect from "@/components/inputs/InputSelect";
import * as moment from "moment/moment";

export default {
  name: "CampaignDetails",
  components: {
    InputText,
    InputTextArea,
    UploadFile,
    TextEditor,
    SEOSection,
    ModalAlert,
    ModalAlertError,
    ModalAlertConfirm,
    InputSelect
  },
  data() {
    return {
      isLoadingImage: false,
      min: false,
      discount: false,
      coverImgType: 1,
      showVideo: "",
      existId: "",
      showPreview: "",
      imageLogoLang: "",
      languageActive: 1,
      modalMessage: "",
      error: false,
      isBusy: false,
      isEdit: false,
      isDisable: false,
      isInCat: false,
      noNext: false,
      filename: "",
      id: this.$route.params.id,
      languageList: [],
      items: [],
      displayOnlySelected: false,
      selected: [],
      selectedAll: [],
      catLists: [],
      allItems: [],
      tempArray: [],
      tempArrayFilterd: [],
      rows: 0,
      catLevel: 0,
      catIndex: 0,
      countCat: 0,
      form: null,
      request: {
        ParentId: [0],
        Search: ""
      },
      disableIsLast: true
    };
  },
  validations: {
    form: {
      translations: {
        $each: {
          name: { required },
          shortDescription: { required },
          description: { required },
          metaTitle: { required },
          metaKeyword: { required },
          metaDescription: { required }
        }
      }
    }
  },
  computed: {
    count: function() {
      var catCount = 0;
      for (var i = 0; i < this.form.categories.length - 1; i++) {
        catCount += this.form.categories[i].length;
      }
      return catCount;
    }
  },
  created: async function() {
    this.$isLoading = true;
    await this.getDatas();
  },
  methods: {
    moment: function() {
      return moment();
    },
    pagination(Page) {
      this.filter.pageNo = Page;
      this.getList();
    },
    hanndleChangePerpage(value) {
      this.filter.pageNo = 1;
      this.filter.perPage = value;
      this.getList();
    },
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
        this.form.translations[index].metaTitle = value;
        this.form.translations[index].metaKeyword = value;
        this.form.translations[index].metaDescription = value;
        this.form.translations[index].altTag = value.replace(/ /g, "-");
      });
      this.form.urlKey = value.replace(/ /g, "-").replace(/\//g, "");
    },
    onUrlkeyChange: function(value) {
      this.form.urlKey = this.form.urlKey.replace(/ /g, "-").replace(/\//g, "");
    },
    setAlttagByLang: function(value, index) {
      this.form.translations[index].altTag = value.replace(/ /g, "-");
    },
    onChangeShowSelected(value) {
      this.filter.pageNo = 1;
      if (value == true) this.filter.productId = this.selected;
      else this.filter.productId = [];

      this.getList();
    },
    getDatas: async function() {
      this.$isLoading = false;

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
        `${this.$baseUrl}/api/Campaign/detail/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.form = data.detail;

        if (this.id == 0) {
          this.form.startDateCampaign = new Date();
          this.form.endDateCampaign = new Date();
          this.form.startDateJoinCampaign = new Date();
          this.form.endDateJoinCampaign = new Date();
        }

        this.$isLoading = true;
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
        this.form.banner.imageBase64 = reader.result;

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
        base64: img
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
      this.form.imageUrl = "";
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
        this.$nextTick(() => {
          let domRect = document
            .querySelector(".input-custom.error")
            .getBoundingClientRect();
          window.scrollTo(
            domRect.left + document.documentElement.scrollLeft,
            domRect.top + document.documentElement.scrollTop - 150
          );
        });

        await this.checkValidatetranslations();
        return;
      }

      // if (
      //   new Date(this.form.startDateDisplay) <
      //   new Date(this.form.endDateDisplay)
      // ) {
      //   this.error = true;
      //   return;
      // }

      this.modalAlertShow = false;
      this.flag = flag;
      this.submit();
    },
    submit: async function() {
      this.isDisable = true;

      let data = await this.$callApi(
        "patch",
        `${this.$baseUrl}/api/Campaign/save`,
        null,
        this.$headers,
        this.form
      );

      this.modalMessage = data.message;
      this.isDisable = false;
      if (data.result == 1) {
        this.existId = data.detail;
        this.$refs.modalAlert.show();

        if (this.flag == 1) {
          setTimeout(function() {
            window.location.href = "/Campaign";
          }, 3000);
        } else {
          if (this.id > 0) {
            this.getDatas();
          } else {
            this.form.id = this.existId;
            this.id = this.existId;
            this.isEdit = true;
            this.$router.push({ path: `/Campaign/details/${this.existId}` });
          }
        }
      } else {
        this.modalMessage = data.detail[0] || data.message;
        this.$refs.modalAlertError.show();
      }
    },
    btnDelete: async function() {
      this.$refs.isModalAlertConfirm.hide();

      let resData = await this.$callApi(
        "delete",
        `${this.$baseUrl}/api/news/delete/${this.id}`,
        null,
        this.$headers,
        null
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        this.$refs.modalAlert.show();
        setTimeout(function() {
          window.location.href = "/news";
        }, 3000);
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    openModalDelete(name) {
      this.modalMessage = "คุณต้องการลบ " + name + " ใช่หรือไม่?";
      this.$refs.isModalAlertConfirm.show();
    },
    useSameLanguage: async function() {
      Vue.nextTick(() => {
        if (this.form.isSameLanguage) {
          this.imageLogoLang = "";

          this.form.mainLanguageId = this.languageActive;
          let data = this.form.translations.filter(
            val => val.languageId == this.form.mainLanguageId
          );

          //if (this.id == 0) {
          if (data.length == 1) {
            data = data[0];
            for (
              let index = 0;
              index < this.form.translations.length;
              index++
            ) {
              this.form.translations[index].name = data.name;
              this.form.translations[index].shortDescription =
                data.shortDescription;
              this.form.translations[index].description = data.description;
              this.form.translations[index].metaTitle = data.metaTitle;
              this.form.translations[index].metaKeyword = data.metaKeyword;
              this.form.translations[index].metaDescription =
                data.metaDescription;
            }
          }
        }
        //}
        else {
          var index = this.languageList
            .map(function(x) {
              return x.id;
            })
            .indexOf(this.languageActive);
          this.imageLogoLang = this.languageList[index].imageUrl;

          let data = this.form.translations.filter(
            val => val.languageId != this.form.mainLanguageId
          );
          if (this.id == 0) {
            if (data.length == 1) {
              data = data[0];
              data.name = "";
              data.shortDescription = "";
              data.description = "";
              data.metaTitle = "";
              data.metaKeyword = "";
              data.metaDescription = "";
            }
          }
        }
      });
    },
    checkValidatetranslations: async function() {
      let isError = false;
      this.languageList.forEach((element, index) => {
        if (!isError) {
          if (this.$v.form.translations.$each.$iter[index].$error) {
            this.languageActive = this.$v.form.translations.$model[
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
    showCategoryModal: async function() {
      this.catLevel = 1;
      this.catIndex = 0;
      this.request.ParentId = [0];
      await this.getSubCategoryList();
      this.$refs.selectCategoryModal.show();
    },
    getSubCategoryList: async function() {
      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/category/SubCategory/List`,
        null,
        this.$headers,
        this.request
      );

      if (data.result == 1) {
        this.catLists = data.detail;

        if (this.form.categories[this.catIndex].length == 0) {
          this.disableIsLast = true;
        } else {
          this.disableIsLast = false;
        }
      }
    },
    getSubCategoryAnotherLevel: async function() {
      this.request.ParentId = this.form.categories[this.catIndex];
      this.catLevel++;
      this.catIndex++;
      await this.getSubCategoryList();
      await this.filterArray();
    },
    goBackSubCategoryAnotherLevel: async function() {
      this.catLevel--;

      if (this.catLevel == 1) this.request.ParentId = [0];
      else this.request.ParentId = this.form.categories[this.catIndex - 2];

      this.catIndex--;

      await this.getSubCategoryList();
      await this.filterArray();
    },
    onChangeCategory(value, data, index) {
      if (value == null) {
        for (var i = 0; i < this.form.categories.length; i++) {
          for (var j = 0; j < data.childId.length; j++) {
            if (this.form.categories[i].indexOf(data.childId[j]) != -1) {
              var index = this.form.categories[i].indexOf(data.childId[j]);
              this.form.categories[i].splice(index, 1);
            }
          }
        }
      }

      this.addTempArray(value, data, index);
    },
    filterArray() {
      this.tempArrayFilterd = [];
      for (var i = 0; i < this.tempArray.length; i++) {
        for (var j = 0; j < this.form.categories[this.catIndex].length; j++) {
          if (this.form.categories[this.catIndex][j] == this.tempArray[i].id) {
            this.tempArrayFilterd.push(this.tempArray[i]);
          }
        }
      }
    },
    addTempArray(value, data, index) {
      Vue.nextTick(() => {
        if (this.form.categories[this.catIndex].indexOf(value) != -1) {
          this.tempArray.push(data);
          this.tempArrayFilterd.push(data);
        } else {
          var index = this.tempArrayFilterd
            .map(x => {
              return x.id;
            })
            .indexOf(data.id);

          this.tempArray.splice(index, 1);
          this.tempArrayFilterd.splice(index, 1);
        }
        this.checkDisableBtn();
      });
    },
    checkDisableBtn() {
      this.disableIsLast = true;
      for (var i = 0; i < this.tempArrayFilterd.length; i++) {
        if (!this.tempArrayFilterd[i].isLast) {
          this.disableIsLast = false;
        }
      }
    },
    handleSearch(e) {
      if (e.keyCode === 13) {
        this.request.Search = e.target.value;
        this.getSubCategoryList();
      }
    }
  }
};
</script>

<style scoped>
.panel-article-input-serach {
  background-color: #fff;
  border: 1px solid #d8dbe0 !important;
  color: #4a4a4a;
  width: 100%;
  margin-right: 10px;
}
.image {
  width: 100%;
  padding-top: 42.9%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.image {
  width: 100%;
  padding-top: 42.9%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.panel {
  font-size: 17px;
  color: #16274a;
}
.border-product {
  border-top: 10px solid #f8f8f8;
}
.b-contain {
  padding-bottom: 42.9%;
}
.banner-video::before {
  padding-top: 42.9%;
}
</style>
