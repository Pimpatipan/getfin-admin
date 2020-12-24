<template>
  <div v-if="form">
    <form class="form-box">
      <b-container class="container-box">
        <b-row class="no-gutters">
          <b-col sm="6" class="text-center text-sm-left">
            <h1 class="font-weight-bold header-main text-uppercase">
              รายละเอียดรอการตรวจสอบ
            </h1>
          </b-col>
          <b-col sm="6" class="text-sm-right">
            <button
              type="button"
              class="btn btn-main btn-details-set ml-md-3 text-uppercase nowrap"
              @click="sendApproveRejectRequest(true)"
              v-if="form.orderTransferDetail.statusId == 1"
            >
              ยอมรับ
            </button>
            <button
              type="button"
              class="btn btn-cancel btn-details-set ml-md-3 text-uppercase nowrap"
              @click="showRejectModal"
              v-if="form.orderTransferDetail.statusId == 1"
            >
              ปฏิเสธ
            </button></b-col
          >
        </b-row>

        <b-row class="no-gutters mt-2">
          <b-col>
            <b-row class="bg-white p-3 mb-3 no-gutters">
              <b-col sm="6">
                <div>
                  <p class="font-weight-bold text-center text-lg-left mb-2">
                    เลขที่การสั่งซื้อ :
                    <span class="font-weight-normal">
                      <span class="text-underline">
                        {{ form.orderTransferDetail.referenceCode }}
                      </span>
                    </span>
                  </p>

                  <p class="font-weight-bold text-center text-lg-left mb-2">
                    วันที่ / เวลา :
                    <span class="font-weight-normal">
                      {{
                        new Date(form.orderTransferDetail.createdTime)
                          | moment($formatDateTime)
                      }}</span
                    >
                  </p>
                </div></b-col
              >
              <b-col sm="6">
                <div class="text-center text-sm-right">
                  <p class="font-weight-bold mb-2">
                    อัพเดทล่าสุด :
                    <span class="font-weight-normal">
                      {{
                        new Date(form.orderTransferDetail.updatedTime)
                          | moment($formatDateTime)
                      }}
                    </span>
                  </p>

                  <p class="font-weight-bold mb-2">
                    สถานะ :
                    <span class="font-weight-normal">
                      {{ form.orderTransferDetail.status }}</span
                    >
                  </p>
                </div></b-col
              >
            </b-row>

            <b-row>
              <b-col md="4" class="text-lg-left">
                <div class="bg-white p-3 h-100">
                  <b-row>
                    <b-col cols="6">
                      <p class="font-weight-bold mb-2">ข้อมูลผู้ซื้อ</p>
                    </b-col>
                  </b-row>
                  <b-row class>
                    <b-col xl="4" class="font-weight-bold">ชื่อ :</b-col>
                    <b-col class="mb-2 mb-sm-0" xl="8">
                      {{ form.profile.firstname }}
                      {{ form.profile.lastname }}</b-col
                    >

                    <b-col xl="4" class="font-weight-bold">เบอร์โทร :</b-col>
                    <b-col class="mb-2 mb-sm-0" xl="8">{{
                      form.profile.telephone
                    }}</b-col>

                    <b-col xl="4" class="font-weight-bold">อีเมล :</b-col>
                    <b-col class="mb-2 mb-sm-0" xl="8">{{
                      form.profile.email
                    }}</b-col>

                    <b-col xl="4" class="font-weight-bold">ระดับ :</b-col>
                    <b-col xl="8">{{ form.profile.tier }}</b-col>
                  </b-row>
                </div>
              </b-col>
              <b-col md="4" class="text-lg-left">
                <div class="bg-white p-3 h-100">
                  <b-row>
                    <b-col cols="12">
                      <p class="font-weight-bold m-0">ที่อยู่ในการจัดส่ง</p>
                    </b-col>
                  </b-row>
                  <b-row class>
                    <b-col class="my-2 mb-sm-0" md="12"
                      >{{ form.shippingAddress.firstname }}
                      {{ form.shippingAddress.lastname }}</b-col
                    >

                    <b-col class="my-2 mb-sm-0" md="12">
                      {{ form.shippingAddress.address }}
                      {{ form.shippingAddress.subDistrict }}
                      {{ form.shippingAddress.district }}
                      {{ form.shippingAddress.province }}
                      {{ form.shippingAddress.code }}</b-col
                    >

                    <b-col class="my-2 mb-sm-0" md="12"
                      >โทร : {{ form.shippingAddress.telephone }}</b-col
                    >
                  </b-row>
                </div>
              </b-col>
              <b-col md="4" class="text-lg-left">
                <div class="bg-white p-3 h-100">
                  <b-row>
                    <b-col cols="12">
                      <p class="font-weight-bold m-0">ที่อยู่ในการออกใบเสร็จ</p>
                    </b-col>
                  </b-row>
                  <b-row class>
                    <b-col class="my-2 mb-sm-0" md="12"
                      >{{ form.billingAddress.firstname }}
                      {{ form.billingAddress.lastname }}</b-col
                    >

                    <b-col class="my-2 mb-sm-0" md="12"
                      >{{ form.billingAddress.address }}
                      {{ form.billingAddress.subDistrict }}
                      {{ form.billingAddress.district }}
                      {{ form.billingAddress.province }}
                      {{ form.billingAddress.code }}</b-col
                    >

                    <b-col class="my-2 mb-sm-0" md="12"
                      >โทร : {{ form.billingAddress.telephone }}</b-col
                    >
                  </b-row>
                </div>
              </b-col>
            </b-row>

            <b-row class="mt-3 bg-white no-gutters p-3">
              <b-col class="font-weight-bold m-auto"
                >รายละเอียดการสั่งซื้อ</b-col
              >
              <b-col class="text-right m-auto"
                ><span class="font-weight-bold"
                  >ยอดรวม : ฿{{
                    form.orderTransferDetail.total | numeral("0,0.00")
                  }}</span
                >
                <button
                  type="button"
                  class="btn btn-main btn-details-set ml-md-3 text-uppercase nowrap w-auto"
                  @click="showSlip"
                >
                  ดูรายละเอียดการชำระเงิน
                </button></b-col
              >
            </b-row>

            <div v-for="(item, index) in form.orders" v-bind:key="index">
              <b-row>
                <b-col>
                  <b-row class="px-3 py-2 order-header mt-3 no-gutters">
                    <b-col class="m-auto d-flex"
                      ><div
                        class="logo-seller"
                        v-bind:style="{
                          'background-image': 'url(' + item.store.logo + ')',
                        }"
                      ></div>
                      <span class="my-auto">{{ item.store.name }}</span></b-col
                    >
                  </b-row>

                  <div class="w-100 bg-white p-3">
                    <b-table
                      striped
                      responsive
                      :items="item.orderItemList"
                      :fields="fieldsOrder"
                      show-empty
                      empty-text="ไม่พบข้อมูล"
                      class="table-list m-0"
                    >
                      <template v-slot:cell(id)="data">
                        <p class="m-0">{{ data.index + 1 }}</p>
                      </template>
                      <template v-slot:cell(productImageUrl)="data">
                        <div
                          class="square-box b-contain"
                          v-bind:style="{
                            'background-image':
                              'url(' + data.item.productImageUrl + ')',
                          }"
                        ></div>
                      </template>
                      <template v-slot:cell(productName)="data">
                        <p class="m-0 nobreak">{{ data.item.productName }}</p>
                        <!-- <p class="m-0 nobreak">{{data.item.productShortDescription}}</p> -->
                        <div class="d-flex">
                          <div
                            v-for="(item, index) in data.item.attribute"
                            class="config-tag mr-1 mt-1"
                          >
                            {{ item.label }} : {{ item.option.label }}
                          </div>
                        </div>
                        <!-- <p class="m-0 nobreak">
                    <span class v-if="data.item.promocodeName != null">
                      Promotion :
                      {{ data.item.promocodeName }}
                    </span>
                  </p> -->
                      </template>
                      <template v-slot:cell(subtotal)="data">
                        <p class="m-0">
                          {{ data.item.subtotal | numeral("0,0.00") }}
                        </p>
                      </template>
                      <template v-slot:cell(discount)="data">
                        <p class="m-0">
                          {{ data.item.discount | numeral("0,0.00") }}
                        </p>
                      </template>
                      <template v-slot:cell(grandTotal)="data">
                        <p class="m-0">
                          {{ data.item.grandTotal | numeral("0,0.00") }}
                        </p>
                      </template>
                    </b-table>

                    <b-row class="mb-3 p-3">
                      <b-col sm="6" offset-md="6">
                        <div class="bg-yellow p-3">
                          <b-row class="pb-2">
                            <b-col cols="7">รวม</b-col>
                            <b-col cols="5" class="text-right"
                              >฿
                              {{
                                item.order.subtotal | numeral("0,0.00")
                              }}</b-col
                            >
                          </b-row>
                          <b-row class="pb-2">
                            <b-col cols="7">ส่วนลด</b-col>
                            <b-col cols="5" class="text-right"
                              >- ฿
                              {{
                                item.order.discount | numeral("0,0.00")
                              }}</b-col
                            >
                          </b-row>
                          <b-row class="pb-2">
                            <b-col cols="7">ค่าธรรมเนียม GetFin</b-col>
                            <b-col cols="5" class="text-right"
                              >฿
                              {{
                                item.order.getfinFee | numeral("0,0.00")
                              }}</b-col
                            >
                          </b-row>
                          <b-row class="pb-2">
                            <b-col cols="7">ค่าธรรมเนียม Omise</b-col>
                            <b-col cols="5" class="text-right"
                              >฿
                              {{
                                (item.order.omiseCharge + item.order.omiseVat)
                                  | numeral("0,0.00")
                              }}</b-col
                            >
                          </b-row>
                          <b-row class="pb-2 f-14">
                            <b-col cols="7" class="pl-4"
                              >ค่าธรรมเนียม Omise</b-col
                            >
                            <b-col cols="5" class="text-right"
                              >฿
                              {{
                                item.order.omiseCharge | numeral("0,0.00")
                              }}</b-col
                            >
                          </b-row>
                          <b-row class="pb-2 f-14">
                            <b-col cols="7" class="pl-4"
                              >ค่าธรรมเนียมรับชำระเงิน (3.65%)</b-col
                            >
                            <b-col cols="5" class="text-right"
                              >฿
                              {{
                                item.order.omiseVat | numeral("0,0.00")
                              }}</b-col
                            >
                          </b-row>
                          <b-row class="pb-2">
                            <b-col cols="7">ค่าขนส่ง</b-col>
                            <b-col cols="5" class="text-right"
                              >฿
                              {{
                                item.order.shippingCost | numeral("0,0.00")
                              }}</b-col
                            >
                          </b-row>
                          <b-row class="pb-2">
                            <b-col cols="7" class="font-weight-bold"
                              >รวมสุทธิ</b-col
                            >
                            <b-col cols="5" class="text-right font-weight-bold"
                              >฿
                              {{
                                item.order.grandTotal | numeral("0,0.00")
                              }}</b-col
                            >
                          </b-row>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </form>

    <b-modal
      id="rejectSlipModal"
      ref="rejectSlipModal"
      hide-header
      hide-footer
      no-close-on-backdrop
      centered
      body-class="p-4"
    >
      <div class="modal-header border-0 px-0 pt-0">
        <h3 class="font-weight-bold">กรุณาบอกเหตุผลในการปฏิเสธ</h3>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$bvModal.hide('rejectSlipModal')"
        >
          ×
        </button>
      </div>
      <div>
        <b-container class="p-0">
          <b-row>
            <b-col>
              <InputTextArea
                textFloat="เหตุผล"
                placeholder="เหตุผล"
                type="text"
                name="reject"
                v-model="note"
                @onKeyup="handleChangeBtnReject"
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="text-center mt-3">
        <b-button
          class="btn btn-main float-right"
          :disabled="isDisableRejectBtn"
          @click="sendApproveRejectRequest(false)"
          >บันทึก</b-button
        >
        <b-button
          class="btn btn-sub float-left"
          @click="$bvModal.hide('rejectSlipModal')"
          >ปิด</b-button
        >
      </div>
    </b-modal>

    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />

    <b-modal
      id="slipDetailsModal"
      ref="slipDetailsModal"
      hide-header
      hide-footer
      no-close-on-backdrop
      centered
      body-class="p-4"
      size="lg"
    >
      <div class="modal-header border-0 px-0 pt-0">
        <h3 class="font-weight-bold">รายละเอียดการโอน</h3>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$bvModal.hide('slipDetailsModal')"
        >
          ×
        </button>
      </div>
      <div>
        <b-container class="p-0" v-if="slip">
          <b-row>
            <b-col cols="6" class="slip-details">
              <b-row>
                <b-col lg="6" class="font-weight-bold">ธนาคารที่โอน :</b-col>
                <b-col lg="6">{{ slip.bank }}</b-col>
              </b-row>

              <b-row>
                <b-col lg="6" class="font-weight-bold"
                  >ยอดโอนที่ต้องชำระ :</b-col
                >
                <b-col lg="6">{{ slip.total | numeral("0,0.00") }}</b-col>
              </b-row>
            </b-col>
            <b-col cols="6" class="slip-details">
              <b-row>
                <b-col lg="6" class="font-weight-bold">วัน/เวลา :</b-col>
                <b-col lg="6">{{
                  new Date(slip.createdTime) | moment("DD/MM/YYYY HH:mm")
                }}</b-col>
              </b-row>
              <b-row>
                <b-col lg="6" class="font-weight-bold">ยอดที่โอนมา :</b-col>
                <b-col lg="6">{{
                  slip.transferTotal | numeral("0,0.00")
                }}</b-col>
              </b-row>
            </b-col>

            <b-col>
              <p class="font-weight-bold my-3 text-center">ตัวอย่างรูปสลิป</p>
              <div
                class="preview-box preview-box-slip"
                :class="[{ pointer: slip.imageUrl }]"
                v-bind:style="{
                  'background-image': 'url(' + slip.imageUrl + ')',
                }"
                @click="showPreview(slip.imageUrl)"
              ></div>
              <!-- <div class="text-center" v-if="slip.imageUrl != null">
                <span
                  @click="downloadItem(slip.imageUrl)"
                  class="text-primary text-underline pointer"
                  >Download</span
                >
              </div> -->
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-modal>

    <b-modal
      id="showSlipImgModal"
      ref="showSlipImgModal"
      hide-header
      hide-footer
      centered
      body-class="p-4"
      size="xl"
    >
      <div class="modal-header border-0 px-0 pt-0">
        <!-- <h3 class="font-weight-bold">Slip Image Preview</h3> -->
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$bvModal.hide('showSlipImgModal')"
        >
          ×
        </button>
      </div>
      <div>
        <b-container class="p-0">
          <b-row>
            <b-col>
              <div
                class="preview-box b-contain"
                v-bind:style="{ 'background-image': 'url(' + img + ')' }"
              ></div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-modal>

    <ModalLoading ref="modalLoading" :hasClose="false" />
  </div>
