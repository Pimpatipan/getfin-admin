<template>
  <div v-if="form">
    <form class="form-box">
      <b-container class="container-box">
        <b-row class="no-gutters">
          <b-col sm="6">
            <h1 class="font-weight-bold header-main text-uppercase">
              รายละเอียดการคืนสินค้า
            </h1>
          </b-col>
          <b-col class="text-center text-sm-right" sm="6">
            <b-form-select
              :options="statuslist"
              class="w-300"
              valueField="id"
              textField="name"
              v-model="statusId"
              @change="onChangeReturnStatus($event)"
            ></b-form-select>
          </b-col>
        </b-row>

        <b-row class="no-gutters mt-2">
          <b-col>
            <div class="bg-white p-3 mb-3">
              <p class="font-weight-bold text-center text-lg-left mb-2">
                เลขที่การสั่งซื้อ :
                <span class="font-weight-normal">
                  <router-link :to="'/order/details/' + form.order.id">
                    <span
                      v-if="form.order.invoiceNo != ''"
                      class="text-underline"
                    >
                      {{ form.order.invoiceNo }}
                    </span>
                    <span v-else class="text-underline">{{
                      form.order.quotationNo
                    }}</span>
                  </router-link>
                </span>
              </p>

              <p class="font-weight-bold text-center text-lg-left mb-2">
                วันที่ / เวลา :
                <span class="font-weight-normal">
                  {{
                    new Date(form.order.createdTime) | moment($formatDateTime)
                  }}</span
                >
              </p>
            </div>

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
                      {{ form.order.firstname }}
                      {{ form.order.lastname }}</b-col
                    >

                    <b-col xl="4" class="font-weight-bold">เบอร์โทร :</b-col>
                    <b-col class="mb-2 mb-sm-0" xl="8">{{
                      form.order.telephone
                    }}</b-col>

                    <b-col xl="4" class="font-weight-bold">อีเมล :</b-col>
                    <b-col class="mb-2 mb-sm-0" xl="8">{{
                      form.order.email
                    }}</b-col>

                    <b-col xl="4" class="font-weight-bold">ระดับ :</b-col>
                    <b-col xl="8">{{ form.order.tier }}</b-col>
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
                      >{{ form.order.shippingAddress.firstname }}
                      {{ form.order.shippingAddress.lastname }}</b-col
                    >

                    <b-col class="my-2 mb-sm-0" md="12">
                      {{ form.order.shippingAddress.address }}
                      {{ form.order.shippingAddress.subDistrict }}
                      {{ form.order.shippingAddress.district }}
                      {{ form.order.shippingAddress.province }}
                      {{ form.order.shippingAddress.code }}</b-col
                    >

                    <b-col class="my-2 mb-sm-0" md="12"
                      >โทร : {{ form.order.shippingAddress.telephone }}</b-col
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
                      >{{ form.order.billingAddress.firstname }}
                      {{ form.order.billingAddress.lastname }}</b-col
                    >

                    <b-col class="my-2 mb-sm-0" md="12"
                      >{{ form.order.billingAddress.address }}
                      {{ form.order.billingAddress.subDistrict }}
                      {{ form.order.billingAddress.district }}
                      {{ form.order.billingAddress.province }}
                      {{ form.order.billingAddress.code }}</b-col
                    >

                    <b-col class="my-2 mb-sm-0" md="12"
                      >โทร : {{ form.order.billingAddress.telephone }}</b-col
                    >
                  </b-row>
                </div>
              </b-col>
            </b-row>

            <div class="bg-white mt-3">
              <b-row class="p-3">
                <b-col class="text-center text-sm-left">
                  <p class="font-weight-bold my-2">รายละเอียดการคืนสินค้า</p>
                </b-col>
              </b-row>

              <div
                v-if="form.orderItems.length != 0"
                v-for="(item, index) in form.orderItems"
                :key="index"
              >
                <div class="row no-gutters bg-gray-return py-3">
                  <div class="col-3">
                    <div
                      class="square-box square-ratio-pt b-contain"
                      v-bind:style="{
                        'background-image': 'url(' + item.productImageUrl + ')',
                      }"
                    ></div>
                  </div>
                  <div class="col-5">
                    <div class>
                      <p class="font-weight-bold mb-1">SKU: {{ item.sku }}</p>
                      <p class="m-0 two-lines">
                        {{ item.productName }}
                      </p>

                      <div class="d-flex">
                        <div
                          v-for="(item, index) in item.attribute"
                          class="config-tag mr-1 mt-1"
                        >
                          {{ item.label }} : {{ item.option.label }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-3 text-center">
                    <p
                      class="text-success return-status"
                      v-if="item.returnStatusId == 2"
                    >
                      ยืนยันการคืนสินค้า
                    </p>
                    <p
                      class="text-success return-status"
                      v-else-if="item.returnStatusId == 4"
                    >
                      คืนสำเร็จ
                    </p>
                    <p
                      class="text-danger return-status"
                      v-else-if="item.returnStatusId == 3"
                    >
                      ปฏิเสธการคืนสินค้า
                    </p>
                    <p class="text-warning return-status" v-else>ขอคืนสินค้า</p>
                  </div>
                  <div class="col-1 text-center m-auto">
                    <b-button
                      v-if="form.orderItems.length > 1"
                      class="btn btn-danger mr-md-2"
                      @click="deleteReturn(item, index)"
                      >ลบ</b-button
                    >
                  </div>
                </div>
                <b-row class="p-3" v-if="form.orderItems.length != 0">
                  <b-col cols="12" class="text-left">
                    <p class="font-weight-bold mb-2">รายละเอียดคำขอ</p>
                    <p
                      class="mb-1"
                      v-if="item.returnOrderProductImage.length != 0"
                    >
                      รูปสินค้า
                    </p>

                    <div
                      v-bind:style="{
                        'background-image': 'url(' + item.path + ')',
                      }"
                      @click="showPreview(item.path)"
                      v-for="(item, index) in item.returnOrderProductImage"
                      :key="index"
                      class="img-doc d-inline-block mr-2 return-pic pointer my-3"
                    ></div>

                    <p class="mb-1">
                      เหตุผลในการคืนสินค้า:
                      <span v-if="item.returnReason != null">{{
                        item.returnReason
                      }}</span>
                      <span v-else>-</span>
                    </p>
                    <!-- <p class="mb-1">รายละเอียด: -</p> -->
                  </b-col>
                </b-row>

                <hr class="m-0" />

                <b-row class="p-3" v-if="form.orderItems.length != 0">
                  <b-col cols="12" class="text-left">
                    <p class="font-weight-bold mb-2">รายละเอียดคำขอคืนสินค้า</p>
                    <p
                      class="mb-1"
                      v-if="form.returnOrderDetailImage.length != 0"
                    >
                      รูปสลิป
                    </p>

                    <div
                      @click="showPreview(item.path)"
                      v-bind:style="{
                        'background-image': 'url(' + item.path + ')',
                      }"
                      v-for="(item, index) in form.returnOrderDetailImage"
                      :key="index"
                      class="img-doc d-inline-block mr-2 return-pic pointer my-3"
                    ></div>

                    <p class="mb-1">
                      รูปแบบการส่ง:
                      <span v-if="item.shippingType != null">{{
                        item.shippingType
                      }}</span>
                      <span v-else>-</span>
                    </p>
                    <p class="mb-1">
                      เลขพัสดุ:
                      <span v-if="item.trackingNumber != null">{{
                        item.trackingNumber
                      }}</span>
                      <span v-else>-</span>
                    </p>
                    <p class="mb-1">
                      ชื่อธนาคาร:
                      <span v-if="item.bankName != null">{{
                        item.bankName
                      }}</span>
                      <span v-else>-</span>
                    </p>
                    <p class="mb-1">
                      เลขที่บัญชี:
                      <span v-if="item.bankAccountNo != null">{{
                        item.bankAccountNo
                      }}</span>
                      <span v-else>-</span>
                    </p>
                    <p class="mb-1">
                      ชื่อบัญชี:
                      <span v-if="item.bankAccountName != null">{{
                        item.bankAccountName
                      }}</span>
                      <span v-else>-</span>
                    </p>
                  </b-col>
                </b-row>
              </div>

              <div class="p-3">
                <InputTextArea
                  class="mb-4"
                  textFloat="หมายเหตุสำหรับรายการนี้"
                  placeholder="หมายเหตุสำหรับรายการนี้"
                  type="text"
                  name="answer"
                  rows="5"
                  v-model="note"
                />
              </div>

              <div>
                <b-table
                  striped
                  responsive
                  hover
                  :items="form.returnOrderStatusLogs"
                  :fields="fieldsLog"
                  show-empty
                  empty-text="ไม่พบข้อมูล"
                  class="table-list"
                >
                  <template v-slot:cell(createdTime)="data">
                    <span>{{
                      new Date(data.item.createdTime) | moment($formatDateTime)
                    }}</span>
                  </template>
                  <template v-slot:cell(firstname)="data">
                    {{ data.item.firstname }} {{ data.item.lastname }}
                  </template>
                  <template v-slot:cell(note)="data">
                    <div v-if="data.item.note == '' || data.item.note == null">
                      -
                    </div>
                    <div v-else>{{ data.item.note }}</div>
                  </template>
                </b-table>
              </div>

              <b-row class="no-gutters p-3">
                <b-col md="4">
                  <b-button
                    href="/return"
                    :disabled="isDisable"
                    class="btn-details-set btn-secondary text-uppercase"
                    >ย้อนกลับ</b-button
                  >
                </b-col>
                <b-col md="8" class="text-sm-right">
                  <button
                    :disabled="isDisable"
                    type="button"
                    class="btn btn-details-set btn-success ml-md-2 text-uppercase"
                    @click="updateReturnStatus()"
                  >
                    บันทึก
                  </button>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </form>

    <b-modal
      id="showPreviewModal"
      ref="showPreviewModal"
      hide-header
      hide-footer
      centered
      body-class="p-4"
      size="md"
    >
      <div class="modal-header border-0 px-0 pt-0">
        <!-- <h3 class="font-weight-bold">Image Preview</h3> -->
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$bvModal.hide('showPreviewModal')"
        >
          ×
        </button>
      </div>
      <div>
        <b-container class="p-0">
          <b-row>
            <b-col>
              <div
                class="preview-box b-contain m-auto border-0"
                v-bind:style="{ 'background-image': 'url(' + img + ')' }"
              ></div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-modal>

    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
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
  name: "ReturnDetails",
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
      form: null,
      statusId: 0,
      modalMessage: "",
      img: "",
      note: "",
      request: null,
      deleteId: [],
      fieldsLog: [
        {
          key: "createdTime",
          label: `วันที่ทำรายการ`,
          class: "w-100px",
        },
        {
          key: "returnOrderStatus",
          label: `สถานะ`,
          class: "w-100px",
        },
        {
          key: "firstname",
          label: `อัพเดทโดย`,
          class: "w-100px",
        },
        {
          key: "note",
          label: `หมายเหตุ`,
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
    showPreview(img) {
      this.img = img;
      this.$refs["showPreviewModal"].show();
    },
    getData: async function () {
      this.isBusy = true;

      let status = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Transaction/ReturnOrder/ReturnStatus`,
        null,
        this.$headers,
        null
      );

      if (status.result == 1) {
        this.statuslist = status.detail;
      }

      let resData = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Transaction/ReturnOrder/` + this.id,
        null,
        this.$headers,
        null
      );
      if (resData.result == 1) {
        this.form = resData.detail;
        if (this.form.orderItems.length != 0)
          this.statusId = this.form.returnStatusId;
        this.isBusy = false;
        this.$isLoading = true;
      }
    },
    updateReturnStatus: async function (id) {
      this.isDisable = true;
      this.$refs.modalLoading.show();

      var item = [];

      for (var i = 0; i < this.form.orderItems.length; i++) {
        item.push({
          productId: this.form.orderItems[i].productId,
          returnOrderId: this.form.orderItems[i].returnOrderId,
          note: this.note,
          returnStatusId: this.form.returnStatusId,
        });
      }

      this.request = {
        id: this.form.id,
        orderId: this.form.orderId,
        orderItems: item,
        deleteProduct: this.deleteId,
        orderStatusId: this.statusId,
      };

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Transaction/ReturnOrder/save`,
        null,
        this.$headers,
        this.request
      );
      this.$refs.modalLoading.hide();
      this.modalMessage = resData.message;
      this.isDisable = false;
      if (resData.result == 1) {
        this.$refs.modalAlert.show();
        this.note = "";
        this.getData();
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    onChangeReturnStatus: async function (value) {
      if (value != 0) {
        this.statusId = value;
      }
    },
    deleteReturn(data, index) {
      this.form.orderItems.splice(index, 1);
      this.deleteId.push(data.productId);
    },
  },
};
</script>

<style scoped>
.review-shortdesc {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
}

.config-tag {
  background: #ff0641;
  padding: 1px 5px;
  color: white;
  border-radius: 15px;
  font-size: 12px;
}

.return-status {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}

div {
  word-break: break-word;
}

@media (max-width: 1200px) {
  .btn-return {
    width: 100px !important;
  }
}
</style>