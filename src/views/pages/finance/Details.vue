<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0 mb-3">
        <b-col sm="6" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">
            รายละเอียดรายการเกี่ยวกับการเงิน (คู่ค้า)
          </h1>
          <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
        </b-col>
        <b-col sm="6" class="text-right">
          <div class="d-flex">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="ชื่อคู่ค้า / ID คู่ค้า"
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
          </div>
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

      <div>
        <div class="mt-3 bg-white">
          <b-row class="no-gutters px-3 px-sm-0">
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
                <template v-slot:cell(statementNumber)="data">
                  <p
                    class="mb-0 nobreak two-lines"
                    v-if="data.item.statementNumber != null"
                  >
                    {{ data.item.statementNumber }}
                    <span
                      >({{ data.item.totalFinanceTransaction }} รายการ)</span
                    >
                  </p>
                  <p class="m-0" v-else>-</p>
                </template>
                <template v-slot:cell(startDate)="data">
                  <p class="mb-0 nobreak two-lines">
                    {{ data.item.startDate | moment($formatDate) }} -
                    {{ data.item.endDate | moment($formatDate) }}
                  </p>
                </template>
                <template v-slot:cell(createdTime)="data">
                  <p class="mb-0 nobreak two-lines">
                    {{ data.item.createdTime | moment($formatDate) }}
                  </p>
                </template>
                <template v-slot:cell(grandTotal)="data">
                  <p class="mb-0 nobreak two-lines">
                    ‎฿ {{ data.item.grandTotal }}
                  </p>
                </template>
                <template v-slot:cell(enabled)="data">
                  <div v-if="data.item.enabled == true" class="text-success">
                    ใช้งาน
                  </div>
                  <div v-else class="text-danger">ไม่ใช้งาน</div>
                </template>
                <template v-slot:cell(id)="data">
                  <!-- <router-link :to="'/finance/details/' + data.item.id"> -->
                  <b-button variant="link" class="text-primary px-1 py-0"
                    >ตรวจสอบ</b-button
                  >
                  <!-- </router-link> -->
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
  </div>
</template>

<script>
export default {
  name: "FinanceDetails",
  data() {
    return {
      statusList: [],
      selected: null,
      show: true,
      checked: true,
      options: [{ value: null, text: "สถานะ" }],
      modalMessage: "",
      activeItem: "",
      requestDeleteUser: {
        userId: null,
      },
      fields: [
        {
          key: "statementNumber",
          label: "เลขที่",
          class: "w-100px text-nowrap",
        },
        {
          key: "sellerName",
          label: "ชื่อคู่ค้า",
          class: "w-100px text-nowrap",
        },
        {
          key: "grandTotal",
          label: "จำนวนเงิน",
          class: "w-100px text-nowrap",
        },
        {
          key: "createdTime",
          label: "วันชำระเงิน",
          class: "w-100px text-nowrap",
        },
        { key: "startDate", label: "รอบบิล", class: "w-100px text-nowrap" },
        { key: "statusName", label: "สถานะ", class: "w-100px text-nowrap" },
        { key: "id", label: "", class: "w-100px text-nowrap" },
      ],
      items: [],
      isBusy: false,
      rows: 0,
      filter: {
        search: "",
        startDate: "",
        endDate: "",
        ObjectId: this.$route.params.id,
        pageNo: 1,
        perpage: 10,
      },
      pageOptions: [
        { value: 10, text: "10 / หน้า" },
        { value: 30, text: "30 / หน้า" },
        { value: 50, text: "50 / หน้า" },
        { value: 100, text: "100 / หน้า" },
      ],
      totalRowMessage: "",
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
  },
  methods: {
    getList: async function () {
      this.isBusy = true;
      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Finance/FinanceDetail`,
        null,
        this.$headers,
        this.filter
      );
      if (resData.result == 1) {
        this.items = resData.detail.dataList;
        this.rows = resData.detail.count;
        this.isBusy = false;
        this.$isLoading = true;
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
    isActive: function (menuItem) {
      return this.activeItem == menuItem;
    },
    pagination(Page) {
      this.filter.pageNo = Page;
      this.getList();
    },
    hanndleChangePerpage(value) {
      this.filter.pageNo = 1;
      this.filter.perpage = value;
      this.getList();
    },
    handleSearch(e) {
      if (e.keyCode === 13) {
        this.filter.pageNo = 1;
        this.getList();
      }
    },
    btnSearch() {
      this.filter.pageNo = 1;
      this.getList();
    },
    hanndleStatusList(value) {
      this.filter.pageNo = 1;
      this.filter.statusId = value;
      this.getList();
    },
    onClearFilter() {
      this.filter.pageNo = 1;
      this.filter.startDate = "";
      this.filter.endDate = "";
      this.$refs.filterSidebar.hide(true);
      this.getList();
    },
  },
};
</script>       

<style scoped>
.menuactive {
  color: #ffb300 !important;
}

.see-details {
  position: absolute;
  right: 15px;
  z-index: 1;
  top: 5px;
}

.w-300 {
  width: 300px;
}

.yellow-box {
  border: 2px solid #ffb300;
  background-color: #f4ebd7 !important;
}

.finance-border {
  border-radius: 10px;
}
</style>