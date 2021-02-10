<template>
  <div>
    <b-row class="my-2 bg-white p-3 no-gutters">
      <b-col>
        <b-row class="mt-2">
          <b-col>
            <span class="font-weight-bold">ข้อมูลการจัดส่ง</span>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="6" class="mb-2">
            <span class=" mt-2 font-weight-bold">
              หมายเลขติดตามพัสดุ :
            </span>
            <span class="ml-2" v-if="trackingNo">
              {{ trackingNo }}
            </span>
            <span class="ml-2" v-else>
              -
            </span>
          </b-col>
          <b-col cols="12" md="6" class="d-sm-flex mb-2 justify-content-md-end">
            <template v-if="trackingData">
              <span class=" font-weight-bold">
                สถานะการจัดส่ง :
              </span>
              <span class="ml-2">{{ trackingData.status_name_local }}</span>
            </template>
            <template v-else>
              <span class=" font-weight-bold">
                สถานะการจัดส่ง :
              </span>
              <span class="ml-2">-</span>
            </template>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <span class=" mt-2 font-weight-bold">
              จัดส่งโดย :
            </span>
            <span class="ml-2" v-if="shippingTypeName">
              {{ shippingTypeName }}
            </span>
            <span class="ml-2" v-else>
              -
            </span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <div class="bg-white">
      <!-- <div v-for="(item, index) in trackingData.journey" :key="index">
        <div
          :class="[
            'd-flex justify-content-center',
            { 'f-size-14': item.status !== trackingData.status }
          ]"
        >
          <div class="w-100 text-right">
            <div class="font-weight-bold">
              <span>{{
                new Date(item.created_time) | moment("DD MMM YYYY")
              }}</span>
            </div>
            <div class="text-time">
              <span>{{ new Date(item.created_time) | moment("HH:MM") }}</span>
            </div>
          </div>
          <div class="mx-4 timeline">
            <div
              class="verticle-line"
              v-if="index !== trackingData.journey.length - 1"
            ></div>
            <div>
              <span
                :class="[
                  { 'dot-not-active': item.status !== trackingData.status },
                  { 'dot-active': item.status == trackingData.status }
                ]"
              ></span>
            </div>
          </div>
          <div class="w-100">
            <div>
              <span v-if="$language == 'en'">{{ item.status_name }}</span>
              <span v-else>{{ item.status_name_local }}</span>
            </div>
            <div class="text-note">
              <span v-if="item.city_name">{{ item.city_name }}</span>
              <span v-else>-</span>
            </div>
          </div>
        </div>
      </div> -->
      <b-table
        striped
        responsive
        :items="items"
        :fields="fields"
        show-empty
        empty-text="ไม่พบข้อมูล"
        class="table-list"
      >
        <template v-slot:cell(created_time)="data">
          <span>{{
            new Date(data.item.created_time) | moment("DD MMM YYYY (HH:mm)")
          }}</span>
        </template>
        <template v-slot:cell(city_name)="data">
          <span v-if="data.item.city_name">{{ data.item.city_name }}</span>
          <span v-else>-</span>
        </template>
        <template v-slot:cell(status)="data">
          <span>{{ data.item.status_name_local }}</span>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trackingNo: {
      required: false,
      type: String
    },
    shippingTypeName: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      items: [],
      trackingData: null,
      fields: [
        {
          key: "created_time",
          label: "วันที่ทำรายการ",
          class: "w-100px"
        },
        {
          key: "city_name",
          label: "สถานที่",
          class: "w-100px"
        },
        {
          key: "status",
          label: "สถานะ",
          class: "w-100px"
        },
        {
          key: "note",
          label: "หมายเหตุ",
          class: "w-100px"
        }
      ]
    };
  },
  created: async function() {
    if (this.trackingNo) {
      await this.getData();
    }
  },
  methods: {
    getData: async function() {
      //this.isLoadingData = true;

      let data = await this.$callApi(
        "get",
        `${this.$baseUrl}/api/Transaction/GetTrack/${this.trackingNo}`,
        null,
        this.$headers,
        null
      );

      if (data.result == 1) {
        this.items = data.detail.data.journey;
        this.trackingData = data.detail.data;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.verticle-line {
  border-left: 2px solid #ccc;
  height: 80px;
  position: relative;
  // left: 30%;

  top: 5px;
  margin: auto;
}
.timeline {
  position: relative;
  text-align: center;
  /* width: 100%; */
  height: 100%;
}
.timeline-icon {
  position: absolute;
  top: 10%;
  left: 65%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.text-time {
  color: #6c757d;
}

.f-size-14 {
  font-size: 14px;
}

.text-note {
  color: #6c757d;
}
.dot-not-active {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #bbb;
  position: absolute;
  top: 10%;
  left: 65%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.dot-active {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffb300;
  position: absolute;
  top: 10%;
  left: 65%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