</template>

<script>
import sampleImg from "@/assets/images/cinna.jpg";
import InputTextArea from "@/components/inputs/InputTextArea";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalLoading from "@/components/modal/alert/ModalLoading";

export default {
  name: "VerifyDetails",
  components: {
    InputTextArea,
    ModalAlert,
    ModalAlertError,
    ModalLoading
  },
  data() {
    return {
      id: this.$route.params.id,
      selected: [],
      statuslist: [],
      selectedAll: false,
      isDisable: false,
      isDisableRejectBtn: true,
      form: null,
      statusId: 0,
      modalMessage: "",
      img: "",
      note: "",
      request: null,
      deleteId: [],
      img: "",
      slip: null,
      fieldsOrder: [
        {
          key: "id",
          label: "#",
        },
        {
          key: "sku",
          label: "SKU",
          class: "w-100px",
        },
        {
          key: "productImageUrl",
          label: "ภาพประกอบ",
          class: "w-100px",
        },
        {
          key: "productName",
          label: `รายละเอียด`,
          tdClass: "text-left w-200",
          thclass: "w-200",
        },
        {
          key: "orderItemQuantity",
          label: `จำนวน`,
        },
        {
          key: "subtotal",
          label: `ราคา`,
          class: "w-100px",
        },
        {
          key: "grandTotal",
          label: `รวม`,
          class: "w-100px",
        },
      ],
    };
  },
  created: async function () {
    await this.getData();
    this.$isLoading = true;
  },
  methods: {
    getData: async function () {
      this.isBusy = true;

      let resData = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Transaction/OrderTransfers/` + this.id,
        null,
        this.$headers,
        null
      );
      if (resData.result == 1) {
        this.form = resData.detail;
        // if (this.form.orderItems.length != 0)
        //   this.statusId = this.form.returnStatusId;
        // this.isBusy = false;
        this.$isLoading = true;
      }
    },
    showRejectModal() {
      this.$refs["rejectSlipModal"].show();
    },
    showSlip() {
      this.slip = this.form.orderTransferDetail;
      this.$refs["slipDetailsModal"].show();
    },
    showPreview(value) {
      this.img = value;
      this.$refs["showSlipImgModal"].show();
    },
    handleChangeBtnReject() {
      if (this.note != null) {
        this.isDisableRejectBtn = false;
      } else {
        this.isDisableRejectBtn = true;
      }
    },
    sendApproveRejectRequest: async function (status) {
      this.$refs.modalLoading.show();
      let request = {
        transactionId: this.form.orderTransferDetail.transactionId,
        note: this.note,
        result: status,
      };

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Transaction/OrderTransfer/Approve`,
        null,
        this.$headers,
        request
      );

      this.modalMessage = data.message;
      this.$refs.modalLoading.hide();
      this.$refs.rejectSlipModal.hide();

      if (data.result == 1) {
        this.isDisableRejectBtn = true;
        this.$refs.modalAlert.show();
        this.getData();
      } else {
        this.$refs.modalAlertError.show();
      }
    },
  },
};
</script>

<style scoped>
.order-header {
  background-color: #575757;
  color: white;
}

.logo-seller {
  width: 40px;
  height: 40px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.bg-yellow {
  background: #fff2d6;
  color: #333333;
}
</style>