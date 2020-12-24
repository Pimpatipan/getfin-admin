<template>
  <div class="d-none">
    <b-modal v-model="showModal" ref="confirmCancelModal" centered hide-header hide-footer>
      <div class="modal-header">
        <h4>{{msg}}</h4>
        <button type="button" aria-label="Close" class="close" @click="hide">×</button>
      </div>
      <div class="text-center px-md-5 py-4">
        <p class="text-text font-weight-bold">{{text}}</p>
      </div>
      <div class="form-inline justify-content-center mt-2">
        <b-button class="mr-2 btn-modal" :variant="colorBtnCancel" @click="hide">{{btnCancel}}</b-button>
        <b-button class="ml-2 btn-modal" :variant="colorBtnConfirm" @click="$emit('confirm')">{{btnConfirm}}</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      required: true,
      type: String
    },
    text: {
      required: true,
      type: String
    },
    btnConfirm: {
      required: true,
      type: String
    },
    colorBtnConfirm: {
      required: false,
      type: String
    },
    btnCancel: {
      required: true,
      type: String
    },
    colorBtnCancel: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.modal-header {
  font-family: "Kanit-SemiBold";
  border-bottom: 0 !important;
  margin: 0px;
  padding: 0px;
  padding-bottom: 0.25rem;
}
.text-msg {
  font-family: "Kanit-SemiBold";
  font-size: 2rem;
  color: #4a4a4a;
}
.text-text {
  color: #4a4a4a;
  margin-bottom: 0;
  font-size: 1.2rem;
}
.text-sub {
  color: #afce38;
  font-size: 1.25rem;
}
.modal-body {
  margin: auto;
  text-align: center;
  padding: 0;
}
.btn-modal {
  width: 100px;
  font-weight: bold;
}
</style>