<template>
  <div v-if="$isLoading">
    <div class="min-vh-100 position-relative">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col lg="4" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">รายการสินค้า</h1>
        </b-col>
        <b-col lg="8" class="text-right">
          <div class="d-block d-sm-flex">
            <div class="d-flex w-100">
              <b-input-group class="panel-input-serach">
                <b-form-input
                  class="input-serach"
                  placeholder="ชื่อสินค้า, SKU"
                  v-model="filter.Search"
                  @keyup="handleSearch"
                ></b-form-input>
                <b-input-group-prepend @click="btnSearch">
                  <span class="icon-input m-auto pr-2">
                    <font-awesome-icon icon="search" title="View" />
                  </span>
                </b-input-group-prepend>
              </b-input-group>
            </div>

            <div class="category-main-box">
              <div
                class="input-serach bg-white category-box"
                @click="show = true"
              >
                <span
                  v-for="(item, index) in dataCategoryHierarchy.breadcrumb"
                  v-bind:key="index"
                  class="nobreak"
                >
                  <span>{{
                    dataCategoryHierarchy.breadcrumb[index]
                      ? dataCategoryHierarchy.breadcrumb[index].name
                      : ""
                  }}</span>
                  <span class="mx-2" v-if="index + 1 < selectCategory.length"
                    >></span
                  >
                </span>
                <span v-if="dataCategoryHierarchy.breadcrumb.length == 0"
                  >หมวดหมู่</span
                >
              </div>
              <!-- <b-input-group
                class="panel-input-serach m-0"
                @click="show = true"
              >
                <b-form-input
                  class="input-serach bg-white"
                  placeholder="หมวดหมู่"
                  value="55 > 55"
                  @keyup="handleSearch"
                  disabled
                ></b-form-input>
                <b-input-group-prepend @click="btnSearch">
                  <span class="icon-input m-auto pr-2">
                    <font-awesome-icon icon="search" title="View" />
                  </span>
                </b-input-group-prepend>
              </b-input-group> -->
            </div>
          </div>
        </b-col>
      </CRow>
      <div class="p-3 bg-white mt-1 category-popover" v-if="show">
        <CategoryHierarchy
          ref="categoryHierarchy"
          :dataList="selectCategory"
          :catagories="catagories"
          :hasCreateBtn="false"
          @onDataChange="onDataChangeCategory"
        />

        <p class="text-danger text-center" v-if="error">{{ error }}</p>

        <div class="text-center mt-3 mt-sm-1">
          <b-button class="btn-main mx-1" @click="getDataByCategory"
            >ค้นหา</b-button
          ><b-button class="button btn-cancel mx-1" @click="show = false"
            >ยกเลิก</b-button
          >
        </div>
      </div>

      <b-row class="mt-3 no-gutters">
        <b-col class="text-center text-sm-right" lg="12">
          <b-form-select
            v-model="filter.SortByOrderOrId"
            :options="options"
            class="w-300"
            @change="getList"
          ></b-form-select>
        </b-col>
      </b-row>

      <div class="mt-3 bg-white px-0 pb-3">
        <b-row class="no-gutters">
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
              <template v-slot:cell(imageUrl)="data">
                <div class="position-relative">
                  <div
                    class="square-box b-contain"
                    v-bind:style="{
                      'background-image': 'url(' + data.item.imageUrl + ')',
                    }"
                  ></div>
                </div>
              </template>
              <template v-slot:cell(name)="data">
                <p class="mb-0 nobreak two-lines">{{ data.item.name }}</p>
              </template>
              <template v-slot:cell(sku)="data">
                <p class="mb-0 nobreak two-lines">{{ data.item.sku }}</p>
              </template>
              <template v-slot:cell(price)="data">
                <p
                  class="m-0"
                >
                  ฿ {{ data.item.price | numeral("0,0.00") }}
                </p>
              </template>
              <template v-slot:cell(stock)="data">
                <p class="m-0">{{ data.item.stock | numeral("0,0") }}</p>
              </template>
              <template v-slot:cell(display)="data">
                <div v-if="data.item.display == true" class="text-success">
                  <font-awesome-icon icon="check" title="display" />
                </div>
                <div v-else class="text-danger">
                  <font-awesome-icon icon="times" title="not display" />
                </div>
              </template>
              <template v-slot:cell(enabled)="data">
                <div v-if="data.item.enabled == true" class="text-success">
                  ใช้งาน
                </div>
                <div v-else class="text-danger">ไม่ใช้งาน</div>
              </template>
              <template v-slot:cell(displays)="data">
                <b-form-checkbox
                  v-model="data.item.display"
                  name="check-button"
                  switch
                  size="lg"
                  class="mb-2"
                  @change="onChangeDisplayStatus($event, data.item.id)"
                ></b-form-checkbox>
              </template>
              <template v-slot:cell(id)="data">
                <a :href="'http://dev-getfin.dosetech.co/product/'+data.item.urlKey" target="_blank" class="text-dark" v-if="data.item.display">
                   ตรวจสอบ
                </a>
                <!-- <a
                  :href="
                    'http://getfin.dosetech.co/product/' + data.item.urlKey
                  "
                  target="_blank"
                  class="text-dark"
                  v-if="data.item.display"
                  >ตรวจสอบ</a
                > -->
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
    <ModalAlertConfirm
      msg="ยืนยันการลบ ?"
      :text="modalMessage"
      btnConfirm="ลบ"
      colorBtnConfirm="danger"
      btnCancel="ยกเลิก"
      ref="ModalAlertConfirm"
      @confirm="btnDelete"
    />
    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
  </div>
