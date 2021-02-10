<template>
  <div v-if="form">
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0 mb-3">
        <b-col sm="6" class="text-center text-sm-left ">
          <h1 class="mr-sm-4 header-main text-uppercase">รายละเอียดผู้ขาย</h1>
        </b-col>
      </CRow>

      <div class="bg-white p-3">
        <b-row>
          <b-col>
            <p class="font-weight-bold main-label mb-2">ข้อมูลเกี่ยวกับราคาสินค้า</p>
          </b-col>
          <b-col class="text-right">
            <span class="label-text mr-3 txt-relative">ระงับการใช้งาน</span>
            <b-form-checkbox
              switch
              size="lg"
              class="d-inline-block mb-1"
              v-model="form.user.seller.enabled"
              value="false"
            unchecked-value="true"
            ></b-form-checkbox>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="ค่า GP ของร้านค้า"
              placeholder="ค่า GP ของร้านค้า"
              type="text"
              name
              isRequired
              v-model="form.user.seller.gp"
              @onKeypress="isNumber($event)"
              :isValidate="$v.form.user.seller.gp.$error"
              :v="$v.form.user.seller.gp"
            />
            <hr />
          </b-col>
        </b-row>

        <p class="font-weight-bold main-label mb-2">ข้อมูลทั่วไป</p>

        <b-row>
          <b-col>
            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="เลขที่ผู้ขาย"
              placeholder="เลขที่ผู้ขาย"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.user.seller.grossProfitId"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="ชื่อ"
              placeholder="ชื่อ"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.user.firstname"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="นามสกุล"
              placeholder="นามสกุล"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.user.lastname"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="อีเมลติดต่อ"
              placeholder="อีเมลติดต่อ"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.user.email"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="เบอร์โทรศัพท์ติดต่อ"
              placeholder="เบอร์โทรศัพท์ติดต่อ"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.user.telephone"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="ชื่อร้าน"
              placeholder="ชื่อร้าน"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.user.displayNameTranslation[0].name"
            />
            <hr />
          </b-col>
        </b-row>

        <p class="font-weight-bold main-label mb-2">ข้อมูลผู้ขาย</p>

        <b-row>
          <b-col>
            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="ชื่อบริษัท / ชื่อผู้ติดต่อ"
              placeholder="ชื่อบริษัท / ชื่อผู้ติดต่อ"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.businessInformation.name"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="เลขที่"
              placeholder="เลขที่"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.businessInformation.houseNo"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="อาคาร / หมู่บ้าน"
              placeholder="อาคาร / หมู่บ้าน"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.businessInformation.buildingVillage"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="ถนน / ซอย"
              placeholder="ถนน / ซอย"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.businessInformation.roadAlley"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="จังหวัด"
              placeholder="จังหวัด"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.businessInformation.provinceName"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="เขต / อำเภอ"
              placeholder="เขต / อำเภอ"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.businessInformation.districtName"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="แขวง / ตำบล"
              placeholder="แขวง / ตำบล"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.businessInformation.subdistrictName"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="เลขทะเบียนนิติบุคคล"
              placeholder="เลขทะเบียนนิติบุคคล"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.businessInformation.businessRegistrationNo"
            />

            <div>
              <UploadFileInline
                classLabelName="col-lg-4"
                classInputName="col-lg-6"
                classSection="col-lg-2 p-0 p-lg-2"
                textFloat="หนังสือรับรองบริษัท"
                placeholder="หนังสือรับรองบริษัท"
                format="all"
                :fileName="form.businessInformation.businessInformationDocument"
                text=" "
                name="businessDocument"
                section="registration"
                :disabled="true"
                v-model="form.businessInformation.businessInformationDocument"
              />
            </div>

            <UploadFileInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              classSection="col-lg-2 p-0 p-lg-2"
              textFloat="ใบทะเบียนภาษีมูลค่าเพิ่ม ภ.พ. 20"
              placeholder="ใบทะเบียนภาษีมูลค่าเพิ่ม ภ.พ. 20"
              format="all"
              :fileName="form.businessInformation.taxRegistrationDocument"
              text="* "
              name="businessDocument"
              section="tax"
              :disabled="true"
              v-model="form.businessInformation.taxRegistrationDocument"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="จังหวัดที่ตั้งบริษัท"
              placeholder="จังหวัดที่ตั้งบริษัท"
              type="text"
              name="name"
              :disabled="true"
              v-model="form.businessInformation.provinceName"
            />

            <b-row class="mt-2 no-gutters">
              <b-col lg="4">
                <label class="main-label mt-1">บริษัทจดทะเบียนภาษีมูลค่าเพิ่ม (VAT)</label>
              </b-col>
              <b-col lg="6">
                <b-form-group label class="mt-2">
                  <b-form-radio-group
                    id="radio-group-1"
                    v-model="form.businessInformation.vat"
                    :options="options"
                    name="radio-options"
                    disabled
                  ></b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>

        <p class="font-weight-bold main-label mb-2">ข้อมูลด้านการเงิน</p>

        <b-row>
          <b-col>
            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="เลขที่บัญชีธนาคาร"
              placeholder="เลขที่บัญชีธนาคาร"
              type="text"
              name
              :disabled="true"
              v-model="form.bankAccount.accountNo"
            />

            <InputTextInline
              classLabelName="col-lg-4"
              classInputName="col-lg-6"
              textFloat="ธนาคาร"
              placeholder="ธนาคาร"
              type="text"
              name
              :disabled="true"
              v-model="form.bankAccount.bankName"
            />
            <hr />
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col md="6">
            <b-button
              :href="'/seller/details/'+id"
              :disabled="isDisable"
              class="btn-details-set btn-cancel"
            >ย้อนกลับ</b-button>
          </b-col>
          <b-col md="6" class="text-sm-right">
            <button
              type="button"
              @click="checkForm(1)"
              :disabled="isDisable"
              class="btn btn-main btn-details-set ml-md-2 text-uppercase"
            >บันทึกและออก</button>
          </b-col>
        </b-row>
      </div>
    </div>
    <ModalAlert ref="modalAlert" :text="modalMessage" />
      <ModalAlertError ref="modalAlertError" :text="modalMessage" />
  </div>
