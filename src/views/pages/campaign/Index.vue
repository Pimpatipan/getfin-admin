<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col sm="4" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">รายการแคมเปญ</h1>
        </b-col>
        <b-col sm="8" class="text-right">
          <div class="d-flex">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="ชื่อแคมเปญ"
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
                >ค้นหาแบบละเอียด ({{
                  countStatus + countStartdate + countEnddate
                }})</span
              >
            </b-button>
            <router-link to="/campaign/details/0">
              <b-button class="btn-main">สร้างแคมเปญ</b-button>
            </router-link>
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

          <label class="label-text mt-1">สถานะ</label>
          <b-form-select
            v-model="selected"
            :options="options"
            @change="handleChangeStatus"
          ></b-form-select>

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
              <template v-slot:cell(startDateCampaign)="data">
                <span
                  >{{
                    new Date(data.item.startDateCampaign)
                      | moment($formatDateTime)
                  }}
                  -
                  {{
                    new Date(data.item.endDateCampaign)
                      | moment($formatDateTime)
                  }}</span
                >
              </template>
              <template v-slot:cell(statusId)="data">
                <div v-if="data.item.statusId == 0" class="text-dark">
                  รอดำเนินการ
                </div>
                <div v-else-if="data.item.statusId == 1" class="text-warning">
                  เปิดรับสมัคร
                </div>
                <div v-else-if="data.item.statusId == 2" class="text-warning">
                  ดำเนินอยู่
                </div>
                <div v-else class="text-danger">ถูกระงับ</div>
              </template>
              <template v-slot:cell(updatedTime)="data">
                <span>{{
                  new Date(data.item.updatedTime) | moment($formatDate)
                }}</span>
              </template>
              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <router-link :to="'/campaign/details/' + data.item.id">
                    <b-button variant="link" class="text-dark px-1 py-0">
                      แก้ไข
                    </b-button>
                  </router-link>
                  <b-button
                    variant="link"
                    class="text-dark px-1 py-0"
                    @click="openModalDelete(data.item)"
                  >
                    ลบ
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
    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
    <ModalAlertConfirm
      msg="ยืนยันการลบ ?"
      :text="modalMessage"
      btnConfirm="ลบ"
      colorBtnConfirm="danger"
      btnCancel="ยกเลิก"
      ref="ModalAlertConfirm"
      @confirm="btnDelete"
    />
  </div>
</template>

<script>
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalAlertConfirm from "@/components/modal/alert/ModalAlertConfirm";
export default {
  name: "CampaignIndex",
  components: {
    ModalAlert,
    ModalAlertError,
    ModalAlertConfirm,
  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: "สถานะ" },
        { value: 0, text: "รอดำเนินการ" },
        { value: 1, text: "เปิดรับสมัคร" },
        { value: 2, text: "ดำเนินอยู่" },
        { value: 3, text: "เสร็จสิ้น" },
      ],
      statusList: [],
      modalMessage: "",
      activeItem: "",
      requestDeleteUser: {
        userId: null,
      },
      fields: [
        {
          key: "campaignName",
          label: "ชื่อแคมเปญสินค้า",
          class: "w-100px",
        },
        {
          key: "totalProduct",
          label: "จำนวนสินค้าเข้าร่วม",
          class: "w-100px",
        },
        {
          key: "totalPartner",
          label: "จำนวนผู้เข้าร่วม",
          class: "w-100px",
        },
        {
          key: "startDateCampaign",
          label: "วันที่แสดงแคมเปญ",
          class: "w-100px",
        },
        {
          key: "updatedTime",
          label: "อัพเดทล่าสุด",
          class: "w-100px",
        },
        {
          key: "statusId",
          label: "สถานะ",
          class: "w-100px",
        },
        {
          key: "id",
          label: "",
        },
      ],
      items: [],
      isBusy: false,
      value: false,
      rows: 0,
      campaignId: 0,
      filter: {
        PageNo: 1,
        PerPage: 10,
        StartDate: "",
        EndDate: "",
        Status: [],
        Search: "",
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
        `${this.$baseUrl}/api/Campaign/list`,
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
    handleChangeStatus(value) {
      this.filter.Status = [];
      if (value != null) {
        this.filter.Status.push(value);
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
      this.filter.Status = [];
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
    openModalDelete(value) {
      this.campaignId = value.id;
      this.modalMessage = "คุณต้องการลบ " + value.campaignName + " ใช่หรือไม่?";
      this.$refs.ModalAlertConfirm.show();
    },
    btnDelete: async function () {
      this.$refs.ModalAlertConfirm.hide();
      let resData = await this.$callApi(
        "delete",
        `${this.$baseUrl}/api/Campaign/delete/${this.campaignId}`,
        null,
        this.$headers,
        null
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        this.$refs.modalAlert.show();
        this.filter.PageNo = 1;
        await this.getList();
      } else {
        this.$refs.modalAlertError.show();
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
