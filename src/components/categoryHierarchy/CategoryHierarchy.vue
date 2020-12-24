<template>
  <div>
    <div class="panel-categories">
      <div
        :class="[
          'border h-100 w-100 justify-content-center align-items-center',
          !loading ? 'd-none' : 'd-flex',
        ]"
      >
        <b-spinner variant="warning" label="Spinning"></b-spinner>
      </div>
      <div
        v-if="!isRefresh"
        :class="[
          'w-100  border border-right-0 justify-content-center ',
          loading ? 'd-none' : 'd-md-flex',
        ]"
      >
        <Category
          v-for="(item, index) in maxLv"
          v-bind:key="index"
          :index="index"
          :list="levelList[`lv${item}List`]"
          @handleSelect="handleSelect"
          :selected="list"
          :arrow="maxLv != item ? true : false"
          :maxLv="maxLv"
          @handleCreate="handleCreate"
          :createIndex="createIndex"
          :hasCreateBtn="hasCreateBtn"
        />
      </div>
    </div>
    <div v-if="v && v.$error">
      <span class="text-danger" v-if="v.required == false"
        >กรุณาเลือกหมวดหมู่</span
      >
    </div>
  </div>
</template>

<script>
import Category from "./Category";
import Vue from "vue";

export default {
  props: {
    catagories: {
      required: true,
      type: Array,
    },
    dataList: {
      required: true,
      type: Array,
    },
    v: {
      required: false,
      type: Object,
    },
    hasCreateBtn: {
      required: false,
      type: Boolean,
    },
  },
  components: {
    Category,
  },
  data() {
    return {
      maxLv: 4,
      levelList: {
        lv1List: [],
        lv2List: [],
        lv3List: [],
        lv4List: [],
      },
      list: this.dataList,
      breadcrumb: [],
      createIndex: -1,
      loading: false,
      isRefresh: false,
    };
  },
  created: async function () {
    this.loading = true;
    await this.init();
    this.loading = false;
    this.autoFocusCategory();
  },
  methods: {
    autoFocusCategory() {
      Vue.nextTick(async () => {
        this.dataList.forEach((element) => {
          document.getElementById(`panel_category_${element}`).focus();
        });
      });
    },
    async reload() {
      this.loading = true;
      await this.init();
      Vue.nextTick(async () => {
        this.loading = false;
        this.autoFocusCategory();
      });
    },
    async init() {
      this.isRefresh = true;
      this.levelList[`lv1List`] = this.catagories;
      let categoryList = {
        categoryIdList: [],
        isLast: true,
        selectId: this.dataList[this.dataList.length - 1] || 0,
        breadcrumb: [],
      };
      for (let i = 1; i <= this.maxLv; i++) {
        let filtered = await this.levelList[`lv${i}List`].filter((el) => {
          return el.id == this.dataList[i - 1];
        });
        if (filtered.length > 0) {
          this.levelList[`lv${i + 1}List`] = filtered[0].categoryList;
          categoryList.breadcrumb.push({
            id: filtered[0].id,
            name: filtered[0].name,
            code: filtered[0].code,
            urlKey: filtered[0].urlKey,
            isLast: filtered[0].isLast,
            childSize: filtered[0].categoryList.length,
          });
          categoryList.selectId = filtered[0].id;
          categoryList.isLast = filtered[0].isLast;
          categoryList.categoryIdList.push(filtered[0].id);
          if (filtered[0].categoryList.length == 0) {
            break;
          }
        }
      }
      this.breadcrumb = categoryList.breadcrumb;
      this.isRefresh = false;
      this.$emit("onDataChange", categoryList);
    },
    handleCreate(index) {
      this.createIndex = index;
      this.$emit("handleCreate", index);
    },
    async handleSelect(index, data) {
      this.createIndex = -1;
      let id = typeof this.list[index] === "undefined" ? 0 : this.list[index];
      let categoryList = {
        categoryIdList: [],
        isLast: data.isLast,
        selectId: data.id,
        breadcrumb: [],
      };
      if (id != data.id) {
        let isLast = data.isLast;
        if (this.list[index]) {
          this.list[index] = data.id;
          this.breadcrumb[index].id = data.id;
          this.breadcrumb[index].name = data.name;
          this.breadcrumb[index].code = data.code;
          this.breadcrumb[index].urlKey = data.urlKey;
          this.breadcrumb[index].isLast = data.isLast;
          this.breadcrumb[index].childSize = data.childSize;
        } else {
          this.list.push(data.id);
          this.breadcrumb.push({ ...data });
        }

        let thsIndex = index + 1;
        let filtered = await this.levelList[`lv${thsIndex}List`].filter(
          function (el) {
            return el.id == data.id;
          }
        );
        if (filtered.length)
          this.levelList[`lv${thsIndex + 1}List`] = filtered[0].categoryList;

        for (let i = thsIndex; i <= this.maxLv; i++) {
          this.levelList[`lv${i + 2}List`] = [];
          await this.list.splice(index + 1, 1);
        }
        this.breadcrumb.length = thsIndex;
      }
      categoryList.categoryIdList = this.list;
      categoryList.breadcrumb = this.breadcrumb;
      this.$emit("onDataChange", categoryList);
    },
  },
};
</script>

<style scoped>
.panel-categories {
  /* height: 398px; */
}
@media (max-width: 767.98px) {
  .panel-categories {
    border-right: 1px solid #d8dbe0;
  }
}
</style>

