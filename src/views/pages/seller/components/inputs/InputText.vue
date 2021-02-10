<template>
  <div :class="['div-input', className, 'mt-2', 'mx-3']">
    <div class="display-only" v-if="isDisplay"></div>
    <div class="row">
      <div :class="['input-custom',{ error: isValidate }, classLabelName]">
        <label>
          {{ textFloat }}
          <span v-if="isRequired" class="text-danger">*</span>
          <span> :</span>
        </label>
      </div>
      <div :class="['input-custom', { error: isValidate }, classInputName]">
        <input
          :class="['custom-input']"
          :type="type"
          :placeholder="placeholder"
          :name="name"
          :required="required"
          :value="value"
          :size="size"
          @input="$emit('input', $event.target.value)"
          @change="onDataChange"
          @keyup="$emit('onKeyup', $event)"
          @keypress="$emit('onKeypress', $event)"
          :disabled="disabled"
          :maxLength="maxLength"
        />
        <img :src="img" alt="logo-lang" v-if="img" class="logo-lang" />
        <span v-if="detail" class="text-desc">{{ detail }}</span>
        </div>
      <div class="mx-2">
       <div v-if="v && v.$error" >
         
      <span class="text-error" v-if="v.required == false">กรุณากรอกข้อมูล. </span>
      <span
        class="text-error"
        v-else-if="v.minLength == false"
      >{{$t('enterAtLeast')}} {{v.$params.minLength.min}} {{$t('chars')}}. </span>
      <span
        class="text-error"
        v-else-if="v.email == false"
      >{{$t('emailError')}}.</span>
      <span class="text-error" v-else-if="v.integer == false">{{$t('numOnly')}}. </span>
      <span
        class="text-error"
        v-else-if="v.maxLength == false"
      >{{$t('noMoreThan')}} {{v.$params.maxLength.max}} {{$t('chars')}}. </span>
      <span class="text-error" v-else-if="v.decimal == false">{{$t('numOnly')}}. </span>
      <span class="text-error" v-else-if="v.minValue == false">{{$t('minValueError')}}. </span>
      <span class="text-error d" v-if="v.sameAsPassword == false">{{$t('passNotMatch')}}. </span>
    </div>
      </div>
      </div>
    </div>
    <!-- <div :class="['input-custom', { error: isValidate }]">
      <label>
        {{ textFloat }}
        <span v-if="isRequired" class="text-danger">*</span>
      </label>
      <input
        :class="['custom-input']"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :required="required"
        :value="value"
        :size="size"
        @input="$emit('input', $event.target.value)"
        @change="onDataChange"
        @keyup="$emit('onKeyup', $event)"
        @keypress="$emit('onKeypress', $event)"
        :disabled="disabled"
      />
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    textFloat: {
      required: true,
      type: String,
    },
    placeholder: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
    required: {
      required: false,
      type: Boolean,
    },
    detail: {
      required: false,
      type: String,
    },
    size: {
      required: false,
      type: String,
    },
    name: {
      required: false,
      type: String,
    },
    value: {
      required: false,
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
    },
    isDisplay: {
      required: false,
      type: Boolean,
    },
    isRequired: {
      required: false,
      type: Boolean,
    },
    isValidate: {
      required: false,
      type: Boolean,
    },
    v: {
      required: false,
      type: Object,
    },
    className: {
      required: false,
      type: String,
    },
    img: {
      required: false,
      type: String,
    },
    disabled: {
      required: false,
      type: Boolean,
    },
    classLabelName: {
      required: false,
      type: String,
    },
    maxLength: {
      required: false,
      type: Number,
    },
    classInputName: {
      required: false,
      type: String,
    },
  },
  methods: {
    onDataChange(event) {
      this.$emit("onDataChange", event.target.value);
    },
  },
};
</script>

<style scoped>
.div-input {
  position: relative;
  white-space: nowrap;
}
.input-custom {
  padding: 0px;
}
.input-custom > label {
  color: #333333;
  font-size: 16px;
  margin-bottom: 2px;
  font-weight: bold;
}
.input-custom > input {
  color:#333333;
  /* background-color: white; */
  border: 1px solid #bcbcbc;
  border-radius: 0px;
  padding: 5px 10px;
}
.input-custom > input[size="lg"] {
  height: 45px;
}
.input-custom > input:focus {
  /* border: 1px solid #16274a; */
  border: 1px solid #ffb300;
}
.input-custom.error > input {
  border-color: red !important;
}
::-webkit-input-placeholder {
  /* Edge */
  color: transparent;
}
:-ms-input-placeholder {
  /* Internet Explorer */
  color: transparent;
}
::placeholder {
  color: transparent;
}
.custom-input {
  display: block;
  border: none;
  width: 100%;
}
.text-desc {
  color: rgba(22, 39, 74, 0.4);
  font-size: 12px;
  font-family: "Kanit-Light";
}
.display-only {
  position: absolute;
  z-index: 5000;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.text-error {
  color: #ff0000;
  font-size: 14px;
}
.d-grid {
  display: grid;
}
input:disabled {
  border: 0;
  background-color: transparent;
}
@media (max-width: 767.98px) {
  /* .div-input {
    margin-top: 0;
  } */
  .input-custom > label {
    font-size: 15px;
  }

  /* .input-custom > input {
    margin-left: 20px;
  } */
}
@media (min-width: 992px) and (max-width: 1200px) {
  .input-custom > input {
    /* margin-left: 25px; */
  }
}

@media (max-width: 600px) {
  .input-custom > input {
    /* padding: 5px 0; */
  }
}
</style>
