<template>
  <div>
    <b-container class="container-box">
      <b-row class="no-gutters">
        <b-col>
          <h1 class="font-weight-bold header-main text-uppercase mb-3">
            สร้างหัวข้อคำถาม
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
                @change="useSameLanguage"
                v-model="form.faqTopic.isSameLanguage"
                >ใช้เหมือนกันทุกภาษา</b-form-checkbox
              >
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
              :disabled="form.faqTopic.isSameLanguage ? true : false"
            >
              <span class="text-uppercase">{{ language.nation }}</span>
            </b-button>
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col>
            <div
              v-for="(item, index) in form.faqTopic.translationList"
              v-bind:key="index"
            >
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none',
                ]"
              >
                <InputText
                  textFloat="ชื่อหัวข้อคำถาม"
                  placeholder="ชื่อหัวข้อคำถาม"
                  type="text"
                  name="name"
                  :img="imageLogoLang"
                  v-model="item.name"
                  isRequired
                  :isValidate="
                    $v.form.faqTopic.translationList.$each.$iter[index].name
                      .$error
                  "
                  :v="$v.form.faqTopic.translationList.$each.$iter[index].name"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <!-- 
        <b-row>
          <b-col>
            <div
              v-for="(item, index) in form.faqTopic.translationList"
              v-bind:key="index"
            >
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none',
                ]"
              >
                <InputTextArea
                  class="mb-4"
                  textFloat="คำบรรยาย"
                  placeholder="คำบรรยาย"
                  type="text"
                  name="desc"
                  rows="8"
                  :img="imageLogoLang"
                  v-model="item.description"
                  isRequired
                  :isValidate="
                    $v.form.faqTopic.translationList.$each.$iter[index]
                      .description.$error
                  "
                  :v="
                    $v.form.faqTopic.translationList.$each.$iter[index]
                      .description
                  "
                />
              </div>
            </div>
          </b-col>
        </b-row> -->

        <b-row>
          <b-col md="6">
            <div
              v-for="(item, index) in form.faqTopic.translationList"
              v-bind:key="index"
            >
              <div
                v-bind:class="[
                  languageActive == item.languageId ? '' : 'd-none',
                ]"
              >
                <InputText
                  textFloat="ลำดับการแสดง"
                  placeholder="ลำดับการแสดง"
                  type="text"
                  name="sortOrder"
                  @onKeypress="isNumber($event)"
                  :img="imageLogoLang"
                  v-model="form.faqTopic.sortOrder"
                  isRequired
                  :isValidate="$v.form.faqTopic.sortOrder.$error"
                  :v="$v.form.faqTopic.sortOrder"
                />
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <label class="font-weight-bold main-label">
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
              <!-- <b-form-checkbox switch v-model="form.product.enabled" class="radio-active" size="lg">
              <span class="ml-2 main-label">{{form.product.enabled ? 'Active' : 'Inactive' }}</span>
              </b-form-checkbox>-->
            </div>
          </b-col>
        </b-row>

        <div v-if="id > 0">
          <b-row>
            <b-col sm="6">
              <h4 class="f-16 font-weight-bold mt-3">
                รายการคำถามในหัวข้อ "
                <span>{{ this.form.faqTopic.translationList[0].name }}</span
                >"
              </h4>
            </b-col>
            <b-col sm="6">
              <div class="text-right">
                <router-link to="/faq/details/question/0">
                  <b-button class="btn-main mb-3">สร้างคำถาม</b-button>
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
              <template v-slot:cell(status)="data">
                <div v-if="data.item.status == true" class="text-success">
                  เปิดใช้งาน
                </div>
                <div v-else class="text-danger">ไม่เปิดใช้งาน</div>
              </template>
              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <router-link
                    :to="{ path: '/faq/details/question/' + data.item.id }"
                  >
                    <b-button variant="link" class="text-dark px-1 py-0">
                      <!-- <font-awesome-icon icon="pencil-alt" title="Edit" /> -->
                      แก้ไข
                    </b-button>
                  </router-link>
                  <b-button
                    variant="link"
                    class="text-dark px-1 py-0"
                    @click="openModalDeleteQuetion(data.item)"
                  >
                    <!-- ลบ -->
                    ลบ
                  </b-button>
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
            <b-button
              v-if="isEdit"
              class="btn btn-danger btn-details-set mr-md-2"
              :disabled="isDisable"
              @click="openModalDelete(form.faqTopic.translationList[0].name)"
              >ลบ</b-button
            >
            <b-button
              href="/faq"
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
      <ModalAlertConfirm
        msg="ยืนยันการลบ ?"
        :text="modalMessage"
        btnConfirm="ลบ"
        colorBtnConfirm="danger"
        btnCancel="ยกเลิก"
        ref="isModalAlertConfirmQuetion"
        @confirm="btnDeleteQuetion"
      />
      <ModalLoading ref="modalLoading" :hasClose="false" />
    </b-container>
  </div>
