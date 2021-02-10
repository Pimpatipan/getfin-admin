<template>
  <div >
    <form class="form-box">
      <b-row class="no-gutters bg-white px-4 pb-4">
        <b-row class="my-2">
          <b-col>
            <div class="panel-upload">
              <div
                class="panel-bg-file-img"
                v-bind:style="{ backgroundImage: 'url(' + form + ')' }"
              ></div>
            </div>
          </b-col>
        </b-row>

        <b-row class="w-100">
          <b-col cols="12">
            <label class="font-weight-bold"
              >กรุณาบอกเหตุผลในการปฏิเสธข้อมูล</label
            >
          </b-col>
          <div class="px-3">
            <p>{{ dataLog.warningLog.note }}</p>
          </div>
        </b-row>

        <b-row class="w-100 mt-4">
          <b-col class="d-flex justify-content-center"
            ><b-button
              variant="info"
              :disabled="isReject"
              @click="onchangeApproveOrReject(false, 4)"
              class="btn btn-details-set btn-cancel mr-1"
              >ปฏิเสธ</b-button
            ><b-button
              :disabled="isDisable"
              @click="onchangeApproveOrReject(true, 4)"
              class="btn btn-main btn-details-set"
              >ยืนยัน</b-button
            ></b-col
          >
        </b-row>
      </b-row>
    </form>
  </div>
</template>

<script>
export default {
  name: "user",
  props: {
    dataObject: {
      required: false,
      type: String,
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
      id: "",
      modalMessage: "",
      activeItem: "seller-account",
      isDisable: false,
      languageList: [],
      form: null,
      noteAdmin: "",
    };
  },
  created: async function () {
    this.form = this.dataObject;
  },
  watch: {
    dataObject: function () {
      this.form = this.dataObject;
    },
    note: function () {
      this.noteAdmin = this.note;
    },
  },
  methods: {
    onchangeApproveOrReject: async function (status, index) {
      this.$emit("onchangeApproveOrReject", status, index);
    },
  },
};
</script>

<style scoped>
.panel-upload {
  position: relative;
  margin-bottom: 15px;
  width: calc(100vh / 4);
}

.panel-bg-file-img {
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 100%;
  border: 2px dashed #979797;
  width: 100%;
  border-radius: 50%;
}
</style>