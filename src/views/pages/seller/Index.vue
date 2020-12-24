<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col sm="6" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">รายการผู้ขาย</h1>
        </b-col>
        <b-col sm="6" class="text-right">
          <div class="d-flex">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="ชื่อร้านค้า"
                v-model="filter.Search"
                @keyup="handleSearch"
              ></b-form-input>
              <b-input-group-prepend @click="btnSearch">
                <span class="icon-input m-auto pr-2">
                  <font-awesome-icon icon="search" title="View" />
                </span>
              </b-input-group-prepend>
            </b-input-group>
            <b-form-select
              v-model="selected"
              :options="options"
              @change="handleChangeStatus"
            ></b-form-select>
          </div>
        </b-col>
      </CRow>
      <div class="mt-3 bg-white">
        <b-row class="no-gutters px-3 px-sm-0">
          <b-col>
            <b-table
              responsive
              class="text-center table-list"
              striped
              :fields="fields"
              :items="items"
              :busy="isBusy"
              show-empty
              empty-text="ไม่พบข้อมูล"
            >
              <template v-slot:cell(displayNameTranslation)="data">
                <p
                  class="mb-0 nobreak two-lines"
                  v-if="data.item.displayNameTranslation[0].name != ''"
                >
                  {{ data.item.displayNameTranslation[0].name }}
                </p>
                <p class="mb-0 nobreak two-lines" v-else>-</p>
              </template>
              <template v-slot:cell(createdTime)="data">
                <span>
                  {{ new Date(data.item.createdTime) | moment($formatDate) }}
                </span>
              </template>
              <template v-slot:cell(userBusinessInformation)="data">
                <p
                  class="m-0 three-lines text-break"
                  v-if="data.item.userBusinessInformation.id != 0"
                >
                  {{ data.item.userBusinessInformation.houseNo }}
                  {{ data.item.userBusinessInformation.name }}
                  {{ data.item.userBusinessInformation.buildingVillage }}
                  {{ data.item.userBusinessInformation.roadAlley }}
                  {{ data.item.userBusinessInformation.subdistrictName }}
                  {{ data.item.userBusinessInformation.districtName }}
                  {{ data.item.userBusinessInformation.provinceName }}
                  {{ data.item.userBusinessInformation.zipcode }}
                </p>
                <p class="mb-0 nobreak two-lines" v-else>-</p>
              </template>
              <template v-slot:cell(seller.statusId)="data">
                <div v-if="data.item.seller.statusId == 0" class="text-dark">
                  ร่าง
                </div>
                <div v-else-if="data.item.seller.statusId == 1" class="text-warning">
                  รอการอนุมัติ
                </div>
                <div v-else-if="data.item.seller.statusId == 2" class="text-success">
                  อนุมัติ
                </div>
                <div v-else class="text-danger">ถูกระงับ</div>
              </template>
              <template v-slot:cell(displays)="data">
                <b-form-checkbox
                  v-model="data.item.display"
                  name="check-button"
                  switch
                  size="lg"
                  class="mb-2"
                ></b-form-checkbox>
              </template>
              <template v-slot:cell(userGUID)="data">
                <b-button variant="link" class="px-1 py-0 text-primary">
                  <router-link :to="'/seller/details/' + data.item.seller.id">
                    ตรวจสอบ
                  </router-link>
                </b-button>
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
    <!-- Modal -->
    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
  </div>
</template>

<script>
import InputSelect from "@/components/inputs/InputSelect";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
export default {
  name: "SellerIndex",
  components: {
    InputSelect,
    ModalAlert,
    ModalAlertError,
  },
  data() {
    return {
      statusList: [],
      selected: null,
      options: [{ value: null, text: "สถานะ" }],
      modalMessage: "",
      activeItem: "",
      requestDeleteUser: {
        userId: null,
      },
      fields: [
        {
          key: "createdTime",
          label: "วันที่ทำการสมัคร",
          class: "w-100px text-nowrap",
        },
        {
          key: "displayNameTranslation",
          label: "ชื่อของร้าน",
          class: "w-100px text-nowrap",
        },
        {
          key: "telephone",
          label: "เบอร์โทรศัพท์",
          class: "w-100px text-nowrap",
        },
        { key: "email", label: "อีเมล", class: "w-100px text-nowrap" },
        {
          key: "userBusinessInformation",
          label: "ที่อยู่",
          class: "w-200 text-nowrap",
        },
        {
          key: "seller.statusId",
          label: "สถานะ",
          class: "w-100px text-nowrap",
        },
        { key: "userGUID", label: "", class: "w-100px text-nowrap" },
      ],
      items: [],
      isBusy: false,
      rows: 0,
      filter: {
        search: "",
        PerPage: 10,
        PageNo: 1,
        status: [],
      },
      pageOptions: [
        { value: 10, text: "10 / หน้า" },
        { value: 30, text: "30 / หน้า" },
        { value: 50, text: "50 / หน้า" },
        { value: 100, text: "100 / หน้า" },
      ],
      totalRowMessage: "",
      options: [
        { value: null, text: "สถานะ" },
        { value: 0, text: "ร่าง" },
        { value: 1, text: "รอการอนุมัติ" },
        { value: 2, text: "อนุมัติ" },
        { value: 3, text: "ถูกระงับ" },
      ],
    };
  },
  created: async function () {
    await this.getList();
  },
  methods: {
    getList: async function () {
      this.isBusy = true;
      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Seller/List`,
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
      this.filter.OverView = status;
      this.activeItem = status;
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
    handleChangeStatus(value) {
      this.filter.status = [];
      if (value != null) {
        this.filter.status.push(value);
      }
      this.getList();
    },
  },
};
</script>

<style scoped>
.menuactive {
  color: #ffb300 !important;
}
</style>
