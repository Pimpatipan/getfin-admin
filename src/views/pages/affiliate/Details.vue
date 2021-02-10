<template>
  <div v-if="form">
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0 mb-3">
        <b-col sm="6" class="text-center text-sm-left">
          <h1 class="mr-sm-4 header-main text-uppercase">รายละเอียดตัวแทน</h1>
          <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
        </b-col>
        <b-col sm="6" class="text-center text-sm-right">
          <span class="label-text mr-3 txt-relative">สถานะการแสดงผล</span>
          <b-form-checkbox
            switch
            size="lg"
            class="d-inline-block mb-1"
            @change="onChangeEnableAffiliate"
            :value="false"
            :unchecked-value="true"
            v-model="form.user.enabled"
            ><span class="ml-2 main-label">{{
              form.user.enabled ? "ใช้งานปกติ" : "ระงับบัญชี"
            }}</span></b-form-checkbox
          >
        </b-col>
      </CRow>

      <div>
        <b-row class="pb-sm-4 position-relative mx-3 mx-sm-0">
          <b-col sm="6" xl="4" class="bg-white py-3">
            <b-row>
              <b-col sm="4" class="text-center">
                <div>
                  <div
                    v-bind:style="{
                      'background-image': 'url(' + form.user.imageUrl + ')',
                    }"
                    class="preview-box border-0 mb-2 affiliate-img"
                  ></div>
                  <span class="f-10"
                    >เป็นสมาชิกวันที่
                    {{
                      new Date(form.user.createdTime) | moment($formatDate)
                    }}</span
                  >
                </div>
              </b-col>
              <b-col sm="8" class="">
                <div class="w-100">
                  <b-row class="">
                    <b-col cols="5" class="font-weight-bold px-3 px-sm-0"
                      >ชื่อตัวแทน :</b-col
                    >
                    <b-col class="mb-2 mb-sm-0" cols="7">
                      {{ form.user.firstname }} {{ form.user.lastname }}
                      <!-- {{ form.user.displayNameTranslation[0].name }} -->
                    </b-col>
                  </b-row>

                  <b-row class="">
                    <b-col cols="5" class="font-weight-bold px-3 px-sm-0"
                      >เบอร์ติดต่อ :</b-col
                    >
                    <b-col class="mb-2 mb-sm-0" cols="7">
                      {{ form.user.telephone }}
                      <!-- {{ form.user.firstname }} {{ form.user.lastname }} -->
                    </b-col>
                  </b-row>

                  <b-row class="">
                    <b-col cols="5" class="font-weight-bold px-3 px-sm-0"
                      >อีเมล :</b-col
                    >
                    <b-col class="mb-2 mb-sm-0" cols="7">
                      <p class="m-0 text-wrap">{{ form.user.email }}</p>  
                      <!-- {{ form.user.firstname }} {{ form.user.lastname }} -->
                    </b-col>
                  </b-row>

                  <b-row class="">
                    <b-col cols="5" class="font-weight-bold px-3 px-sm-0"
                      >วันเกิด :</b-col
                    >
                    <b-col class="mb-2 mb-sm-0" cols="7">
                      {{ form.user.birthday | moment($formatDate) }}
                      <!-- {{ form.user.firstname }} {{ form.user.lastname }} -->
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col sm="6" xl="4" class="bg-white py-3">
            <div class="row h-100">
              <b-col>
                <b-row class="">
                  <b-col cols="5" class="font-weight-bold">เลขที่บัญชี :</b-col>
                  <b-col class="mb-2 mb-sm-0" cols="7">
                    {{ form.bankAccount.accountNo }}
                  </b-col>
                </b-row>

                <b-row class="">
                  <b-col cols="5" class="font-weight-bold">ธนาคาร :</b-col>
                  <b-col class="mb-2 mb-sm-0" cols="7">
                    {{ form.bankAccount.bankName }}
                  </b-col>
                </b-row>

                <b-row>
                  <b-col>
                    <div
                      class="text-center text-primary text-underline f-12 mt-4"
                    >
                      <router-link :to="'/affiliate/bankaccount/details/' + id">
                        <span class="mr-1">ดูเอกสารบัญชี</span>
                      </router-link>
                      <router-link :to="'/affiliate/log/' + id">
                        <span class="mr-1">ดูประวัติ</span>
                      </router-link>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </div>
          </b-col>
          <b-col xl="4" class="pr-0 pl-0 pl-xl-2 mt-2 mt-xl-0">
            <div class="d-flex justify-content-between">
              <div class="p-2 bg-white text-center w-100 mr-1">
                <font-awesome-icon icon="medal" class="stars mr-2" />ระดับ
                <span
                  class="text-warning font-weight-bold f-20 text-uppercase ml-3"
                  >{{ form.user.tier }}</span
                >
              </div>

              <div class="p-2 bg-white text-center w-100">
                <font-awesome-icon icon="star" class="stars" /> คะแนน
                <span class="text-primary f-20 font-weight-bold ml-3">{{
                  form.user.point | numeral("0,0")
                }}</span>
              </div>
            </div>
            <b-row class="no-gutters">
              <b-col cols="12" class="bg-white mt-1 p-3">
                <b-row class="">
                  <b-col cols="5" class="font-weight-bold one-line"
                    >สถานะบัญชี :</b-col
                  >
                  <b-col class="mb-2 mb-sm-0 one-line" cols="7">
                    <div v-if="!form.user.isVerifyAffiliate" class="text-dark">
                      ยังไม่ได้รับการตรวจสอบ
                    </div>
                    <div
                      v-else-if="form.user.isVerifyAffiliate"
                      class="text-success"
                    >
                      ได้รับการตรวจสอบแล้ว
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row class="mx-3 mx-sm-0 mt-3 mt-md-0">
          <b-col
            xl="6"
            offset-xl="6"
            class="text-right d-flex px-0 justify-content-end"
          >
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="เลขที่รายการ"
                @keyup="handleSearch"
                v-model="filter.search"
              ></b-form-input>
              <b-input-group-prepend @click="btnSearch">
                <span class="icon-input m-auto pr-2">
                  <font-awesome-icon icon="search" title="View" />
                </span>
              </b-input-group-prepend>
            </b-input-group>
            <b-button v-b-toggle.sidebar-1 class="btn-filter">
              <font-awesome-icon
                icon="filter"
                title="filter-btn"
                class="text-white mr-0 mr-sm-1"
              />
              <span class="d-none d-sm-inline"
                >ค้นหาแบบละเอียด ({{
                  countStatus +
                  countPaymentChannel +
                  countStartdate +
                  countEnddate
                }})</span
              >
            </b-button>
          </b-col>
        </b-row>

        <b-sidebar
          id="sidebar-1"
          title="ค้นหาแบบละเอียด"
          backdrop
          shadow
          backdrop-variant="dark"
          right
          ref="filterSidebar"
        >
          <div class="px-3 py-2">
            <div class="text-right">
              <button
                type="button"
                class="btn btn-link px-0"
                @click="onClearFilter()"
              >
                ล้างค่า
              </button>
            </div>

            <InputSelect
              class="mb-4"
              title="ช่องทางการชำระเงิน"
              name="payment"
              v-bind:options="paymentChannelList"
              valueField="id"
              textField="name"
              v-model="paymentChanelSelected"
              @onDataChange="handleChangePaymentChannel"
            />

            <InputSelect
              class="mb-4"
              title="สถานะรายการขาย"
              name="status"
              v-bind:options="statusList"
              valueField="id"
              textField="name"
              v-model="statusSelected"
              @onDataChange="handleChangestatus"
            />

            <label class="label-text">วันเริ่มต้น</label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd MMM yyyy"
              v-model="filter.StartDate"
            ></datetime>

            <label class="label-text mt-3">วันสิ้นสุด</label>
            <datetime
              placeholder="กรุณาเลือกวันที่"
              class="date-picker"
              format="dd MMM yyyy"
              v-model="filter.EndDate"
            ></datetime>

            <div class="text-center">
              <p class="text-danger" v-if="errorDate">
                วันสิ้นสุดต้องมากกว่าวันเริ่มต้น
              </p>
            </div>

            <div class="text-center mt-4">
              <button
                type="button"
                class="btn btn-purple button"
                @click="getDataByStatus"
              >
                ค้นหา
              </button>
            </div>
          </div>
        </b-sidebar>

        <b-row class="mt-3 nomargin-mobile">
          <b-col xl="4" class="mb-2 mb-xl-0">
            <div class="bg-blue p-3">
              <b-row>
                <b-col>
                  <p class="font-weight-bold m-0">ยอดทั้งหมด</p>
                  <p class="m-0 f-14">
                    ตั้งแต่ {{ new Date() | moment("MMMM YYYY") }}
                  </p>
                </b-col>
                <b-col
                  class="mb-2 mb-sm-0 f-16 font-weight-bold text-white py-2 text-right"
                  >฿ {{ form.sales | numeral("0,0.00") }}</b-col
                >
              </b-row>
            </div>
          </b-col>
          <b-col xl="4" class="mb-2 mb-xl-0">
            <div class="bg-blue p-3 h-100">
              <b-row class="h-100">
                <b-col class="m-auto">
                  <p class="font-weight-bold m-0">เงินคืนที่ได้รับ</p>
                </b-col>
                <b-col
                  class="f-16 font-weight-bold text-white text-right m-auto"
                >
                  ฿ {{ form.cashBack | numeral("0,0.00") }}</b-col
                >
              </b-row>
            </div>
          </b-col>
          <b-col xl="4" class="mb-2 mb-xl-0">
            <div class="bg-blue p-3 h-100">
              <b-row class="h-100">
                <b-col class="m-auto">
                  <p class="font-weight-bold m-0">จำนวนออร์เดอร์</p>
                </b-col>
                <b-col
                  class="f-16 font-weight-bold text-white text-right m-auto"
                  >{{
                    form.user.qtyOrdersCompleted | numeral("0,0")
                  }}
                  รายการ</b-col
                >
              </b-row>
            </div>
          </b-col>
        </b-row>

        <div class="mt-3 bg-white mx-3 mx-sm-0 pb-3">
          <b-row class="no-gutters">
            <b-col>
              <b-table
                responsive
                class="text-center table-list"
                striped
                :fields="fields"
                :items="items"
                :busy="isBusy"
                show-empty
                empty-text="ไม่พบข้อมูล"
              >
                <template v-slot:cell(paymentType)="data">
                  <p class="mb-0 nobreak" v-if="data.item.paymentType != null">
                    {{ data.item.paymentType }}
                  </p>
                  <p class="m-0" v-else>-</p>
                </template>
                <template v-slot:cell(grandTotal)="data">
                  <p class="m-0">
                    ฿ {{ data.item.grandTotal | numeral("0,0.00") }}
                  </p>
                </template>
                <template v-slot:cell(cashback)="data">
                  <p class="m-0">
                    ฿ {{ data.item.cashback | numeral("0,0.00") }}
                  </p>
                </template>
                <template v-slot:cell(createdTime)="data">
                  <span>{{
                    new Date(data.item.createdTime) | moment($formatDate)
                  }}</span>
                </template>
                <template v-slot:cell(point)="data">
                  <p class="m-0">{{ data.item.point | numeral("0,0") }}</p>
                </template>
                <template v-slot:cell(qty)="data">
                  <p class="m-0">{{ data.item.qty | numeral("0,0") }}</p>
                </template>
                <template v-slot:cell(orderStatus)="data">
                  <div
                    v-if="
                      data.item.orderStatusId == 10 ||
                      data.item.orderStatusId < 5
                    "
                    class="text-warning"
                  >
                    {{ data.item.orderStatus }}
                  </div>
                  <div
                    v-else-if="
                      data.item.orderStatusId == 5 ||
                      data.item.orderStatusId == 11
                    "
                    class="text-success"
                  >
                    {{ data.item.orderStatus }}
                  </div>
                  <div v-else class="text-danger">
                    {{ data.item.orderStatus }}
                  </div>
                </template>
                <template v-slot:table-busy>
                  <div class="text-center text-black my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-2">Loading...</strong>
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <b-row class="no-gutters px-3 px-sm-0">
            <b-col
              class="form-inline justify-content-center justify-content-sm-between"
            >
              <div class="d-sm-flex m-3">
                <b-pagination
                  v-model="filter.pageNo"
                  :total-rows="rows"
                  :per-page="filter.perPage"
                  class="m-md-0"
                  @change="pagination"
                  align="center"
                ></b-pagination>
              </div>

              <b-form-select
                class="mr-sm-3 select-page"
                v-model="filter.perPage"
                @change="hanndleChangePerpage"
                :options="pageOptions"
              ></b-form-select>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>

    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
  </div>
