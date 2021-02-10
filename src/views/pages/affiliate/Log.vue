<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">ประวัติ</h1>
        </b-col>
      </CRow>

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
              <template v-slot:cell(originalQuantity)="data">
                <p class="m-0">{{ data.item.originalQuantity | numeral("0,0") }}</p>
              </template>
              <template v-slot:cell(updateQuantity)="data">
                <p class="m-0">{{ data.item.updateQuantity | numeral("0,0") }}</p>
              </template>
              <template v-slot:cell(balance)="data">
                <p class="m-0">{{ data.item.balance | numeral("0,0") }}</p>
              </template>
              <template v-slot:cell(createdTime)="data">
                <span>{{
                  new Date(data.item.createdTime) | moment($formatDate)
                }}</span>
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
</template>

<script>
export default {
  name: "WithdrawIndex",
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
          key: "createdTime",
          label: "วันที่ทำรายการ",
          class: "w-100px",
        },
        {
          key: "name",
          label: "ชื่อ Tier",
          class: "w-100px",
        },
        {
          key: "originalQuantity",
          label: "คะแนนเดิม",
          class: "w-100px",
        },
        {
          key: "updateQuantity",
          label: "คะแนนใหม่",
          class: "w-100px",
        },
        {
          key: "balance",
          label: "คะแนนปัจจุบัน",
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
      },
      pageOptions: [
        { value: 10, text: "10 / หน้า" },
        { value: 30, text: "30 / หน้า" },
        { value: 50, text: "50 / หน้า" },
        { value: 100, text: "100 / หน้า" },
      ],
      id: this.$route.params.id,
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
      email: "",
    };
  },
  created: async function () {
    await this.getEmail();
    await this.getList();
    this.$isLoading = true;
  },
  methods: {
    getEmail: async function () {
      let resData = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Affiliate/Profile/` + this.id,
        null,
        this.$headers,
        null
      );
      if (resData.result == 1) {
        this.email = resData.detail.result.user.email;
      }
    },
    getList: async function () {
      this.isBusy = true;

      this.filter.email = this.email;

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/affiliate/UserPurchase`,
        null,
        this.$headers,
        this.filter
      );
      if (resData.result == 1) {
        this.items = resData.detail.dataList;
        this.rows = resData.detail.count;
        this.isBusy = false;
      }
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