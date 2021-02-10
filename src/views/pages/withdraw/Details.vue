<template>
  <div v-if="withdraw">
    <form class="form-box">
      <b-container class="container-box">
        <b-row class="no-gutters">
          <b-col>
            <h1 class="font-weight-bold header-main text-uppercase">
              รายละเอียดการขอถอนเงิน
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
                <p class="font-weight-bold text-center text-lg-left mb-2">
                  วันที่ / เวลาทำรายการ :
                  <span class="font-weight-normal">{{
                    new Date(withdraw.createdTime) | moment($formatDateTime)
                  }}</span>
                </p>
                <p class="font-weight-bold text-center text-lg-left mb-2">
                  เลขที่คำขอ :
                  <span class="font-weight-normal">{{
                    withdraw.withdrawNumber
                  }}</span>
                </p>

                <b-row>
                  <b-col cols="6">
                    <p class="mb-2 mt-2 font-weight-bold">ข้อมูลผู้ทำรายการ</p>
                  </b-col>
                </b-row>
                <b-row class="mt-2 mb-3">
                  <b-col md="3" class="font-weight-bold">ชื่อลุกค้า :</b-col>
                  <b-col class="mb-2 mb-sm-0" md="9"
                    >{{ withdraw.name }}
                    <router-link :to="'/affiliate/details/' + withdraw.userId">
                      <span class="f-14 text-blue ml-3 text-underline"
                        >ดูรายละเอียด</span
                      ></router-link
                    >
                  </b-col>

                  <b-col md="3" class="font-weight-bold">เบอร์โทร :</b-col>
                  <b-col class="mb-2 mb-sm-0" md="9">{{
                    withdraw.telephone
                  }}</b-col>
                  <b-col md="3" class="font-weight-bold">อีเมล :</b-col>
                  <b-col class="mb-2 mb-sm-0" md="9">{{
                    withdraw.email
                  }}</b-col>
                </b-row>
              </b-col>
              <b-col
                lg="6"
                class="text-center text-lg-right order-0 order-lg-1"
              >
                <div
                  class="d-sm-flex justify-content-center justify-content-lg-end"
                >
                  <p class="font-weight-bold">สถานะ :</p>
                  <b-form-select
                    v-model="withdraw.statusId"
                    :class="['mb-1 statusSelect']"
                    ref="test"
                    :disabled="withdraw.statusId == 2"
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
                <a
                  href="#"
                  class="f-14 text-blue text-underline"
                  v-if="withdraw.statusId == 0"
                  @click="updateStatusWithdraw"
                  >แจ้งการชำระเงิน</a
                >
                <a
                  href="#"
                  class="f-14 text-secondary text-underline ml-2"
                  v-if="withdraw.statusId != 2"
                  @click="onChangeStatus(2)"
                  >ยกเลิกรายการ</a
                >
              </b-col>
            </b-row>

            <div class="w-100 mt-3 bg-white">
              <b-table
                striped
                responsive
                :items="itemsOrder"
                :fields="fieldsOrder"
                :busy="isBusy"
                show-empty
                empty-text="ไม่พบข้อมูล"
                class="table-list m-0"
              >
                <template v-slot:cell(invoiceNo)="data">
                  <router-link :to="'/order/details/' + data.item.id">
                    <span class="text-underline">{{
                      data.item.invoiceNo
                    }}</span>
                  </router-link>
                </template>
                <template v-slot:cell(amount)="data">
                  <p class="m-0">
                    ฿ {{ data.item.amount | numeral("0,0.00") }}
                  </p>
                </template>
                <template v-slot:cell(qty)="data">
                  <p class="m-0">{{ data.item.qty | numeral("0,0") }}</p>
                </template>
                <template v-slot:cell(name)="data">
                  <div>
                    <p class="m-0">{{ data.item.name }}</p>
                    <p class="m-0">({{ data.item.telephone }})</p>
                  </div>
                </template>
                <template v-slot:cell(createdTime)="data">
                  <span>{{
                    new Date(data.item.createdTime) | moment($formatDateTime)
                  }}</span>
                </template>
                <template v-slot:table-busy>
                  <div class="text-center text-black my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-2">Loading...</strong>
                  </div>
                </template>
              </b-table>

              <b-row class="no-gutters px-3 px-sm-0">
                <b-col
                  class="form-inline justify-content-center justify-content-sm-between"
                >
                  <div class="d-sm-flex m-3">
                    <b-pagination
                      v-model="filter.pageNo"
                      :total-rows="rows"
                      :per-page="filter.perpage"
                      class="m-md-0"
                      @change="pagination"
                      align="center"
                    ></b-pagination>
                  </div>

                  <b-form-select
                    class="mr-sm-3 select-page"
                    v-model="filter.perpage"
                    @change="hanndleChangePerpage"
                    :options="pageOptions"
                  ></b-form-select>
                </b-col>
              </b-row>
            </div>

            <div class="mt-5 bg-white">
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
                  <span>{{
                    new Date(data.item.createdTime) | moment($formatDateTime)
                  }}</span>
                </template>
                <template v-slot:cell(createdBy)="data">
                  <div v-if="data.item.createdBy == null">-</div>
                  <div v-else>{{ data.item.createdBy }}</div>
                </template>
              </b-table>

              <b-row class="mt-5 mx-2 pb-4">
                <b-col md="6">
                  <b-button
                    href="/withdraw"
                    :disabled="isDisable"
                    class="btn-details-set btn-cancel"
                    >ย้อนกลับ</b-button
                  >
                </b-col>
                <b-col md="6" class="text-sm-right">
                  <button
                    type="button"
                    @click="onChangeStatus(id)"
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
import * as moment from "moment/moment";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalLoading from "@/components/modal/alert/ModalLoading";
import sampleImg from "@/assets/images/cinna.jpg";

