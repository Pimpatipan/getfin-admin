<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col xl="6" class="text-center text-sm-left">
          <h1 class="mr-sm-4 header-main text-uppercase">รายการรอการตรวจสอบ</h1>
        </b-col>
        <b-col xl="6" class="text-right">
          <div class="d-flex">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="หมายเลขอ้างอิง, จำนวนเงินสุทธิ"
                v-model="filter.Search"
                @keyup="handleSearch"
              ></b-form-input>
              <b-input-group-prepend @click="btnSearch">
                <span class="icon-input m-auto pr-2">
                  <font-awesome-icon icon="search" title="View" />
                </span>
              </b-input-group-prepend>
            </b-input-group>
            <b-button
              v-b-toggle.sidebar-1
              class="ml-2 btn-filter btn-filter-faq"
            >
              <font-awesome-icon
                icon="filter"
                title="filter-btn"
                class="text-white mr-0 mr-sm-1"
              />
              <span class="d-none d-sm-inline one-line"
                >ค้นหาแบบละเอียด ({{ countStartdate + countEnddate }})</span
              >
            </b-button>
          </div>
        </b-col>
      </CRow>
      <b-row class="no-gutters px-3 px-sm-0 mt-2">
        <b-col class="overflow-auto">
          <b-button-group class="btn-group-status d-inline-block">
            <b-button
              v-for="(item, index) in statusList"
              :key="index"
              @click="getDataByClickStatus(item.name, item.id)"
              :class="{ menuactive: isActive(item.id) }"
              >{{ item.name }} ({{ item.count }})</b-button
            >
          </b-button-group>
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

          <div>
            <label class="label-text mb-3">วันที่คืนสินค้า</label>
          </div>

          <label class="label-text">วันเริ่มต้น</label>
          <datetime
            placeholder="กรุณาเลือกวันที่"
            class="date-picker"
            v-model="filter.startDate"
            format="dd MMM yyyy HH:mm"
            type="datetime"
          ></datetime>

          <label class="label-text">วันสิ้นสุด</label>
          <datetime
            placeholder="กรุณาเลือกวันที่"
            class="date-picker"
            v-model="filter.endDate"
            format="dd MMM yyyy HH:mm"
            type="datetime"
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
      <div class="mt-3 bg-white p-3 p-sm-0">
        <b-row class="no-gutters">
          <b-col>
            <b-table
              striped
              responsive
              hover
              :items="items"
              :fields="fields"
              :busy="isBusy"
              show-empty
              empty-text="ไม่พบข้อมูล"
              class="table-list"
            >
              <template v-slot:cell(transactionId)="data">
                <router-link
                  :to="'/order/verify/details/' + data.item.referenceCode"
                >
                  <span>ดูรายละเอียด</span>
                </router-link>
                <span class="ml-2 pointer" @click="showSlip(data.item)"
                  >ตรวจสอบการชำระเงิน</span
                >
              </template>
              <template v-slot:cell(createdTime)="data">
                <span>
                  {{
                    new Date(data.item.createdTime) | moment($formatDateTime)
                  }}
                </span>
              </template>
              <template v-slot:cell(total)="data">
                <span> {{ data.item.total | numeral("0,0.00") }} </span>
              </template>
              <template v-slot:cell(status)="data">
                <div v-if="data.item.statusId == 2" class="text-success">
                  {{ data.item.status }}
                </div>
                <div v-else-if="data.item.statusId == 1" class="text-warning">
                  {{ data.item.status }}
                </div>
                <div v-else class="text-danger">
                  {{ data.item.status }}
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

    <b-modal
      id="slipDetailsModal"
      ref="slipDetailsModal"
      hide-header
      hide-footer
      no-close-on-backdrop
      centered
      body-class="p-4"
      size="lg"
    >
      <div class="modal-header border-0 px-0 pt-0">
        <h3 class="font-weight-bold">รายละเอียดการโอน</h3>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$bvModal.hide('slipDetailsModal')"
        >
          ×
        </button>
      </div>
      <div>
        <b-container class="p-0" v-if="slip">
          <b-row>
            <b-col cols="6" class="slip-details">
              <b-row>
                <b-col lg="6" class="font-weight-bold">ธนาคารที่โอน :</b-col>
                <b-col lg="6">{{ slip.bank }}</b-col>
              </b-row>

              <b-row>
                <b-col lg="6" class="font-weight-bold"
                  >ยอดโอนที่ต้องชำระ :</b-col
                >
                <b-col lg="6">{{ slip.total | numeral("0,0.00") }}</b-col>
              </b-row>
            </b-col>
            <b-col cols="6" class="slip-details">
              <b-row>
                <b-col lg="6" class="font-weight-bold">วัน/เวลา :</b-col>
                <b-col lg="6">{{
                  new Date(slip.createdTime) | moment("DD/MM/YYYY HH:mm")
                }}</b-col>
              </b-row>
              <b-row>
                <b-col lg="6" class="font-weight-bold">ยอดที่โอนมา :</b-col>
                <b-col lg="6">{{
                  slip.transferTotal | numeral("0,0.00")
                }}</b-col>
              </b-row>
            </b-col>

            <b-col>
              <p class="font-weight-bold my-3 text-center">ตัวอย่างรูปสลิป</p>
              <div
                class="preview-box preview-box-slip"
                :class="[{ pointer: slip.imageUrl }]"
                v-bind:style="{
                  'background-image': 'url(' + slip.imageUrl + ')',
                }"
                @click="showPreview(slip.imageUrl)"
              ></div>
              <!-- <div class="text-center" v-if="slip.imageUrl != null">
                <span
                  @click="downloadItem(slip.imageUrl)"
                  class="text-primary text-underline pointer"
                  >Download</span
                >
              </div> -->
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="text-center mt-5" v-if="slip">
        <b-button
          class="btn btn-main btn-details-set float-right"
          @click="sendApproveRejectRequest(true)"
          v-if="slip.statusId == 1"
          >ยืนยัน</b-button
        >
        <b-button
          class="btn btn-cancel btn-details-set float-left"
          @click="showRejectModal"
          v-if="slip.statusId == 1"
          >ปฏิเสธ</b-button
        >
      </div>
    </b-modal>

    <b-modal
      id="showSlipImgModal"
      ref="showSlipImgModal"
      hide-header
      hide-footer
      centered
      body-class="p-4"
      size="xl"
    >
      <div class="modal-header border-0 px-0 pt-0">
        <!-- <h3 class="font-weight-bold">Slip Image Preview</h3> -->
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$bvModal.hide('showSlipImgModal')"
        >
          ×
        </button>
      </div>
      <div>
        <b-container class="p-0">
          <b-row>
            <b-col>
              <div
                class="preview-box b-contain"
                v-bind:style="{ 'background-image': 'url(' + img + ')' }"
              ></div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-modal>

    <b-modal
      id="rejectSlipModal"
      ref="rejectSlipModal"
      hide-header
      hide-footer
      no-close-on-backdrop
      centered
      body-class="p-4"
    >
      <div class="modal-header border-0 px-0 pt-0">
        <h3 class="font-weight-bold">กรุณาบอกเหตุผลในการปฏิเสธ</h3>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$bvModal.hide('rejectSlipModal')"
        >
          ×
        </button>
      </div>
      <div>
        <b-container class="p-0">
          <b-row>
            <b-col>
              <InputTextArea
                textFloat="เหตุผล"
                placeholder="เหตุผล"
                type="text"
                name="reject"
                v-model="note"
                @onKeyup="handleChangeBtnReject"
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="text-center mt-3">
        <b-button
          class="btn btn-main float-right"
          :disabled="isDisableRejectBtn"
          @click="sendApproveRejectRequest(false)"
          >บันทึก</b-button
        >
        <b-button
          class="btn btn-sub float-left"
          @click="$bvModal.hide('rejectSlipModal')"
          >ปิด</b-button
        >
      </div>
    </b-modal>

    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
    <ModalLoading ref="modalLoading" :hasClose="false" />
  </div>
