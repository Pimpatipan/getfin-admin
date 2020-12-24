<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col sm="6" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">รายการตัวแทน</h1>
        </b-col>
        <b-col sm="6" class="text-right d-flex">
          <b-input-group class="panel-input-serach">
            <b-form-input
              class="input-serach"
              placeholder="ชื่อตัวแทน"
              v-model="filter.Search"
              @keyup="handleSearch"
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
                countTier +
                countStartdate +
                countEnddate +
                countCashback +
                countSale +
                countPoint
              }})</span
            >
          </b-button>
        </b-col>
      </CRow>
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
            title="ระดับ"
            name="tier"
            :options="optionsTier"
            v-model="filter.tier"
            @onDataChange="handleChangeTier"
            valueField="id"
            textField="name"
          />

          <InputSelect
            class="mb-4"
            title="สถานะ"
            name="status"
            :options="optionsStatus"
            v-model="filter.status"
            @onDataChange="handleChangeStatus"
            valueField="value"
            textField="text"
          />

          <label class="label-text">วันเริ่มต้น</label>
          <datetime
            placeholder="กรุณากรอกวันที่"
            class="date-picker mb-3"
            format="dd MMM yyyy"
            v-model="filter.StartDate"
          ></datetime>

          <label class="label-text">วันสิ้นสุด</label>
          <datetime
            placeholder="กรุณากรอกวันที่"
            class="date-picker mb-3"
            format="dd MMM yyyy"
            v-model="filter.EndDate"
          ></datetime>

          <b-row>
            <b-col>
              <InputText
                textFloat="คะแนนเริ่มต้น"
                placeholder="คะแนนเริ่มต้น"
                type="text"
                name="pointstart"
                v-model="filter.MinPoint"
              />
            </b-col>
            <span class="lh-60">-</span>
            <b-col>
              <InputText
                textFloat="คะแนนสิ้นสุด"
                placeholder="คะแนนสิ้นสุด"
                type="text"
                name="pointend"
                v-model="filter.MaxPoint"
              />
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <InputText
                textFloat="ยอดขายเริ่มต้น"
                placeholder="ยอดขายเริ่มต้น"
                type="text"
                name="salestart"
                v-model="filter.MinSale"
              />
            </b-col>
            <span class="lh-60">-</span>
            <b-col>
              <InputText
                textFloat="ยอดขายสิ้นสุด"
                placeholder="ยอดขายสิ้นสุด"
                type="text"
                name="saleend"
                v-model="filter.MaxSale"
              />
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <InputText
                textFloat="คอมมิชชั่นเริ่มต้น"
                placeholder="คอมมิชชั่นเริ่มต้น"
                type="text"
                name="comstart"
                v-model="filter.MinCashback"
              />
            </b-col>
            <span class="lh-60">-</span>
            <b-col>
              <InputText
                textFloat="คอมมิชชั่นสิ้นสุด"
                placeholder="คอมมิชชั่นสิ้นสุด"
                type="text"
                name="comend"
                v-model="filter.MaxCashback"
              />
            </b-col>
          </b-row>

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

      <div class="mt-3 bg-white">
        <b-row class="no-gutters px-3 px-sm-0">
          <b-col>
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
              <template v-slot:cell(createdTime)="data">
                <span>{{
                  new Date(data.item.createdTime) | moment($formatDate)
                }}</span>
              </template>
              <template v-slot:cell(firstname)="data">
                <div class="row no-gutters">
                  <div class="col-12">
                    <div class="review-shortdesc">
                      <p class="font-weight-bold mb-1">
                        {{ data.item.firstname }} {{ data.item.lastname }}
                      </p>
                      <p class="m-0">
                        {{ data.item.telephone }}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-slot:cell(point)="data">
                <p class="m-0">{{ data.item.point | numeral("0,0") }}</p>
              </template>
              <template v-slot:cell(sales)="data">
                <p class="m-0">฿ {{ data.item.sales | numeral("0,0.00") }}</p>
              </template>
              <template v-slot:cell(cashBack)="data">
                <p class="m-0">
                  ฿ {{ data.item.cashBack | numeral("0,0.00") }}
                </p>
              </template>
              <template v-slot:cell(statusId)="data">
                <div v-if="data.item.statusId == 0" class="text-dark">
                  ถูกระงับ
                </div>
                <div v-else-if="data.item.statusId == 1" class="text-success">
                  อนุมัติ
                </div>
                <div v-else class="text-warning">รอการอนุมัติ</div>
              </template>
              <template v-slot:cell(genderId)="data">
                <div v-if="data.item.genderId == 1">ชาย</div>
                <div v-else-if="data.item.genderId == 2">หญิง</div>
                <div v-else class="">N/A</div>
              </template>
              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <b-button variant="link" class="px-1 py-0">
                    <router-link
                      :to="'/affiliate/details/' + data.item.userGUID"
                    >
                      ตรวจสอบ
                    </router-link>
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
          </b-col>
        </b-row>
        <b-row class="no-gutters px-3 px-sm-0">
          <b-col
            class="form-inline justify-content-center justify-content-sm-between"
          >
            <div class="d-sm-flex m-3">
              <b-pagination
                v-model="filter.PageNo"
                :total-rows="rows"
                :per-page="filter.PerPage"
                class="m-md-0"
                @change="pagination"
                align="center"
              ></b-pagination>

              <div class="ml-2">
                <p class="total-record-paging text-nowrap text-center">
                  {{ totalRowMessage }}
                </p>
              </div>
            </div>

            <b-form-select
              class="mr-sm-3 select-page"
              v-model="filter.PerPage"
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
import InputText from "@/components/inputs/InputText";
import InputSelect from "@/components/inputs/InputSelect";

