<template>
  <div v-if="form.order">
    <form class="form-box">
      <b-container class="container-box">
        <b-row class="no-gutters">
          <b-col>
            <h1 class="font-weight-bold header-main text-uppercase">
              รายละเอียดคำสั่งซื้อ หมายเลข. :
              <span v-if="form.order.invoiceNo != ''">
                {{ form.order.invoiceNo }}
              </span>
              <span v-else>{{ form.order.quotationNo }}</span>
            </h1>
          </b-col>
        </b-row>
        <b-row class="no-gutters mt-2">
          <!-- <b-col class="px-4 px-sm-5 py-4 vh-100" v-if="isLoadingData">
            <img src="/img/loading.svg" class="loading" alt="loading" />
          </b-col>-->

          <b-col>
            <b-row class="bg-white p-3 no-gutters">
              <b-col lg="6" class="text-lg-left order-1 order-lg-0">
                <p class="font-weight-bold text-center text-lg-left my-2">
                  วันที่ / เวลา :
                  <span class="font-weight-normal">
                    {{
                      new Date(form.order.createdTime) | moment($formatDateTime)
                    }}
                  </span>
                </p>

                <b-row>
                  <b-col cols="6">
                    <p class="mb-2 mt-2 font-weight-bold">ข้อมูลผู้ซื้อ</p>
                  </b-col>
                </b-row>
                <b-row class="mt-2 mb-3">
                  <b-col md="3" class="font-weight-bold">ชื่อ :</b-col>
                  <b-col class="mb-2 mb-sm-0" md="9"
                    >{{ form.order.firstname }} {{ form.order.lastname }}
                    <router-link
                      :to="'/affiliate/details/' + form.order.userGUID"
                    >
                      <span class="f-14 text-blue ml-3 text-underline"
                        >ดูรายละเอียด</span
                      ></router-link
                    >
                  </b-col>

                  <b-col md="3" class="font-weight-bold">เบอร์โทร :</b-col>
                  <b-col class="mb-2 mb-sm-0" md="9">
                    {{ form.order.telephone }}
                  </b-col>

                  <b-col md="3" class="font-weight-bold">อีเมล :</b-col>
                  <b-col class="mb-2 mb-sm-0" md="9">
                    {{ form.order.email }}
                  </b-col>

                  <b-col md="3" class="font-weight-bold">ระดับ :</b-col>
                  <b-col md="9">{{ form.order.memberType }}</b-col>
                </b-row>
              </b-col>
              <b-col
                lg="6"
                class="text-center text-lg-right order-0 order-lg-1"
              >
                <div
                  class="d-flex justify-content-center justify-content-lg-end"
                >
                  <p class="font-weight-bold my-2">สถานะ :</p>
                  <b-form-select
                    v-model="form.order.orderStatusId"
                    :class="['mb-1 statusSelect']"
                    ref="test"
                    :disabled="status"
                  >
                    <b-form-select-option
                      :value="item.id"
                      v-for="item in statusList"
                      v-bind:key="item.id"
                      :class="'status-' + item.id"
                      >{{ item.name }}</b-form-select-option
                    >
                  </b-form-select>
                </div>

                <div
                  v-if="form.order.isResendOrder"
                  class="f-14 d-inline-block"
                >
                  จัดส่งใหม่แล้ว
                </div>
              </b-col>
            </b-row>

            <b-row class="mt-2 mx-0">
              <b-col md="6" class="pl-md-0 pr-md-1 px-0 mb-2 mb-md-0">
                <div class="bg-white p-3 h-200">
                  <b-row>
                    <b-col cols="8">
                      <p class="font-weight-bold">ที่อยู่ในการจัดส่ง</p>
                    </b-col>
                    <b-col cols="4" class="text-right">
                      <!-- <p
                        class="pointer text-underline text-blue"
                        @click="printShippingLabel"
                      >
                        พิมพ์
                      </p> -->
                    </b-col>
                  </b-row>

                  <div class="address-box">
                    <p>
                      {{ form.order.shippingAddress.firstname }}
                      {{ form.order.shippingAddress.lastname }}
                    </p>
                    <p>
                      {{ form.order.shippingAddress.address }}
                      {{ form.order.shippingAddress.building }}
                      {{ form.order.shippingAddress.alley }}
                      {{ form.order.shippingAddress.road }}
                      {{ form.order.shippingAddress.subDistrict }}
                      {{ form.order.shippingAddress.district }}
                      {{ form.order.shippingAddress.province }}
                      {{ form.order.shippingAddress.code }}
                    </p>
                    <p class="mt-3">
                      โทร : {{ form.order.shippingAddress.telephone }}
                    </p>
                  </div>
                </div>
              </b-col>
              <b-col md="6" class="pr-md-0 pl-md-1 px-0">
                <div class="bg-white p-3 h-200">
                  <b-row>
                    <b-col cols="8">
                      <p class="font-weight-bold">ที่อยู่ในการออกใบเสร็จ</p>
                    </b-col>
                    <b-col cols="4" class="text-right">
                      <!-- <p
                        class="pointer text-underline text-blue"
                        @click="printShippingLabel"
                      >
                        พิมพ์
                      </p> -->
                    </b-col>
                  </b-row>
                  <div class="address-box">
                    <p>
                      {{ form.order.billingAddress.firstname }}
                      {{ form.order.billingAddress.lastname }}
                    </p>
                    <p>
                      {{ form.order.billingAddress.address }}
                      {{ form.order.billingAddress.building }}
                      {{ form.order.billingAddress.alley }}
                      {{ form.order.billingAddress.road }}
                      {{ form.order.billingAddress.subDistrict }}
                      {{ form.order.billingAddress.district }}
                      {{ form.order.billingAddress.province }}
                      {{ form.order.billingAddress.code }}
                    </p>
                    <p class="mt-3">
                      โทร : {{ form.order.billingAddress.telephone }}
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>

            <div class="mt-2">
              <b-button v-b-toggle.collapse-tracking class="collapse-btn">
                ข้อมูลการจัดส่ง
                <font-awesome-icon
                  icon="chevron-right"
                  class="icon float-right mt-1"
                />
                <font-awesome-icon
                  icon="chevron-down"
                  class="icon float-right mt-1"
                />
              </b-button>
              <b-collapse id="collapse-tracking" visible>
                <TrackingTimeline
                  :trackingNo="form.order.trackingNoShippingJung"
                  :shippingTypeName="form.order.shippingTypeName"
                />
              </b-collapse>
            </div>

            <div class="w-100 mt-3 bg-white">
              <b-table
                striped
                responsive
                :items="itemsOrder"
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
                        'url(' + data.item.productImageUrl + ')'
                    }"
                  ></div>
                </template>
                <template v-slot:cell(productName)="data">
                  <p class="m-0 nobreak">{{ data.item.productName }}</p>
                  <!-- <p class="m-0 nobreak">{{data.item.productShortDescription}}</p> -->
                  <div class="d-flex">
                    <div
                      v-for="(item, index) in data.item.attribute"
                      :key="index"
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
                <template v-slot:cell(gp)="data">
                  <p class="m-0">{{ data.item.gp }}%</p>
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
                      <b-col cols="7">ยอดรวม (รวม VAT)</b-col>
                      <b-col cols="5" class="text-right"
                        >฿ {{ form.order.subtotal | numeral("0,0.00") }}</b-col
                      >
                    </b-row>

                    <hr />

                    <b-row class="pb-2">
                      <b-col cols="7">ราคาทุน</b-col>
                      <b-col cols="5" class="text-right"
                        >฿
                        {{
                          form.order.totalWithoutGetFinFee | numeral("0,0.00")
                        }}</b-col
                      >
                    </b-row>

                    <b-row class="pb-2">
                      <b-col cols="7">ค่าธรรมเนียมบริการต่างๆ</b-col>
                      <b-col cols="5" class="text-right"
                        >฿ {{ form.order.getfinFee | numeral("0,0.00") }}</b-col
                      >
                    </b-row>

                    <hr />

                    <b-row class="pb-2">
                      <b-col cols="7">ค่าจัดส่ง</b-col>
                      <b-col cols="5" class="text-right"
                        >฿
                        {{ form.order.shippingCost | numeral("0,0.00") }}</b-col
                      >
                    </b-row>

                    <b-row class="pb-2">
                      <b-col cols="7" class="font-weight-bold">รวมสุทธิ</b-col>
                      <b-col cols="5" class="text-right font-weight-bold"
                        >฿
                        {{ form.order.grandTotal | numeral("0,0.00") }}</b-col
                      >
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </div>

            <div class="bg-white">
              <b-table
                striped
                responsive
                hover
                :items="items"
                :fields="fields"
                show-empty
                empty-text="ไม่พบข้อมูล"
                class="table-list"
              >
                <template v-slot:cell(createdTime)="data">
                  <span>
                    {{
                      new Date(data.item.createdTime) | moment($formatDateTime)
                    }}
                  </span>
                </template>
              </b-table>

              <b-row class="mt-5 mx-2 pb-4">
                <b-col md="6">
                  <b-button
                    href="/order"
                    :disabled="isDisable"
                    class="btn-details-set btn-cancel"
                    >ย้อนกลับ</b-button
                  >
                </b-col>
                <b-col md="6" class="text-sm-right">
                  <button
                    type="button"
                    @click="onChangeStatus(form.order.orderStatusId)"
                    :disabled="isDisable"
                    class="btn btn-main btn-details-set ml-md-2 text-uppercase"
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

    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
    <ModalLoading ref="modalLoading" :hasClose="false" />
  </div>
