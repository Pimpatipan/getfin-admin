<template>
  <div>
    <form class="form-box">
      <b-row class="no-gutters bg-white px-4 pb-4">
        <b-col>
          <b-row class="my-3">
            <b-col class="d-flex align-items-md-center main-label"
              >ข้อมูลธุรกิจ</b-col
            >
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4 my-auto"
                classInputName="col-lg-6"
                textFloat="ชื่อจดทะเบียน / ชื่อบริษัท"
                placeholder="ชื่อจดทะเบียน / ชื่อบริษัท"
                type="text"
                name="companyName"
                v-model="form.businessInformation.name"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4 my-auto"
                classInputName="col-lg-6"
                textFloat="ที่อยู่"
                placeholder="ที่อยู่"
                type="text"
                name="houseNo"
                v-model="form.businessInformation.houseNo"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4 my-auto"
                classInputName="col-lg-6"
                textFloat="ตึก / หมู่บ้าน"
                placeholder="ตึก / หมู่บ้าน"
                type="text"
                name="building"
                v-model="form.businessInformation.buildingVillage"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4 my-auto"
                classInputName="col-lg-6"
                textFloat="ถนน / ซอย"
                placeholder="ถนน / ซอย"
                type="text"
                name="road"
                v-model="form.businessInformation.roadAlley"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <div class="mt-2 mx-3">
                <div class="row">
                  <div :class="['select-custom p-0 col-lg-4 my-auto']">
                    <label class="font-weight-bold my-auto">
                      จังหวัด
                      <span> :</span>
                    </label>
                  </div>
                  <div class="col-lg-6 pl-2 pt-1">
                    {{ form.businessInformation.provinceName }}
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <div class="mt-3 mx-3">
                <div class="row">
                  <div :class="['select-custom p-0 col-lg-4 my-auto']">
                    <label class="font-weight-bold my-auto">
                      อำเภอ
                      <span> :</span>
                    </label>
                  </div>
                  <div class="col-lg-6 pl-2 pt-1">
                    {{ form.businessInformation.districtName }}
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <div class="mt-3 mb-2 mx-3">
                <div class="row">
                  <div :class="['select-custom p-0 col-lg-4 my-auto']">
                    <label class="font-weight-bold my-auto">
                      ตำบล
                      <span> :</span>
                    </label>
                  </div>
                  <div class="col-lg-6 pl-2 pt-1">
                    {{ form.businessInformation.subdistrictName }}
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4 my-auto"
                classInputName="col-lg-6"
                textFloat="เลขทะเบียนนิติบุคคล"
                placeholder="เลขทะเบียนนิติบุคคล"
                type="text"
                name="sellerId"
                text=""
                filename=""
                :maxLength="13"
                @onKeypress="isNumber($event)"
                v-model="form.businessInformation.businessRegistrationNo"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col>
              <div class="mt-2 mx-3">
                <div class="row">
                  <div :class="['select-custom p-0 col-lg-4 my-auto']">
                    <label class="font-weight-bold">
                      หนังสือรับรองบริษัท
                      <span> :</span>
                    </label>
                  </div>
                  <div class="col-lg-6 pl-2 pt-1">
                    {{
                      form.businessInformation.businessInformationDocument.split(
                        "/"
                      )[4]
                    }}

                    <span
                      class="pl-5 text-primary text-underline pointer"
                      @click="
                        downloadItem(
                          form.businessInformation.businessInformationDocument
                        )
                      "
                      >ดาวน์โหลดเอกสาร</span
                    >
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <div class="mt-2 mx-3">
                <div class="row">
                  <div :class="['select-custom p-0 col-lg-4 my-auto']">
                    <label class="font-weight-bold">
                      ใบทะเบียนภาษีมูลค่าเพิ่ม ภ.พ. 20
                      <span> :</span>
                    </label>
                  </div>
                  <div class="col-lg-6 pl-2 pt-1">
                    {{
                      form.businessInformation.taxRegistrationDocument.split(
                        "/"
                      )[4]
                    }}

                    <span
                      class="pl-5 text-primary text-underline pointer"
                      @click="
                        downloadItem(
                          form.businessInformation.taxRegistrationDocument
                        )
                      "
                      >ดาวน์โหลดเอกสาร</span
                    >
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <div class="mt-2 mx-3">
                <div class="row">
                  <div :class="['select-custom p-0 col-lg-4 my-auto']">
                    <label class="font-weight-bold">
                      จังหวัดที่ตั้งของบริษัท
                      <span> :</span>
                    </label>
                  </div>
                  <div class="col-lg-6 pl-2 pt-1">
                    {{ form.businessInformation.companyProvinceName }}
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col lg="4">
              <label class="main-label"
                >บริษัทจดทะเบียนภาษีมูลค่าเพิ่ม (VAT)</label
              >
            </b-col>
            <b-col lg="6">
              {{ form.businessInformation.vat ? "ใช่" : "ไม่ใช่" }}
            </b-col>
          </b-row>
          <b-row class="my-4">
            <b-col class="d-flex justify-content-end"
              ><div class="w-100"><hr /></div
            ></b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <label class="font-weight-bold"
                >กรุณาบอกเหตุผลในการปฏิเสธข้อมูล</label
              >
            </b-col>
            <b-col cols="6" class="text-right">
              <label class="font-weight-bold">{{ new Date(dataLog.updatedTime) | moment($formatDate) }}</label>
            </b-col>
            <div class="px-3">
              <p>{{ dataLog.warningLog.note }}</p>
            </div>
          </b-row>
          <b-row class="">
            <b-col class="d-flex justify-content-center"
              ><b-button
                variant="info"
                :disabled="isReject"
                @click="onchangeApproveOrReject(false, 1)"
                class="btn btn-details-set btn-cancel mr-1"
                >ปฏิเสธ</b-button
              ><b-button
                :disabled="isDisable"
                @click="onchangeApproveOrReject(true, 1)"
                class="btn btn-main btn-details-set"
                >ยืนยัน</b-button
              ></b-col
            >
          </b-row>
        </b-col>
      </b-row>
    </form>
    <!-- Modal -->
    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
  </div>
