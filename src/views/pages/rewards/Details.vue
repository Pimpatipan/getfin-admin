<template>
  <div>
    <b-container class="container-box">
      <b-row class="no-gutters">
        <b-col>
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            ข้อมูลวอชเชอร์
          </h1>
        </b-col>
      </b-row>

      <div class="bg-white p-3" v-if="$isLoading">
        <b-row class="pl-1">
          <b-col cols="6">
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
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col>
            <div
              v-for="(item, index) in form.translationList"
              v-bind:key="index"
            >
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none',
                ]"
              >
                <InputText
                  textFloat="ชื่อวอชเชอร์"
                  placeholder="ชื่อวอชเชอร์"
                  type="text"
                  name="name"
                  :img="imageLogoLang"
                  v-model="item.name"
                  isRequired
                  @onKeyup="setUrlkey(item.name, index)"
                  :isValidate="
                    $v.form.translationList.$each.$iter[index].name.$error
                  "
                  :v="$v.form.translationList.$each.$iter[index].name"
                />
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <div
              v-for="(item, index) in form.translationList"
              v-bind:key="index"
            >
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none',
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
                  :isValidate="
                    $v.form.translationList.$each.$iter[index].shortDescription
                      .$error
                  "
                  :v="
                    $v.form.translationList.$each.$iter[index].shortDescription
                  "
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
              isRequired
              @onKeypress="isNumber($event)"
              v-model="form.sortOrder"
              :isValidate="$v.form.sortOrder.$error"
              :v="$v.form.sortOrder"
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="URL Key"
              placeholder="URL Key"
              type="text"
              name="urlKey"
              isRequired
              @onKeyup="onUrlkeyChange"
              v-model="form.urlKey"
              :isValidate="$v.form.urlKey.$error"
              :v="$v.form.urlKey"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <InputText
              textFloat="จำนวนพ้อยที่ใช้แลก"
              placeholder="จำนวนพ้อยที่ใช้แลก"
              type="text"
              name="point"
              isRequired
              @onKeypress="isNumber($event)"
              v-model="form.point"
              :isValidate="$v.form.point.$error"
              :v="$v.form.point"
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="จำนวนวอชเชอร์"
              placeholder="จำนวนวอชเชอร์"
              type="text"
              name="maximum"
              isRequired
              @onKeypress="isNumber($event)"
              v-model="form.maximum"
              :isValidate="$v.form.maximum.$error"
              :v="$v.form.maximum"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <label class="font-weight-bold main-label mb-2">
              ประเภทวอชเชอร์
            </label>

            <b-row class="mb-3 mb-sm-0">
              <b-col cols="6" class="mb-1 mb-sm-0">
                <b-form-radio
                  name="some-radios-type"
                  v-model="form.bathOrPercent"
                  value="0"
                  @change="onChangeVoucherType($event)"
                  >บาท</b-form-radio
                >
              </b-col>
              <b-col cols="6" class="mb-1 mb-sm-0">
                <b-form-radio
                  name="some-radios-type"
                  v-model="form.bathOrPercent"
                  value="1"
                  @change="onChangeVoucherType($event)"
                  >เปอร์เซ็นต์</b-form-radio
                >
              </b-col>
            </b-row>
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="มูลค่าของวอชเชอร์"
              placeholder="มูลค่าของวอชเชอร์"
              type="text"
              name="voucherval"
              isRequired
              @onKeypress="isNumber($event)"
              v-model="form.value"
              :isValidate="$v.form.value.$error"
              :v="$v.form.value"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <label class="label-text">
              วันที่สามารถแลกวอชเชอร์ได้ (เริ่มต้น)
              <span class="text-danger">*</span>
            </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy"
              value-zone="local"
              v-model="form.startDate"
              :isValidate="$v.form.startDate.$error"
              :v="$v.form.startDate"
            ></datetime>
            <p class="text-danger f-14" v-if="error">
              วันที่สามารถแลกวอชเชอร์ได้ (เริ่มต้น)
              ต้องมาก่อนวันที่สามารถแลกวอชเชอร์ได้ (สิ้นสุด)
            </p>
            <p class="text-danger f-14" v-if="$v.form.startDate.$error">
              กรุณากรอกข้อมูล
            </p>
          </b-col>
          <b-col md="6" class="mt-3 mt-md-0">
            <label class="label-text">
              วันที่สามารถแลกวอชเชอร์ได้ (สิ้นสุด)
              <span class="text-danger">*</span>
            </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy"
              value-zone="local"
              v-model="form.endDate"
              :isValidate="$v.form.endDate.$error"
              :v="$v.form.endDate"
            ></datetime>
            <p class="text-danger f-14" v-if="$v.form.endDate.$error">
              กรุณากรอกข้อมูล
            </p>
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col md="6">
            <label class="label-text">
              วันที่สามารถใช้วอชเชอร์ได้ (เริ่มต้น)
              <span class="text-danger">*</span>
            </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy"
              value-zone="local"
              v-model="form.startDateEnable"
              :isValidate="$v.form.startDateEnable.$error"
              :v="$v.form.startDateEnable"
            ></datetime>
            <p class="text-danger f-14" v-if="errorEnable">
              วันที่สามารถใช้วอชเชอร์ได้ (เริ่มต้น)
              ต้องมาก่อนวันที่สามารถใช้วอชเชอร์ได้ (สิ้นสุด)
            </p>
            <p class="text-danger f-14" v-if="$v.form.startDateEnable.$error">
              กรุณากรอกข้อมูล
            </p>
          </b-col>
          <b-col md="6" class="mt-3 mt-md-0">
            <label class="label-text">
              วันที่สามารถใช้วอชเชอร์ได้ (สิ้นสุด)
              <span class="text-danger">*</span>
            </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy"
              value-zone="local"
              v-model="form.endDateEnable"
              :isValidate="$v.form.endDateEnable.$error"
              :v="$v.form.endDateEnable"
            ></datetime>
            <p class="text-danger f-14" v-if="$v.form.endDateEnable.$error">
              กรุณากรอกข้อมูล
            </p>
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col md="6" class="mb-3 mb-md-0">
            <InputText
              textFloat="Prefix"
              placeholder="Prefix"
              type="text"
              name="prefix"
              isRequired
              v-model="form.prefix"
              :isValidate="$v.form.prefix.$error"
              :v="$v.form.prefix"
            />

            <label class="font-weight-bold main-label mb-2">
              ประเภทการใช้วอชเชอร์
            </label>

            <b-row class="mb-3 mb-sm-0">
              <b-col cols="6" class="mb-1 mb-sm-0">
                <b-form-radio
                  name="some-radios"
                  v-model="form.isOneTimeUsed"
                  :value="true"
                  @change="onChangeVoucherTypeUse($event)"
                  >ใช้ได้ครั้งเดียว
                </b-form-radio>
              </b-col>
              <b-col cols="6" class="mb-1 mb-sm-0">
                <b-form-radio
                  name="some-radios"
                  v-model="form.isOneTimeUsed"
                  :value="false"
                  @change="onChangeVoucherTypeUse($event)"
                  >ใช้ได้หลายครั้ง</b-form-radio
                >
              </b-col>
            </b-row>
          </b-col>
          <b-col md="6">
            <UploadFile
              textFloat="ภาพหน้าปก"
              placeholder="กรุณาเลือกไฟล์เพื่ออัพโหลด"
              format="image"
              name="thumbnail"
              :fileName="form.imageUrl"
              text="*กรุณาอัพโหลดไฟล์สกุล .png, .jpg ขนาด 1140 x 450 px ขนาดไม่เกิน 10 MB"
              isRequired
              v-on:onFileChange="onImageChange"
              v-on:delete="deleteImage"
              :v="$v.form.imageUrl"
            />
            <div
              class="preview-box b-contain"
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

        <b-row>
          <b-col>
            <div
              v-for="(item, index) in form.translationList"
              v-bind:key="index"
            >
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none',
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
                      :v="
                        $v.form.translationList.$each.$iter[index].description
                      "
                      @onDataChange="(val) => (item.description = val)"
                    />
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <!-- <label class="font-weight-bold main-label">
              สถานะการแสดงผล
              <span class="text-danger">*</span>
            </label>
            <div>
              <div>
                <b-form-checkbox
                  switch
                  v-model="form.faqTopic.enabled"
                  class="radio-active"
                  size="lg"
                >
                  <span class="ml-2 main-label">{{
                    form.faqTopic.enabled ? "ใช้งาน" : "ไม่ใช้งาน"
                  }}</span>
                </b-form-checkbox>
              </div> 
            </div>-->

            <label class="font-weight-bold main-label">
              สถานะการใช้งาน
              <span class="text-danger">*</span>
            </label>

            <div>
              <b-form-checkbox
                switch
                v-model="form.enabled"
                class="radio-active"
                size="lg"
              >
                <span class="ml-2 main-label">{{
                  form.enabled ? "ใช้งาน" : "ไม่ใช้งาน"
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
              @click="openModalDelete(form.translationList[0].name)"
              >ลบ</b-button
            >
            <router-link to="/voucher">
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
import UploadFile from "@/components/inputs/UploadFile";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
import TextEditor from "@/components/inputs/TextEditor";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import * as moment from "moment/moment";
import ModalLoading from "@/components/modal/alert/ModalLoading";

export default {
  name: "VoucherDetails",
  components: {
    InputText,
    InputTextArea,
    UploadFile,
    TextEditor,
    ModalAlert,
    ModalAlertError,
    ModalLoading,
  },
  data() {
    return {
      isLoadingImage: false,
      coverImgType: 1,
      showVideo: "",
      existId: "",
      showPreview: "",
      imageLogoLang: "",
      languageActive: 1,
      modalMessage: "",
      error: false,
      errorEnable: false,
      isBusy: false,
      isEdit: false,
      isDisable: false,
      filename: "",
      id: this.$route.params.id,
      languageList: [],
      form: null,
    };
  },
  created: async function () {
    this.$isLoading = true;
    await this.getDatas();
    await this.changeLanguage(1, 0);
  },
  validations: {
    form: {
      sortOrder: { required },
      urlKey: { required },
      imageUrl: { required },
      prefix: { required },
      maximum: { required },
      point: { required },
      value: { required },
      startDateEnable: { required },
      endDateEnable: { required },
      startDate: { required },
      endDate: { required },
      translationList: {
        $each: {
          name: { required },
          shortDescription: { required },
          description: { required },
        },
      },
    },
  },
  methods: {
    moment: function () {
      return moment();
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    onChangeVoucherType(val) {
      this.form.bathOrPercent = val;
    },
    onChangeVoucherTypeUse(val) {
      this.form.isOneTimeUsed = val;
    },
    changeSameLang: function (value) {
      this.form.isSameLanguage = value;
    },
    setAlttag: function (value) {
      this.languageList.forEach((element, index) => {
        this.form.translationList[index].metaTitle = value;
        this.form.translationList[index].metaKeyword = value;
        this.form.translationList[index].metaDescription = value;
        this.form.translationList[index].altTag = value.replace(/ /g, "-");
      });
      this.form.urlKey = value.replace(/ /g, "-").replace(/\//g, "");
    },
    onUrlkeyChange: function (value) {
      this.form.urlKey = this.form.urlKey.replace(/ /g, "-").replace(/\//g, "");
    },
    getDatas: async function () {
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
      }
      let data = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Voucher/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.form = data.detail;

        if (this.form.isSameLanguage) {
          this.imageLogoLang = "";
          this.languageActive = this.form.mainLanguageId;
        } else {
          var index = this.languageList
            .map(function (x) {
              return x.id;
            })
            .indexOf(this.form.mainLanguageId);
          this.imageLogoLang = this.languageList[index].imageUrl;
        }

        this.$isLoading = true;
      }
    },
    changeLanguage(id, index) {
      if (!this.form.isSameLanguage) {
        this.languageActive = id;
        this.imageLogoLang = this.languageList[index].imageUrl;
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

        this.showPreview = this.images;
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
    checkForm: async function (flag) {
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

        await this.checkValidateTranslationList();
        return;
      }

      if (
        new Date(this.form.startDateEnable) > new Date(this.form.endDateEnable)
      ) {
        this.errorEnable = true;
        this.$nextTick(() => {
          window.scrollTo(0, 500);
        });
        return;
      } else {
        this.errorEnable = false;
      }

      if (new Date(this.form.startDate) > new Date(this.form.endDate)) {
        this.error = true;
        this.$nextTick(() => {
          window.scrollTo(0, 500);
        });
        return;
      } else {
        this.error = false;
      }

      this.modalAlertShow = false;
      this.flag = flag;
      this.submit();
    },
    setUrlkey: function (value, index) {
      this.form.urlKey = value.replace(/ /g, "-");
    },
    submit: async function () {
      this.isDisable = true;
      this.$refs.modalLoading.show();

      var method;

      if (this.id == 0) method = "post";
      else method = "put";

      let data = await this.$callApi(
        method,
        `${this.$baseUrl}/api/Voucher/Save`,
        null,
        this.$headers,
        this.form
      );
      this.$refs.modalLoading.hide();
      this.modalMessage = data.message;
      this.isDisable = false;
      if (data.result == 1) {
        this.existId = data.detail;
        this.$refs.modalAlert.show();

        if (this.flag == 1) {
          setTimeout(() => {
            this.$router.push({
              path: `/voucher`,
            });
          }, 3000);
        } else {
          setTimeout(() => {
            this.$refs.modalAlert.hide();
          }, 3000);
          if (this.id > 0) {
            this.getDatas();
          } else {
            this.form.id = this.existId;
            this.id = this.existId;
            this.isEdit = true;
            this.$router.push({ path: `/voucher/details/${this.existId}` });
          }
        }
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    useSameLanguage: async function () {
      Vue.nextTick(() => {
        if (this.form.isSameLanguage) {
          this.imageLogoLang = "";

          this.form.mainLanguageId = this.languageActive;
          let data = this.form.translationList.filter(
            (val) => val.languageId == this.form.mainLanguageId
          );

          //if (this.id == 0) {
          if (data.length == 1) {
            data = data[0];
            for (
              let index = 0;
              index < this.form.translationList.length;
              index++
            ) {
              this.form.translationList[index].name = data.name;
              this.form.translationList[index].shortDescription =
                data.shortDescription;
              this.form.translationList[index].description = data.description;
              // this.form.translationList[index].metaTitle = data.metaTitle;
              // this.form.translationList[index].metaKeyword = data.metaKeyword;
              // this.form.translationList[index].metaDescription =
              //   data.metaDescription;
            }
          }
          //}
        } else {
          var index = this.languageList
            .map(function (x) {
              return x.id;
            })
            .indexOf(this.languageActive);
          this.imageLogoLang = this.languageList[index].imageUrl;

          let data = this.form.translationList.filter(
            (val) => val.languageId != this.form.mainLanguageId
          );
          if (this.id == 0) {
            if (data.length == 1) {
              data = data[0];
              data.name = "";
              data.shortDescription = "";
              data.description = "";
              // data.metaTitle = "";
              // data.metaKeyword = "";
              // data.metaDescription = "";
            }
          }
        }
      });
    },
    checkValidateTranslationList: async function () {
      let isError = false;
      this.languageList.forEach((element, index) => {
        if (!isError) {
          if (this.$v.form.translationList.$each.$iter[index].$error) {
            this.languageActive = this.$v.form.translationList.$model[
              index
            ].languageId;

            this.imageLogoLang = this.languageList[index].imageUrl;

            isError = true;
          }
        }
      });
    },
  },
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
