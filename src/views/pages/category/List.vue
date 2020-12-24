<template>
  <div>
    <div class="min-vh-100">
      <CRow class="no-gutters px-3 px-sm-0">
        <b-col sm="6" class="text-center text-sm-left mb-3 mb-sm-0">
          <h1 class="mr-sm-4 header-main text-uppercase">จัดการรูปหมวดหมู่</h1>
        </b-col>
        <b-col sm="6" class="text-right">
          <div class="d-flex">
            <b-input-group class="panel-input-serach">
              <b-form-input
                class="input-serach"
                placeholder="ชื่อหมวดหมู่"
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
              <template v-slot:cell(createdTime)="data">
                <span>
                  {{ new Date(data.item.createdTime) | moment($formatDate) }}
                </span>
              </template>
              <template v-slot:cell(imageUrl)="data">
                <div class="row no-gutters">
                  <div class="col-12">
                    <div
                      class="square-box b-contain"
                      v-bind:style="{
                        'background-image': 'url(' + data.item.imageUrl + ')',
                      }"
                    ></div>
                  </div>
                </div>
              </template>
              <template v-slot:cell(id)="data">
                <div class="d-flex justify-content-center">
                  <b-button
                    variant="link"
                    class="px-1 py-0 text-dark"
                    @click="changeImg(data.item)"
                  >
                    เปลี่ยนรูปภาพ
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
              @change="hanndleChangePerPage"
              :options="pageOptions"
            ></b-form-select>
          </b-col>
        </b-row>
      </div>
    </div>

    <b-modal
      id="changeImgModal"
      ref="changeImgModal"
      hide-header
      hide-footer
      centered
      body-class="p-4"
    >
      <div class="modal-header border-0 px-0 pt-0">
        <h3 class="font-weight-bold">จัดการรูปหมวดหมู่</h3>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="$bvModal.hide('changeImgModal')"
        >
          ×
        </button>
      </div>
      <div>
        <b-container class="p-0">
          <b-row>
            <b-col>
              <UploadFile
                textFloat="รูปหมวดหมู่"
                placeholder="กรุณาเลือกไฟล์เพื่ออัพโหลด"
                format="all"
                name="thumbnail"
                :fileName="imgName"
                text="*กรุณาอัพโหลดไฟล์สกุล .png, .jpg ขนาด 500 x 500 px ขนาดไม่เกิน 50 MB"
                isRequired
                v-on:onFileChange="onImageChange"
                v-on:delete="deleteImage"
              />
              <div
                class="preview-box b-contain m-auto cat-img"
                v-bind:style="{
                  'background-image': 'url(' + img + ')',
                }"
              >
                <img
                  src="/img/loading.svg"
                  class="loading"
                  alt="loading"
                  v-if="isLoadingImage"
                />
              </div>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col md="6">
              <b-button
                @click="$bvModal.hide('changeImgModal')"
                class="btn-details-set btn-cancel"
                :disabled="isDisable"
                >ปิด</b-button
              >
            </b-col>
            <b-col md="6" class="text-sm-right">
              <button
                type="button"
                class="btn btn-main btn-details-set ml-md-2 text-uppercase"
                :disabled="isDisable"
                @click="uploadCatImg"
              >
                บันทึก
              </button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-modal>
    <ModalLoading ref="modalLoading" :hasClose="false" />
  </div>
</template>

<script>
import UploadFile from "@/components/inputs/UploadFile";
import ModalLoading from "@/components/modal/alert/ModalLoading";

export default {
  name: "CategoryList",
  components: {
    UploadFile,
    ModalLoading
  },
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
          key: "imageUrl",
          label: "โลโก้",
          class: "text-center",
        },
        {
          key: "name",
          label: "ชื่อหมวดหมู่",
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
      items: [],
      isBusy: false,
      isDisable: false,
      checkAll: false,
      selectAllCb: false,
      isLoadingImage: false,
      img: "",
      imgName: "",
      catId: 0,
    };
  },
  created: async function () {
    await this.getList();
  },
  methods: {
    changeImg(data) {
      this.img = data.imageUrl;
      this.catId = data.id;
      this.$refs.changeImgModal.show();
    },
    getList: async function () {
      this.isBusy = true;

      let resData = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/category/ParentCategory/List`,
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
      this.$refs.filterSidebar.hide(true);
      this.getList();
    },
    onClearFilter() {
      this.filter.PageNo = 1;
      this.$refs.filterSidebar.hide(true);
      this.getList();
    },
    pagination(Page) {
      this.filter.PageNo = Page;
      this.getList();
    },
    hanndleChangePerPage(value) {
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
    onChangeShowSelected(value) {
      if (value == true) this.filter.Status = [1];
      else this.filter.Status = [0, 1];
      this.getList();
    },
    onImageChange(img) {
      this.isLoadingImage = true;
      this.isDisable = true;

      this.imgName = img.name;

      var reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = async () => {
        //this.images = reader.result;
        //this.images = await this.saveImagetoDb(reader.result);
        this.isLoadingImage = false;
        this.isDisable = false;

        this.img = reader.result;
      };
    },
    saveImagetoDb: async function (img) {
      var imgData = {
        base64: img,
      };

      let data = await this.$callApi(
        "post",
        `${this.$baseUrl}/api/image/save`,
        null,
        this.$headers,
        imgData
      );

      if (data.result == 1) {
        return data.detail.url;
      }
    },
    deleteImage() {
      this.img = "";
      this.imgName = "";
    },
    uploadCatImg: async function () {
      this.isDisable = true;
      this.$refs.modalLoading.show();

      let request = {
        category: {
          id: this.catId,
        },
        ImageBase64: this.img,
      };

      let resData = await this.$callApi(
        "put",
        `${this.$baseUrl}/api/category/ParentCategory`,
        null,
        this.$headers,
        request
      );
      this.isDisable = false;
      this.$refs.modalLoading.hide();
      if (resData.result == 1) {
        this.$refs.changeImgModal.hide();
        this.imgName = "";
        this.getList();
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

/* .cat-img {
  width: 50%;
  padding-bottom: 50%;
} */
</style>
