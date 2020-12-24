<template>
  <div>
    <b-container class="container-box">
      <b-row class="no-gutters">
        <b-col>
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            ข้อมูลข่าวสาร
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
                v-model="form.news.isSameLanguage"
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
              :disabled="form.news.isSameLanguage ? true : false"
            >
              <span class="text-uppercase">{{ language.nation }}</span>
            </b-button>
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col>
            <div
              v-for="(item, index) in form.news.translationList"
              v-bind:key="index"
            >
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none',
                ]"
              >
                <InputText
                  textFloat="ชื่อบทความ"
                  placeholder="ชื่อบทความ"
                  type="text"
                  name="name"
                  :img="imageLogoLang"
                  v-model="item.name"
                  @onKeyup="setAlttag(item.name)"
                  isRequired
                  :isValidate="
                    $v.form.news.translationList.$each.$iter[index].name.$error
                  "
                  :v="$v.form.news.translationList.$each.$iter[index].name"
                />
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <div
              v-for="(item, index) in form.news.translationList"
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
                    $v.form.news.translationList.$each.$iter[index]
                      .shortDescription.$error
                  "
                  :v="
                    $v.form.news.translationList.$each.$iter[index]
                      .shortDescription
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
              :isValidate="$v.form.news.sortOrder.$error"
              :v="$v.form.news.sortOrder"
              @onKeypress="isNumber($event)"
              v-model="form.news.sortOrder"
            />
          </b-col>
          <b-col md="6">
            <InputText
              textFloat="URL Key"
              placeholder="URL Key"
              type="text"
              name="urlKey"
              isRequired
              v-model="form.news.urlKey"
              :isValidate="$v.form.news.urlKey.$error"
              :v="$v.form.news.urlKey"
              @onKeyup="onUrlkeyChange"
            />
          </b-col>
        </b-row>

        <b-row v-if="form.news.newsTypeId == 2" class="mb-2">
          <b-col md="6">
            <label class="label-text">
              วันแสดงผลโปรโมชั่นนี้
              <!-- <span class="text-danger">*</span> -->
            </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy"
              value-zone="local"
              v-model="form.news.startDateDisplay"
            ></datetime>
            <p class="text-danger" v-if="error">
              วันแสดงผลโปรโมชั่นนี้ต้องมาก่อนวันที่หมดเขตของโปรโมชั่นนี้
            </p>
            <p
              class="text-danger input-custom error"
              v-if="$v.form.news.startDateDisplay.$error"
            >
              กรุณากรอกข้อมูล
            </p>
          </b-col>
          <b-col md="6">
            <label class="label-text">
              วันที่หมดเขตของโปรโมชั่นนี้
              <!-- <span class="text-danger">*</span> -->
            </label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd/MM/yyyy"
              value-zone="local"
              v-model="form.news.endDateDisplay"
            ></datetime>
            <p
              class="text-danger input-custom error"
              v-if="$v.form.news.endDateDisplay.$error"
            >
              กรุณากรอกข้อมูล
            </p>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <UploadFile
              textFloat="ภาพหน้าปก"
              placeholder="กรุณาเลือกไฟล์เพื่ออัพโหลด"
              format="image"
              name="thumbnail"
              :fileName="form.news.imageUrl"
              text="*กรุณาอัพโหลดไฟล์สกุล .png, .jpg ขนาด 1140 x 450 px ขนาดไม่เกิน 10 MB"
              isRequired
              v-on:onFileChange="onImageChange"
              v-on:delete="deleteImage"
              :v="$v.form.news.imageUrl"
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
            <div
              v-for="(item, index) in form.news.translationList"
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
                        $v.form.news.translationList.$each.$iter[index]
                          .description
                      "
                      @onDataChange="(val) => (item.description = val)"
                    />
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col>
            <InputSelect
              class="mb-4"
              title="ประเภท"
              name="Cate"
              v-bind:options="newTypeLists"
              valueField="id"
              textField="name"
              v-model="form.news.newsTypeId"
              @onDataChange="handleChangeNewsType"
            />
            <p class="text-danger input-custom error" v-if="errorType">
              กรุณาเลือกประเภท
            </p>
          </b-col>
          <b-col>
            <label class="font-weight-bold main-label">
              สถานะการแสดงผล
              <span class="text-danger">*</span>
            </label>
            <div>
              <b-form-checkbox
                switch
                v-model="form.news.enabled"
                class="radio-active"
                size="lg"
              >
                <span class="ml-2 main-label">{{
                  form.news.enabled ? "ใช้งาน" : "ไม่ใช้งาน"
                }}</span>
              </b-form-checkbox>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="bg-white p-3 mt-2" v-if="form.news.newsTypeId == 2">
        <div class="">
          <b-row>
            <b-col>
              <label for="" class="main-label my-2">เพิ่มสินค้าแนะนำ</label>
              <label for="" class="ml-3"
                >({{ selected.length }} สินค้าที่เลือก)</label
              >
            </b-col>
          </b-row>
          <b-row class="my-3">
            <b-col>
              <b-form-checkbox
                size="lg"
                class="ml-1 ml-sm-2"
                v-model="displayOnlySelected"
                @change="onChangeShowSelected($event)"
                ><label for="" class="">แสดงที่เลือก</label></b-form-checkbox
              >
            </b-col>
            <b-col sm="6" class="text-right">
              <div class="d-flex">
                <b-input-group class="panel-article-input-serach">
                  <b-form-input
                    class="input-serach"
                    placeholder="ชื่อสินค้า, รหัสสินค้า"
                    v-model="filter.search"
                    @keyup="handleSearch"
                  ></b-form-input>
                  <b-input-group-prepend @click="btnSearch">
                    <span class="icon-input m-auto pr-2">
                      <font-awesome-icon icon="search" title="View" />
                    </span>
                  </b-input-group-prepend>
                </b-input-group>

                <b-button v-b-toggle.sidebar-1 class="mr-2 btn-filter">
                  <font-awesome-icon
                    icon="filter"
                    title="filter-btn"
                    class="text-white mr-0 mr-sm-1"
                  />
                  <span class="d-none d-sm-inline"
                    >ค้นหาแบบละเอียด ({{
                      filter.status.length + countCat
                    }})</span
                  >
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-sidebar
            id="sidebar-1"
            title="ค้นหาแบบละเอียด"
            backdrop
            shadow
            backdrop-variant="dark"
            right
            ref="filterSidebar"
          >
            <div class="px-3 py-2">
              <div class="text-right">
                <button
                  type="button"
                  class="btn btn-link px-0"
                  @click="onClearFilter()"
                >
                  ล้างค่า
                </button>
              </div>

              <div>
                <p class="font-weight-bold mb-2 main-label">สถานะสินค้า</p>
              </div>
              <b-row
                class=""
                v-for="(status, index) in statusList"
                :key="status.id"
              >
                <b-col>
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="status.id"
                      v-model="filter.status"
                      :id="'status-' + status.id"
                    />
                    <label
                      class="form-check-label"
                      :for="'status-' + status.id"
                      >{{ status.name }}</label
                    >
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <InputSelect
                    class="mb-4"
                    title="หมวดหมู่"
                    name="Cate"
                    v-bind:options="catLists"
                    valueField="id"
                    textField="name"
                    v-model="selectedCategoryId"
                    @onDataChange="handleChangeCategory"
                  />
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col class="d-flex justify-content-center">
                  <button
                    type="button"
                    class="btn btn-purple button"
                    @click="getDataByStatus"
                  >
                    ค้นหา
                  </button>
                </b-col>
              </b-row>
            </div>
          </b-sidebar>
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
          >
            <template v-slot:cell(ids)="data">
              <b-form-checkbox
                size="lg"
                class="ml-3"
                :value="data.item.id"
                v-model="selected"
              ></b-form-checkbox>
            </template>
            <template v-slot:head(ids)="data">
              <b-form-checkbox
                size="lg"
                class="ml-3"
                :ref="data.field.key"
                @click="checkAllSelect()"
                v-model="selectedAll"
              ></b-form-checkbox>
            </template>
            <template v-slot:cell(imageUrl)="data">
              <div
                class="image"
                v-bind:style="{
                  'background-image': 'url(' + data.item.imageUrl + ')',
                }"
              ></div>
            </template>
            <template v-slot:cell(price)="data">
              <span> ฿ {{ data.item.price | numeral("0,0.00") }} </span>
            </template>
            <template v-slot:cell(stock)="data">
              <span> {{ data.item.stock | numeral("0,0") }} </span>
            </template>
            <template v-slot:cell(sold)="data">
              <span> {{ data.item.sold | numeral("0,0") }} </span>
            </template>
            <template v-slot:cell(display)="data">
              <div v-if="data.item.display == true" class="text-success">
                ใช้งาน
              </div>
              <div v-else class="text-danger">ไม่ใช่งาน</div>
            </template>
            <template v-slot:table-busy>
              <div class="text-center text-black my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong class="ml-2">Loading...</strong>
              </div>
            </template>
          </b-table>
        </div>
        <b-row class="no-gutters px-3 px-sm-0">
          <b-col
            class="form-inline justify-content-center justify-content-sm-between"
          >
            <div class="d-sm-flex m-3">
              <b-pagination
                v-model="filter.pageNo"
                :total-rows="rows"
                :per-page="filter.perPage"
                class="m-md-0"
                @change="pagination"
                align="center"
              ></b-pagination>
            </div>

            <b-form-select
              class="mr-sm-3 select-page"
              v-model="filter.perPage"
              @change="hanndleChangePerpage"
              :options="pageOptions"
            ></b-form-select>
          </b-col>
        </b-row>
      </div>
      <div class="bg-white p-3 mt-2">
        <SEOSection
          :data="form.news.translationList"
          :v="$v.form.news.translationList"
          :isValidate="$v.form.news.translationList"
          :langActive="languageActive"
          :img="imageLogoLang"
        />

        <b-row class="mt-5">
          <b-col md="6">
            <b-button
              v-if="isEdit"
              class="btn btn-danger btn-details-set mr-md-2"
              :disabled="isDisable"
              @click="openModalDelete(form.news.translationList[0].name)"
              >ลบ</b-button
            >
            <b-button
              href="/news"
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
      <ModalLoading ref="modalLoading" :hasClose="false" />
    </b-container>
  </div>
