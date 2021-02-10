<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col sm="6" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">
            {{ campaignName }}
          </h1>
        </b-col>
        <b-col sm="6" class="text-right">
          <div class="d-flex justify-content-end">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="ชื่อสินค้า"
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
              <template v-slot:cell(product.imageUrl)="data">
                <div class="position-relative">
                  <div
                    class="image"
                    v-bind:style="{
                      'background-image':
                        'url(' + data.item.product.imageUrl + ')',
                    }"
                  ></div>
                </div>
              </template>
              <template v-slot:cell(categories)="data">
                <span
                  v-if="
                    data.item.categories != null &&
                    data.item.categories.length > 0
                  "
                  class=""
                >
                  {{ addSign(data.item.categories) }}</span
                >
                <span v-else>-</span>
              </template>
              <template v-slot:cell(product.straightPrice)="data">
                <p class="m-0">
                  ฿ {{ data.item.product.straightPrice | numeral("0,0.00") }}
                </p>
              </template>
              <template v-slot:cell(priceAfterDiscount)="data">
                <p class="m-0">
                  ฿ {{ data.item.priceAfterDiscount | numeral("0,0.00") }}
                </p>
              </template>
              <template v-slot:cell(product.quantity)="data">
                <p class="m-0">
                  {{ data.item.product.quantity | numeral("0,0") }}
                </p>
              </template>
              <template v-slot:cell(quantity)="data">
                <p class="m-0">
                  {{ data.item.quantity | numeral("0,0") }}
                </p>
              </template>
              <template v-slot:cell(product.id)="data">
                <div class="d-flex justify-content-center">
                  <b-button
                    variant="link"
                    class="px-1 py-0 text-dark"
                    @click="deleteProduct(data.item.product.id, data.index)"
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

        <b-row class="mt-3 p-3">
          <b-col md="6">
            <router-link :to="'/campaign/verify/partnerlist/' + campid">
              <b-button :disabled="isDisable" class="btn-details-set btn-cancel"
                >ย้อนกลับ</b-button
              >
            </router-link>
          </b-col>
          <b-col md="6" class="text-sm-right">
            <button
              type="button"
              @click="approveProduct(0)"
              :disabled="isDisable"
              class="btn btn-main btn-details-set ml-md-2 text-uppercase"
            >
              บันทึก
            </button>
            <button
              type="button"
              @click="approveProduct(1)"
              :disabled="isDisable"
              class="btn btn-main btn-details-set ml-md-2 text-uppercase"
            >
              บันทึกและออก
            </button>
          </b-col>
        </b-row>
      </div>
    </div>
    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
 <ModalLoading ref="modalLoading" :hasClose="false" />
  </div>
</template>

<script>
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import ModalLoading from "@/components/modal/alert/ModalLoading";

export default {
  name: "CampaignProductList",
  components: {
    ModalAlert,
    ModalAlertError,
    ModalLoading
  },
  data() {
    return {
      campid: this.$route.params.campid,
      sellerid: this.$route.params.sellerid,
      modalMessage: "",
      fields: [
        {
          key: "product.imageUrl",
          label: "รูปภาพ",
          class: "w-200",
        },
        {
          key: "product.name",
          label: "ชื่อสินค้า",
          class: "w-100px",
        },
        {
          key: "product.sku",
          label: "SKU",
          class: "w-100px",
        },
        {
          key: "categories",
          label: "หมวดหมู่",
          class: "w-200",
        },
        {
          key: "product.straightPrice",
          label: "ราคาเดิม",
          class: "w-100px",
        },
        {
          key: "priceAfterDiscount",
          label: "ราคาแคมเปญ",
          class: "w-100px",
        },
        {
          key: "product.quantity",
          label: "จำนวนสินค้า",
          class: "w-100px",
        },
        {
          key: "quantity",
          label: "จำนวนสินค้าที่ต้องการขาย",
          class: "w-100px",
        },
        {
          key: "product.id",
          label: "",
          class: "w-100px",
        },
      ],
      items: [],
      isBusy: false,
      value: false,
      rows: 0,
      filter: {
        PageNo: 1,
        PerPage: 10,
        StartDate: null,
        EndDate: null,
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
      campaignName: "",
      items: [],
      deleteProductList: [],
      isBusy: false,
      isDisable: false,
    };
  },
  created: async function () {
    await this.getList();
    this.$isLoading = true;
  },
  methods: {
    addSign(array) {
      let str = "";
      for (let i = 0; i < array.length; i++) {
        if (array[i].categoryName != null && array[i].categoryName != "")
          str += array[i].categoryName + " > ";
        //else str += "-";
      }
      str = str.replace(/>\s*$/, "");
      return str;
    },
    getList: async function () {
      this.isBusy = true;

      let filter = {
        PageNo: 1,
        PerPage: -1,
        StartDate: null,
        EndDate: null,
        Status: [],
        Search: "",
      };

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Campaign/list`,
        null,
        this.$headers,
        filter
      );

      if (resData.result == 1) {
        this.items = resData.detail.dataList;
        var data = this.items.filter((x) => x.id == this.campid);
        this.campaignName = data[0].campaignName;
      }

      let dataList = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Campaign/Partner/Product/` +
          this.campid +
          `/` +
          this.sellerid,
        null,
        this.$headers,
        this.filter
      );

      if (dataList.result == 1) {
        this.items = dataList.detail;
        this.isBusy = false;
      }
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
    deleteProduct(id, index) {
      this.deleteProductList.push(id);
      this.items.splice(index, 1);
    },
    approveProduct: async function (flag) {
      this.isDisable = true;
      this.$refs.modalLoading.show();

      let request = {
        IsDeleteProductId: this.deleteProductList,
        Result: true,
      };

      let resData = await this.$callApi(
        "patch",
        `${this.$baseUrl}/api/Campaign/Approve/Partner/Product/` +
          this.campid +
          `/` +
          this.sellerid,
        null,
        this.$headers,
        request
      );
      this.modalMessage = resData.message;
      this.$refs.modalLoading.hide();
      if (resData.result == 1) {
        this.$refs.modalAlert.show();
        this.isDisable = false;
        if (flag == 1) {
          this.$router.push(
            `/campaign/verify/partnerlist/${this.$route.params.campid}`
          );
        } else {
          setTimeout(() => {
            this.$refs.modalAlert.hide();
          }, 3000);
          
          this.filter = {
            PageNo: 1,
            PerPage: 10,
            StartDate: null,
            EndDate: null,
            Status: [],
            Search: "",
          };
          this.getList();
        }
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

.image {
  width: 100%;
  padding-top: 42.9%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
