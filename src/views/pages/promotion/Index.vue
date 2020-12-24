<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col sm="6" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">ข่าวสารโปรโมชั่น</h1>
        </b-col>
        <b-col sm="6" class="text-right">
          <div class="d-flex">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="ชื่อโปรโมชั่น"
                v-model="filter.Search"
                @keyup="handleSearch"
              ></b-form-input>
              <b-input-group-prepend @click="btnSearch">
                <span class="icon-input m-auto pr-2">
                  <font-awesome-icon icon="search" title="View" />
                </span>
              </b-input-group-prepend>
            </b-input-group>
            <router-link to="/promotion/details/0">
              <b-button class="btn-main">สร้างโปรโมชั่น</b-button>
            </router-link>
          </div>
        </b-col>
      </CRow>
      <div class="mt-3 bg-white">
        <b-row class="no-gutters px-3 px-sm-0">
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
              <template v-slot:cell(questionTime)="data">
                <span>{{
                  new Date(data.item.questionTime) | moment($formatDate)
                }}</span>
              </template>
              <template v-slot:cell(isVerify)="data">
                <div v-if="data.item.isVerify == true" class="text-success">
                  Verified
                </div>
                <div v-else class="text-danger">Not Verified</div>
              </template>
              <template v-slot:cell(questionBy)="data">
                <div v-if="data.item.questionBy == ' '">-</div>
                <div v-else>{{ data.item.questionBy }}</div>
              </template>
              <template v-slot:cell(isAnswer)="data">
                <div v-if="data.item.isAnswer == true" class="text-success">
                  Answer
                </div>
                <div v-else class="text-warning">Wait for answer</div>
              </template>
              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <b-button
                    variant="link"
                    class="text-body text-underline"
                    @click="editQuestion(data.item.id)"
                    >View</b-button
                  >
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
              class="mr-sm-3"
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
export default {
  name: "QuestionIndex",
  data() {
    return {
      statusList: [],
      modalMessage: "",
      activeItem: "",
      requestDeleteUser: {
        userId: null,
      },
      fields: [
        {
          key: "questionTime",
          label: "ภาพประกอบ",
          class: "w-100px",
        },
        {
          key: "questionTime1",
          label: "ชื่อ",
          class: "w-100px",
        },
        {
          key: "question",
          label: "ลำดับการแสดง",
          class: "w-200",
        },
        {
          key: "questionBy",
          label: "วันที่ทำการสร้าง",
          class: "w-100px",
        },
        {
          key: "isVerify",
          label: "ไฮไลท์",
          class: "w-100px",
        },
        {
          key: "isVerifyๅ",
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
        PageNo: 1,
        PerPage: 10,
        Search: "",
        OverView: "",
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
  created: async function() {
    //await this.getList();
  },
  methods: {
    getList: async function() {
      this.isBusy = true;
      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/product/List`,
        null,
        this.$headers,
        this.filter
      );
      if (resData.result == 1) {
        this.items = resData.detail.dataList;
        this.rows = resData.detail.totalData;
        this.statusList = resData.detail.overviewCount;

        this.isBusy = false;
      }
    },
    getDataByStatus(status) {
      this.filter.OverView = status;
      this.activeItem = status;
      this.getList();
    },
    isActive: function(menuItem) {
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
    saveQuestion() {},
  },
};
</script>

<style scoped>
.menuactive {
  color: #ffb300 !important;
}
</style>
