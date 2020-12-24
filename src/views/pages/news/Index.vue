<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col sm="6" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">
            รายการข่าวสาร/โปรโมขั่น
          </h1>
        </b-col>
        <b-col sm="6" class="text-right">
          <div class="d-flex">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="ชื่อข่าวสาร"
                v-model="filter.search"
                @keyup="handleSearch"
              ></b-form-input>
              <b-input-group-prepend @click="btnSearch">
                <span class="icon-input m-auto pr-2">
                  <font-awesome-icon icon="search" title="View" />
                </span>
              </b-input-group-prepend>
            </b-input-group>
            <router-link to="/news/details/0">
              <b-button class="btn-main">สร้างข่าวสาร</b-button>
            </router-link>
          </div>
        </b-col>
      </CRow>
      <div class="mt-3 bg-white p-0">
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
              <template v-slot:cell(imageUrl)="data">
                <div
                  class="image"
                  v-bind:style="{
                    'background-image': 'url(' + data.item.imageUrl + ')',
                  }"
                ></div>
              </template>
              <template v-slot:cell(name)="data">
                <span class="two-lines">{{ data.item.name }}</span>
              </template>
              <template v-slot:cell(updatedTime)="data">
                <span>{{
                  new Date(data.item.updatedTime) | moment($formatDate)
                }}</span>
              </template>
              <template v-slot:cell(newsTypeId)="data">
                <div v-if="data.item.newsTypeId == 2" class="">โปรโมชั่น</div>
                <div v-else class="">ข่าวสาร</div>
              </template>
              <template v-slot:cell(enabled)="data">
                <div v-if="data.item.enabled == true" class="text-success">
                  แสดงผล
                </div>
                <div v-else class="text-danger">ไม่แสดงผล</div>
              </template>
              <template v-slot:cell(sortOrder)="data">
                <div v-if="data.item.sortOrder == 0">-</div>
                <div v-else>{{ data.item.sortOrder }}</div>
              </template>
              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <router-link :to="'/news/details/' + data.item.id">
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
  name: "QuestionIndex",
  components: {
    ModalAlert,
    ModalAlertError,
    ModalAlertConfirm,
  },
  data() {
    return {
      statusList: [],
      modalMessage: "",
      activeItem: "",

      requestDeleteBlog: {
        id: null,
      },
      fields: [
        {
          key: "imageUrl",
          label: "ภาพประกอบ",
          class: "w-200",
        },
        {
          key: "name",
          label: "ชื่อ",
          class: "w-100px",
        },
        {
          key: "sortOrder",
          label: "ลำดับการแสดง",
          class: "w-200",
        },
        {
          key: "updatedTime",
          label: "วันที่ทำการสร้าง",
          class: "w-100px",
        },
        {
          key: "newsTypeId",
          label: "ประเภท",
          class: "w-100px",
        },
        {
          key: "enabled",
          label: "สถานะการแสดง",
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
        status: [0, 1],
        search: "",
        perPage: 10,
        pageNo: 1,
        sortByOrderOrId: 0,
        highlightFilter: 0,
      },
      pageOptions: [
        { value: 10, text: "10 / หน้า" },
        { value: 30, text: "30 / หน้า" },
        { value: 50, text: "50 / หน้า" },
        { value: 100, text: "100 / หน้า" },
      ],
      totalRowMessage: "",
      isDisable: false,
    };
  },
  created: async function () {
    this.$isLoading = false;
    await this.getList();
  },
  methods: {
    getList: async function () {
      this.isBusy = true;
      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/news/list`,
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
      this.filter.OverView = status;
      this.activeItem = status;
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
      this.filter.perPage = value;
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
    openModalDelete(value) {
      this.requestDeleteBlog.id = value.id;
      this.modalMessage = "คุณต้องการลบ " + value.name + " ใช่หรือไม่?";
      this.$refs.ModalAlertConfirm.show();
    },
    btnDelete: async function () {
      this.$refs.ModalAlertConfirm.hide();
      let resData = await this.$callApi(
        "delete",
        `${this.$baseUrl}/api/news/delete/${this.requestDeleteBlog.id}`,
        null,
        this.$headers,
        null
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        this.$refs.modalAlert.show();
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
.image {
  width: 100%;
  padding-top: 42.9%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
