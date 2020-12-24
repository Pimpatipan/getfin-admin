<template>
  <div v-if="form">
    <form class="form-box">
      <b-row class="no-gutters bg-white px-4 pb-4">
        <b-col>
          <b-row class="my-3">
            <b-col class="d-flex align-items-md-center main-label"
              >ที่อยู่คลังสินค้า</b-col
            >
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4 my-auto"
                classInputName="col-lg-6"
                textFloat="ชื่อคลังสินค้า"
                placeholder="ชื่อคลังสินค้า"
                type="text"
                name="warehouseName"
                v-model="form.userWarehouseAddress.name"
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
                name="sellerId"
                v-model="form.userWarehouseAddress.houseNo"
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
                v-model="form.userWarehouseAddress.buildingVillage"
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
                v-model="form.userWarehouseAddress.roadAlley"
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
                      จังหวัด
                      <span> :</span>
                    </label>
                  </div>
                  <div class="col-lg-6 pl-2 pt-1">
                    {{ form.userWarehouseAddress.provinceName }}
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
                      อำเภอ
                      <span> :</span>
                    </label>
                  </div>
                  <div class="col-lg-6 pl-2 pt-1">
                    {{ form.userWarehouseAddress.districtName }}
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
                      ตำบล
                      <span> :</span>
                    </label>
                  </div>
                  <div class="col-lg-6 pl-2 pt-1">
                    {{ form.userWarehouseAddress.subdistrictName }}
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
                textFloat="เบอร์โทรศัพท์"
                placeholder="เบอร์โทรศัพท์"
                type="text"
                name="phoneNo"
                v-model="form.userWarehouseAddress.telephone"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row class="">
            <b-col>
              <InputText
                classLabelName="col-lg-4 my-auto"
                classInputName="col-lg-6"
                textFloat="อีเมล"
                placeholder="อีเมล"
                type="text"
                name="email"
                v-model="form.userWarehouseAddress.email"
                :disabled="true"
              />
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
                @click="onchangeApproveOrReject(false, 3)"
                class="btn btn-details-set btn-cancel mr-1"
                >ปฏิเสธ</b-button
              ><b-button
                :disabled="isDisable"
                @click="onchangeApproveOrReject(true, 3)"
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
  },
};
</script>