</template>

<script>
import InputText from "@/components/inputs/InputText";
import InputSelect from "@/components/inputs/InputSelect";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";

export default {
  name: "AffiliateDetails",
  components: {
    InputText,
    InputSelect,
    ModalAlertError,
  },
  data() {
    return {
      id: this.$route.params.id,
      fields: [
        {
          key: "orderNo",
          label: "เลขที่รายการ",
          class: "w-100px text-nowrap",
        },
        {
          key: "createdTime",
          label: "วันที่ทำรายการ",
          class: "w-100px text-nowrap",
        },
        {
          key: "paymentType",
          label: "ช่องทางการชำระเงิน",
          class: "w-100px text-nowrap",
        },
        { key: "grandTotal", label: "จำนวนเงิน", class: "w-100px text-nowrap" },
        { key: "qty", label: "จำนวนสินค้า", class: "w-100px text-nowrap" },
        {
          key: "orderStatus",
          label: "สถานะคำสั่งซื้อ",
          class: "w-100px text-nowrap",
        },
        {
          key: "cashback",
          label: "เงินคืน",
          class: "w-100px text-nowrap",
        },
      ],
      filter: {
        pageNo: 1,
        perPage: 10,
        status: [],
        StartDate: null,
        EndDate: null,
        PaymentChanel: [],
        search: "",
      },
      pageOptions: [
        { value: 10, text: "10 / หน้า" },
        { value: 30, text: "30 / หน้า" },
        { value: 50, text: "50 / หน้า" },
        { value: 100, text: "100 / หน้า" },
      ],
      paymentChannelFilter: {
        perPage: 10,
        pageNo: 1,
        search: "",
        status: [],
        sortByOrderOrId: 1,
      },
      form: null,
      isBusy: false,
      rows: 0,
      paymentChannelList: [],
      paymentChanelSelected: 0,
      statusList: [],
      items: [],
      statusSelected: 0,
      modalMessage: "",
      errorDate: false,
    };
  },
  computed: {
    countPaymentChannel: function () {
      var count = 0;
      if (this.filter.PaymentChanel.length != 0) count += 1;
      else if (count > 0) count -= 1;
      return count;
    },
    countStatus: function () {
      var count = 0;
      if (this.filter.status.length != 0) count += 1;
      else if (count > 0) count -= 1;
      return count;
    },
    countStartdate: function () {
      var count = 0;
      if (this.filter.StartDate != "") count += 1;
      else if (count > 0) count -= 1;
      return count;
    },
    countEnddate: function () {
      var count = 0;

      if (this.filter.EndDate != "") count += 1;
      else if (count > 0) count -= 1;
      return count;
    },
  },
  created: async function () {
    await this.getData();
    await this.getOrder();
    await this.getFilter();
    this.$isLoading = true;
  },
  methods: {
    getData: async function () {
      let resData = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Affiliate/Profile/` + this.id,
        null,
        this.$headers,
        null
      );
      if (resData.result == 1) {
        this.form = resData.detail.result;
      }
    },
    getOrder: async function () {
      this.isBusy = true;

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Affiliate/Orders/` + this.id,
        null,
        this.$headers,
        this.filter
      );
      if (resData.result == 1) {
        this.items = resData.detail.dataList;
        this.rows = resData.detail.count;

        this.isBusy = false;
      }
    },
    getFilter: async function () {
      let paymentChannel = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/PaymentChannel/List`,
        null,
        this.$headers,
        this.paymentChannelFilter
      );
      if (paymentChannel.result == 1) {
        let list = [{ id: 0, name: `กรุณาเลือกช่องทางการชำระเงิน` }];
        let datalist = paymentChannel.detail.dataList;
        this.paymentChannelList = list.concat(datalist);
      }

      let status = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Transaction/OrderStatusWithCount`,
        null,
        this.$headers,
        null
      );

      if (status.result == 1) {
        let list = [];
        let datalist = status.detail;
        this.statusList = list.concat(datalist);
      }
    },
    handleSearch(e) {
      if (e.keyCode === 13) {
        this.filter.PageNo = 1;
        this.getOrder();
      }
    },
    btnSearch() {
      this.filter.PageNo = 1;
      this.getOrder();
    },
    getDataByStatus(status) {
      if (this.filter.StartDate > this.filter.EndDate) {
        this.errorDate = true;
        return;
      }

      this.errorDate = false;
      this.$refs.filterSidebar.hide(true);
      this.getOrder();
    },
    pagination(Page) {
      this.filter.PageNo = Page;
      this.getOrder();
    },
    hanndleChangePerpage(value) {
      this.filter.PageNo = 1;
      this.filter.PerPage = value;
      this.getOrder();
    },
    handleChangePaymentChannel: async function (value) {
      this.filter.PaymentChanel = [];
      if (value != 0) {
        this.filter.PaymentChanel.push(value);
      }
    },
    handleChangestatus: async function (value) {
      this.filter.status = [];
      if (value != 0) {
        this.filter.status.push(value);
      }
    },
    onClearFilter() {
      this.filter.PageNo = 1;
      this.filter.StartDate = "";
      this.filter.EndDate = "";
      this.filter.PaymentChanel = [];
      this.filter.status = [];
      this.$refs.filterSidebar.hide(true);
      this.getOrder();
    },
    onChangeEnableAffiliate: async function (value) {
      let body = {
        Enabled: value,
        UserId: this.id,
      };

      let resData = await this.$callApi(
        "patch",
        `${this.$baseUrl}/api/Affiliate/Profile/Enbled`,
        null,
        this.$headers,
        body
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        //this.getData();
      } else {
        this.$refs.modalAlertError.show();
      }
    },
  },
};
</script>

<style scoped>
.stars {
  color: #ffb300;
}

.bg-blue {
  background-color: #1085ff;
  color: white !important;
  border-radius: 15px;
}

.affiliate-img {
  padding-bottom: 60%;
  background-size: contain;
  /* border-radius: 50%;
    border: 2px solid red; */
}

@media (max-width: 1400px) {
  .affiliate-img {
    padding-bottom: 100%;
  }
}

@media (max-width: 600px) {
  .affiliate-img {
    padding-bottom: 50%;
  }
}
</style>
