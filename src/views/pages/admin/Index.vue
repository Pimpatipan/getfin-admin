<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col sm="6" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">รายการผู้ดูแลระบบ</h1>
        </b-col>
        <b-col sm="6" class="text-right">
          <div class="d-flex">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="ชื่อเจ้าหน้าที่"
                v-model="filter.Search"
                @keyup="handleSearch"
              ></b-form-input>
              <b-input-group-prepend @click="btnSearch">
                <span class="icon-input m-auto pr-2">
                  <font-awesome-icon icon="search" title="View" />
                </span>
              </b-input-group-prepend>
            </b-input-group>
            <router-link to="/admin/details/0">
              <b-button class="btn-main">สร้างใหม่</b-button>
            </router-link>
          </div>
        </b-col>
      </CRow>

      <b-row class="mt-3">
        <b-col class="label-text pt-2"> </b-col>
        <b-col class="text-right">
          <b-form-select
            v-model="selected"
            :options="options"
            class="w-300"
          ></b-form-select>
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
              <template v-slot:cell(createdTime)="data">
                <span>{{
                  new Date(data.item.createdTime) | moment($formatDate)
                }}</span>
              </template>
              <template v-slot:cell(imageUrl)="data">
                <div class="row no-gutters">
                  <div class="col-6">
                    <div
                      class="square-box b-contain"
                      v-bind:style="{
                        'background-image': 'url(' + data.item.imageUrl + ')',
                      }"
                    ></div>
                  </div>
                  <div class="col-6">
                    <div class="review-shortdesc">
                      <p class="font-weight-bold mb-1">
                        SKU: {{ data.item.sku }}
                      </p>
                      <p class="m-0 three-lines">
                        {{ data.item.shortDescription }}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <b-button variant="link" class="px-1 py-0">
                    <router-link :to="'/review/details/' + data.item.id">
                      <font-awesome-icon
                        icon="pencil-alt"
                        class="text-warning"
                        title="View"
                      />
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
export default {
  name: "QuestionIndex",
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
          key: "ids",
          label: "ชื่อเจ้าหน้าที่",
          class: "w-100px",
        },
        {
          key: "invoiceNo",
          label: "Username",
          class: "w-100px",
        },
        {
          key: "description",
          label: "เบอร์โทรศัพท์",
          class: "w-100px",
        },
        {
          key: "createdTime",
          label: "จำนวนในการเข้าถึง",
          class: "w-100px",
        },
        {
          key: "description1",
          label: "อัพเดทล่าสุด",
          class: "w-100px",
        },
        {
          key: "createdTime2",
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
      filter: {
        PageNo: 1,
        PerPage: 10,
        ReviewStatus: [],
        Search: "",
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
    };
  },
  created: async function () {
    //await this.getList();
     this.$isLoading = true;
  },
  methods: {
    getList: async function () {
      this.isBusy = true;

      let status = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Review/ReviewStatusWithCount`,
        null,
        this.$headers,
        null
      );
      if (status.result == 1) {
        this.statusList = status.detail;
      }

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Review/List`,
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
      this.$refs.filterSidebar.hide(true);
      this.getList();
    },
    onClearFilter() {
      this.filter.pageNo = 1;
      this.filter.startDate = "";
      this.filter.endDate = "";
      this.filter.answerStatus = [];
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