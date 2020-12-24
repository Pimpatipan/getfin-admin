<template>
  <div v-if="$isLoading">
    <b-row class="no-gutters">
      <b-col>
        <h1
          class="font-weight-bold header-main text-uppercase mb-3 mx-3 mx-sm-0"
        >
          จัดการหมวดหมู่
        </h1>
      </b-col>
    </b-row>
    <div class="bg-white p-3">
      <CategoryHierarchy
        ref="categoryHierarchy"
        :dataList="selectCategory"
        :catagories="catagories"
        @onDataChange="onDataChangeCategory"
        @handleCreate="handleCreate"
        :hasCreateBtn="true"
      />
    </div>

    <div class="bg-white p-3 mt-2">
      <b-row class="align-items-end mb-4">
        <b-col md="3">
          <h1 class="font-weight-bold header-main text-uppercase mb-md-0">
            ข้อมูลหมวดหมู่
          </h1>
        </b-col>
        <b-col md="5">
          <div
            v-if="dataCategoryHierarchy.breadcrumb.length"
            class="text-black-50"
          >
            (
            <span v-for="(item, index) in selectCategory" v-bind:key="index">
              <span>{{
                dataCategoryHierarchy.breadcrumb[index]
                  ? dataCategoryHierarchy.breadcrumb[index].name
                  : ""
              }}</span>
              <span class="mx-2" v-if="index + 1 < selectCategory.length"
                >></span
              >
            </span>
            )
          </div>
        </b-col>
        <b-col md="4" class="text-right">
          <div class="panel">
            <b-form-checkbox
              size="lg"
              id="sameLang"
              class="mt-0 mt-sm-2"
              @change="useSameLanguage"
              v-model="form.category.isSameLanguage"
            >
              ใช้เหมือนกันทุกภาษา
              <b-button
                type="button"
                class="btn btn-language"
                v-for="(language, index) in globalLanguages"
                v-bind:key="index"
                v-bind:class="[languageActive == language.id ? 'active' : '']"
                @click="changeLanguage(language.id, index)"
                :disabled="form.category.isSameLanguage ? true : false"
              >
                <span class="text-uppercase">{{ language.nation }}</span>
              </b-button>
            </b-form-checkbox>
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col md="6">
          <div
            v-for="(item, index) in form.category.translationList"
            v-bind:key="index"
            v-bind:class="[languageActive == item.languageId ? '' : 'd-none']"
          >
            <InputText
              textFloat="ชื่อหมวดหมู่"
              placeholder="ชื่อหมวดหมู่"
              type="text"
              name="name"
              :img="imageLogoLang"
              v-model="item.name"
              isRequired
              :isValidate="
                $v.form.category.translationList.$each.$iter[index].name.$error
              "
              :v="$v.form.category.translationList.$each.$iter[index].name"
              @onKeyup="setUrlKey(item.name, item.languageId)"
            />
          </div>
        </b-col>
        <b-col md="6">
          <InputText
            textFloat="URL Key"
            placeholder="URL Key"
            type="text"
            name="urlkey"
            v-model="form.category.urlKey"
            isRequired
            :isValidate="$v.form.category.urlKey.$error"
            :v="$v.form.category.urlKey"
          />
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col md="6">
          <InputText
            textFloat="ลำดับการแสดง"
            placeholder="ลำดับการแสดง"
            type="text"
            name="name"
            v-model="form.category.sortOrder"
            isRequired
            :isValidate="$v.form.category.sortOrder.$error"
            :v="$v.form.category.sortOrder"
          />
        </b-col>
      </b-row>

      <SEOSection
        :data="form.category.translationList"
        :v="$v.form.category.translationList"
        :isValidate="$v.form.category.translationList"
        :langActive="languageActive"
        :img="imageLogoLang"
      />

      <b-row>
        <b-col>
          <label class="font-weight-bold main-label mr-5">
            สถานะการแสดงผล
            <span class="text-danger">*</span>
          </label>
          <div>
            <b-form-checkbox
              switch
              v-model="form.category.display"
              class="radio-active"
              size="lg"
            >
              <span class="ml-2 main-label">{{
                form.category.display ? "ใช้งาน" : "ไม่ใช้งาน"
              }}</span>
            </b-form-checkbox>
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
  </div>
</template>

<script>
import CategoryHierarchy from "@/components/categoryHierarchy/CategoryHierarchy";
import InputText from "@/components/inputs/InputText";
import { required, requiredIf, numeric } from "vuelidate/lib/validators";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import SEOSection from "@/components/inputs/SEOSectionRenameMetaDesction";
import ModalLoading from "@/components/modal/alert/ModalLoading";
import { mapState } from "vuex";
import Vue from "vue";

