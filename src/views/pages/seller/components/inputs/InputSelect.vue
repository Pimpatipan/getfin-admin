<template>
  <div class="mt-2 mx-3">
    <div class="row">
      <div
        :class="['select-custom', { error: isValidate }, classLabelName, 'p-0']"
      >
        <label v-if="title">
          {{ title }}
          <span v-if="isRequired" class="text-danger">*</span>
          <span> :</span>
        </label>
        <br v-if="title" />
      </div>
      <div
        :class="['select-custom', { error: isValidate }, classInputName, 'p-0']"
      >
        <b-form-select
          v-bind:options="options"
          :name="name"
          :size="size"
          v-bind:value="value"
          :required="required"
          :class="['btn-select']"
          @change="onDataChange"
          :valueField="valueField"
          :textField="textField"
        >
        </b-form-select>
        <div v-if="v && v.$error">
          <span class="text-error" v-if="v.required == false">{{
            options[0].name
          }}</span>
          <span class="text-error" v-else-if="v.minValue == false">{{
            options[0].name
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: false,
      type: String,
    },
    text: {
      required: false,
      type: String,
    },
    required: {
      required: false,
      type: Boolean,
    },
    name: {
      required: false,
      type: String,
    },
    size: {
      required: false,
      type: String,
    },
    options: {
      required: true,
      type: Array,
    },
    value: {
      required: false,
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | String,
    },
    isRequired: {
      required: false,
      type: Boolean,
    },
    isValidate: {
      required: false,
      type: Boolean,
    },
    valueField: {
      required: false,
      type: String,
    },
    textField: {
      required: false,
      type: String,
    },
    v: {
      required: false,
      type: Object,
    },
    classLabelName: {
      required: false,
      type: String,
    },

    classInputName: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    onDataChange(event) {
      this.$emit("onDataChange", event);
    },
  },
};
</script>

<style scoped>
.select-custom {
  /* margin-bottom: 15px; */
  position: relative;
  white-space: nowrap;
}
.select-custom.error > .btn-select {
  border-color: red !important;
}
.select-custom > label {
  color: #16274a;
  font-size: 16px;
  margin-bottom: 2px;
  font-weight: bold;
}
::v-deep .btn-select {
  color: #16274a;
  background-color: white;
  border: 1px solid #bcbcbc;
  border-radius: 0px;
  padding: 5px 10px;
  cursor: pointer;
}
::v-deep .btn-select.custom-select-lg {
  height: 45px;
  font-size: 1rem;
}
::v-deep .btn-select:focus {
  border-color: #16274a;
  /* border-color: #80c141; */
}
::v-deep .btn-select > option {
  background-color: white;
  color: #16274a;
}
::v-deep .btn-select > option:checked {
  /* background-color: #16274a !important;  */
  /* background-color: #80c141 !important; */
  /* color: white !important; */
  color: #16274a !important;
}
::v-deep .btn-select:focus {
  box-shadow: unset !important;
}
.text-error {
  color: #ff0000;
  font-size: 14px;
}
@media (max-width: 767.98px) {
  .select-custom {
    margin-top: 0;
  }
  .select-custom > label {
    font-size: 15px;
  }
}
@media (min-width: 992px) and (max-width: 1200px) {
  .select-custom > select {
    margin-left: 25px;
  }
}
</style>
