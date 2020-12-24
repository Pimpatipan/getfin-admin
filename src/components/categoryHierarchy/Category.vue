<template>
  <div class="panel" :style="`width: calc(100% / ${maxLv})`">
    <div role="tablist" class="h-100">
      <b-card no-body class="mb-0">
        <b-card-header header-tag="header" class="d-md-none border-top" role="tab">
          <b-button block v-b-toggle="'accordion-'+index" variant="category">Level {{index+1}}</b-button>
        </b-card-header>
        <b-collapse :id="`accordion-${index}`" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <div class="panel-input-search-category">
                <b-input-group>
                  <b-form-input
                    class="input-serach"
                    placeholder="ค้นหา"
                    v-model="search"
                    autocomplete="off"
                  ></b-form-input>
                  <b-input-group-prepend>
                    <span class="icon-input m-auto pr-2">
                      <font-awesome-icon icon="search" title="View" />
                    </span>
                  </b-input-group-prepend>
                </b-input-group>
              </div>
              <div class="panel-category-box">
                <div
                  :class="['panel-category d-flex justify-content-between align-items-center', selectedId == option.id && !(index >= selected.length) ? 'active' : '' ]"
                  v-for="(option, key) in availableOptions"
                  :key="`${index}-${key}-${option.id}`"
                  @click="onOptionClick( option )"
                  :id="`panel_category_${option.id}`"
                  tabindex="-1"
                >
                  <div>{{ option.name }}</div>
                  <div :class="['pl-2']">
                    <font-awesome-icon
                      v-if="!option.isLast"
                      icon="chevron-right"
                      class="icon d-block"
                    />
                  </div>
                </div>

                <div
                  class="text-center text-black-50 my-3"
                  v-if="availableOptions.length === 0"
                >ไม่พบข้อมูล</div>
              </div>
              <b-button
                :class="['btn-create', {'btn-warning': createIndex == index}]"
                @click="handleCreate(index)"
                :disabled="index > selected.length"
                v-if="hasCreateBtn"
              >สร้างใหม่</b-button>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      required: false,
      type: Number,
    },
    index: {
      required: true,
      type: Number,
    },
    list: {
      required: true,
      type: Array,
    },
    selected: {
      required: true,
      type: Array,
    },
    arrow: {
      required: false,
      type: Boolean,
    },
    maxLv: {
      required: false,
      type: Number,
    },
    createIndex: {
      required: false,
      type: Number,
    },
        hasCreateBtn: {
      required: false,
      type: Boolean,
    },
  },
  watch: {
    list: function () {
      this.search = "";
    },
  },
  computed: {
    selectedId() {
      return this.selected.length >= this.index + 1
        ? this.selected[this.index]
        : 0;
    },
    criteria() {
      return this.search.trim().toLowerCase();
    },
    availableOptions() {
      let criteria = this.criteria;
      let options = this.list;
      if (criteria) {
        return options.filter(
          (opt) => opt.name.toLowerCase().indexOf(criteria) > -1
        );
      }
      return options;
    },
  },
  methods: {
    handleCreate(index) {
      this.$emit("handleCreate", index);
      this.selected.length = index;
    },
    onOptionClick(option) {
      let data = {
        id: option.id,
        isLast: option.isLast,
        name: option.name,
        code: option.code,
        urlKey: option.urlKey,
        childSize: option.categoryList.length || 0,
      };
      this.$emit("handleSelect", this.index, data);

      if (window.screen.width < 992) {
        this.$root.$emit("bv::toggle::collapse", `accordion-${this.index + 1}`);
      }
    },
  },
  data() {
    return {
      search: "",
      value: []
    };
  },
};
</script>

<style scoped>
.collapse {
  display: block !important;
}
.card {
  border: 0px !important;
  border-radius: 0px !important;
  height: 100%;
  border-right: 1px solid #d8dbe0 !important;
}
.card-header {
  padding: 0;
}
.card-body {
  padding: 15px 0px 0px 0px;
}
.panel-category-box {
  height: 300px;
  overflow-y: auto;
}
.panel-category-box::-webkit-scrollbar {
  width: 3px;
}
.panel-category-box::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}
.panel-category-box::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
.panel-category {
  width: 100%;
  border-left: 3px solid transparent;
  padding: 5px 15px 5px 12px;
  cursor: pointer;
  font-size: 16px;
}
.panel-category:hover,
.panel-category.active {
  background-color: #f1f1f1;
}
.panel-category.active {
  border-left: 3px solid #ffb300;
}
.panel-input-search-category {
  padding: 0px 15px;
}
.panel-input-search-category .input-group {
  background-color: #fff;
  border: 1px solid #dbdbdb !important;
  width: 100%;
  color: #bababa !important;
  margin-bottom: 10px;
}
.btn-category {
  width: 100%;
  padding: 5px 15px 5px 12px;
  cursor: pointer;
  font-size: 16px;
  background-color: #ffb300;
  border-radius: 0;
}
.btn-create {
  width: 100% !important;
  border-radius: 0 !important;
  font-size: 16px !important;
  color: #333333 !important;
  box-shadow: 0px -3px 3px #e2e2e2;
}
.btn:disabled {
  cursor: default;
}
@media (max-width: 767.98px) {
  .panel {
    width: 100% !important;
  }
  .collapse {
    display: none !important;
  }
  .collapse.show {
    display: block !important;
  }
  .card {
    border-right: 0px !important;
  }
}
</style>