export default {
  name: "Category",
  components: {
    InputText,
    SEOSection,
    CategoryHierarchy,
    ModalAlert,
    ModalAlertError,
    ModalLoading
  },
  validations: {
    form: {
      category: {
        sortOrder: { required, numeric },
        urlKey: { required },
        translationList: {
          $each: {
            name: { required },
            metaTitle: { required },
            metaKeyword: { required },
            metaDescription: { required },
          },
        },
      },
    },
  },
  data() {
    return {
      id: this.$route.params.id,
      catagories: [],
      list: [],
      dataCategoryHierarchy: {
        categoryIdList: [],
        isLast: false,
        selectId: 0,
        breadcrumb: [],
      },
      selectCategory: [],
      form: {
        category: {
          id: 0,
          sortOrder: 0,
          urlKey: "",
          mainLanguageId: 0,
          isSameLanguage: false,
          parentId: 0,
          display: false,
          translationList: [
            {
              languageId: 1,
              name: "",
              metaTitle: "",
              metaKeyword: "",
              metaDescription: "",
            },
            {
              languageId: 2,
              name: "",
              metaTitle: "",
              metaKeyword: "",
              metaDescription: "",
            },
          ],
        },
      },
      isDisable: false,
      imageLogoLang: "",
      modalMessage: "",
      mainLanguageId: 0,
      languageActive: 1,
    };
  },
  created: async function () {
    await this.getDatas();
  },
  computed: {
    ...mapState(["globalLanguages"]),
  },
  methods: {
    handleCreate(index) {
      this.selectCategory.length = index;
      this.dataCategoryHierarchy.selectId = index
        ? this.dataCategoryHierarchy.selectId
        : 0;
      this.dataCategoryHierarchy.isLast = index
        ? this.dataCategoryHierarchy.isLast
        : false;
      this.form = {
        category: {
          id: 0,
          sortOrder: index
            ? this.dataCategoryHierarchy.breadcrumb[index - 1].childSize + 1
            : 1,
          urlKey: "",
          mainLanguageId: 1,
          isSameLanguage: true,
          parentId: index ? this.selectCategory[index - 1] : 0,
          display: false,
          translationList: [
            {
              languageId: 1,
              name: "",
              metaTitle: "",
              metaKeyword: "",
              metaDescription: "",
            },
            {
              languageId: 2,
              name: "",
              metaTitle: "",
              metaKeyword: "",
              metaDescription: "",
            },
          ],
        },
      };
    },
    onDataChangeCategory(list) {
      this.dataCategoryHierarchy = { ...list };
      this.selectCategory = [...list.categoryIdList];
      this.getDataCategory(this.dataCategoryHierarchy.selectId || 0);
    },
    getDatas: async function () {
      this.$isLoading = false;
      let categories = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/category/categoryHierarchy`,
        null,
        this.$headers,
        null
      );
      if (categories.result == 1) {
        this.catagories = categories.detail;
        this.$isLoading = true;
      }
      this.form.category.isSameLanguage = true;
      this.form.category.mainLanguageId = 1;
      await this.changeLanguage(1, 0);
    },
    getDataCategory: async function (categoryId) {
      this.$v.form.category.$reset();
      let data = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/category/${categoryId}`,
        null,
        this.$headers,
        null
      );
      if (data.result == 1) {
        this.form = { ...data.detail };
      }
    },
    changeLanguage(id, index) {
      this.mainLanguageId = id;
      this.languageActive = id;
      this.imageLogoLang = this.globalLanguages[index].imageUrl;
    },
    checkValidateTranslationList: async function () {
      let isError = false;
      this.globalLanguages.forEach((element, index) => {
        if (!isError) {
          if (this.$v.form.category.translationList.$each.$iter[index].$error) {
            this.languageActive = this.$v.form.category.translationList.$model[
              index
            ].languageId;

            this.imageLogoLang = this.globalLanguages[index].imageUrl;

            isError = true;
          }
        }
      });
    },
    checkForm: async function (flag) {
      if (this.form.category.isSameLanguage) await this.useSameLanguage();

      this.$v.form.category.$touch();
      if (this.$v.form.category.$error) {
        await this.checkValidateTranslationList();
        return;
      }
      this.modalAlertShow = false;
      this.flag = flag;
      this.submit();
    },
    submit: async function () {
      this.$v.form.category.$reset();
      this.$refs.modalLoading.show();
      this.isDisable = true;

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/category/save`,
        null,
        this.$headers,
        this.form
      );

      this.isDisable = false;
      this.$refs.modalLoading.hide();
      if (data.result == 1) {
        this.modalMessage = data.message;
        this.$refs.modalAlert.show();
        await this.getDatas();

        if (this.form.category.id == 0)
          this.selectCategory.push(data.detail.categoryId);
        await this.$refs.categoryHierarchy.reload();
        document
          .getElementById(`panel_category_${data.detail.categoryId}`)
          .click();
      } else {
        this.$refs.modalAlertError.show();
        this.modalMessage = data.detail[0];
      }
    },
    useSameLanguage: async function () {
      Vue.nextTick(async () => {
        if (this.form.category.isSameLanguage) {
          this.imageLogoLang = "";
          this.form.category.mainLanguageId = this.languageActive;
          let data = this.form.category.translationList.filter(
            (val) => val.languageId == this.form.category.mainLanguageId
          );

          await this.form.category.translationList.forEach((element) => {
            element.name = data[0].name;
            element.metaTitle = data[0].metaTitle;
            element.metaKeyword = data[0].metaKeyword;
            element.metaDescription = data[0].metaDescription;
          });
        } else {
          var index = this.globalLanguages
            .map(function (x) {
              return x.id;
            })
            .indexOf(this.languageActive);
          this.imageLogoLang = this.globalLanguages[index].imageUrl;
          this.form.category.mainLanguageId = 0;
        }
      });
    },
    setUrlKey: function (value, languageId) {
      if (
        (!this.form.category.isSameLanguage && languageId == 1) ||
        this.form.category.isSameLanguage
      )
        this.form.category.urlKey = value.replace(/ /g, "-");
    },
  },
};
</script>

<style scoped>
::v-deep .custom-checkbox.b-custom-control-lg .custom-control-label::before,
::v-deep .input-group-lg .custom-checkbox .custom-control-label::before,
::v-deep .custom-checkbox.b-custom-control-lg .custom-control-label::after,
::v-deep .input-group-lg .custom-checkbox .custom-control-label::after {
  top: 0.55rem;
}
</style>