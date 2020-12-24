<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col xl="6" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">รายการวอชเชอร์</h1>
        </b-col>
        <b-col xl="6" class="text-right d-flex">
          <b-input-group class="panel-input-serach">
            <b-form-input
              class="input-serach"
              placeholder="ชื่อวอชเชอร์"
              v-model="filter.Search"
              @keyup="handleSearch"
            ></b-form-input>
            <b-input-group-prepend @click="btnSearch">
              <span class="icon-input m-auto pr-2">
                <font-awesome-icon icon="search" title="View" />
              </span>
            </b-input-group-prepend>
          </b-input-group>
          <b-button v-b-toggle.sidebar-1 class="mr-2 btn-filter">
            <font-awesome-icon
              icon="filter"
              title="filter-btn"
              class="text-white mr-0 mr-sm-1"
            />
            <span class="d-none d-sm-inline"
              >ค้นหาแบบละเอียด ({{ countStartdate + countEnddate }})</span
            >
          </b-button>
          <router-link to="/voucher/details/0">
            <b-button class="btn-main h-100">สร้างวอชเชอร์ใหม่</b-button>
          </router-link>
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

          <div>
            <label class="label-text mb-3">วันที่แลกวอชเชอร์</label>
          </div>

          <label class="label-text">วันเริ่มต้น</label>
          <datetime
            placeholder="กรุณาเลือกวันที่"
            class="date-picker"
            v-model="filter.startDate"
            format="dd MMM yyyy"
          ></datetime>

          <label class="label-text">วันสิ้นสุด</label>
          <datetime
            placeholder="กรุณาเลือกวันที่"
            class="date-picker"
            v-model="filter.endDate"
            format="dd MMM yyyy"
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
              <template v-slot:cell(name)="data">
                <p class="mb-0 nobreak two-lines">{{ data.item.name }}</p>
              </template>
              <template v-slot:cell(startDateEnable)="data">
                <span
                  >{{
                    new Date(data.item.startDateEnable) | moment($formatDate)
                  }}
                  -
                  {{
                    new Date(data.item.endDateEnable) | moment($formatDate)
                  }}</span
                >
              </template>
              <template v-slot:cell(startDate)="data">
                <span
                  >{{ new Date(data.item.startDate) | moment($formatDate) }} -
                  {{ new Date(data.item.endDate) | moment($formatDate) }}</span
                >
              </template>
              <template v-slot:cell(maximum)="data">
                <span> {{ data.item.maximum | numeral("0,0") }} </span>
              </template>
              <template v-slot:cell(point)="data">
                <span> {{ data.item.point | numeral("0,0") }} </span>
              </template>
              <template v-slot:cell(value)="data">
                <span>฿ {{ data.item.value | numeral("0,0.00") }} </span>
              </template>
              <template v-slot:cell(uses)="data">
                <span> {{ data.item.uses | numeral("0,0") }} </span>
              </template>
              <template v-slot:cell(enabled)="data">
                <div v-if="data.item.enabled == true" class="text-success">
                  ใช้งาน
                </div>
                <div v-else class="text-danger">ไม่ใช้งาน</div>
              </template>
              <template v-slot:cell(bathOrPercent)="data">
                <div v-if="data.item.bathOrPercent == 0">บาท</div>
                <div v-else>เปอร์เซน</div>
              </template>
              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <b-button variant="link" class="px-1 py-0">
                    <router-link :to="'/voucher/details/' + data.item.id">
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
                v-model="filter.pageNo"
                :total-rows="rows"
                :per-page="filter.perpage"
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
              v-model="filter.perpage"
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
export default {
  name: "VoucherIndex",
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
          key: "name",
          label: "ชื่อวอชเชอร์",
          class: "w-100px",
        },
        {
          key: "prefix",
          label: "Prefix",
          class: "w-100px",
        },
        {
          key: "bathOrPercent",
          label: "ประเภทวอชเชอร์",
          class: "w-100px",
        },
        {
          key: "point",
          label: "คะแนนที่ใช้แลก",
          class: "w-100px",
        },
        {
          key: "value",
          label: "ส่วนลดที่ได้รับ",
          class: "w-100px",
          tdClass: "text-right",
        },
        {
          key: "startDateEnable",
          label: "วันที่แลกวอชเชอร์",
          class: "w-100px",
        },
        {
          key: "maximum",
          label: "จำนวนทั้งหมด",
          class: "w-100px",
        },
        {
          key: "quantity",
          label: "จำนวนที่เหลือ",
          class: "w-100px",
        },
        {
          key: "uses",
          label: "ถูกใช้ไปแล้ว",
          class: "w-100px",
        },
        {
          key: "startDate",
          label: "วันที่ใช้งาน",
          class: "w-100px",
        },
        {
          key: "enabled",
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
        pageNo: 1,
        perpage: 10,
        startDate: "",
        endDate: "",
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
      errorDate: false,
    };
  },
  computed: {
    countStartdate: function () {
      var count = 0;
      if (this.filter.startDate != "") count += 1;
      else if (count > 0) count -= 1;
      return count;
    },
    countEnddate: function () {
      var count = 0;

      if (this.filter.endDate != "") count += 1;
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

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Voucher/Gets`,
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
      if (this.filter.startDate > this.filter.endDate) {
        this.errorDate = true;
        return;
      }

      this.errorDate = false;
      this.$refs.filterSidebar.hide(true);
      this.getList();
    },
    onClearFilter() {
      this.filter.pageNo = 1;
      this.filter.startDate = "";
      this.filter.endDate = "";
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
    hanndleStatusList(value) {
      this.filter.PageNo = 1;
      this.filter.statusId = value;
      this.getList();
    },
    checkAllSelect() {
      if (this.selectAllCb) {
        this.filter.ReviewStatus = [];
      } else {
        this.filter.ReviewStatus = [1, 0];
      }
    },
    checkStatusLength() {
      if (this.filter.ReviewStatus.length == 2) {
        this.selectAllCb = true;
      } else {
        this.selectAllCb = false;
      }
    },
  },
};
</script>       

<style scoped>
.menuactive {
  color: #ffb300 !important;
}

.review-shortdesc {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
}

.w-300 {
  width: 300px;
}
</style>