<template>
  <div>
    <b-modal
      v-model="showModal"
      ref="alertModal"
      hide-header
      hide-footer
      centered
    >
      <div class="modal-header">
        <button type="button" aria-label="Close" class="close" @click="hide">×</button>
      </div>
      <div class="text-center">
        <img src="@/assets/images/icons/icon-check.png" alt="success" class="mb-3 img" />
        <p class="text-text" v-if="text">{{ text }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      required: false,
      type: String
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
    },
  }
};
</script>

<style scoped>
.modal-header {
  border: 0 !important;
  padding: 0;
}

.text-text {
  font-family: "Kanit-SemiBold" !important;
  color: #16274A;
  margin-bottom: 0;
  font-size: 26px;
}

.img {
  width: 100px;
}

.modal-body {
  margin: auto;
  text-align: center;
}
@media (max-width: 767.98px) {
  /* .text-text {
    font-size: 15px;
  } */
}
</style>