</template>

<script>
import InputTextArea from "@/components/inputs/InputTextArea";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalLoading from "@/components/modal/alert/ModalLoading";

export default {
  name: "VerifySlipIndex",
  components: {
    InputTextArea,
    ModalAlert,
    ModalAlertError,
    ModalLoading,
  },
  data() {
    return {
      statusList: [],
      modalMessage: "",
      activeItem: "",
      note: "",
      requestDeleteUser: {
        userId: null,
      },
      fields: [
        {
          key: "createdTime",
          label: `วันที่ทำรายการ`,
          class: "w-100px",
        },
        {
          key: "referenceCode",
          label: `เลขที่คำขอ`,
          class: "w-100px",
        },
        {
          key: "total",
          label: `จำนวนเงิน`,
          class: "w-100px",
        },
        {
          key: "status",
          label: `สถานะคำขอ`,
          class: "w-100px",
        },
        {
          key: "transactionId",
          label: "",
          class: "w-200",
        },
      ],
      items: [],
      isBusy: false,
      isDisableRejectBtn: true,
      rows: 0,
      filter: {
        PageNo: 1,
        PerPage: 10,
        startDate: null,
        endDate: null,
        ReferenceCode: "",
        GrandTotal: "",
        Status: [],
      },
      pageOptions: [
        { value: 10, text: `10 / ${this.$t("page")}` },
        { value: 30, text: `30 / ${this.$t("page")}` },
        { value: 50, text: `50 / ${this.$t("page")}` },
        { value: 100, text: `100 / ${this.$t("page")}` },
      ],
      totalRowMessage: "",
      img: "",
      isBusy: false,
      isDisable: false,
      slip: null,
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
    await this.getStatusList();
    await this.getList();
    this.$isLoading = true;
  },
  methods: {
    getStatusList: async function () {
      let status = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Transaction/OrderTransferStatusWithCount`,
        null,
        this.$headers,
        null
      );

      if (status.result == 1) {
        this.statusList = status.detail;
        this.activeItem = status.detail[0].id;
      }
    },
    getList: async function () {
      this.isBusy = true;
      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Transaction/OrderTransfers`,
        null,
        this.$headers,
        this.filter
      );
      if (resData.result == 1) {
        this.items = resData.detail.dataList;
        this.rows = resData.detail.count;
        //this.statusList = resData.detail.overviewCount;

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
    getDataByClickStatus(status, id) {
      this.activeItem = id;
      this.filter.Status = [];
      this.filter.Status.push(id);

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
    onClearFilter() {
      this.filter.pageNo = 1;
      this.filter.startDate = "";
      this.filter.endDate = "";
      this.$refs.filterSidebar.hide(true);
      this.getList();
    },
    showSlip(data) {
      this.slip = data;
      this.$refs["slipDetailsModal"].show();
    },
    showPreview(value) {
      this.img = value;
      this.$refs["showSlipImgModal"].show();
    },
    showRejectModal() {
      this.$refs["slipDetailsModal"].hide();
      this.$refs["rejectSlipModal"].show();
    },
    handleChangeBtnReject() {
      if (this.note != null) {
        this.isDisableRejectBtn = false;
      } else {
        this.isDisableRejectBtn = true;
      }
    },
    sendApproveRejectRequest: async function (status) {
      this.$refs.modalLoading.show();

      let request = {
        transactionId: this.slip.transactionId,
        note: this.note,
        result: status,
      };

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Transaction/OrderTransfer/Approve`,
        null,
        this.$headers,
        request
      );

      this.modalMessage = data.message;
      this.$refs.modalLoading.hide();
      this.$refs.rejectSlipModal.hide();
      this.$refs.slipDetailsModal.hide();

      if (data.result == 1) {
        this.isDisableRejectBtn = true;
        this.$refs.modalAlert.show();
        this.getStatusList();
        this.getList();
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
</style>