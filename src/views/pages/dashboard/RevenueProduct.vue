<template>
  <div>
    <div class="min-vh-100 container-box">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col sm="5" class="text-center text-sm-left my-3 my-lg-0">
          <h1 class="mr-sm-4 header-main text-uppercase">Dashboard</h1>
          <span class="f-18 font-weight-bold">รายได้สินค้าทั้งหมด</span>
        </b-col>
      </CRow>

      <div class="mt-3 bg-white py-3 py-sm-0">
        <div v-if="statusData">
          <div class="dashboard-status-box p-1">
            <div
              class="dashboard-status px-2 py-3 d-flex justify-content-between"
            >
              <p class="m-0 main-label my-auto one-line">ยอดขาย</p>
              <p class="m-0 dashboard-status-value">
                {{ statusData.totalSale | numeral("0,0") }}
              </p>
            </div>
          </div>
          <div class="dashboard-status-box p-1">
            <div
              class="dashboard-status px-2 py-3 d-flex justify-content-between"
            >
              <p class="m-0 main-label my-auto one-line">
                จำนวนรายการสั่งซื้อ
              </p>
              <p class="m-0 dashboard-status-value">
                {{ statusData.totalOrder | numeral("0,0") }}
              </p>
            </div>
          </div>
          <div class="dashboard-status-box p-1">
            <div
              class="dashboard-status px-2 py-3 d-flex justify-content-between"
            >
              <p class="m-0 main-label my-auto one-line">อัตราการซื้อต่อการเข้าชม</p>
              <p class="m-0 dashboard-status-value">
                {{ statusData.orderPerClick | numeral("0,0") }}%
              </p>
            </div>
          </div>
          <div class="dashboard-status-box p-1">
            <div
              class="dashboard-status px-2 py-3 d-flex justify-content-between"
            >
              <p class="m-0 main-label my-auto one-line">
                ยอดขายต่อผู้ซื้อ
              </p>
              <p class="m-0 dashboard-status-value">
                {{ statusData.totalSalePerCustomer | numeral("0,0") }}
              </p>
            </div>
          </div>
          <div class="dashboard-status-box p-1">
            <div
              class="dashboard-status px-2 py-3 d-flex justify-content-between"
            >
              <p class="m-0 main-label my-auto one-line">
                ยอดเข้าชม
              </p>
              <p class="m-0 dashboard-status-value">
                {{ statusData.totalView | numeral("0,0") }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-3 bg-white py-3 py-sm-0">
        <b-row no-gutters>
          <b-col>
            <h1 class="mr-sm-4 header-main p-3">ภาพรวมทั้งหมด</h1>
          </b-col>
          <b-col class="m-auto text-right px-3">
            <b-button-group>
              <b-button
                value="week"
                v-model="filter.groupBy"
                @click="onChangeRevenueProductGroupBy('week')"
                >สัปดาห์</b-button
              >
              <b-button
                value="month"
                v-model="filter.groupBy"
                @click="onChangeRevenueProductGroupBy('month')"
                >เดือน</b-button
              >
              <b-button
                value="year"
                v-model="filter.groupBy"
                @click="onChangeRevenueProductGroupBy('year')"
                >ปี</b-button
              >
            </b-button-group></b-col
          >
        </b-row>

        <b-row class="m-0">
          <b-col class="px-2"
            ><BarChart :xData="barData.xData" :yData="barData.yData" />
          </b-col>
        </b-row>
      </div>

      <div class="mt-3 bg-white py-3 py-sm-0">
        <b-row>
          <b-col md="6" v-if="customerData">
            <b-row no-gutters>
              <b-col md="4">
                <h1 class="header-main p-3 f-16">รายละเอียดลูกค้า</h1>
              </b-col>
              <b-col md="8" class="m-auto text-right px-3">
                <b-button-group>
                  <b-button
                    value="1"
                    v-model="filter.groupBy"
                    @click="onChangeCustomerDetailsGender(1)"
                    >ชาย</b-button
                  >
                  <b-button
                    value="2"
                    v-model="filter.groupBy"
                    @click="onChangeCustomerDetailsGender(2)"
                    >หญิง</b-button
                  >
                  <b-button
                    value="3"
                    v-model="filter.groupBy"
                    @click="onChangeCustomerDetailsGender(3)"
                    >N/A</b-button
                  >
                </b-button-group></b-col
              >
            </b-row>
            <PieChart
              :dataField="customerPieData.data"
              :labelField="customerPieData.label"
            />
            <div class="px-3 pb-3 mt-3">
              <div
                v-for="(bar, index) in customerData.customerDescriptions"
                :key="index"
                class="row mb-1"
              >
                <div class="col-sm-4 m-auto">
                  <label class="main-label"
                    >{{ bar.minAge }} - {{ bar.maxAge }}</label
                  >
                </div>
                <div class="col-sm-8 pt-1 d-flex">
                  <b-progress height="2rem" max="100" class="w-100"
                    ><b-progress-bar
                      :value="bar.percent"
                      :label="`${bar.percent.toFixed(2)}%`"
                    ></b-progress-bar
                  ></b-progress>
                  <span class="ml-2 w-25 text-center">{{ bar.total }}</span>
                </div>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <b-row no-gutters>
              <b-col md="4">
                <h1 class="header-main p-3 f-16">
                  กลุ่มลูกค้าแบ่งตามจังหวัด
                </h1>
              </b-col>
              <b-col md="8" class="m-auto text-right px-3">
                <div class="d-flex justify-content-end">
                  <b-input-group class="panel-input-serach">
                    <b-form-input
                      class="input-serach"
                      placeholder="ชื่อจังหวัด"
                      @keyup="handleSearchProvince"
                      v-model="filterProvince.Search"
                    ></b-form-input>
                    <b-input-group-prepend @click="btnSearchProvince">
                      <span class="icon-input m-auto pr-2">
                        <font-awesome-icon icon="search" title="View" />
                      </span>
                    </b-input-group-prepend>
                  </b-input-group></div
              ></b-col>
            </b-row>
            <div class="px-3 pb-3">
              <div
                v-for="(bar, index) in customerProvince"
                :key="index"
                class="row mb-1"
              >
                <div class="col-sm-4 m-auto">
                  <label class="main-label">{{ bar.province }}:</label>
                </div>
                <div class="col-sm-8 pt-1">
                  <b-progress height="2rem" max="100"
                    ><b-progress-bar
                      :value="bar.percent"
                      :label="`${bar.percent.toFixed(2)}%`"
                    ></b-progress-bar
                  ></b-progress>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>

      <div class="mt-3 bg-white py-3 py-sm-0">
        <b-row class="pb-3">
          <b-col md="6"
            ><h1 class="header-main p-3 f-16">10 อันดับสินค้าขายดี (บาท)</h1>
            <PieChart
              :dataField="bestSellerTHB.data"
              :labelField="bestSellerTHB.label"
              v-if="bestSellerTHB.label.length != 0 && bestSellerTHB.data.length != 0"
            />
            <div v-else class="text-center py-5">ไม่มีข้อมูล</div></b-col
          >
          <b-col md="6"
            ><h1 class="header-main p-3 f-16">10 อันดับสินค้าขายดี (จำนวน)</h1>
            <PieChart
              :dataField="bestSellerUnit.data"
              :labelField="bestSellerUnit.label"
              v-if="bestSellerUnit.label.length != 0 && bestSellerUnit.data.length != 0"
            />
            <div v-else class="text-center py-5">ไม่มีข้อมูล</div></b-col
          >
          <b-col md="6"
            ><h1 class="header-main p-3 f-16">10 อันดับรายได้ (บาท)</h1>
            <PieChart
              :dataField="bestProfit.data"
              :labelField="bestProfit.label"
              v-if="bestProfit.label.length != 0 && bestProfit.data.length != 0"
            />
            <div v-else class="text-center py-5">ไม่มีข้อมูล</div></b-col
          >
          <b-col md="6"
            ><h1 class="header-main p-3 f-16">10 อันดับสินค้าที่แชร์มากที่สุด</h1>
            <PieChart
              :dataField="bestShare.data"
              :labelField="bestShare.label"
              v-if="bestShare.label.length != 0 && bestShare.data.length != 0"
            />
            <div v-else class="text-center py-5">ไม่มีข้อมูล</div></b-col
          >
        </b-row>
      </div>

      <div class="mt-3 bg-white py-3 py-sm-0">
        <CRow class="no-gutters p-3">
          <b-col sm="6" class="text-center text-sm-left my-auto font-weight-bold f-18">
           สินค้าทั้งหมด
          </b-col>
          <b-col sm="6" class="text-right">
            <div class="d-flex justify-content-end border-1">
              <b-input-group class="panel-input-serach">
                <b-form-input
                  class="input-serach"
                  placeholder="ชื่อสินค้า, SKU"
                  v-model="filterTable.search"
                  @keyup="handleSearch"
                ></b-form-input>
                <b-input-group-prepend @click="btnSearch">
                  <span class="icon-input m-auto pr-2">
                    <font-awesome-icon icon="search" title="View" />
                  </span>
                </b-input-group-prepend>
              </b-input-group>
            </div>
          </b-col>
        </CRow>

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
          <template v-slot:cell(category)="data">
            <span
              v-if="data.item.category != null && data.item.category.length > 0"
              class=""
            >
              {{ addSign(data.item.category) }}</span
            >
            <span v-else>-</span>
          </template>
          <template v-slot:table-busy>
            <div class="text-center text-black my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong class="ml-2">Loading...</strong>
            </div>
          </template></b-table
        >
        <b-row class="no-gutters px-3 px-sm-0">
          <b-col
            class="form-inline justify-content-center justify-content-sm-between"
          >
            <div class="d-sm-flex m-3">
              <b-pagination
                v-model="filterTable.PageNo"
                :total-rows="rows"
                :per-page="filterTable.PerPage"
                class="m-md-0"
                @change="pagination"
                align="center"
              ></b-pagination>
            </div>

            <b-form-select
              class="mr-sm-3 select-page"
              v-model="filterTable.PerPage"
              @change="hanndleChangePerpage"
              :options="pageOptions"
            ></b-form-select>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from "../dashboard/components/countDownTimer";
import PieChart from "../dashboard/components/PieChart";
import BarChart from "../dashboard/components/BarChart";

export default {
  components: {
    Timer,
    PieChart,
    BarChart,
  },
  data() {
    return {
      statusData: null,
      performanceData: null,
      customerData: null,
      campaignData: null,
      filter: {
        PageNo: 1,
        PerPage: 10,
        groupBy: "week",
      },
      filterCustomer: {
        PageNo: 1,
        PerPage: 10,
        gender: [],
      },
      filterProvince: {
        PageNo: 1,
        PerPage: 10,
        search: "",
      },
      filterTable: {
        PageNo: 1,
        PerPage: 10,
        search: "",
      },
      barData: {
        xData: [],
        yData: [],
      },
      customerPieData: {
        label: [],
        data: [],
      },
      bestSellerTHB: {
        label: [],
        data: [],
      },
      bestSellerUnit: {
        label: [],
        data: [],
      },
      bestProfit: {
        label: [],
        data: [],
      },
      bestShare: {
        label: [],
        data: [],
      },
      customerProvince: null,
      items: [],
      isBusy: false,
      rows: 0,
      pageOptions: [
        { value: 10, text: `10 / ${this.$t("page")}` },
        { value: 30, text: `30 / ${this.$t("page")}` },
        { value: 50, text: `50 / ${this.$t("page")}` },
        { value: 100, text: `100 / ${this.$t("page")}` },
      ],
      fields: [
        {
          key: "sku",
          label: `SKU`,
          class: "w-100px",
        },
        {
          key: "name",
          label: `ชื่อสินค้า`,
          class: "w-100px",
        },
        {
          key: "category",
          label: `หมวดหมู่`,
          class: "w-200",
        },
        {
          key: "sold",
          label: `ขายแล้ว`,
          class: "w-100px",
        },
        {
          key: "revenue",
          label: `ยอดขาย`,
          class: "w-100px",
        },
        {
          key: "shareCount",
          label: `จำนวนการแชร์`,
          class: "w-100px",
        },
        {
          key: "clickCount",
          label: "จำนวนการเข้าชม",
          class: "w-100px",
        },
        {
          key: "conversion",
          label: "Conversion",
          class: "w-100px",
        },
        {
          key: "gp",
          label: "GP",
          class: "w-100px",
        },
        {
          key: "gpthb",
          label: "GP (THB)",
          class: "w-100px",
        },
      ],
    };
  },
  created: async function () {
    await this.Topten();
    await this.RevenueProduct();
    await this.CustomerDetails();
    await this.CustomerProvince();
    await this.getProductList();
    this.$isLoading = true;
  },
  methods: {
    addSign(array) {
      let str = "";
      for (let i = 0; i < array.length; i++) {
        if (array[i] != null && array[i] != "") str += array[i] + " > ";
        //else str += "-";
      }
      str = str.replace(/>\s*$/, "");
      return str;
    },
    RevenueProduct: async function () {
      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Dashboard/RevenueProduct`,
        null,
        this.$headers,
        this.filter
      );
      if (resData.result == 1) {
        this.statusData = resData.detail;

        this.barData.xData = [];
        this.barData.yData = [];
        resData.detail.productOverview.forEach((element, index) => {
          this.barData.yData[index] = element.totalSales;
          this.barData.xData[index] = this.$moment(element.createdTime).format(
            "DD MMM"
          );
        });
      }
    },
    CustomerDetails: async function () {
      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Dashboard/CustomerDetails`,
        null,
        this.$headers,
        this.filterCustomer
      );
      if (resData.result == 1) {
        this.customerData = resData.detail;

        this.customerPieData.label = [];
        this.customerPieData.data = [];
        resData.detail.customerGenderDescription.forEach((element, index) => {
          this.customerPieData.label[index] = element.gender;
          this.customerPieData.data[index] = element.total;
        });
      }
    },
    CustomerProvince: async function () {
      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Dashboard/CustomerProvince`,
        null,
        this.$headers,
        this.filterProvince
      );
      if (resData.result == 1) {
        this.customerProvince = resData.detail.customerProvinces;
      }
    },
    Topten: async function () {
      let resData = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Dashboard/TopTen`,
        null,
        this.$headers,
        null
      );
      if (resData.result == 1) {
        this.bestSellerTHB.label = [];
        this.bestSellerTHB.data = [];
        resData.detail.bestSellerTHB.forEach(async (element, index) => {
          this.bestSellerTHB.label[index] = element.name;
          this.bestSellerTHB.data[index] = element.total;
        });
        this.bestSellerUnit.label = [];
        this.bestSellerUnit.data = [];
        this.bestProfit.label = [];
        this.bestProfit.data = [];
        this.bestShare.label = [];
        this.bestShare.data = [];

        resData.detail.bestSellerUnit.forEach((element, index) => {
          this.bestSellerUnit.label[index] = element.name;
          this.bestSellerUnit.data[index] = element.total;
        });

        resData.detail.bestProfit.forEach((element, index) => {
          this.bestProfit.label[index] = element.name;
          this.bestProfit.data[index] = element.total;
        });

        resData.detail.bestShare.forEach((element, index) => {
          this.bestShare.label[index] = element.name;
          this.bestShare.data[index] = element.total;
        });
      }
    },
    getProductList: async function () {
      this.isBusy = true;
      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Dashboard/RevenueProduct/Products`,
        null,
        this.$headers,
        this.filterTable
      );
      if (resData.result == 1) {
        this.items = resData.detail.dataList;
        this.rows = resData.detail.count;
      }
      this.isBusy = false;
    },
    onChangeRevenueProductGroupBy(value) {
      this.filter.groupBy = value;
      this.RevenueProduct();
    },
    onChangeCustomerDetailsGender(value) {
      this.filterCustomer.gender = [];
      this.filterCustomer.gender.push(value);
      this.CustomerDetails();
    },
    pagination(Page) {
      this.filterTable.PageNo = Page;
      this.getProductList();
    },
    hanndleChangePerpage(value) {
      this.filterTable.PageNo = 1;
      this.filterTable.PerPage = value;
      this.getProductList();
    },
    handleSearch(e) {
      if (e.keyCode === 13) {
        this.filterTable.PageNo = 1;
        this.getProductList();
      }
    },
    btnSearch() {
      this.filterTable.PageNo = 1;
      this.getProductList();
    },
    handleSearchProvince(e) {
      if (e.keyCode === 13) {
        this.filterProvince.PageNo = 1;
        this.CustomerProvince();
      }
    },
    btnSearchProvince() {
      this.filterProvince.PageNo = 1;
      this.CustomerProvince();
    },
  },
};
</script>


<style scoped>
.dashboard-status-box {
  width: 20%;
  display: inline-block;
}

.dashboard-status {
  border-radius: 5px;
  border: 1px solid #1085ff;
}

.dashboard-status-value {
  color: #1085ff;
  font-size: 20px;
  font-weight: bold;
  width: 25%;
  text-align: right;
}

.performance-box {
  width: 25% !important;
}

.performance-box div,
.campaign-data-box {
  border: 1px solid #dbdbdb;
}

.panel-input-serach {
  border-color: #092d53 !important;
}

@media (max-width: 991px) {
  .performance-box {
    width: 50% !important;
  }
}

@media (max-width: 767px) {
  .dashboard-status-box {
    width: 50%;
  }
}

@media (max-width: 600px) {
  /* .dashboard-status-box {
    width: 50%;
  } */
}
</style>