export default {
  name: "AffiliateIndex",
  components: {
    InputText,
    InputSelect,
  },
  data() {
    return {
      selected: null,
      options: [{ value: null, text: "สถานะ" }],
      statusList: [],
      modalMessage: "",
      activeItem: "",
      requestDeleteUser: {
        userId: null,
      },
      fields: [
        {
          key: "createdTime",
          label: "วันที่ทำการสมัคร",
          class: "w-100px",
        },
        {
          key: "firstname",
          label: "รายละเอียดตัวแทน",
          class: "w-100px",
          tdClass: "text-left",
        },
        {
          key: "tier",
          label: "ระดับ",
        },
        {
          key: "point",
          label: "คะแนน",
          class: "w-100px",
        },
        {
          key: "sales",
          label: "ยอดขายสะสม",
          class: "w-100px",
        },
        {
          key: "cashBack",
          label: "เงินคืน",
          class: "w-100px",
        },
        {
          key: "genderId",
          label: "เพศ",
          class: "w-50px",
        },
        {
          key: "follower",
          label: "ลูกข่าย",
          class: "w-100px",
        },
        {
          key: "email",
          label: "อีเมล",
          class: "w-50px",
        },
        {
          key: "statusId",
          label: "สถานะ",
          class: "w-100px",
        },
        {
          key: "id",
          label: "",
          class: "w-100px",
        },
      ],
      items: [],
      isBusy: false,
      value: false,
      rows: 0,
      filter: {
        PageNo: 1,
        PerPage: 10,
        StartDate: null,
        EndDate: null,
        status: [],
        Status: [],
        Search: "",
        tier: [],
        Tier: [],
        MinPoint: 0,
        MaxPoint: 0,
        MinSale: 0,
        MaxSale: 0,
        MinCashback: 0,
        MaxCashback: 0,
      },
      pageOptions: [
        { value: 10, text: "10 / หน้า" },
        { value: 30, text: "30 / หน้า" },
        { value: 50, text: "50 / หน้า" },
        { value: 100, text: "100 / หน้า" },
      ],
      totalRowMessage: "",
      items: [],
      isBusy: false,
      isDisable: false,
      checkAll: false,
      selectAllCb: false,
      optionsTier: [
        { id: [], name: "ระดับ" },
        { id: 1, name: "Platinum" },
        { id: 2, name: "Gold" },
        { id: 3, name: "Silver" },
      ],
      optionsStatus: [
        { value: [], text: "สถานะ" },
        { value: 0, text: "ถูกระงับ" },
        { value: 1, text: "อนุมัติ" },
        { value: 2, text: "รอการยืนยัน" },
      ],
      errorDate: false,
    };
  },
  computed: {
    countTier: function () {
      var count = 0;
      if (this.filter.Tier.length != 0) count += 1;
      else if (count > 0) count -= 1;
      return count;
    },
    countStatus: function () {
      var count = 0;
      if (this.filter.Status.length != 0) count += 1;
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
    countPoint: function () {
      var count = 0;

      if (this.filter.MinPoint != 0 || this.filter.MaxPoint != 0) count += 1;
      else if (count > 0) count -= 1;
      return count;
    },
    countSale: function () {
      var count = 0;

      if (this.filter.MinSale != 0 || this.filter.MaxSale != 0) count += 1;
      else if (count > 0) count -= 1;
      return count;
    },
    countCashback: function () {
      var count = 0;

      if (this.filter.MinCashback != 0 || this.filter.MaxCashback != 0)
        count += 1;
      else if (count > 0) count -= 1;
      return count;
    },
  },
  created: async function () {
    await this.getList();
    this.$isLoading = true;
  },
  methods: {
    getList: async function () {
      this.isBusy = true;

      if (this.filter.MinPoint == "") this.filter.MinPoint = 0;
      if (this.filter.MinSale == "") this.filter.MinSale = 0;
      if (this.filter.MinCashback == "") this.filter.MinCashback = 0;
      if (this.filter.MaxPoint == "") this.filter.MaxPoint = 0;
      if (this.filter.MaxSale == "") this.filter.MaxSale = 0;
      if (this.filter.MaxCashback == "") this.filter.MaxCashback = 0;

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Affiliate/List`,
        null,
        this.$headers,
        this.filter
      );
      if (resData.result == 1) {
        this.items = resData.detail.dataList;
        this.rows = resData.detail.count;
        //this.statusList = resData.detail.overviewCount;

        this.isBusy = false;
      }
    },
    getDataByStatus(status) {
      if (this.filter.StartDate > this.filter.EndDate) {
        this.errorDate = true;
        return;
      }

      this.errorDate = false;
      this.$refs.filterSidebar.hide(true);
      this.getList();
    },
    onClearFilter() {
      this.filter.PageNo = 1;
      this.filter.PerPage = 10;
      this.filter.StartDate = "";
      this.filter.EndDate = "";
      this.filter.Status = [];
      this.filter.Search = "";
      this.filter.Tier = [];
      this.filter.MinPoint = 0;
      this.filter.MaxPoint = 0;
      this.filter.MinSale = 0;
      this.filter.MaxSale = 0;
      this.filter.MinCashback = 0;
      this.filter.MaxCashback = 0;
      this.$refs.filterSidebar.hide(true);
      this.getList();
    },
    pagination(Page) {
      this.filter.PageNo = Page;
      this.getList();
    },
    hanndleChangePerpage(value) {
      this.filter.PageNo = 1;
      this.filter.PerPage = value;
      this.getList();
    },
    handleSearch(e) {
      if (e.keyCode === 13) {
        this.filter.PageNo = 1;
        this.getList();
      }
    },
    btnSearch() {
      this.filter.PageNo = 1;
      this.getList();
    },
    handleChangeTier: async function (value) {
      console.log(this.filter.tier,this.filter.status)
      this.filter.Tier = [];
      if (typeof value == "number") {
        this.filter.Tier.push(value);
      }
    },
    handleChangeStatus: async function (value) {
      this.filter.Status = [];
      if (typeof value == "number") {
        this.filter.Status.push(value);
      }
    },
  },
};
</script>       

<style scoped>
.lh-60 {
  line-height: 60px;
}
</style>