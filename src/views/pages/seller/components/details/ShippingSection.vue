<template>
  <div class="w-100">
    <b-container class="p-0">
      <b-row class="no-gutters">
        <b-col class="bg-white p-3">
          <b-row>
            <b-col cols="6" class="m-auto">การอุดหนุนค่าขนส่ง</b-col>
            <b-col cols="6" class="text-sm-right">
              <b-form-group class="m-auto">
                <b-form-radio-group
                  id="radio-group-2"
                  v-model="subsidize"
                  name="radio-sub-component"
                  disabled
                >
                  <b-form-radio value="0">Partner</b-form-radio>
                  <b-form-radio value="1">Seller</b-form-radio>
                </b-form-radio-group>
              </b-form-group></b-col
            >
          </b-row>
        </b-col>
      </b-row>
      <b-row class="no-gutters mt-1">
        <b-col class="bg-white p-3 mb-2 shipping-border-right" cols="12" lg="6">
          <b-row>
            <b-col cols="12" lg="4">
              <label for="shippingList" class="main-label mt-2">
                รายชื่อผู้ให้บริการ
              </label>
            </b-col>
            <b-col cols="12" lg="8">
              <b-input-group class="panel-shipping-serach mt-1">
                <b-form-input
                  class="input-serach"
                  placeholder="ค้นหาชื่อผู้ให้บริการ"
                  v-model="filter.search"
                  @keyup="handleSearch"
                ></b-form-input>
                <b-input-group-prepend @click="btnSearch">
                  <span class="icon-input m-auto pr-2">
                    <font-awesome-icon icon="search" title="View" />
                  </span>
                </b-input-group-prepend>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row
            class="mt-4 shipping-panel-overflow"
            v-if="shippingLists.length > 0"
          >
            <b-col>
              <div
                v-for="(item, index) in shippingLists"
                :key="index"
                class="shipping-panel mb-4"
              >
                <b-row class="my-2">
                  <b-col>
                    <label for="shippingname" class="shipping-label">
                      {{ item.name }}
                    </label></b-col
                  >
                  <!-- <b-col class="d-flex justify-content-end">
                    <b-button
                      variant="info"
                      class="btn-shipping-set"
                      @click="addShippingToMyList(item, index)"
                    >
                      <font-awesome-icon
                        icon="chevron-right"
                        class="icon d-block"
                      /> </b-button
                  ></b-col> -->
                </b-row>
              </div>
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col class="mt-3 text-center text-secondary">
              <div class="mb-4">
                <b-row class="my-2">
                  <b-col>
                    <label for="shippingname" class="">
                      ไม่พบข้อมูล
                    </label></b-col
                  >
                </b-row>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="bg-white p-3 mb-2 shipping-border-left" cols="12" lg="6">
          <b-row>
            <b-col cols="12" lg="4">
              <label for="shippingList" class="main-label mt-2">
                ขนส่งที่ฉันเลือก
              </label>
            </b-col>
            <b-col cols="12" lg="8">
              <b-input-group class="panel-shipping-serach mt-1">
                <b-form-input
                  class="input-serach"
                  placeholder="ค้นหาชื่อผู้ให้บริการ"
                  v-model="filterMyshipping.search"
                  @keyup="handleMyShipSearch"
                ></b-form-input>
                <b-input-group-prepend>
                  <span class="icon-input m-auto pr-2" @click="btnMyShipSearch">
                    <font-awesome-icon icon="search" title="View" />
                  </span>
                </b-input-group-prepend>
              </b-input-group>
            </b-col>
          </b-row>

          <b-row
            class="mt-4 shipping-panel-overflow"
            v-if="myShippingLists.length > 0"
          >
            <b-col>
              <div
                v-for="(item, index) in myShippingLists"
                :key="index"
                class="shipping-panel mb-4"
              >
                <b-row class="my-2">
                  <b-col>
                    <label for="shippingname" class="shipping-label">
                      {{ item.name }}
                    </label></b-col
                  >
                  <!-- <b-col class="d-flex justify-content-end">
                    <b-button
                      variant="secondary"
                      class="btn-shipping-set"
                      @click="removeFromMyShippingList(item, index)"
                    >
                      <font-awesome-icon
                        icon="trash-alt"
                        class="icon d-block"
                      /> </b-button
                  ></b-col> -->
                </b-row>
              </div>
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col class="mt-3 text-center text-secondary">
              <div class="mb-4">
                <b-row class="my-2">
                  <b-col>
                    <label for="shippingname" class="">
                      ไม่พบข้อมูล
                    </label></b-col
                  >
                </b-row>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="bg-white no-gutters px-3 pt-3">
        <b-col cols="12">
          <label class="font-weight-bold"
            >กรุณาบอกเหตุผลในการปฏิเสธข้อมูล</label
          >
        </b-col>
        <div>
          <p>{{ dataLog.warningLog.note }}</p>
        </div>
      </b-row>
      <b-row class="w-100 bg-white mx-auto py-4">
        <b-col class="d-flex justify-content-center"
          ><b-button
            variant="info"
            :disabled="isReject"
            @click="onchangeApproveOrReject(false, 5)"
            class="btn btn-details-set btn-cancel mr-1"
            >ปฏิเสธ</b-button
          ><b-button
            :disabled="isDisable"
            @click="onchangeApproveOrReject(true, 5)"
            class="btn btn-main btn-details-set"
            >ยืนยัน</b-button
          ></b-col
        >
      </b-row>
      <ModalAlert ref="modalAlert" :text="modalMessage" />
      <ModalAlertError ref="modalAlertError" :text="modalMessage" />
    </b-container>
  </div>
