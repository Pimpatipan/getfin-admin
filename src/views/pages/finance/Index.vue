<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col sm="6" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">
            รายการเกี่ยวกับการเงิน (คู่ค้า)
          </h1>
          <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
        </b-col>
        <b-col sm="6" class="text-right">
          <div class="d-flex">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="ชื่อคู่ค้า"
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
              <span class="d-none d-sm-inline">ค้นหาแบบละเอียด ({{ countStartdate + countEnddate }})</span>
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
            v-model="filter.StartDate"
            format="dd MMM yyyy"
          ></datetime>

          <label class="label-text">วันสิ้นสุด</label>
          <datetime
            placeholder="กรุณาเลือกวันที่"
            class="date-picker"
            v-model="filter.EndDate"
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

      <b-row class="no-gutters">
        <b-col md="12" class="label-text pt-2">
          <b-row class="no-gutters px-3 px-sm-0 mt-2 overflow-auto">
            <b-col>
              <b-button-group class="btn-group-status">
                <b-button
                  v-for="(item, index) in statusList"
                  :key="index"
                  @click="getDataByStatusName(item.id, item.name)"
                  :class="{ menuactive: isActive(item.name) }"
                  >{{ item.name }}</b-button
                >
              </b-button-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="6" class="text-right"> </b-col>
      </b-row>
      <div>
        <b-row class="mt-2 nomargin" v-if="financeTypeId == 1">
          <b-col xl="4" class="mb-3 mb-xl-0">
            <div class="bg-white p-3 yellow-box finance-border h-100">
              <b-row>
                <b-col class="d-flex">
                  <font-awesome-icon
                    icon="dollar-sign"
                    title="dollar"
                    class="f-20 my-2 mr-3"
                  />
                  <p class="font-weight-bold my-2 one-line">จำนวนเงินรอจ่าย</p>
                </b-col>
                <b-col
                  class="mb-2 mb-sm-0 f-14 font-weight-bold text-primary py-2 text-right"
                  >‎฿ {{ waitForPaid.grandTotal }}</b-col
                >
              </b-row>
            </div>
          </b-col>
          <b-col xl="4" class="mb-3 mb-xl-0">
            <div class="bg-white p-3 finance-border h-100">
              <b-row>
                <b-col>
                  <p class="font-weight-bold my-2 one-line">
                    วันทำรายการครั้งต่อไป
                  </p>
                </b-col>
                <b-col
                  class="mb-2 mb-sm-0 f-14 font-weight-bold text-dark py-2 text-right"
                  >‎{{
                    waitForPaid.startDate | moment("DD MMM YYYY (HH:MM:SS)")
                  }}</b-col
                >
              </b-row>
            </div>
          </b-col>
          <b-col xl="4" class="mb-3 mb-xl-0">
            <div class="bg-white p-3 finance-border h-100">
              <b-row>
                <b-col class="d-flex">
                  <font-awesome-icon
                    icon="list"
                    title="list"
                    class="f-20 my-2 mr-3"
                  />
                  <p class="font-weight-bold my-2 one-line">จำนวนรายการ</p>
                </b-col>
                <b-col
                  class="mb-2 mb-sm-0 f-14 font-weight-bold text-primary py-2 text-right"
                  >{{
                    waitForPaid.totalFinanceTransaction | numeral("0,0")
                  }}
                  รายการ</b-col
                >
              </b-row>
            </div>
          </b-col>
        </b-row>

        <div class="mt-3 bg-white py-3 py-sm-0">
          <b-row class="no-gutters px-3 px-sm-0" v-if="financeTypeId != 3">
            <b-col>
              <b-table
                responsive
                class="text-center table-list"
                striped
                :fields="financeTypeId < 4 ? fields : fieldsAll"
                :items="items"
                :busy="isBusy"
                show-empty
                empty-text="ไม่พบข้อมูล"
              >
                <template v-slot:cell(statementNumber)="data">
                  <p
                    class="mb-0 nobreak two-lines"
                    v-if="
                      data.item.statementNumber != null ||
                      data.item.statementNumber != ''
                    "
                  >
                    {{ data.item.statementNumber }}
                    <span v-if="financeTypeId < 3"
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
                  <p class="mb-0 nobreak two-lines" v-if="financeTypeId != 4">
                    {{ data.item.createdTime | moment($formatDate) }}
                  </p>
                  <p v-else class="mb-0 nobreak two-lines">-</p>
                </template>
                <template v-slot:cell(grandTotal)="data">
                  <p class="mb-0 nobreak two-lines">
                    ‎฿ {{ data.item.grandTotal }}
                  </p>
                </template>
                <template v-slot:cell(statusName)="data">
                  <div
                    v-if="data.item.statusName == 'ชำระเงินแล้ว'"
                    class="text-success"
                  >
                    {{ data.item.statusName }}
                  </div>
                  <div v-else class="text-warning">
                    {{ data.item.statusName }}
                  </div>
                </template>
                <template v-slot:cell(id)="data" v-if="financeTypeId != 4">
                  <router-link
                    :to="'/finance/details/' + data.item.id"
                    v-if="financeTypeId != 4"
                  >
                    <b-button variant="link" class="px-1 py-0"
                      >ตรวจสอบ</b-button
                    >
                  </router-link>
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

          <div class="p-3 p-sm-0" v-if="financeTypeId == 3">
            <b-table-simple
              striped
              responsive
              class="table-list"
              :busy="isBusy"
            >
              <b-thead head-variant="secondary">
                <b-tr>
                  <b-th class="w-100px">เลขที่</b-th>
                  <b-th class="w-100px">ชื่อคู่ค้า</b-th>
                  <b-th class="w-100px">จำนวนเงิน</b-th>
                  <b-th class="w-100px">วันชำระเงิน</b-th>
                  <b-th class="w-100px">รอบบิล</b-th>
                  <b-th class="w-100px">สถานะ</b-th>
                  <b-th></b-th>
                </b-tr>
              </b-thead>
              <b-tbody class="p-3" v-for="(items, index) in items" :key="index">
                <b-tr>
                  <b-td colspan="2" class="text-center font-weight-bold"
                    >{{ items.statementNumber }} ({{
                      items.totalFinanceTransaction
                    }}
                    รายการ)</b-td
                  >
                  <b-td>฿ {{ items.grandTotal }}</b-td>
                  <b-td>{{ items.createdTime | moment($formatDate) }}</b-td>
                  <b-td>
                    {{ items.startDate | moment($formatDate) }} -
                    {{ items.endDate | moment($formatDate) }}</b-td
                  >
                  <b-td
                    colspan="2"
                    class="text-warning text-center font-weight-bold"
                    >{{ items.statusName }}</b-td
                  >
                </b-tr>

                <b-tr
                  v-for="(item2, index2) in items.sellers"
                  :key="index + '-' + index2"
                >
                  <b-td class="text-center">{{ item2.statementNumber }}</b-td>
                  <b-td>{{ item2.sellerName }}</b-td>
                  <b-td>฿ {{ item2.grandTotal }}</b-td>
                  <b-td> {{ item2.createdTime | moment($formatDate) }}</b-td>
                  <b-td
                    >{{ item2.startDate | moment($formatDate) }} -
                    {{ item2.endDate | moment($formatDate) }}</b-td
                  >
                  <b-td
                    ><span v-if="item2.statusName" !="null">{{
                      item2.statusName
                    }}</span
                    ><span v-else>-</span></b-td
                  >
                  <b-td class="text-center w-100px">
                    <router-link :to="'/finance/details/' + item2.id">
                      <b-button variant="link" class="text-primary px-1 py-0"
                        >ตรวจสอบ</b-button
                      >
                    </router-link></b-td
                  >
                </b-tr>

                <!-- <b-tr>
                  <b-td colspan="2" class="text-center font-weight-bold"
                    >0108-0708-2020 (1 รายการ)</b-td
                  >
                  <b-td>฿ 842,938.32</b-td>
                  <b-td>13 Aug 2020</b-td>
                  <b-td>1 Aug 2020 - 7 Aug 2020</b-td>
                  <b-td
                    colspan="2"
                    class="text-danger text-center font-weight-bold"
                    >ชำระเงินไม่สำเร็จ</b-td
                  >
                </b-tr>
                <b-tr>
                  <b-td class="text-center">080231-1</b-td>
                  <b-td>ร้านของแมวน้อยชิโร่</b-td>
                  <b-td>฿ 34,323.00</b-td>
                  <b-td>6 Aug 2020</b-td>
                  <b-td>1 Aug 2020 - 7 Aug 2020</b-td>
                  <b-td class="text-warning text-center font-weight-bold"
                    >รอการชำระเงิน</b-td
                  >
                  <b-td
                    class="text-primary text-center text-underline font-weight-bold"
                    >ตรวจสอบ</b-td
                  >
                </b-tr> -->
              </b-tbody>
            </b-table-simple>
          </div>

          <b-row class="no-gutters px-3 px-sm-0 mb-3">
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
  </div>
