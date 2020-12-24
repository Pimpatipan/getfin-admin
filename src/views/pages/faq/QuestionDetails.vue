<template>
  <div>
    <form class="form-box">
      <b-container class="container-box">
        <b-row class="no-gutters">
          <b-col>
            <h1 class="font-weight-bold header-main text-uppercase mb-3">
              แก้ไขคำถาม
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
                  @change="useSameLanguage"
                  v-model="form.faq.isSameLanguage"
                  >ใช้เหมือนกันทุกภาษา</b-form-checkbox
                >
              </div></b-col
            >
            <b-col cols="6" class="text-right">
              <b-button
                type="button"
                class="btn btn-language"
                v-for="(language, index) in languageList"
                v-bind:key="index"
                v-bind:class="[languageActive == language.id ? 'active' : '']"
                @click="changeLanguage(language.id, index)"
                :disabled="form.faq.isSameLanguage ? true : false"
              >
                <span class="text-uppercase">{{ language.nation }}</span>
              </b-button>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <div
                v-for="(item, index) in form.faq.translationList"
                v-bind:key="index"
              >
                <div
                  v-bind:class="[
                    languageActive == item.languageId ? '' : 'd-none',
                  ]"
                >
                  <InputText
                    textFloat="คำถาม"
                    placeholder="คำถาม"
                    type="text"
                    name="question"
                    :img="imageLogoLang"
                    v-model="item.question"
                    isRequired
                    :isValidate="
                      $v.form.faq.translationList.$each.$iter[index].question
                        .$error
                    "
                    :v="$v.form.faq.translationList.$each.$iter[index].question"
                  />
                </div>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <div
                v-for="(item, index) in form.faq.translationList"
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
                        textFloat="คำอธิบาย"
                        :rows="8"
                        :value="item.answer"
                        :name="'description_' + item.languageId"
                        :img="imageLogoLang"
                        placeholder="Type something..."
                        isRequired
                        :v="
                          $v.form.faq.translationList.$each.$iter[index].answer
                        "
                        @onDataChange="(val) => (item.answer = val)"
                      />
                    </b-col>
                  </b-row>
                </div>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="6">
              <label class="font-weight-bold main-label">
                สถานะการแสดงผล
                <span class="text-danger">*</span>
              </label>
              <div>
                <div>
                  <b-form-checkbox
                    switch
                    v-model="form.faq.enabled"
                    class="radio-active"
                    size="lg"
                  >
                    <span class="ml-2 main-label">{{
                      form.faq.enabled ? "ใช้งาน" : "ไม่ใช้งาน"
                    }}</span>
                  </b-form-checkbox>
                </div>
                <!-- <b-form-checkbox switch v-model="form.product.enabled" class="radio-active" size="lg">
              <span class="ml-2 main-label">{{form.product.enabled ? 'Active' : 'Inactive' }}</span>
              </b-form-checkbox>-->
              </div>
            </b-col>
          </b-row>

          <b-row class="mt-5">
            <b-col md="6">
              <b-button
                v-if="isEdit"
                class="btn btn-danger btn-details-set mr-md-2"
                :disabled="isDisable"
                @click="openModalDelete(form.faq.translationList[0].question)"
                >ลบ</b-button
              >
              <router-link :to="{ path: '/faq/details/' + this.faqTopicId }">
                <b-button
                  class="btn-details-set btn-cancel"
                  :disabled="isDisable"
                  >ย้อนกลับ</b-button
                >
              </router-link>
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
    </form>
  </div>
</template>

<script>
import InputText from "@/components/inputs/InputText";
import TextEditor from "@/components/inputs/TextEditor";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
import VueCookies from "vue-cookies";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalAlertConfirm from "@/components/modal/alert/ModalAlertConfirm";
import ModalLoading from "@/components/modal/alert/ModalLoading";