</template>

<script>
import axios from "axios";
import * as moment from "moment/moment";
import { required, numeric, minValue } from "vuelidate/lib/validators";
import HeaderLine from "@/components/HeaderLine";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalLoading from "@/components/modal/alert/ModalLoading";
import TrackingTimeline from "@/views/pages/order/component/TrackingTimeline";

export default {
  name: "OrderDetails",
  components: {
    HeaderLine,
    ModalAlert,
    ModalAlertError,
    ModalLoading,
    TrackingTimeline
  },
  data() {
    return {
      flag: 0,
      items: [],
      itemsOrder: [],
      selected: [],
      statusList: [],
      form: {},
      modalMessage: "",
      isDisable: false,
      isLoadingData: false,
      status: false,
      note: "",
      id: this.$route.params.id,
      fields: [
        {
          key: "createdTime",
          label: "วันที่ทำรายการ",
          class: "w-100px"
        },
        {
          key: "orderSatusName",
          label: "สถานะ",
          class: "w-100px"
        },
        {
          key: "updatedByName",
          label: "ทำรายการโดย",
          class: "w-100px"
        }
      ],
      fieldsOrder: [
        {
          key: "id",
          label: "#"
        },
        {
          key: "sku",
          label: "SKU",
          class: "w-100px"
        },
        {
          key: "productImageUrl",
          label: "ภาพประกอบ",
          class: "w-100px"
        },
        {
          key: "productName",
          label: `รายละเอียด`,
          tdClass: "text-left w-200",
          thclass: "w-200"
        },
        {
          key: "gp",
          label: `GP`,
          class: "w-100px"
        },
        {
          key: "orderItemQuantity",
          label: `จำนวน`
        },
        {
          key: "subtotal",
          label: `ราคา`,
          class: "w-100px"
        },
        {
          key: "discount",
          label: `ส่วนลด`,
          class: "w-100px"
        },
        {
          key: "grandTotal",
          label: `รวม`,
          class: "w-100px"
        }
      ]
    };
  },
  created: async function() {
    await this.getData();
    await this.checkStatus();
  },
  methods: {
    moment: function() {
      return moment();
    },
    checkStatus: function(evt) {
      var status = this.form.order.orderStatusId;
      if (status == 9 || status == 6 || status == 7 || status == 5) {
        this.status = true;
      } else {
        this.status = false;
      }
    },
    getData: async function() {
      this.isLoadingData = true;

      let status = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Transaction/OrderStatusWithCount`,
        null,
        this.$headers,
        null
      );
      if (status.result == 1) {
        this.statusList = status.detail;
        this.statusList.shift();
      }

      let data = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Transaction/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.form = data.detail;
        this.items = data.detail.orderStatusLogList;
        this.itemsOrder = data.detail.orderItemList;

        this.isLoadingData = false;
        this.$isLoading = true;
      }
    },
    printShippingLabel: async function() {
      this.$refs.modalLoading.show();

      axios({
        url: `http://s.boxme.asia/api/v1/orders/awb-label/YTMwYmY5NDYtYzdhNi00Njk0LTg3YzgtNDQwZmQ4YjAwZDc1`,
        method: "get",
        headers: this.$headers,
        responseType: "blob"
      })
        .then(response => {
          this.$refs.modalLoading.hide();
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          var dateExcel = moment().format("DDMMYYYYhhmmss");

          this.modalAlertShow = false;

          fileLink.href = fileURL;
          fileLink.setAttribute(
            "download",
            `Shipping Label-` + dateExcel + `.pdf`
          );
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch(error => {
          if (error.response.status === 500) {
            // this.imgModal = "/img/icon-unsuccess.png";
            // this.msgModal =
            //   "Internal Server Error. Please contact system administrator";
            // this.hideClose = false;
          }
        });
    },
    onChangeStatus: async function(value) {
      this.isDisable = true;
      this.$refs.modalLoading.show();

      let body = {
        transactionId: this.id,
        note: "",
        statusId: value
      };

      let data = await this.$callApi(
        "put",
        `${this.$baseUrl}/api/transaction/ChangeStatusOrder`,
        null,
        this.$headers,
        body
      );

      this.$refs.modalLoading.hide();
      this.modalMessage = data.message;
      this.isDisable = false;

      if (data.result == 1) {
        this.$refs.modalAlert.show();
        setTimeout(() => {
          this.$refs.modalAlert.hide();
        }, 3000);
        this.getData();
        this.checkStatus();
      } else {
        this.$refs.modalAlertError.show();
      }
    }
  }
};
</script>