</template>

<script>
export default {
  name: "FinanceIndex",
  data() {
    return {
      statusList: [
        { id: 1, name: "รายการรอจ่าย" },
        { id: 2, name: "รายการสำเร็จ" },
        { id: 3, name: "รายการไม่สำเร็จ" },
        { id: 4, name: "รายการที่ยังไม่ตัดรอบ" },
        { id: 5, name: "รายการทั้งหมด" },
      ],
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
      fieldsAll: [
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
        PageNo: 1,
        PerPage: 10,
        Search: "",
        OverView: "",
        StartDate: "",
        EndDate: ""
      },
      waitForPaid: {},
      pageOptions: [
        { value: 10, text: "10 / หน้า" },
        { value: 30, text: "30 / หน้า" },
        { value: 50, text: "50 / หน้า" },
        { value: 100, text: "100 / หน้า" },
      ],
      totalRowMessage: "",
      financeTypeId: 1,
      errorDate: false,
    };
  },
   computed: {
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
    this.activeItem = "รายการรอจ่าย";
  },
  methods: {
    getData: async function () {
      this.isBusy = true;

      if (this.financeTypeId == 1) {
        let data = await this.$callApi(
          "get",
          `${this.$baseUrl}/api/Finance/DetailFinaceWaitForPaid`,
          null,
          this.$headers,
          null
        );

        if (data.result == 1) {
          this.waitForPaid = data.detail;
        }
      }

      let url = "",
        field = [];

      if (this.financeTypeId == 1) {
        url = `${this.$baseUrl}/api/Finance/WaitForPaid`;
        field = this.filter;
      } else if (this.financeTypeId == 2) {
        url = `${this.$baseUrl}/api/Finance/SuscessPaid`;
        field = this.filter;
      } else if (this.financeTypeId == 3) {
        url = `${this.$baseUrl}/api/Finance/FailPaid`;
      } else if (this.financeTypeId == 4) {
        url = `${this.$baseUrl}/api/Finance/WaitBillingPeriods`;
        field = this.fieldsAll;
      } else {
        url = `${this.$baseUrl}/api/Finance/AllFinance`;
        field = this.fieldsAll;
      }

      let resData = await this.$callApi(
        "post",
        url,
        null,
        this.$headers,
        this.filter
      );
      if (resData.result == 1) {
        this.items = resData.detail.dataList;
        this.rows = resData.detail.totalData;

        this.isBusy = false;

        this.$isLoading = true;
      }
    },
    getDataByStatus(status) {
      if (this.filter.StartDate > this.filter.EndDate) {
        this.errorDate = true;
        return;
      }

      this.errorDate = false;
      this.$refs.filterSidebar.hide(true);
      this.getData();
    },
    getDataByStatusName(id, status) {
      this.financeTypeId = id;
      this.activeItem = status;

      if (this.financeTypeId == 4) this.fieldsAll[6].class = "d-none";
      else this.fieldsAll[6].class = "w-100px text-nowrap";

      this.getData();
    },
    isActive: function (menuItem) {
      return this.activeItem == menuItem;
    },
    pagination(Page) {
      this.filter.PageNo = Page;
      this.getData();
    },
    hanndleChangePerpage(value) {
      this.filter.PageNo = 1;
      this.filter.PerPage = value;
      this.getData();
    },
    handleSearch(e) {
      if (e.keyCode === 13) {
        this.filter.PageNo = 1;
        this.getData();
      }
    },
    btnSearch() {
      this.filter.PageNo = 1;
      this.getData();
    },
    hanndleStatusList(value) {
      this.filter.PageNo = 1;
      this.filter.statusId = value;
      this.getData();
    },
    onClearFilter() {
      this.filter.PageNo = 1;
      this.filter.StartDate = "";
      this.filter.EndDate = "";
      this.$refs.filterSidebar.hide(true);
      this.getData();
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
  border: 2px solid #ffb300 !important;
  background-color: #f4ebd7 !important;
}

.finance-border {
  border-radius: 10px;
  border: 2px solid #fff;
}

.finance-border p {
  height: 20px;
}

@media (max-width: 600px) {
  .nomargin {
    margin: 0;
  }

  .w-300 {
    width: 100%;
  }
}
</style>