export default {
  name: "FaqQuestionDetails",
  components: {
    InputText,
    TextEditor,
    ModalAlert,
    ModalAlertError,
    ModalAlertConfirm,
    ModalLoading,
  },
  data() {
    return {
      isEdit: false,
      isDisable: false,
      isSuccess: false,
      imgModal: null,
      msgModal: null,
      languageList: [],
      imageLogoLang: "",
      existId: "",
      languageActive: 1,
      modalMessage: "",
      faqTopicId: 0,
      modalAlertShow: false,
      id: this.$route.params.id,
      form: {
        faq: {
          id: 0,
          faqTopicId: 0,
          enabled: false,
          sortOrder: 0,
          mainLanguageId: 0,
          isSameLanguage: false,
          translationList: [
            {
              languageId: 1,
              question: null,
              answer: null,
            },
            {
              languageId: 2,
              question: null,
              answer: null,
            },
          ],
        },
      },
    };
  },
  validations: {
    form: {
      faq: {
        translationList: {
          $each: {
            question: { required },
            answer: { required },
          },
        },
      },
    },
  },
  created: async function () {
    await this.getDatas();

    var elmnt = document.getElementsByClassName("c-sidebar-nav-link")[0];
    //var attr = elmnt.getAttributeNode("class").value;
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
        `${this.$baseUrl}/api/faq/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.form = data.detail;
        this.$v.form.$reset();

        if (this.form.faq.id > 0) {
          this.isEdit = true;
        }

        if (this.form.faq.isSameLanguage) {
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

      this.faqTopicId = VueCookies.get("faq_topic_id");
    },
    changeLanguage(id, index) {
      this.languageActive = id;
      this.imageLogoLang = this.languageList[index].imageUrl;
    },
    checkForm: async function (flag) {
      if (this.form.faq.isSameLanguage) {
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
      this.$refs.modalLoading.show();
      this.form.faq.faqTopicId = parseInt(this.faqTopicId);
      this.isDisable = true;

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/FAQ/save`,
        null,
        this.$headers,
        this.form
      );

      this.$refs.modalLoading.hide();
      this.modalMessage = data.message;
      if (data.result == 1) {
        this.existId = data.detail;
        this.modalMessage = "สำเร็จ";
        this.$refs.modalAlert.show();

        if (this.flag == 1) {
          setTimeout(function () {
            window.location.href =
              "/faq/details/" + VueCookies.get("faq_topic_id");
          }, 3000);
        } else {
          if (this.id > 0) {
            this.getDatas();
          } else {
            this.form.faq.id = this.existId;
            this.id = this.existId;
            this.isEdit = true;
            this.$router.push({
              path: `/faq/details/question/${this.existId}`,
            });
          }
        }
      } else {
        this.$refs.modalAlertError.show();
      }

      this.isDisable = false;
    },
    useSameLanguage: async function () {
      Vue.nextTick(() => {
        if (this.form.faq.isSameLanguage) {
          this.imageLogoLang = "";
          this.form.faq.mainLanguageId = this.languageActive;
          let data = this.form.faq.translationList.filter(
            (val) => val.languageId == this.form.faq.mainLanguageId
          );

          if (this.id == 0) {
            if (data.length == 1) {
              data = data[0];
              for (
                let index = 0;
                index < this.form.faq.translationList.length;
                index++
              ) {
                this.form.faq.translationList[index].question = data.question;
                this.form.faq.translationList[index].answer = data.answer;
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

          let data = this.form.faq.translationList.filter(
            (val) => val.languageId != this.form.faq.mainLanguageId
          );
          if (this.id == 0) {
            if (data.length == 1) {
              data = data[0];
              data.question = "";
              data.answer = "";
            }
          }
        }
      });
    },
    checkValidateTranslationList: async function () {
      let isError = false;
      this.languageList.forEach((element, index) => {
        if (!isError) {
          if (this.$v.form.faq.translationList.$each.$iter[index].$error) {
            this.languageActive = this.$v.form.faq.translationList.$model[
              index
            ].languageId;

            this.imageLogoLang = this.languageList[index].imageUrl;

            isError = true;
          }
        }
      });
    },
    openModalDelete(value) {
      //this.requestDeleteUser.userId = value.id;
      this.modalMessage = "คุณต้องการลบ " + value + " ใช่หรือไม่?";
      this.$refs.isModalAlertConfirm.show();
    },
    btnDelete: async function () {
      this.$refs.isModalAlertConfirm.hide();
      let resData = await this.$callApi(
        "delete",
        `${this.$baseUrl}/api/FAQ/remove/${this.id}`,
        null,
        this.$headers,
        null
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        this.$refs.modalAlert.show();
        setTimeout(function () {
          window.location.href =
            "/faq/details/" + VueCookies.get("faq_topic_id");
        }, 3000);
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    deleteData: async function () {
      if (confirm("Are you sure you want to delete this data?") == true) {
        let data = await this.$callApi(
          "delete",
          `${this.$baseUrl}/api/faq/remove/${this.id}`,
          null,
          this.$headers,
          null
        );

        if (data.result == 1) {
          window.location.href = "/faq";
        }
      }
    },
  },
};
</script>