</template>

<script>
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
export default {
  components: {
    ModalAlert,
    ModalAlertError,
  },
  props: {
    sellerUser: {
      required: false,
      type: Object,
    },
    dataWarningLog: {
      required: false,
      type: Object | Array,
    },
    dataLog: {
      required: false,
      type: Object || Array,
    },
    isReject: {
      required: false,
      type: Boolean
    },
  },
  data() {
    return {
      modalMessage: "",
      isDisable: false,
      filter: {
        search: "",
        PerPage: 9,
        PageNo: 1,
        status: [1],
        SortByOrderOrId: 1,
        NotInId: [],
      },
      filterMyshipping: {
        search: "",
        PerPage: 9,
        PageNo: 1,
        status: [1],
        SortByOrderOrId: 1,
        NotInId: [],
      },
      user: this.sellerUser,
      id: this.$route.params.id,
      subsidize: 0,
      // isDisable: false,
      shipingListSearch: "",
      shippingLists: [],
      myShippingLists: [],
      myShippingIdLists: [],
      notInShippingIdLists: [],
    };
  },
  async created() {
    await this.getData();
  },

  methods: {
    getData: async function () {
      //await this.getShippingList();
      await this.getMyShippingList();
    },
    onchangeApproveOrReject: async function (status, index) {
      this.$emit("onchangeApproveOrReject", status, index);
    },
    getShippingList: async function () {
      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/ShippingList`,
        null,
        this.$headers,
        this.filter
      );

      if (data.result == 1) {
        this.shippingLists = data.detail.dataList;
      }
    },
    getMyShippingList: async function () {
      let shippingData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/ShippingList/${this.id}`,
        null,
        this.$headers,
        this.filterMyshipping
      );

      if (shippingData.result == 1) {
        this.subsidize = shippingData.detail.subsidizeId;
        this.myShippingLists = shippingData.detail.dataList;
        this.myShippingLists.forEach((element) => {
          this.myShippingIdLists.push(element.id);
        });
      }
      this.myShippingLists.forEach((element) => {
        this.filter.NotInId.push(element.id);
      });

      await this.getShippingList();
    },
    addShippingToMyList(item, index) {
      this.myShippingLists.push(item);
      this.myShippingIdLists.push(item.id);
      this.shippingLists.splice(index, 1);
    },
    handleSearch(e) {
      if (e.keyCode === 13) {
        this.filter.PageNo = 1;
        this.getShippingList();
      }
    },
    btnSearch() {
      this.filter.PageNo = 1;
      this.getShippingList();
    },
    handleMyShipSearch(e) {
      if (e.keyCode === 13) {
        this.filterMyshipping.PageNo = 1;
        this.getMyShippingList();
      }
    },
    btnMyShipSearch() {
      this.filterMyshipping.PageNo = 1;
      this.getMyShippingList();
    },
    async onSubmitMyLists() {},
  },
};
</script>

<style lang="scss" scoped>
.btn-shipping-set {
  width: 47px;
  height: 27px;
  text-align: -webkit-center;
}
.shipping-panel {
  border-bottom: 1px solid lightgrey;
}
.shipping-label {
  margin: 2px;
  font-size: 16px;
}
.shipping-panel-overflow {
  overflow-x: auto;
  height: calc(100vh - 470px);
}
.panel-shipping-serach {
  border: 2px solid #16274a;
}

@media screen and (min-width: 800px) {
  // this css will only be used when the screen size is min 800px

  .shipping-border-right {
    border-right: 4px solid #f8f8f8;
  }

  .shipping-border-left {
    border-left: 4px solid #f8f8f8;
  }
}
</style>
