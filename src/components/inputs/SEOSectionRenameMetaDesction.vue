<template>
  <b-row>
    <b-col>
      <b-button v-b-toggle.collapse-seo class="collapse-btn">
        SEO
        <font-awesome-icon icon="chevron-right" class="icon float-right mt-1" />
        <font-awesome-icon icon="chevron-down" class="icon float-right mt-1" />
      </b-button>
      <b-collapse id="collapse-seo" visible>
        <b-card class="card-box">
          <div v-for="(item, index) in data" v-bind:key="index">
            <div v-bind:class="[ langActive == item.languageId ? '' : 'd-none' ]">
              <b-row>
                <b-col>
                  <InputText
                    textFloat="Meta Title"
                    placeholder="Meta Title"
                    type="text"
                    name="metatitle"
                    v-model="item.metaTitle"
                    isRequired
                    :img="img"
                    :isValidate="isValidate.$each.$iter[index].metaTitle.$error"
                    :v="v.$each.$iter[index].metaTitle"
                  />
                </b-col>
                <b-col>
                  <InputText
                    textFloat="Meta Keyword"
                    placeholder="Meta Keyword"
                    type="text"
                    name="metakeyword"
                    v-model="item.metaKeyword"
                    isRequired
                    :img="img"
                    :isValidate="isValidate.$each.$iter[index].metaKeyword.$error"
                    :v="v.$each.$iter[index].metaKeyword"
                  />
                </b-col>
              </b-row>

              <InputText
                textFloat="Meta Description"
                placeholder="Meta Description"
                type="text"
                name="metadesc"
                v-model="item.metaDescription"
                isRequired
                :img="img"
                :isValidate="isValidate.$each.$iter[index].metaDescription.$error"
                :v="v.$each.$iter[index].metaDescription"
              />
            </div>
          </div>
        </b-card>
      </b-collapse>
    </b-col>
  </b-row>
</template>

<script>
import InputText from "@/components/inputs/InputText";
import InputTextArea from "@/components/inputs/InputTextArea";

export default {
  components: {
    InputText,
    InputTextArea,
  },
  props: {
    data: {
      required: false,
      type: Array,
    },
    img: {
      required: false,
      type: String,
    },
    langActive: {
      required: false,
      type: Number,
    },
    isValidate: {
      required: false,
      type: Object,
    },
    v: {
      required: false,
      type: Object,
    },
  },
  methods: {
    onDataChange(event) {
      this.$emit("onDataChange", event.target.value);
    },
  },
};
</script>