export default {
  name: "WithdrawDetails",
  components: {
    ModalAlert,
    ModalAlertError,
    ModalLoading
  },
  data() {
    return {
      imageUrl: sampleImg,
      flag: 0,
      rows: 0,
      items: [],
      itemsOrder: [],
      selected: [],
      statusList: [],
      isLoadingData: false,
      isDisable: false,
      status: false,
      isBusy: false,
      modalMessage: "",
      id: this.$route.params.id,
      withdraw: null,
      pageOptions: [
        { value: 10, text: "10 / หน้า" },
        { value: 30, text: "30 / หน้า" },
        { value: 50, text: "50 / หน้า" },
        { value: 100, text: "100 / หน้า" }
      ],
      fields: [
        {
          key: "createdTime",
          label: "วันที่ทำรายการ",
          class: "w-100px"
        },
        {
          key: "status",
          label: "สถานะ",
          class: "w-100px"
        },
        {
          key: "createdBy",
          label: "โดย",
          class: "w-100px"
        }
      ],
      fieldsOrder: [
        {
          key: "invoiceNo",
          label: "เลขที่คำสั่งซื้อ",
          class: "w-100px"
        },
        {
          key: "createdTime",
          label: "วันที่ทำรายการ",
          class: "w-100px"
        },
        {
          key: "name",
          label: "ผู้ซื้อ",
          class: "w-100px"
        },
        {
          key: "paymentType",
          label: "ช่องทางการชำระเงิน",
          class: "w-100px"
        },
        {
          key: "amount",
          label: "จำนวนเงิน",
          class: "w-100px"
        },
        {
          key: "orderStatus",
          label: "สถานะ",
          class: "w-100px"
        },
        {
          key: "qty",
          label: "จำนวน",
          class: "w-100px"
        }
      ],
      filter: {
        ObjectId: this.$route.params.id,
        pageNo: 1,
        perpage: 10
      },
      filterLog: {
        ObjectId: this.$route.params.id,
        status: [],
        pageNo: 1,
        perpage: 10
      }
    };
  },
  created: async function() {
    await this.getData();
    await this.getOrderStatus();
    await this.getOrderStatusLog();
    this.$isLoading = true;
  },
  methods: {
    moment: function() {
      return moment();
    },
    getData: async function() {
      this.isLoadingData = true;

      let status = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/withdraw/WithdrawStatus`,
        null,
        this.$headers,
        null
      );

      if (status.result == 1) {
        this.statusList = status.detail;
      }

      let data = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/withdraw/${this.id}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.withdraw = data.detail;

        this.isLoadingData = false;
      }
    },
    getOrderStatus: async function() {
      this.isBusy = true;
      let order = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/withdraw/WithDrawOrderDisplay`,
        null,
        this.$headers,
        this.filter
      );

      if (order.result == 1) {
        this.itemsOrder = order.detail.dataList;
        this.rows = order.detail.count;
        this.isBusy = false;
      }
    },
    getOrderStatusLog: async function() {
      this.isBusy = true;
      let order = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/withdraw/WithdrawLogs`,
        null,
        this.$headers,
        this.filterLog
      );

      if (order.result == 1) {
        this.items = order.detail.dataList;
        this.rows = order.detail.count;
        this.isBusy = false;
      }
    },
    onChangeStatus: async function() {
      this.isDisable = true;
      this.$refs.modalLoading.show();

      let body = {
        Id: this.id,
        statusId: this.withdraw.statusId
      };

      let data = await this.$callApi(
        "put",
        `${this.$baseUrl}/api/withdraw/UpdateStatusWithdraw`,
        null,
        this.$headers,
        body
      );

      this.modalMessage = data.message;
      this.isDisable = false;
      this.$refs.modalLoading.hide();

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
    pagination(Page) {
      this.filter.pageNo = Page;
      this.getOrderStatus();
    },
    hanndleChangePerpage(value) {
      this.filter.pageNo = 1;
      this.filter.perpage = value;
      this.getOrderStatus();
    },
    updateStatusWithdraw: async function() {
      this.isDisable = true;

      let request = {
        Id: this.id,
        StatusId: 0
      };

      let data = await this.$callApi(
        "put",
        `${this.$baseUrl}/api/withdraw/UpdateStatusWithdraw`,
        null,
        this.$headers,
        request
      );

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
    }
  }
};
</script>

<style scoped>
.statusSelect {
  border: 0;
  width: 235px;
  font-size: 20px;
  font-weight: bold;
  height: auto;
  padding-top: 0;
  position: relative;
  left: 10px;
  text-align-last: center;
  top: -2px;
  -webkit-appearance: none;
}

@media (max-width: 992px) {
  .statusSelect {
    text-align-last: center;
  }
}
</style>