</template>

<script>
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import InputText from "../../../seller/components/inputs/InputText";
import InputSelect from "../../../seller/components/inputs/InputSelect";
import UploadFile from "../../../seller/components/inputs/UploadFile";
import axios from "axios";

export default {
  name: "user",
  props: {
    dataObject: {
      required: false,
      type: Object,
    },
    dataLog: {
      required: false,
      type: Object || Array,
    },
    isReject: {
      required: false,
      type: Boolean
    },
  },
  components: {
    ModalAlert,
    ModalAlertError,
    InputText,
    InputSelect,
    UploadFile,
  },
  data() {
    return {
      id: "",
      modalMessage: "",
      activeItem: "seller-account",
      isDisable: false,
      languageList: [],
      form: null,
      noteAdmin: "",
      options: [
        { text: "ใช่", value: true },
        { text: "ไม่ใช่", value: false },
      ],
    };
  },
  created: async function () {
    this.form = this.dataObject;
  },
  watch: {
    dataObject: function () {
      this.form = this.dataObject;
    },
    note: function () {
      this.noteAdmin = this.note;
    },
  },
  methods: {
    onchangeApproveOrReject: async function (status, index) {
      this.$emit("onchangeApproveOrReject", status, index);
    },
    downloadItem: async function (path) {
      let pathFile = path;

      var name_without_ext = path
        .split("\\")
        .pop()
        .split("/")
        .pop()
        .split(".")[0];

      axios({
        url: pathFile,
        method: "GET",
        // headers: null,
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${name_without_ext}.${response.data.type.split("/").pop(-1)}`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
  },
};
</script>