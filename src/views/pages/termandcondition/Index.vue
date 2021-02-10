<template>
  <div >
    <b-container class="container-box" v-if="$isLoading">
      <b-row class="no-gutters">
        <b-col>
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            ข้อตกลงและเงื่อนไขการใช้งาน
          </h1>
        </b-col>
      </b-row>

      <div class="bg-white p-3">
        <b-row class="pl-1">
          <b-col cols="6">
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
          <b-col cols="6" class="text-right">
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
    </b-container>
    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
    <ModalLoading ref="modalLoading" :hasClose="false" />
  </div>
</template>

<script>
import TextEditor from "@/components/inputs/TextEditor";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalLoading from "@/components/modal/alert/ModalLoading";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
export default {
  name: "AboutUs",
  components: {
    TextEditor,
    ModalAlert,
    ModalAlertError,
    ModalLoading,
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
      id: this.$route.params.id,
      modalAlertShow: false,
      form: {
        staticPage: {
          id: 7,
          urlKey: null,
          enabled: false,
          mainLanguageId: 1,
          isSameLanguage: true,
          translationList: [
            {
              languageId: 1,
              name: null,
              description: null,
            },
            {
              languageId: 2,
              name: null,
              description: null,
            },
          ],
        },
      },
    };
  },
  validations: {
    form: {
      staticPage: {
        urlKey: { required },
        translationList: {
          $each: {
            description: { required },
          },
        },
      },
    },
  },
  created: async function () {
    await this.getDatas();
    await this.changeLanguage(1, 0);
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
    onUrlkeyChange: function () {
      this.form.staticPage.urlKey = this.form.staticPage.urlKey
        .replace(/ /g, "-")
        .replace(/\//g, "");
    },
    setUrlKey: function (name) {
      if (this.id == 0) {
        this.form.staticPage.urlKey = name
          .replace(/ /g, "-")
          .replace(/\//g, "");
      }
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
        `${this.$baseUrl}/api/staticPage/${this.form.staticPage.id}`,
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
          this.languageActive = this.form.staticPage.mainLanguageId;
        } else {
          var index = this.languageList
            .map(function (x) {
              return x.id;
            })
            .indexOf(this.form.staticPage.mainLanguageId);
          this.imageLogoLang = this.languageList[index].imageUrl;
        }

        this.$isLoading = true;
      }
    },
    changeLanguage(id, index) {
      if (!this.form.staticPage.isSameLanguage) {
        this.languageActive = id;
        this.imageLogoLang = this.languageList[index].imageUrl;
      }
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
        setTimeout(() => {
            this.$refs.modalAlert.hide();
          }, 3000);
        this.getDatas();
      } else {
        this.$refs.modalAlertError.show();
      }
      // if (data.result == 1) {
      //   this.imgModal = "/img/icon-check-green.png";
      //   this.msgModal = data.message;
      //   this.isSuccess = true;
      // } else {
      //   this.imgModal = "/img/icon-unsuccess.png";
      //   this.msgModal = data.detail[0];
      //   this.isSuccess = false;
      // }

      // this.isDisable = false;
    },
  },
};
</script>
