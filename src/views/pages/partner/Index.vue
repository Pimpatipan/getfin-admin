<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col sm="7" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">
            จัดการรายการพาร์ทเนอร์ของเรา
          </h1>
        </b-col>
        <b-col sm="5" class="text-right">
          <div class="d-flex justify-content-end">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="ชื่อพาร์ทเนอร์, อีเมล, เบอร์โทรศัพท์"
                v-model="filter.Search"
                @keyup="handleSearch"
              ></b-form-input>
              <b-input-group-prepend @click="btnSearch">
                <span class="icon-input m-auto pr-2">
                  <font-awesome-icon icon="search" title="View" />
                </span>
              </b-input-group-prepend>
            </b-input-group>

            <!-- <b-button v-b-toggle.sidebar-1 class="mr-2 btn-filter">
              <font-awesome-icon
                icon="filter"
                title="filter-btn"
                class="text-white mr-0 mr-sm-1"
              />
              <span class="d-none d-sm-inline">ค้นหาแบบละเอียด</span>
            </b-button>-->
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

       <b-row class="no-gutters mx-3 mx-sm-0">
        <b-col class="label-text pt-2">
          <b-form-checkbox
            size="lg"
            v-model="value"
            class="ml-2"
            @change="onChangeShowSelected($event)"
            >แสดงที่เลือก</b-form-checkbox
          >
        </b-col>
        <b-col class="text-right">
          <!-- <b-form-select v-model="selected" :options="options" class="w-300"></b-form-select> -->
        </b-col>
      </b-row>

      <div class="mt-3 bg-white pb-3">
        <b-row class="no-gutters">
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
                  v-model="data.item.isPartner"
                  @change="onChangePartnerStatus($event, data.item.userGUID)"
                ></b-form-checkbox>
              </template>
              <template v-slot:cell(sellerName)="data">
                <div class="row no-gutters">
                  <div class="col-6">
                    <div
                      class="square-box b-contain"
                      v-bind:style="{
                        'background-image': 'url(' + data.item.logo + ')',
                      }"
                    ></div>
                  </div>
                  <div class="col-6">
                    <div class="review-shortdesc">
                      <p class="font-weight-bold mb-1">
                        {{ data.item.sellerName }}
                      </p>
                      <p class="m-0 three-lines">
                        เข้าร่วม:
                        {{
                          new Date(data.item.createdTime) | moment($formatDate)
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <b-button variant="link" class="px-1 py-0 text-primary">
                    <router-link :to="'/seller/details/' + data.item.sellerId"
                      >ตรวจสอบ</router-link
                    >
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
          label: "",
        },
        {
          key: "sellerName",
          label: "ชื่อและโลโก้ลูกค้า",
          class: "w-200",
          tdClass: "text-left",
        },
        {
          key: "email",
          label: "อีเมล",
          class: "w-100px",
          tdClass: "text-left",
        },
        {
          key: "telephone",
          label: "เบอร์โทรศัพท์",
          class: "w-100px",
        },
        {
          key: "totalProduct",
          label: "จำนวนสินค้า",
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
        Search: "",
        Status: [0, 1],
        StartDate: "",
        EndDate: "",
        perPage: 10,
        pageNo: 1,
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
  created: async function() {
    await this.getList();
  },
  methods: {
    getList: async function() {
      this.isBusy = true;

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Partner/List`,
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
      // this.filter.StartDate = "";
      // this.filter.EndDate = "";
      //this.filter.answerStatus = [];
      this.$refs.filterSidebar.hide(true);
      this.getList();
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
    onChangeShowSelected(value) {
      if (value == true) this.filter.Status = [1];
      else this.filter.Status = [0, 1];
      this.getList();
    },
    onChangePartnerStatus: async function(value, id) {
      if (value == true) {
        let body = {
          userGuid: id,
        };

        let resData = await this.$callApi(
          "post",
          `${this.$baseUrl}/api/Partner/Save`,
          null,
          this.$headers,
          body
        );

        if (resData.result == 1) {
          this.getList();
        }
      } else {
        let resData = await this.$callApi(
          "delete",
          `${this.$baseUrl}/api/Partner/Remove/` + id,
          null,
          this.$headers,
          null
        );

        if (resData.result == 1) {
          this.getList();
        }
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
