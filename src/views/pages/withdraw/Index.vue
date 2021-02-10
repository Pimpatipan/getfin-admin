<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col xl="4" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">คำขอถอนเงิน</h1>
        </b-col>
        <b-col xl="8" class="text-right">
          <div class="d-flex justify-content-end">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="เลขที่คำขอ"
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
                >ค้นหาแบบละเอียด ({{ countStartdate + countEnddate }})</span
              >
            </b-button>

            <b-button
              v-if="filter.status[0] == 0"
              class="btn-main ml-2 w-auto-mobile"
              @click="ExportWithdrawList"
              >ออกเอกสาร</b-button
            >
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
            placeholder="กรุณากรอกวันที่"
            class="date-picker"
            v-model="filter.StartDate"
            format="dd MMM yyyy"
          ></datetime>

          <label class="label-text">วันสิ้นสุด</label>
          <datetime
            placeholder="กรุณากรอกวันที่"
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

      <b-row class="no-gutters px-3 px-sm-0 mt-2 overflow-auto">
        <b-col class="">
          <b-button-group class="btn-group-status">
            <b-button
              v-for="(item, index) in statusList"
              :key="index"
              @click="onChangeStatusList(item.name, item.id)"
              :class="{ menuactive: isActive(item.name) }"
              >{{ item.name }} ({{ item.count }})</b-button
            >
          </b-button-group>
        </b-col>
      </b-row>

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
              <template v-slot:cell(ids)="data">
                <b-form-checkbox
                  size="lg"
                  class="ml-3"
                  :value="data.item.id"
                  v-model="selected"
                ></b-form-checkbox>
              </template>
              <template v-slot:head(ids)="data">
                <b-form-checkbox
                  size="lg"
                  class="ml-3"
                  :ref="data.field.key"
                  v-model="selectedAll"
                ></b-form-checkbox>
              </template>
              <template v-slot:cell(createdTime)="data">
                <span>{{
                  new Date(data.item.createdTime) | moment($formatDateTime)
                }}</span>
              </template>
              <template v-slot:cell(bankAccountNumber)="data">
                <div>
                  <p class="m-0">{{ data.item.bankAccountNumber }}</p>
                  <p class="m-0">{{ data.item.bankName }}</p>
                </div>
              </template>
              <template v-slot:cell(amount)="data">
                <p class="m-0">฿ {{ data.item.amount | numeral("0,0.00") }}</p>
              </template>
              <template v-slot:cell(status)="data">
                <div v-if="data.item.statusId == 0" class="text-dark">
                  รอตรวจสอบ
                </div>
                <div v-else-if="data.item.statusId == 1" class="text-success">
                  ยืนยัน
                </div>
                <div v-else-if="data.item.statusId == 2" class="text-danger">
                  ยกเลิก
                </div>
                <div v-else class="text-info">เตรียมเอกสาร</div>
              </template>
              <template v-slot:cell(updatedTime)="data">
                <span>{{
                  new Date(data.item.updatedTime) | moment($formatDate)
                }}</span>
              </template>
              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <b-button variant="link" class="px-1 py-0">
                    <router-link :to="'/withdraw/details/' + data.item.id">
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

    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
    <ModalLoading ref="modalLoading" :hasClose="false" />
    <ModalAlert ref="modalAlert" :text="modalMessage" />
  </div>
</template>

