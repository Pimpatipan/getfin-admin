<template>
  <div v-if="form">
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0 mb-3">
        <b-col sm="6" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">รายละเอียดผู้ขาย</h1>
          <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
        </b-col>
        <b-col sm="6" class="text-right">
          <span class="label-text mr-3 txt-relative">สถานะบัญชี</span>
          <b-form-checkbox
            switch
            size="lg"
            class="d-inline-block mb-1"
            @change="onChangeEnableSeller"
            v-model="form.user.seller.enabled"
            :value="false"
            :unchecked-value="true"
            ><span class="ml-2 main-label">{{
              form.user.seller.enabled ? "ใช้งานปกติ" : "ระงับบัญชี"
            }}</span></b-form-checkbox
          >
        </b-col>
      </CRow>

      <div>
        <b-row class="position-relative mx-3 mx-sm-0">
          <b-col xl="8" class="seller-details">
            <b-row class="bg-white px-3">
              <b-col md="2" class="text-center my-auto p-3">
                <div
                  class="profile-img mb-1"
                  v-bind:style="{
                    'background-image': 'url(' + form.user.seller.logo + ')'
                  }"
                ></div>
                <span
                  v-if="form.user.seller.statusId == 0"
                  class="seller-status status-gray"
                  >ร่าง</span
                >
                <span
                  v-else-if="form.user.seller.statusId == 1"
                  class="seller-status status-yellow"
                >
                  รอการตรวจสอบ
                </span>
                <span
                  v-else-if="form.user.seller.statusId == 2"
                  class="seller-status status-green"
                >
                  ตรวจสอบแล้ว
                </span>
                <span v-else class="seller-status status-red">ระงับ</span>
              </b-col>
              <b-col md="5" class="my-auto">
                <b-row class="my-2">
                  <b-col md="4" class="font-weight-bold">ชื่อร้าน :</b-col>
                  <b-col class="mb-2 mb-sm-0 two-line breakword" md="8">
                    {{ form.user.displayNameTranslation[0].name }}
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col md="4" class="font-weight-bold">ชื่อ-สกุล :</b-col>
                  <b-col class="mb-2 mb-sm-0 two-line breakword" md="8"
                    >{{ form.user.firstname }} {{ form.user.lastname }}</b-col
                  >
                </b-row>

                <b-row class="my-2">
                  <b-col md="4" class="font-weight-bold">เบอร์โทรศัพท์ :</b-col>
                  <b-col class="mb-2 mb-sm-0 two-line breakword" md="8">
                    {{ form.user.telephone }}
                  </b-col>
                </b-row>
              </b-col>
              <b-col md="5" class="my-auto">
                <b-row class="my-2">
                  <b-col md="4" class="font-weight-bold">อีเมล :</b-col>
                  <b-col class="mb-2 mb-sm-0 two-line breakword" md="8"
                    ><span class="one-line">{{ form.user.email }}</span></b-col
                  >
                </b-row>
                <b-row class="my-2">
                  <b-col md="4" class="font-weight-bold">เลขที่บัญชี :</b-col>
                  <b-col class="mb-2 mb-sm-0 two-line breakword" md="8">
                    {{ form.bankAccount.accountNo }}
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col md="4" class="font-weight-bold">ธนาคาร :</b-col>
                  <b-col class="mb-2 mb-sm-0 two-line breakword" md="8">
                    {{ form.bankAccount.bankName }}
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="4" class="pr-0 income-details">
            <div class="bg-white px-3 py-2 br-10 mb-2 income-details-box">
              <b-row>
                <b-col>
                  <p class="font-weight-bold m-0 one-line">รายได้ปัจจุบัน</p>
                  <p class="m-0 one-line f-14">
                    {{ new Date() | moment("MMMM YYYY") }}
                  </p></b-col
                >
                <b-col
                  class="my-auto f-16 font-weight-bold text-primary text-right"
                  >‎฿ {{ form.income.thisMonth | numeral("0,0.00") }}</b-col
                >
              </b-row>
            </div>
            <div class="bg-white px-3 py-2 br-10 mb-2 income-details-box">
              <b-row>
                <b-col>
                  <p class="font-weight-bold m-0 one-line">
                    รายได้เดือนที่แล้ว
                  </p>
                  <p class="m-0 one-line f-14">
                    {{ date }}
                  </p></b-col
                >
                <b-col
                  class="my-auto f-16 font-weight-bold text-primary text-right"
                  >‎฿ {{ form.income.prevMonth | numeral("0,0.00") }}</b-col
                >
              </b-row>
            </div>
            <div class="bg-yellow p-3 br-10 mb-2 income-details-box">
              <b-row>
                <b-col class="my-auto">
                  <p class="font-weight-bold m-0 one-line">รายได้สะสม</p>
                </b-col>
                <b-col
                  class="my-auto f-16 font-weight-bold text-primary text-right"
                  >‎฿ {{ form.income.total | numeral("0,0.00") }}</b-col
                >
              </b-row>
            </div>
          </b-col>
          <!-- <router-link :to="'/seller/details/profile/' + id">
            <span class="see-details text-underline text-primary"
              >ดูรายละเอียด</span
            >
          </router-link> -->
        </b-row>

        <div class="text-right my-1 confirm-box mx-3 mx-md-0">
          <b-button
            @click="approveSeller()"
            class="btn btn-main btn-details-set approve-btn"
            :disabled="isApproveOrRejectAll"
            >ยืนยันการตรวจสอบ</b-button
          >
        </div>

        <b-row class="no-gutters">
          <b-col>
            <b-tabs class="profile-index-tabs" v-if="warningLogIcon">
              <b-tab class="profile-tabs">
                <template v-slot:title>
                  <span>ข้อมูลทั่วไป</span>
                  <font-awesome-icon
                    icon="check-circle"
                    title="View"
                    class="ml-1 text-success"
                    v-if="
                      warningLogIcon[0].result &&
                        warningLogIcon[1].result &&
                        warningLogIcon[2].result &&
                        warningLogIcon[3].result
                    "
                  />
                  <font-awesome-icon
                    icon="times-circle"
                    title="View"
                    class="ml-1 text-danger"
                    v-else
                  />
                </template>
                <b-card-text class="">
                  <b-tabs class="profile-general-tabs">
                    <b-tab active>
                      <template v-slot:title>
                        <span>ข้อมูลพาร์ทเนอร์</span>
                        <font-awesome-icon
                          icon="check-circle"
                          title="View"
                          class="ml-1 text-success"
                          v-if="warningLogIcon[0].result"
                        />
                        <font-awesome-icon
                          icon="times-circle"
                          title="View"
                          class="ml-1 text-danger"
                          v-else
                        />
                      </template>
                      <SellerAccount
                        :dataObject="form.user"
                        @onchangeApproveOrReject="onchangeApproveOrReject"
                        :dataLog="warningLogIcon[0]"
                        :isReject="hasReject[0].reject"
                      />
                    </b-tab>
                    <b-tab>
                      <template v-slot:title>
                        <span>ข้อมูลธุรกิจ</span>
                        <font-awesome-icon
                          icon="check-circle"
                          title="View"
                          class="ml-1 text-success"
                          v-if="warningLogIcon[1].result"
                        />
                        <font-awesome-icon
                          icon="times-circle"
                          title="View"
                          class="ml-1 text-danger"
                          v-else
                        />
                      </template>
                      <BusinessInfo
                        :dataObject="form"
                        @onchangeApproveOrReject="onchangeApproveOrReject"
                        :dataLog="warningLogIcon[1]"
                        :isReject="hasReject[1].reject"
                      />
                    </b-tab>
                    <b-tab>
                      <template v-slot:title>
                        <span>บัญชีธนาคาร</span>
                        <font-awesome-icon
                          icon="check-circle"
                          title="View"
                          class="ml-1 text-success"
                          v-if="warningLogIcon[2].result"
                        />
                        <font-awesome-icon
                          icon="times-circle"
                          title="View"
                          class="ml-1 text-danger"
                          v-else
                        />
                      </template>
                      <BankAccount
                        :dataObject="form"
                        @onchangeApproveOrReject="onchangeApproveOrReject"
                        :enable="form.user.seller.enabled"
                        :dataLog="warningLogIcon[2]"
                        :isReject="hasReject[2].reject"
                      />
                    </b-tab>
                    <b-tab>
                      <template v-slot:title>
                        <span>ที่อยู่คลังสินค้า</span>
                        <font-awesome-icon
                          icon="check-circle"
                          title="View"
                          class="ml-1 text-success"
                          v-if="warningLogIcon[3].result"
                        />
                        <font-awesome-icon
                          icon="times-circle"
                          title="View"
                          class="ml-1 text-danger"
                          v-else
                        />
                      </template>
                      <WarehouseAddress
                        :dataObject="form"
                        @onchangeApproveOrReject="onchangeApproveOrReject"
                        :dataLog="warningLogIcon[3]"
                        :isReject="hasReject[3].reject"
                      />
                    </b-tab>
                  </b-tabs>
                </b-card-text>
              </b-tab>
              <b-tab class="">
                <template v-slot:title>
                  <span>รูปพาร์ทเนอร์</span>
                  <font-awesome-icon
                    icon="times-circle"
                    title="View"
                    class="ml-1 text-danger"
                    v-if="!warningLogIcon[4].result"
                  />
                  <font-awesome-icon
                    icon="check-circle"
                    title="View"
                    class="ml-1 text-success"
                    v-else
                  />
                </template>
                <b-card-text class="mt-3">
                  <Sellerlogo
                    :dataObject="form.user.seller.logo"
                    @onchangeApproveOrReject="onchangeApproveOrReject"
                    :dataLog="warningLogIcon[4]"
                    :isReject="hasReject[4].reject"
                  />
                </b-card-text>
              </b-tab>
              <b-tab class="">
                <template v-slot:title>
                  <span>การจัดส่ง</span>
                  <font-awesome-icon
                    icon="times-circle"
                    title="View"
                    class="ml-1 text-danger"
                    v-if="!warningLogIcon[5].result"
                  />
                  <font-awesome-icon
                    icon="check-circle"
                    title="View"
                    class="ml-1 text-success"
                    v-else
                  />
                </template>
                <b-card-text class="mt-3">
                  <Shipping
                    @onchangeApproveOrReject="onchangeApproveOrReject"
                    :dataLog="warningLogIcon[5]"
                    :isReject="hasReject[5].reject"
                  />
                </b-card-text>
              </b-tab>
              <b-tab class="">
                <template v-slot:title>
                  <span>เลขที่คำสั่งซื้อ</span>
                  <font-awesome-icon
                    icon="times-circle"
                    title="View"
                    class="ml-1 text-danger"
                    v-if="!warningLogIcon[6].result"
                  />
                  <font-awesome-icon
                    icon="check-circle"
                    title="View"
                    class="ml-1 text-success"
                    v-else
                  />
                </template>
                <b-card-text class="mt-3">
                  <Invoice
                    :dataObject="form.user.seller.invoicePrefix"
                    @onchangeApproveOrReject="onchangeApproveOrReject"
                    :dataLog="warningLogIcon[6]"
                    :isReject="hasReject[6].reject"
                  />
                </b-card-text>
              </b-tab>
              <b-tab class="">
                <template v-slot:title>
                  <span>รายการสินค้า</span>
                </template>
                <b-card-text class="mt-3">
                  <b-row class="mt-3 no-gutters mx-3 mx-sm-0">
                    <b-col class="label-text pt-2"
                      >สินค้า {{ rows }} รายการ</b-col
                    >
                    <b-col class="text-right">
                      <b-form-select
                        v-model="filter.SortByOrderOrId"
                        :options="options"
                        class="w-300"
                        @change="getProductList"
                      ></b-form-select>
                    </b-col>
                  </b-row>

                  <div class="mt-3 bg-white mx-3 mx-sm-0 pb-3">
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
                                class="square-box"
                                v-bind:style="{
                                  'background-image':
                                    'url(' + data.item.imageUrl + ')'
                                }"
                              ></div>
                            </div>
                          </template>
                          <template v-slot:cell(name)="data">
                            <p class="mb-0 nobreak two-lines">
                              {{ data.item.name }}
                            </p>
                          </template>
                          <template v-slot:cell(price)="data">
                            <p class="m-0">
                              ฿ {{ data.item.price | numeral("0,0.00") }}
                            </p>
                          </template>
                          <template v-slot:cell(display)="data">
                            <div
                              v-if="data.item.display == true"
                              class="text-success"
                            >
                              <font-awesome-icon icon="check" title="display" />
                            </div>
                            <div v-else class="text-danger">
                              <font-awesome-icon
                                icon="times"
                                title="not display"
                              />
                            </div>
                          </template>
                          <template v-slot:cell(enabled)="data">
                            <div
                              v-if="data.item.enabled == true"
                              class="text-success"
                            >
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
                              @change="
                                onChangeDisplayProduct($event, data.item)
                              "
                            ></b-form-checkbox>
                          </template>
                          <template v-slot:cell(id)="data">
                            <a
                              :href="
                                'http://dev-getfin.dosetech.co/product/' +
                                  data.item.urlKey
                              "
                              target="_blank"
                              class="text-primary"
                            >
                              ตรวจสอบ
                            </a>
                            <!-- <a
                              :href="
                                'http://getfin.me/product/' + data.item.urlKey
                              "
                              target="_blank"
                              class="text-primary"
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
                    </b-row></div
                ></b-card-text>
              </b-tab>
            </b-tabs>

            <div class="bg-white p-4">
              <h1 class="mr-sm-4 text-uppercase f-18">รายละเอียด</h1>
              <b-table
                class="table-list"
                striped
                responsive
                hover
                :items="itemsLog"
                :fields="fieldsLog"
                :busy="isBusy"
                show-empty
                empty-text="ไม่พบข้อมูล"
              >
                <template v-slot:cell(createdTime)="data">
                  <span>{{
                    new Date(data.item.createdTime) | moment($formatDateTime)
                  }}</span>
                </template>
                <template v-slot:cell(statusId)="data">
                  <span v-if="data.item.statusId == 0">ร่าง</span>
                  <span v-else-if="data.item.statusId == 1">
                    รอการอนุมัติ
                  </span>
                  <span v-else-if="data.item.statusId == 2"> อนุมัติ </span>
                  <span v-else class="text-danger">ปฏิเสธ</span>
                  <span v-if="data.item.log != null" class="text-danger">
                    ({{ comma(data.item.log) }})</span
                  >
                </template>
              </b-table>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <!-- Modal -->
    <ModalAlert ref="modalAlert" :text="modalMessage" />
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
    <ModalLoading ref="modalLoading" :hasClose="false" />

    <b-modal
      id="disableProductModal"
      ref="disableProductModal"
      hide-header
      hide-footer
      no-close-on-backdrop
      centered
      size="lg"
      body-class="p-4"
    >
      <div class="modal-header p-0 border-0">
        <h3 class="font-weight-bold">
          ระงับสินค้าชั่วคราว
          <span class="text-secondary f-14 ml-2"
            >(ร้าน {{ form.user.displayNameTranslation[0].name }}
            {{ form.user.telephone }})</span
          >
        </h3>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$bvModal.hide('disableProductModal')"
        >
          ×
        </button>
      </div>
      <div>
        <b-row class="mt-2">
          <b-col md="3">
            <img :src="img" alt="productimg" class="w-100" />
          </b-col>
          <b-col md="9">
            <p class="mb-1">SKU : {{ sku }}</p>
            <p>{{ productname }}</p>
          </b-col>
        </b-row>

        <InputTextArea
          class="mb-4 mt-3"
          textFloat="กรุณาระบุเหตุผลในการระงับสินค้า"
          placeholder="กรุณาระบุเหตุผลในการระงับสินค้า"
          type="text"
          name="answer"
          isRequired
          rows="7"
          v-model="answer"
        />

        <b-row class="mt-3">
          <b-col md="6">
            <b-button
              :disabled="isDisable"
              class="btn-details-set btn-cancel"
              @click="$bvModal.hide('disableProductModal')"
              >ย้อนกลับ</b-button
            >
          </b-col>
          <b-col md="6" class="text-sm-right">
            <button
              type="button"
              @click="disableProduct(0)"
              :disabled="isDisable"
              class="btn btn-main btn-details-set ml-md-2 text-uppercase"
            >
              บันทึก
            </button>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <b-modal
      id="rejectModal"
      ref="rejectModal"
      hide-header
      hide-footer
      no-close-on-backdrop
      centered
      size="lg"
      body-class="p-4"
    >
      <div class="modal-header p-0 border-0">
        <h3 class="font-weight-bold">ปฏิเสธข้อมูลบัญชี</h3>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$bvModal.hide('rejectModal')"
        >
          ×
        </button>
      </div>
      <div>
        <InputTextArea
          class="mb-4 mt-3"
          textFloat="กรุณาระบุเหตุผลในการปฏิเสธข้อมูล"
          placeholder="กรุณาระบุเหตุผลในการปฏิเสธข้อมูล"
          type="text"
          name="answer"
          isRequired
          rows="7"
          v-model="rejectNote"
        />

        <p class="my-3 text-center text-danger" v-if="errorReject">
          กรุณากรอกข้อมูล
        </p>

        <b-row class="mt-3">
          <b-col md="6">
            <b-button
              :disabled="isDisable"
              class="btn-details-set btn-cancel"
              @click="$bvModal.hide('rejectModal')"
              >ย้อนกลับ</b-button
            >
          </b-col>
          <b-col md="6" class="text-sm-right">
            <button
              type="button"
              @click="rejectPartner()"
              :disabled="isDisable"
              class="btn btn-main btn-details-set ml-md-2 text-uppercase"
            >
              บันทึก
            </button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import InputSelect from "@/components/inputs/InputSelect";