</template>

<script>
import InputSelect from "@/components/inputs/InputSelect";
import ModalAlertConfirm from "@/components/modal/alert/ModalAlertConfirm";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import CategoryHierarchy from "@/components/categoryHierarchy/CategoryHierarchy";

export default {
  name: "user",
  components: {
    InputSelect,
    ModalAlertConfirm,
    ModalAlert,
    ModalAlertError,
    CategoryHierarchy,
  },
  data() {
    return {
      isLoading: true,
      show: false,
      statusList: [],
      modalMessage: "",
      catagories: [],
      selectCategory: [],
      activeItem: "",
      error: "",
      dataCategoryHierarchy: {
        categoryIdList: [],
        isLast: false,
        selectId: 0,
        breadcrumb: [],
      },
      selectCategory: [],
      requestDeleteUser: {
        userId: null,
      },
      options: [
        { value: 1, text: "เก่าสุด - ใหม่สุด" },
        { value: 2, text: "ใหม่สุด - เก่าสุด" },
      ],
      fields: [
        { key: "imageUrl", label: "ภาพประกอบ", class: "w-100px text-nowrap" },
        {
          key: "name",
          label: "รายละเอียดสินค้า",
          class: "w-100px text-nowrap",
        },
        { key: "sku", label: "SKU", class: "w-100px text-nowrap" },
        { key: "price", label: "ราคา", class: "w-100px text-nowrap" },
        { key: "stock", label: "สต๊อก", class: "w-100px text-nowrap" },
        { key: "display", label: "แสดงผล", class: "text-nowrap" },
        { key: "enabled", label: "สถานะ", class: "w-100px text-nowrap" },
        {
          key: "displays",
          label: "ปิด/เปิด",
          class: "text-nowrap",
        },
        { key: "id", label: "", class: "w-100px text-nowrap" },
      ],
      items: [],
      isBusy: false,
      rows: 0,
      filter: {
        PageNo: 1,
        PerPage: 10,
        Search: "",
        Status: [],
        CategoryId: [],
        SortByOrderOrId: 2,
      },
      pageOptions: [
        { value: 10, text: "10 / หน้า" },
        { value: 30, text: "30 / หน้า" },
        { value: 50, text: "50 / หน้า" },
        { value: 100, text: "100 / หน้า" },
      ],
      totalRowMessage: "",
    };
  },
  created: async function () {
    await this.getList();
  },
  methods: {
    onDataChangeCategory(list) {
      this.dataCategoryHierarchy = { ...list };
      this.selectCategory = [...list.categoryIdList];

      this.filter.CategoryId = this.selectCategory;
    },
    getList: async function () {
      this.$isLoading = false;

      let categories = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/category/categoryHierarchy`,
        null,
        this.$headers,
        null
      );
      if (categories.result == 1) {
        this.catagories = categories.detail;
      }

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
        this.rows = resData.detail.count;
        //this.statusList = resData.detail.overviewCount;

        this.isBusy = false;
      }

      this.$isLoading = true;
    },
    getDataByStatus(status) {
      this.filter.OverView = status;
      this.activeItem = status;
      this.getList();
    },
    getDataByCategory() {
      var catLength = this.selectCategory.length;

      if (catLength > 0) {
        if (this.dataCategoryHierarchy.isLast != true) {
          this.error = "กรุณาเลือกหมวดหมู่ให้ครบทุกชั้น";
        } else {
          this.show = false;
          this.getList();
        }
      } else {
        this.error = "กรุณาเลือกหมวดหมู่";
      }
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
    onChangeDisplayStatus: async function (value, id) {
      var data = {
        productId: id,
        status: value,
      };
      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/product/displayStatus`,
        null,
        this.$headers,
        data
      );
      if (resData.result == 1) {
        this.getList();
      }
    },
    btnDelete: async function () {
      this.$refs.ModalAlertConfirm.hide();
      let resData = await this.$callApi(
        "delete",
        `${this.$baseUrl}/api/product/removeProductDetail/${this.requestDeleteUser.userId}`,
        null,
        this.$headers,
        this.requestDeleteUser
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
  },
};
</script>

<style scoped>
.menuactive {
  color: #ffb300 !important;
}

.category-popover {
  position: absolute;
  z-index: 1;
  border: 1px solid #dcdcdc;
  overflow-y: auto;
  right: 0;
  box-shadow: 0 12px 18px 0 rgba(0, 0, 0, 0.12),
    0 -1px 2px 0 rgba(0, 0, 0, 0.08);
}

.category-box {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: auto;
  padding: 10px;
  max-width: 100%;
  text-align: left;
}

.category-main-box {
  width: 600px;
}

@media (max-width: 600px) {
  .category-main-box {
    width: 100%;
    margin-top: 10px;
  }

  .category-popover {
    right: 15px;
  }
}
</style>