</template>

<script>
import InputText from "@/components/inputs/InputText";
import InputTextArea from "@/components/inputs/InputTextArea";
import UploadFile from "@/components/inputs/UploadFile";
import { required, requiredIf } from "vuelidate/lib/validators";
import Vue from "vue";
import TextEditor from "@/components/inputs/TextEditor";
import SEOSection from "@/components/inputs/SEOSection";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalAlertConfirm from "@/components/modal/alert/ModalAlertConfirm";
import InputSelect from "@/components/inputs/InputSelect";
import * as moment from "moment/moment";
import ModalLoading from "@/components/modal/alert/ModalLoading";

export default {
  name: "BannerDetails",
  components: {
    InputText,
    InputTextArea,
    UploadFile,
    TextEditor,
    SEOSection,
    ModalAlert,
    ModalAlertError,
    ModalAlertConfirm,
    InputSelect,
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
      isBusy: false,
      isEdit: false,
      isDisable: false,
      errorType: false,
      filename: "",
      id: this.$route.params.id,
      languageList: [],
      items: [],
      displayOnlySelected: false,
      selected: [],
      selectedAll: [],
      selectedCategoryId: 0,
      selectedNewsTypeId: 0,
      catLists: [],
      allItems: [],
      newTypeLists: [
        {
          id: 0,
          name: "กรุณาเลือกประเภท",
        },
        {
          id: 1,
          name: "ข่าวสาร",
        },
        {
          id: 2,
          name: "โปรโมชั่น",
        },
      ],
      rows: 0,
      pageOptions: [
        { value: 10, text: "10 / page" },
        { value: 30, text: "30 / page" },
        { value: 50, text: "50 / page" },
        { value: 100, text: "100 / page" },
      ],
      filter: {
        pageNo: 1,
        perPage: 10,
        search: "",
        productId: [],
        categoryId: [],
        status: [],
      },
      totalRowMessage: "",
      statusList: [
        {
          id: 0,
          name: "ปิดใช้งาน",
        },
        {
          id: 1,
          name: "เปิดใช้งาน",
        },
      ],
      fields: [
        {
          key: "ids",
          label: "#",
        },
        {
          key: "thumbnail",
          label: "ภาพประกอบ",
          class: "w-200px",
        },
        {
          key: "name",
          label: "รายละเอียดสินค้า",
          class: "w-200",
        },
        {
          key: "sku",
          label: "SKU",
          class: "w-100px",
        },
        {
          key: "price",
          label: "ราคาขาย",
          class: "w-100px",
        },
        {
          key: "sold",
          label: "ยอดขาย (ชิ้น)",
          class: "w-100px",
        },
        {
          key: "stock",
          label: "คลัง",
          class: "w-100px",
        },
        {
          key: "display",
          label: "สถานะ",
          class: "w-100px",
        },
      ],
      form: {
        news: {
          id: 0,
          enabled: false,
          blogCategoryId: 1,
          urlKey: "",
          imageUrl: "",
          sortOrder: 0,
          mainLanguageId: 1,
          newsTypeId: 0,
          startDateDisplay: null,
          endDateDisplay: null,
          startDate: null,
          endDate: null,
          isSameLanguage: true,
          blogHighlight: false,
          translationList: [
            {
              languageId: 1,
              name: "",
              shortDescription: "",
              description: "",
              metaTitle: "",
              metaKeyword: "",
              metaDescription: "",
              altTag: "",
              author: "",
            },
            {
              languageId: 2,
              name: "",
              shortDescription: "",
              description: "",
              metaTitle: "",
              metaKeyword: "",
              metaDescription: "",
              altTag: "",
              author: "",
            },
          ],
        },
      },
    };
  },
  validations: {
    form: {
      news: {
        sortOrder: { required },
        urlKey: { required },
        imageUrl: { required },
        startDateDisplay: {
          required: requiredIf(function () {
            return this.form.news.newsTypeId == 2;
          }),
        },
        endDateDisplay: {
          required: requiredIf(function () {
            return this.form.news.newsTypeId == 2;
          }),
        },
        translationList: {
          $each: {
            name: { required },
            shortDescription: { required },
            description: { required },
            metaTitle: { required },
            metaKeyword: { required },
            metaDescription: { required },
            // description: { required },
          },
        },
      },
    },
  },
  computed: {
    countCat: function () {
      var count = 0;
      if (this.filter.categoryId.length != 0) count += 1;
      else if (count > 0) count -= 1;
      return count;
    },
  },
  created: async function () {
    await this.getDatas();
  },
  watch: {
    selected: function () {
      if (this.selected.length == this.allItems.length) {
        this.selectedAll = true;
      } else {
        this.selectedAll = false;
      }
    },
    selectedAll: function () {
      if (this.selected.length != this.allItems.length) {
        if (this.selectedAll) {
          this.selected = [];
          this.allItems.forEach((element, index) => {
            this.selected.push(element.id);
          });
          if (this.displayOnlySelected) this.onClearFilter();
        }
      } else {
        if (!this.selectedAll) {
          this.selected = [];
        }
      }
    },
  },
  methods: {
    moment: function () {
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
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    changeSameLang: function (value) {
      this.form.news.isSameLanguage = value;
    },
    setAlttag: function (value) {
      this.languageList.forEach((element, index) => {
        this.form.news.translationList[index].metaTitle = value;
        this.form.news.translationList[index].metaKeyword = value;
        this.form.news.translationList[index].metaDescription = value;
        this.form.news.translationList[index].altTag = value.replace(/ /g, "-");
      });
      this.form.news.urlKey = value.replace(/ /g, "-").replace(/\//g, "");
    },
    onUrlkeyChange: function (value) {
      this.form.news.urlKey = this.form.news.urlKey
        .replace(/ /g, "-")
        .replace(/\//g, "");
    },
    setAlttagByLang: function (value, index) {
      this.form.news.translationList[index].altTag = value.replace(/ /g, "-");
    },
    onChangeShowSelected(value) {
      this.filter.pageNo = 1;
      if (value == true) this.filter.productId = this.selected;
      else this.filter.productId = [];

      this.getList();
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
        this.changeLanguage(1, 0);
      }
      let data = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/news/${this.id}`,
        null,
        this.$headers,
        null
      );

      await this.getList();
      await this.getAllData();

      if (data.result == 1) {
        //this.form = data.detail;

        this.$v.form.$reset();
        this.form.news.startDateDisplay = moment().format();
        this.form.news.endDateDisplay = moment().format();

        if (this.id > 0) {
          this.form = data.detail;
          this.isEdit = true;
          this.form.news.imageBase64 = "";
          this.selected = this.form.news.productId;
          this.selectedNewsTypeId = this.form.news.newsTypeId;

          this.showPreview = this.form.news.imageUrl;

          let vdo = this.form.news.imageUrl.split(".").pop();
          if (vdo == "mp4") {
            this.coverImgType = 2;
            var vid = this.$refs.videoRef;
            if (vid != undefined) {
              vid.load();
            }
          }
        } else {
          this.form.news.imageUrl = "";
        }

        this.$isLoading = true;
      }

      if (this.form.news.isSameLanguage) {
        this.imageLogoLang = "";
      } else {
        var index = this.languageList
          .map(function (x) {
            return x.id;
          })
          .indexOf(this.languageActive);
        this.imageLogoLang = this.languageList[index].imageUrl;
      }
    },
    handleSearch(e) {
      if (e.keyCode === 13) {
        this.filter.pageNo = 1;
        this.getList();
      }
    },
    btnSearch() {
      this.filter.pageNo = 1;
      this.getList();
    },
    handleChangeCategory: async function (value) {
      this.filter.categoryId = [];
      if (value != 0) {
        this.filter.categoryId.push(value);
      }
    },
    handleChangeNewsType: async function (value) {
      //this.form.news.newsTypeId = 0;
      //if (value != 0) {
      this.form.news.newsTypeId = value;
      //}
    },
    getList: async function () {
      this.isBusy = true;
      let productlist = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/news/ProductList`,
        null,
        this.$headers,
        this.filter
      );

      let catlist = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/category/categoryList`,
        null,
        this.$headers,
        this.filter
      );

      if (productlist.result == 1) {
        this.items = productlist.detail.dataList;
        this.rows = productlist.detail.count;
        // this.statusList = productlist.detail.overviewCount;

        this.isBusy = false;
      }

      if (catlist.result == 1) {
        let list = [{ id: 0, name: "เลือกหมวดหมู่" }];
        let datalist = catlist.detail;
        this.catLists = list.concat(datalist);
      }
    },
    getAllData: async function () {
      // get ข้อมูลทั้งหมดมาใช้ตอนเช็คติ้ก
      let filterAll = {
        pageNo: 1,
        perPage: -1,
        search: "",
        productId: [],
        categoryId: [],
        status: [],
      };
      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/news/productList`,
        null,
        this.$headers,
        filterAll
      );

      if (data.result == 1) {
        this.allItems = data.detail.dataList;
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
        this.form.news.imageUrl = this.images;

        if (img.type == "video/mp4") {
          this.coverImgType = 2;
          this.form.news.isVideo = true;
          var vid = this.$refs.videoRef;
          if (vid != undefined) {
            vid.load();
          }
        } else {
          this.coverImgType = 1;
          this.form.news.isVideo = false;
        }
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
      this.form.news.imageUrl = "";
      this.form.news.imageBase64 = null;
      this.showPreview = null;

      if (this.coverImgType == 2) {
        var vid = this.$refs.videoRef;
        vid.load();
        this.coverImgType = 1;
      }
    },
    checkForm: async function (flag) {
      if (this.form.news.isSameLanguage) {
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

        if (this.form.news.newsTypeId == 0) this.errorType = true;
        else this.errorType = false;

        return;
      }

      if (this.form.news.newsTypeId == 2) {
        if (
          new Date(this.form.news.startDateDisplay) >
          new Date(this.form.news.endDateDisplay)
        ) {
          this.error = true;
          window.scrollTo(150, 150);
          return;
        }
      }

      if (this.form.news.newsTypeId == 0) {
        this.errorType = true;
        return;
      } else this.errorType = false;

      this.modalAlertShow = false;
      this.error = false;
      this.flag = flag;
      this.submit();
    },
    submit: async function () {
      this.form.news.productId = this.selected;
      this.form.news.startDate = this.form.news.startDateDisplay;
      this.form.news.endDate = this.form.news.endDateDisplay;
      this.isDisable = true;
      this.$refs.modalLoading.show();
      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/news/save`,
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
          setTimeout(function () {
            window.location.href = "/news";
          }, 3000);
        } else {
          if (this.id > 0) {
            this.getDatas();
          } else {
            this.form.news.id = this.existId;
            this.id = this.existId;
            this.isEdit = true;
            this.$router.push({ path: `/news/details/${this.existId}` });
          }
        }
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    btnDelete: async function () {
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
        setTimeout(function () {
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
    checkAllSelect() {
      if (!this.selectAllCb) {
        this.filter.Status = [];
      } else {
        var list = this.statusList.slice(1);
        for (const item in list) {
          this.filter.Status.push(list[item].id);
        }
      }
    },
    getDataByStatus(status) {
      //this.filter.status = status;
      this.activeItem = status;
      this.$refs.filterSidebar.hide(true);
      this.getList();
    },
    onClearFilter() {
      this.selectedCategoryId = 0;
      this.filter = {
        pageNo: 1,
        perPage: 10,
        search: "",
        productId: [],
        categoryId: [],
        status: [],
      };
      this.$refs.filterSidebar.hide(true);
      this.getList();
    },
    useSameLanguage: async function () {
      Vue.nextTick(() => {
        if (this.form.news.isSameLanguage) {
          this.imageLogoLang = "";

          this.form.news.mainLanguageId = this.languageActive;
          let data = this.form.news.translationList.filter(
            (val) => val.languageId == this.form.news.mainLanguageId
          );

          if (this.id == 0) {
            if (data.length == 1) {
              data = data[0];
              for (
                let index = 0;
                index < this.form.news.translationList.length;
                index++
              ) {
                this.form.news.translationList[index].name = data.name;
                this.form.news.translationList[index].shortDescription =
                  data.shortDescription;
                this.form.news.translationList[index].description =
                  data.description;
                this.form.news.translationList[index].metaTitle =
                  data.metaTitle;
                this.form.news.translationList[index].metaKeyword =
                  data.metaKeyword;
                this.form.news.translationList[index].metaDescription =
                  data.metaDescription;
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

          let data = this.form.news.translationList.filter(
            (val) => val.languageId != this.form.news.mainLanguageId
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
    checkValidateTranslationList: async function () {
      let isError = false;
      this.languageList.forEach((element, index) => {
        if (!isError) {
          if (this.$v.form.news.translationList.$each.$iter[index].$error) {
            this.languageActive = this.$v.form.news.translationList.$model[
              index
            ].languageId;

            this.imageLogoLang = this.languageList[index].imageUrl;

            isError = true;
          }
        }
      });
    },
    deleteData: async function () {
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