</template>

<script>
import InputText from "@/components/inputs/InputText";
// import InputTextArea from "@/components/inputs/InputTextArea";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalAlertConfirm from "@/components/modal/alert/ModalAlertConfirm";
import ModalLoading from "@/components/modal/alert/ModalLoading";

export default {
  name: "BannerDetails",
  components: {
    InputText,
    // InputTextArea,
    ModalAlert,
    ModalAlertError,
    ModalAlertConfirm,
    ModalLoading
  },
  data() {
    return {
      isEdit: false,
      isBusy: false,
      existId: "",
      isLoadingData: false,
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
          key: "question",
          label: "ชื่อหัวข้อคำถาม",
          class: "w-200",
        },
        {
          key: "sortOrder",
          label: "ลำดับการแสดง",
          class: "w-100px",
        },
        {
          key: "updatedTime",
          label: "วันที่ทำการอัพเดท",
        },
        {
          key: "status",
          label: "สถานะ",
        },
        {
          key: "id",
          label: "",
          class: "w-100px",
        },
      ],
      form: {
        faqTopic: {
          id: 1,
          enabled: true,
          sortOrder: 2,
          mainLanguageId: 0,
          isSameLanguage: false,
          translationList: [
            {
              languageId: 1,
              name: null,
              // description: "",
            },
            {
              languageId: 2,
              name: null,
              // description: "",
            },
          ],
        },
      },
    };
  },
  validations: {
    form: {
      faqTopic: {
        sortOrder: { required },
        translationList: {
          $each: {
            name: { required },
            // description: { required },
          },
        },
      },
    },
  },
  created: async function() {
    await this.getDatas();
    await this.getQuestionList();
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
    handleCloseModal: function() {
      if (this.flag == 1) {
        window.location.href = "/faq";
      } else {
        if (this.id > 0) {
          this.getDatas();
        } else {
          this.form.faqTopic.id = this.existId;
          this.id = this.existId;
          this.$cookies.set("faq_topic_id", this.id, 60 * 60 * 24 * 30);
          this.isEdit = true;
          this.$router.push({ path: `/faq/details/${this.existId}` });
        }
      }
    },
    getDatas: async function() {
      this.isLoadingData = true;

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
        `${this.$baseUrl}/api/FAQ/topic/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.form = data.detail;
        this.isLoadingData = false;
        this.$v.form.$reset();

        if (this.form.faqTopic.id > 0) {
          this.isEdit = true;
        }

        if (this.form.faqTopic.isSameLanguage) {
          this.imageLogoLang = "";
        } else {
          var index = this.languageList
            .map(function(x) {
              return x.id;
            })
            .indexOf(this.languageActive);
          this.imageLogoLang = this.languageList[index].imageUrl;
        }

         this.$isLoading = true;
      }

      await this.$cookies.set("faq_topic_id", this.id, 60 * 60 * 24 * 30);
    },
    getQuestionList: async function() {
      this.isBusy = true;

      let question = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/FAQ/list/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (question.result == 1) {
        this.items = question.detail.faqList;
      }

      this.isBusy = false;
    },
    changeLanguage(id, index) {
      this.languageActive = id;
      this.imageLogoLang = this.languageList[index].imageUrl;
    },
    checkForm: async function(flag) {
      if (this.form.faqTopic.isSameLanguage) {
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
      this.$refs.modalLoading.show();

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/FAQ/saveTopic`,
        null,
        this.$headers,
        this.form
      );
      this.modalMessage = data.message;
      this.$refs.modalLoading.hide();
      if (data.result == 1) {
        this.existId = data.detail;
        this.modalMessage = "สำเร็จ";
        this.$refs.modalAlert.show();

        if (this.flag == 1) {
          setTimeout(function() {
            window.location.href = "/faq";
          }, 3000);
        } else {
          if (this.id > 0) {
            this.getDatas();
          } else {
            this.form.faqTopic.id = this.existId;
            this.id = this.existId;
            this.isEdit = true;
            this.$router.push({ path: `/faq/details/${this.existId}` });
            this.getDatas();
          }
        }
      } else {
        this.$refs.modalAlertError.show();
      }

      this.isDisable = false;
    },
    useSameLanguage: async function() {
      Vue.nextTick(() => {
        if (this.form.faqTopic.isSameLanguage) {
          this.imageLogoLang = "";
          this.form.faqTopic.mainLanguageId = this.languageActive;
          let data = this.form.faqTopic.translationList.filter(
            val => val.languageId == this.form.faqTopic.mainLanguageId
          );

          if (this.id == 0) {
            if (data.length == 1) {
              data = data[0];
              for (
                let index = 0;
                index < this.form.faqTopic.translationList.length;
                index++
              ) {
                this.form.faqTopic.translationList[index].name = data.name;
                // this.form.faqTopic.translationList[index].description =
                //   data.description;
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

          let data = this.form.faqTopic.translationList.filter(
            val => val.languageId != this.form.faqTopic.mainLanguageId
          );
          if (this.id == 0) {
            if (data.length == 1) {
              data = data[0];
              data.name = "";
              // data.description = "";
            }
          }
        }
      });
    },
    checkValidateTranslationList: async function() {
      let isError = false;
      this.languageList.forEach((element, index) => {
        if (!isError) {
          if (this.$v.form.faqTopic.translationList.$each.$iter[index].$error) {
            this.languageActive = this.$v.form.faqTopic.translationList.$model[
              index
            ].languageId;

            this.imageLogoLang = this.languageList[index].imageUrl;

            isError = true;
          }
        }
      });
    },
    openModalDelete(value) {
      // this.requestDeleteUser.userId = value.id;
      this.modalMessage = "คุณต้องการลบ " + value + " ใช่หรือไม่?";
      this.$refs.isModalAlertConfirm.show();
    },
    btnDelete: async function() {
      this.$refs.isModalAlertConfirm.hide();
      let resData = await this.$callApi(
        "delete",
        `${this.$baseUrl}/api/FAQ/removeTopic/${this.id}`,
        null,
        this.$headers,
        null
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        this.$refs.modalAlert.show();
        setTimeout(function() {
          window.location.href = "/faq";
        }, 3000);
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    openModalDeleteQuetion(value) {
      this.requestDeleteUser.userId = value.id;
      this.modalMessage = "คุณต้องการลบ " + value.question + " ใช่หรือไม่?";
      this.$refs.isModalAlertConfirmQuetion.show();
    },
    btnDeleteQuetion: async function() {
      this.$refs.isModalAlertConfirmQuetion.hide();
      let resData = await this.$callApi(
        "delete",
        `${this.$baseUrl}/api/FAQ/remove/${this.requestDeleteUser.userId}`,
        null,
        this.$headers,
        null
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        this.$refs.modalAlert.show();
        this.getQuestionList();
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    deleteData: async function() {
      if (confirm("Are you sure you want to delete this data?") == true) {
        let data = await this.$callApi(
          "delete",
          `${this.$baseUrl}/api/FAQ/removeTopic/${this.id}`,
          null,
          this.$headers,
          null
        );

        if (data.result == 1) {
          window.location.href = "/faq";
        }
      }
    },
    deleteQuestion: async function(id) {
      if (confirm("Are you sure you want to delete this data?") == true) {
        let data = await this.$callApi(
          "delete",
          `${this.$baseUrl}/api/FAQ/remove/${id}`,
          null,
          this.$headers,
          null
        );

        if (data.result == 1) {
          this.getQuestionList();
        }
      }
    },
  },
};
</script>