import InputTextArea from "@/components/inputs/InputTextArea";
import ModalAlert from "@/components/modal/alert/ModalAlert";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
import Vue from "vue";
import * as moment from "moment/moment";
import SellerAccount from "../seller/components/details/SellerAccountSection";
import BusinessInfo from "../seller/components/details/BusinessInformationSection";
import BankAccount from "../seller/components/details/BankAccountSection";
import WarehouseAddress from "../seller/components/details/WarehouseAddressSection";
import Sellerlogo from "../seller/components/details/SellerLogoSection";
import Shipping from "../seller/components/details/ShippingSection";
import Invoice from "../seller/components/details/InvoiceSection";
import ModalLoading from "@/components/modal/alert/ModalLoading";

export default {
  name: "SellerDetails",
  components: {
    InputSelect,
    ModalAlert,
    ModalAlertError,
    InputTextArea,
    SellerAccount,
    BusinessInfo,
    BankAccount,
    WarehouseAddress,
    Sellerlogo,
    Shipping,
    Invoice,
    ModalLoading
  },
  data() {
    return {
      id: this.$route.params.id,
      items: [],
      itemsLog: [],
      warningLogIcon: null,
      selected: null,
      show: true,
      checked: true,
      isApproveOrRejectAll: true,
      img: "",
      sku: "",
      productname: "",
      rejectNote: "",
      date: "",
      productId: 0,
      answer: "",
      options: [
        { value: 1, text: "เก่าสุด - ใหม่สุด" },
        { value: 2, text: "ใหม่สุด - เก่าสุด" }
      ],
      modalMessage: "",
      activeItem: "",
      requestDeleteUser: {
        userId: null
      },
      fields: [
        {
          key: "imageUrl",
          label: "ภาพประกอบ",
          class: "w-100px text-nowrap"
        },
        {
          key: "name",
          label: "รายละเอียดสินค้า",
          class: "w-100px text-nowrap"
        },
        { key: "sku", label: "SKU", class: "w-100px text-nowrap" },
        { key: "price", label: "ราคา", class: "w-100px text-nowrap" },
        { key: "stock", label: "สต๊อก", class: "w-100px text-nowrap" },
        { key: "display", label: "แสดงผล", class: "text-nowrap" },
        { key: "enabled", label: "สถานะ", class: "w-100px text-nowrap" },
        { key: "displays", label: "ปิด/เปิด", class: "text-nowrap" },
        { key: "id", label: "", class: "w-100px text-nowrap" }
      ],
      fieldsLog: [
        {
          key: "createdTime",
          label: "วันที่ทำรายการ",
          class: "w-100px"
        },
        {
          key: "statusId",
          label: "สถานะ",
          class: "w-100px"
        },
        {
          key: "createdByName",
          label: "ทำรายการโดย",
          class: "w-100px"
        }
      ],
      WarningLog: [
        {
          TypeLogId: 1,
          Note: "",
          Result: false
        },
        {
          TypeLogId: 2,
          Note: "",
          Result: false
        },
        {
          TypeLogId: 3,
          Note: "",
          Result: false
        },
        {
          TypeLogId: 4,
          Note: "",
          Result: false
        },
        {
          TypeLogId: 5,
          Note: "",
          Result: true
        },
        {
          TypeLogId: 6,
          Note: "",
          Result: false
        },
        {
          TypeLogId: 7,
          Note: "",
          Result: false
        }
      ],
      hasReject: [
        { reject: false },
        { reject: false },
        { reject: false },
        { reject: false },
        { reject: false },
        { reject: false },
        { reject: false }
      ],
      tabsName: [
        "ข้อมูลพาร์ทเนอร์",
        "ข้อมูลธุรกิจ",
        "บัญชีธนาคาร",
        "ที่อยู่คลังสินค้า",
        "รูปพาร์ทเนอร์",
        "การจัดส่ง",
        "เลขที่คำสั่งซื้อ"
      ],
      form: null,
      indexTab: 0,
      isBusy: false,
      isDisable: false,
      rows: 0,
      filter: {
        PageNo: 1,
        PerPage: 10,
        Search: "",
        Status: [],
        SortByOrderOrId: 1
      },
      pageOptions: [
        { value: 10, text: "10 / หน้า" },
        { value: 30, text: "30 / หน้า" },
        { value: 50, text: "50 / หน้า" },
        { value: 100, text: "100 / หน้า" }
      ],
      totalRowMessage: "",
      errorReject: false
    };
  },
  created: async function() {
    await this.getList();
    await this.getProductList();
    await this.getWarningLog();
    await this.getWarningLogIcon();
    this.date = moment()
      .subtract(1, "months")
      .format("MMMM YYYY");
  },
  methods: {
    moment: function() {
      return moment();
    },
    comma(array) {
      let str = "";
      for (let i = 0; i < array.length; i++) {
        if (!array[i].result)
          str += this.tabsName[array[i].typeLogId - 1] + ", ";
        //else str += "-";
      }
      str = str.replace(/,\s*$/, "");
      return str;
    },
    getList: async function() {
      let body = {
        id: this.$route.params.id
      };

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Seller/Detail`,
        null,
        this.$headers,
        body
      );
      if (resData.result == 1) {
        this.form = resData.detail.profile;
        this.$isLoading = true;
      }
    },
    getWarningLog: async function() {
      let resData = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/WarningLog/seller/` + this.form.userId,
        null,
        this.$headers,
        null
      );
      if (resData.result == 1) {
        if (resData.detail.warningProfile != null)
          this.itemsLog = resData.detail.warningProfile.log;
        else this.itemsLog = [];
      }
    },
    getWarningLogIcon: async function() {
      let resData = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/WarningLog/reject/seller/` + this.form.userId,
        null,
        this.$headers,
        null
      );
      if (resData.result == 1) {
        this.warningLogIcon = resData.detail.warningProfile;
      }
    },
    getProductList: async function() {
      this.isBusy = true;

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Product/List/${this.id}`,
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
      this.filter.PageNo = Page;
      this.getProductList();
    },
    hanndleChangePerpage(value) {
      this.filter.PageNo = 1;
      this.filter.PerPage = value;
      this.getProductList();
    },
    onChangeEnableSeller: async function(value) {
      let body = {
        Enabled: value,
        SellerId: this.id
      };

      let resData = await this.$callApi(
        "patch",
        `${this.$baseUrl}/api/Seller/Enabled`,
        null,
        this.$headers,
        body
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        this.getList();
      } else {
        this.$refs.modalAlertError.show();
      }
    },
    onChangeDisplayProduct(status, data) {
      this.img = data.imageUrl;
      this.productname = data.name;
      this.sku = data.sku;
      this.productId = data.id;
      if (status == false) {
        this.$refs.disableProductModal.show();
      } else {
        this.disableProduct(1);
      }
    },
    disableProduct: async function(status) {
      let body = {
        IsActive: status,
        Note: this.answer,
        ProductId: this.productId,
        SellerId: this.id
      };

      let resData = await this.$callApi(
        "patch",
        `${this.$baseUrl}/api/Product/IsActive`,
        null,
        this.$headers,
        body
      );
      if (resData.result == 1) {
        this.$refs.disableProductModal.hide();
        this.answer = "";
        this.getProductList();
      }
    },
    approveSeller: async function() {
      this.$refs.modalLoading.show();

      var status = 2;

      for (var i = 0; i < this.WarningLog.length; i++) {
        this.WarningLog[i].Result = this.warningLogIcon[i].result;

        if (!this.WarningLog[i].Result) { status = 3; break;} 
        //else status = 2;
      }

      let body = {
        StatusId: status,
        SellerId: this.id,
        WarningLog: this.WarningLog
      };

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/Seller/Approve`,
        null,
        this.$headers,
        body
      );
      this.modalMessage = resData.message;
      if (resData.result == 1) {
        this.isApproveOrRejectAll = true;
        this.$refs.modalLoading.hide();
        this.$refs.modalAlert.show();
        await this.getList();
        await this.getProductList();
        await this.getWarningLog();
        await this.getWarningLogIcon();
        // this.date = moment()
        //   .subtract(1, "months")
        //   .format("MMMM YYYY");
        setTimeout(() => {
          this.$refs.modalAlert.hide();
        }, 3000);
      } else {
        this.$refs.rejectModal.show();
      }
    },
    rejectPartner: async function(status) {
      if (this.rejectNote == "") {
        this.errorReject = true;
        return;
      }

      this.errorReject = false;
      this.$refs.rejectModal.hide();
      this.warningLogIcon[this.indexTab].updatedTime = new Date();
      this.warningLogIcon[this.indexTab].warningLog.note = this.rejectNote;
      //this.hasReject[this.indexTab].reject = true;
      this.WarningLog[this.indexTab].Result = false;
      this.warningLogIcon[this.indexTab].result = false;
      this.WarningLog[this.indexTab].Note = this.rejectNote;
      this.modalMessage = "สำเร็จ";
      this.$refs.modalAlert.show();
      setTimeout(() => {
        this.$refs.modalAlert.hide();
      }, 3000);
      this.rejectNote = "";
      this.isApproveOrRejectAll = false;

      // for (var i = 0; i < this.WarningLog.length; i++) {
      //   if (!this.WarningLog[i].Result) this.isApproveOrRejectAll = false;
      //   else this.isApproveOrRejectAll = true;
      // }
    },
    onchangeApproveOrReject: async function(status, index) {
      this.indexTab = index;
      if (status) {
        this.WarningLog[index].Result = true;
        this.warningLogIcon[index].result = true;
        this.modalMessage = "สำเร็จ";
        this.$refs.modalAlert.show();
        setTimeout(() => {
          this.$refs.modalAlert.hide();
        }, 3000);
        this.isApproveOrRejectAll = false;
        this.warningLogIcon[this.indexTab].warningLog.note = "";
        // for (var i = 0; i < this.WarningLog.length; i++) {
        //   if (this.WarningLog[i].Result) this.isApproveOrRejectAll = false;
        //   else  this.isApproveOrRejectAll = true;
        // }
      } else {
        this.$refs.rejectModal.show();
      }
    }
  }
};
</script>

<style scoped>
.approve-btn {
  width: 160px !important;
}
.menuactive {
  color: #ffb300 !important;
}

.see-details {
  position: absolute;
  right: 15px;
  z-index: 1;
  top: 10px;
}

.w-300 {
  width: 300px;
}

.seller-img {
  width: 50%;
}

.profile-img {
  width: calc(100%);
  padding-bottom: calc(100%);
  border-radius: 50%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
}

.br-10 {
  border-radius: 10px;
}

.bg-yellow {
  background-color: #fed378;
  color: black;
}

.seller-status {
  padding: 0 10px;
  border-radius: 10px;
  white-space: nowrap;
}

.status-gray {
  background-color: #dcdcdc;
}

.status-yellow {
  background-color: #fed378;
}

.status-green {
  background-color: #2eb85c;
}

.status-red {
  background-color: #ff0000;
}

::v-deep .profile-index-tabs .nav-tabs {
  overflow-x: auto;
  overflow-y: hidden;
  border: 0;
  flex-wrap: nowrap;
  width: 75%;
}

::v-deep .profile-index-tabs .nav-tabs .nav-item {
  min-width: 125px;
}

::v-deep .profile-index-tabs .nav-tabs .nav-link {
  background-color: transparent;
  border: 0;
  min-width: 150px;
}

::v-deep .profile-general-tabs .nav-tabs {
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  border: 0;
  background: white;
}

::v-deep .profile-general-tabs .nav-tabs .nav-link {
  padding: 15px;
}

.confirm-box {
  position: absolute;
  right: 30px;
  z-index: 9;
}

@media (max-width: 1600px) {
  .seller-img {
    width: 150px;
    margin: 20px 0;
  }

  .profile-img {
    width: 100%;
    padding-bottom: 100%;
  }

  .seller-details,
  .income-details {
    flex: 0 0 100% !important;
    max-width: 100%;
  }

  .income-details {
    padding: 0 !important;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .income-details .income-details-box {
    width: 33%;
  }
}

@media (max-width: 1200px) {
  .income-details .income-details-box {
    width: 100%;
  }

  .income-details {
    display: block;
  }
}

@media (max-width: 767.98px) {
  .w-300 {
    width: 100%;
  }

  .profile-img {
    width: 50%;
    padding-bottom: 50%;
  }

  .confirm-box {
    position: unset;
  }

  ::v-deep .profile-index-tabs .nav-tabs {
    width: auto;
  }
  .approve-btn {
    width: 100% !important;
  }
}
</style>