<script>
import axios from "axios";
import * as moment from "moment/moment";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalLoading from "@/components/modal/alert/ModalLoading";
import ModalAlert from "@/components/modal/alert/ModalAlert";
export default {
  name: "WithdrawIndex",
  components: {
    ModalAlertError,
    ModalLoading,
    ModalAlert,
  },
  data() {
    return {
      selected: null,
      options: [],
      statusList: [],
      modalMessage: "",
      activeItem: "",
      requestDeleteUser: {
        userId: null,
      },
      fields: [
        {
          key: "withdrawNumber",
          label: "เลขที่คำขอ",
          class: "w-100px",
        },
        {
          key: "createdTime",
          label: "วันที่ทำรายการ",
          class: "w-100px",
        },
        {
          key: "name",
          label: "ผู้ยื่นคำขอ",
          class: "w-100px",
        },
        {
          key: "bankAccountNumber",
          label: "เลขที่บัญชีรับเงิน",
          class: "w-100px",
        },
        {
          key: "amount",
          label: "จำนวนเงิน",
          class: "w-100px",
        },
        {
          key: "status",
          label: "สถานะคำขอ",
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
        search: "",
        StartDate: "",
        EndDate: "",
        status: [0,1,2,3],
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
      items: [],
      isBusy: false,
      isDisable: false,
      checkAll: false,
      selectAllCb: false,
      errorDate: false,
      selected: [],
      selectedAll: false,
      allItems: [],
      filterStatus: null,
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
    this.fields.unshift({
      key: "ids",
      label: "#",
    });

    await this.getList();
    this.$isLoading = true;
    this.activeItem = "ทั้งหมด";
  },
  watch: {
    selected: function () {
      if (this.selected.length == this.allItems.count) {
        this.selectedAll = true;
      } else {
        this.selectedAll = false;
      }
    },
    selectedAll: function () {
      if (this.selected.length != this.allItems.count) {
        if (this.selectedAll) {
          this.selected = [];
          this.allItems.dataList.forEach((element, index) => {
            this.selected.push(element.id);
          });
        }
      } else {
        if (!this.selectedAll) {
          this.selected = [];
        }
      }
    },
  },
  methods: {
    getAllData: async function (val) {
      let filterAll = {
        search: "",
        StartDate: "",
        EndDate: "",
        status: [],
        pageNo: 1,
        perpage: -1,
      };

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/withdraw/List`,
        null,
        this.$headers,
        filterAll
      );
      if (resData.result == 1) {
        this.allItems = resData.detail;
      }
    },
    getList: async function () {
      this.isBusy = true;

      let status = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/withdraw/StatusWithCount`,
        null,
        this.$headers,
        null
      );

      if (status.result == 1) {
        this.statusList = status.detail;
      }

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/withdraw/List`,
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
      this.filter.pageNo = 1;
      this.filter.StartDate = "";
      this.filter.EndDate = "";
      this.$refs.filterSidebar.hide(true);
      this.getList();
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
    isActive: function (menuItem) {
      return this.activeItem == menuItem;
    },
    onChangeStatusList(status, id) {
      this.filter.status = [];
      if (id != -1) {
        this.filter.status.push(id);
      } else {
        this.statusList.forEach((element, index) => {
          this.filter.status.push(element.id);
        });
        this.filter.status.splice(0,1)
      }

      this.activeItem = status;

      this.filterStatus = id;
      if (id == 0) {
        this.getAllData(this.filter.status);
        if (this.fields[0].key != "ids") {
          this.fields.unshift({
            key: "ids",
            label: "#",
          });
        }
      } else {
        if (this.fields[0].key == "ids") this.fields.shift();
      }
      this.selected = [];
      this.selectedAll = false;

      this.getList();
    },
    ExportWithdrawList: async function () {
      if (this.selected.length == 0) {
        this.modalMessage = this.$t("selectOrderError");
        this.$refs.modalAlertError.show();
        return;
      }

      this.$refs.modalLoading.show();

      let request = {
        id: this.selected,
      };

      axios({
        url: `${this.$baseUrl}/api/Withdraw/ExportWithdrawList`,
        method: "post",
        headers: this.$headers,
        responseType: "blob",
        data: request,
      })
        .then((response) => {
          this.$refs.modalLoading.hide();
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          var dateExcel = moment().format("DDMMYYYYhhmmss");

          fileLink.href = fileURL;
          fileLink.setAttribute(
            "download",
            `Withdraw List-` + dateExcel + `.xlsx`
          );
          document.body.appendChild(fileLink);
          fileLink.click();
        })
        .catch((error) => {
          console.log(error);
          // if (error.response.status === 500) {
          //   this.imgModal = "/img/icon-unsuccess.png";
          //   this.msgModal =
          //     "Internal Server Error. Please contact system administrator";
          //   this.hideClose = false;
          // }
        });
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