<style scoped>
.sub-color {
  color: #c9b67e;
}

.pt-100 {
  padding-top: 100%;
}

.slip-details {
  line-height: 25px;
}

.address-box p {
  margin: 0;
}

.address-box {
  line-height: 25px;
}

.input-disabled {
  width: 50px;
}

.h-200 {
  min-height: 200px;
}

.pab-0,
.pab {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.right-0 {
  right: 15px;
}

.f-17 {
  font-size: 17px;
}

.order-desc {
  font-size: 13px;
  color: #6b6b6b;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.order-discount {
  color: #c9b67e;
  font-size: 13px;
}

.bg-yellow {
  background: #fff2d6;
  color: #333333;
}

.delete-order {
  clear: both;
  text-align: right;
}

.image-preview {
  padding-top: 50%;
  width: 50%;
  margin: auto;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.statusSelect {
  width: 235px;
  height: auto;
  position: relative;
  left: 10px;
  top: 2px;
  -webkit-appearance: none;
}

.config-tag {
  background: #ff0641;
  padding: 1px 5px;
  color: white;
  border-radius: 15px;
  font-size: 12px;
  white-space: nowrap;
}

@media (max-width: 992px) {
  .pab-0 {
    position: unset;
    width: auto;
  }

  .input-disabled {
    float: right;
  }

  .statusSelect {
    text-align-last: center;
  }
}

@media (max-width: 600px) {
  .statusSelect {
    width: 200px;
  }
}
</style>