</template>

<script>
import InputTextInline from "@/components/inputs/InputTextInline";
import UploadFileInline from "@/components/inputs/UploadFileInline";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import { required } from "vuelidate/lib/validators";

export default {
  name: "SellerProfile",
  components: {
    InputTextInline,
    UploadFileInline,
     ModalAlert,
    ModalAlertError,
  },
  data() {
    return {
      form: null,
      id: this.$route.params.id,
      isDisable: false,
      modalMessage: "",
      options: [
        { text: "Yes", value: true },
        { text: "No", value: false },
      ],
    };
  },
  validations: {
    form: {
      user: {
        seller: {
          gp: { required },
        },
      },
    },
  },
  created: async function () {
    await this.getData();
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
    getData: async function () {
      let body = {
        id: this.$route.params.id,
      };

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Seller/Detail`,
        null,
        this.$headers,
        body
      );
      if (resData.result == 1) {
        this.form = resData.detail.profile;
        this.$isLoading = true;
      }
    },
    checkForm: async function () {
      this.$v.form.$touch();

      if (this.$v.form.$error) {
        return;
      }

      this.isDisable = true;

      let body = {
        GrossProfitId: this.form.user.seller.grossProfitId,
        Id: this.id,
        GP: this.form.user.seller.gp,
        enabled: this.form.user.seller.enabled,
      };

      let data = await this.$callApi(
        "patch",
        `${this.$baseUrl}/api/Seller/Detail`,
        null,
        this.$headers,
        body
      );

      //this.modalAlertShow = true;
      this.modalMessage = data.message;
      this.isDisable = false;
      if (data.result == 1) {
        this.$refs.modalAlert.show();
        setTimeout(() => {
            this.$refs.modalAlert.hide();
          }, 3000);
        this.getData();
      } else {
        this.$refs.modalAlertError.show();
      }
    },
  },
};
</script>