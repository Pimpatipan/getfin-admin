<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col xl="6" class="text-center text-lg-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">
            จัดการคำถามที่พบบ่อย{{ faqTypeName }}
          </h1>
        </b-col>
        <b-col xl="6" class="text-right">
          <div class="d-flex justify-content-end">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="ชื่อคำถาม"
                v-model="filter.Search"
                @keyup="handleSearch"
              ></b-form-input>
              <b-input-group-prepend @click="btnSearch">
                <span class="icon-input m-auto pr-2">
                  <font-awesome-icon icon="search" title="View" />
                </span>
              </b-input-group-prepend>
            </b-input-group>
            <router-link :to="'/faq' + path + '/details/0'">
              <b-button class="btn-main p-2">สร้างหัวข้อใหม่</b-button>
            </router-link>
          </div>
        </b-col>
      </CRow>

      <b-row class="no-gutters px-3 px-sm-0 mt-2 overflow-auto">
        <b-col class="">
          <b-button-group class="btn-group-status">
            <b-button
              v-for="(item, index) in statusList"
              :key="index"
              @click="getDataByStatus(item.name, item.id)"
              :class="{ menuactive: isActive(item.name) }"
              >{{ item.name }} ({{ item.count }})</b-button
            >
          </b-button-group>
        </b-col>
      </b-row>

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
              <template v-slot:cell(updatedTime)="data">
                <span>{{
                  new Date(data.item.updatedTime) | moment($formatDate)
                }}</span>
              </template>
              <template v-slot:cell(enabled)="data">
                <div v-if="data.item.enabled == true" class="text-success">
                  เปิดใช้งาน
                </div>
                <div v-else class="text-danger">ปิดใช้งาน</div>
              </template>
              <template v-slot:cell(sortOrder)="data">
                <div v-if="data.item.sortOrder == 0">-</div>
                <div v-else>{{ data.item.sortOrder }}</div>
              </template>
              <template v-slot:cell(questionBy)="data">
                <div v-if="data.item.questionBy == ' '">-</div>
                <div v-else>{{ data.item.questionBy }}</div>
              </template>

              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <router-link :to="'/faq' + path + '/details/' + data.item.id">
                    <b-button variant="link" class="text-dark px-1 py-0">
                      <!-- <font-awesome-icon icon="pencil-alt" title="แก้ไข" /> -->
                      แก้ไข
                    </b-button>
                  </router-link>
                  <b-button
                    variant="link"
                    class="px-1 py-0 text-dark"
                    @click="openModalDelete(data.item)"
                  >
                    <!-- <font-awesome-icon icon="trash-alt" title="ลบ" /> -->

                    ลบ
                  </b-button>
                </div>
                <!-- <div class="d-flex justify-content-center">
                  <b-button
                    variant="link"
                    class="text-body text-underline"
                    @click="editQuestion(data.item.id)"
                    >View</b-button
                  >
                </div> -->
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
    </div>
  </div>
</template>

<script>
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalAlertConfirm from "@/components/modal/alert/ModalAlertConfirm";
export default {
  name: "QuestionIndex",
  components: {
    ModalAlert,
    ModalAlertError,
    ModalAlertConfirm,
  },
  data() {
    return {
      statusList: [
        { id: [], name: "ทั้งหมด" },
        {
          id: 0,
          name: "ปิดใช้งาน",
        },
        {
          id: 1,
          name: "เปิดใช้งาน",
        },
      ],
      modalMessage: "",
      activeItem: "",
      requestDeleteUser: {
        userId: null,
      },
      fields: [
        {
          key: "name",
          label: "ชื่อหัวข้อคำถาม",
          class: "w-100px",
        },
        {
          key: "sortOrder",
          label: "ลำดับการแสดง",
          class: "w-200",
        },
        {
          key: "updatedTime",
          label: "วันที่ทำการอัพเดท",
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
        },
      ],
      items: [],
      isBusy: false,
      rows: 0,
      filter: {
        PageNo: 1,
        PerPage: 10,
        Search: "",
        status: [],
        IsPArtner: false,
      },
      pageOptions: [
        { value: 10, text: "10 / หน้า" },
        { value: 30, text: "30 / หน้า" },
        { value: 50, text: "50 / หน้า" },
        { value: 100, text: "100 / หน้า" },
      ],
      totalRowMessage: "",
      isDisable: false,
      faqType: this.$route.path,
      path: "",
      faqTypeName: "",
      faqPathFilterName: "",
      statusQuestion: [],
    };
  },
  watch: {
    "$route.path"(value) {
      this.faqType = value;
      this.checkType();
      this.getList();
      this.activeItem = "ทั้งหมด";
    },
  },
  mounted: async function () {
    await this.checkType();
    await this.getList();
    this.activeItem = "ทั้งหมด";
  },
  methods: {
    checkType: async function () {
      if (this.faqType == "/faq/partner") {
        this.filter.IsPArtner = true;
        this.path = "/partner";
        this.faqPathFilterName = "FAQPartnerStatusWithCount";
        this.faqTypeName = "พาร์ทเนอร์";
      } else {
        this.filter.IsPArtner = false;
        this.path = "";
        this.faqPathFilterName = "FAQStatusWithCount";
        this.faqTypeName = "";
      }
    },
    getList: async function () {
      this.isBusy = true;

      let status = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/faq/${this.faqPathFilterName}`,
        null,
        this.$headers,
        null
      );

      if (status.result == 1) {
        this.statusList = status.detail;
      }

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/FAQ/topicList`,
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
    getDataByStatus(value, id) {
      //this.filter.OverView = status;
      this.activeItem = value;
      this.filter.status = [];
      if (id != 0) {
        if (id == 1) this.filter.status.push(0);
        else this.filter.status.push(1);
      }
      this.getList();
    },
    isActive: function (menuItem) {
      return this.activeItem == menuItem;
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
    openModalDelete(value) {
      this.requestDeleteUser.userId = value.id;
      this.modalMessage = "คุณต้องการลบ " + value.name + " ใช่หรือไม่?";
      this.$refs.ModalAlertConfirm.show();
    },
    onClearFilter() {
      this.filter.pageNo = 1;
      this.filter.search = "";
      this.filter.status = [];
      this.$refs.filterSidebar.hide(true);
      this.getList();
    },
    btnDelete: async function () {
      this.$refs.ModalAlertConfirm.hide();
      let resData = await this.$callApi(
        "delete",
        `${this.$baseUrl}/api/FAQ/removeTopic/${this.requestDeleteUser.userId}`,
        null,
        this.$headers,
        null
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        this.$refs.modalAlert.show();
        setTimeout(() => {
          this.$refs.modalAlert.hide();
        }, 3000);
        this.filter.Page = 1;
        await this.getList();
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    saveQuestion() {},
  },
};
</script>

<style scoped>
.menuactive {
  color: #ffb300 !important;
}
.btn-filter-faq {
  width: 305px;
}
</style>
