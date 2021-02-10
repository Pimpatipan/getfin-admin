<template>
  <div>
    <div class="div-input row pl-3 px-3 mt-2">
      <div :class="['input-custom', { error: isValidate }, classLabelName]">
        <label class="">
          {{ textFloat }}
          <span v-if="isRequired" class="text-danger">*</span>
          <span> :</span>
        </label>
      </div>
      <div :class="['input-custom', { error: isValidate }, classInputName]">
        <div class="d-flex justify-content-center align-items-center">
          <div class="w-100 display-only">
            <input
              :class="['custom-input']"
              :type="type"
              :placeholder="placeholder"
              :name="name"
              :required="required"
              :value="fileNameDisplay"
              :size="size"
              disabled
            />
            <font-awesome-icon
              icon="times-circle"
              class="text-secondary delete-icon pointer"
              v-if="fileName"
              @click="deleteImage"
              :class="[{ 'd-none': cantEdit }]"
            />
          </div>
          <label
            class="mb-0 btn-main"
            :size="size"
            :class="[{ 'btn-disable': cantEdit }]"
          >
            <input
              type="file"
              v-on:change="handleFileChange"
              :required="required"
              :name="name"
              accept="image/png, image/jpeg, application/pdf"
              ref="input"
              :disabled="cantEdit"
            />
            <font-awesome-icon
              icon="file-upload"
              color="white"
              class="bg-icon mr-2"
              :size="size"
            />
          </label>
        </div>
        <p class="detail-format">{{ text }}</p>
        <div v-if="v && v.$error">
          <span class="text-error" v-if="v.required == false"
            >กรุณากรอกข้อมูล</span
          >
        </div>
      </div>
      <div class="col-lg-1 p-0 text-right text-lg-left">
        <b-button
          type="button"
          col="4"
          md="4"
          class="btn-download"
          variant="link"
          :disabled="fileName == '' || !fileName"
          @click.prevent="downloadItem(fileName)"
        >
          <font-awesome-icon
            icon="file-download"
            color="white"
            class="bg-icon"
            :size="size"
        /></b-button>
      </div>
    </div>
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
  </div>
</template>

<script>
import axios from "axios";
import ModalAlertError from "@/components/modal/alert/ModalAlertError";
export default {
  components: {
    ModalAlertError
  },
  props: {
    textFloat: {
      required: true,
      type: String
    },
    text: {
      required: false,
      type: String
    },
    format: {
      required: true,
      type: String
    },
    fileName: {
      required: true,
      type: String
    },
    required: {
      required: false,
      type: Boolean
    },
    name: {
      required: false,
      type: String
    },
    isRequired: {
      required: false,
      type: Boolean
    },
    isValidate: {
      required: false,
      type: Boolean
    },
    placeholder: {
      required: true,
      type: String
    },
    size: {
      required: false,
      type: String
    },
    downloadPath: {
      required: false,
      type: String
    },
    v: {
      required: false,
      type: Object
    },
    classLabelName: {
      required: false,
      type: String
    },
    classInputName: {
      required: false,
      type: String
    },
    cantEdit: {
      required: false,
      type: Boolean
    }
  },
  data() {
    return {
      file: "",
      value: "",
      type: {
        all: ["image/jpeg", "image/png", "application/pdf", ""],
        file: ["image/jpeg", "image/png", "application/pdf"],
        pdf: ["application/pdf"],
        png: ["image/png"],
        image: ["image/jpeg", "image/png"],
        video: ["video/mp4"],
        excel: [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ]
      },
      error: "",
      hasError: false,
      hasImage: false,
      imgModal: null,
      msgModal: null,
      modalAlertShow: false,
      isSuccess: false,
      modalMessage: ""
    };
  },
  computed: {
    fileNameDisplay: function() {
      if (this.fileName) {
        if (this.fileName.includes(this.$baseUrl)) {
          return this.fileName
            .split("\\")
            .pop()
            .split("/")[4];
        } else {
          return this.fileName.split("//")
            .pop().split("/").pop();
        }
      } else {
        return this.fileName;
      }
    }
  },
  methods: {
    handleFileChange(e) {
      this.hasError = false;
      this.error = "";
      var _validFileExtensions = this.type.file;
      if (this.format == "image") {
        _validFileExtensions = this.type.image;
      } else if (this.format == "video") {
        _validFileExtensions = this.type.video;
      } else if (this.format == "all") {
        _validFileExtensions = this.type.all;
      } else if (this.format == "pdf") {
        _validFileExtensions = this.type.pdf;
      } else if (this.format == "excel") {
        _validFileExtensions = this.type.excel;
      }
      this.value = e.target.files[0];
      if (e.target.files.length) {
        if (_validFileExtensions.indexOf(this.value.type) < 0) {
          (this.modalMessage = `${this.$t("fileNotSupport")}`),
            this.$refs.modalAlertError.show();
          return;
        } else if (
          this.value.size > 10000000 &&
          (this.format == "image" || this.format == "pdf")
        ) {
          (this.modalMessage = `${this.$t("fileIsTooLarge")}`),
            this.$refs.modalAlertError.show();
          return;
        } else if (
          this.value.size > 50000000 &&
          (this.format == "video" || this.format == "all")
        ) {
          (this.modalMessage = `${this.$t("fileIsTooLarge")}`),
            this.$refs.modalAlertError.show();
          return;
        } else if (this.value.size > 10000000 && this.format == "excel") {
          (this.modalMessage = `${this.$t("fileIsTooLarge")}`),
            this.$refs.modalAlertError.show();
          return;
        } else {
          this.$emit("onFileChange", this.value);
        }
      } else {
        this.value = "";
        this.$refs.input.value = "";
        this.hasError = true;
      }
    },
    downloadItem: async function(path) {
      let pathFile = path;

      var name_without_ext = path
        .split("\\")
        .pop()
        .split("/")
        .pop()
        .split(".")[0];

      axios({
        url: pathFile,
        method: "GET",
        // headers: null,
        responseType: "blob"
      }).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${name_without_ext}.${response.data.type.split("/").pop(-1)}`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    deleteImage() {
      this.$emit("delete", true);
      this.hasImage = false;
    }
  }
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.detail-format {
  color: #9b9b9b;
  font-size: 12px;
  font-family: "Kanit-Light";
  margin-top: 3px;
  margin-bottom: 0px;
}
/* .bg-icon {
  width: 25px;
  height: 25px;
  margin: 5px 0px;
} */
.bg-icon.fa-lg {
  margin: 8px 0px;
}
.div-input {
  /* margin-bottom: 15px; */
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
input.custom-input {
  color: #333333;
  background-color: white;
  border: 1px solid #bcbcbc;
  border-radius: 0px;
  padding: 7px 10px;
}
label[size="lg"].btn-main,
input[size="lg"].custom-input {
  height: 45px;
}
.input-custom.error .custom-input {
  border-color: red !important;
}
::-webkit-input-placeholder {
  /* Edge */
  color: rgba(22, 39, 74, 0.4);
}
:-ms-input-placeholder {
  /* Internet Explorer */
  color: rgba(22, 39, 74, 0.4);
}
::placeholder {
  color: rgba(22, 39, 74, 0.4);
}
.custom-input {
  display: block;
  border: none;
  width: 100%;
}
.text-desc {
  color: #16274a;
  font-size: 15px;
  font-family: "Kanit-Light";
}
.text-error {
  color: #ff0000;
  font-size: 14px;
}
.display-only {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.btn-main {
  width: 120px;
  text-align: center;
  height: 38px;
  vertical-align: middle;
  cursor: pointer;
  background: #16274a;
  color: white;
  padding: 7px 10px;
}
.btn-download-file {
  padding: 0;
  text-decoration: underline;
}
.btn-download {
  width: 50px;
  text-align: center;
  height: 37px;
  vertical-align: middle;
  cursor: pointer;
  background: #16274a;
  color: #fff;
  padding: 7px 10px;
  margin-left: 5px;
  margin-top: 1px;
  border-radius: 0;
}
.delete-icon {
  position: absolute;
  right: 5%;
  top: 10px;
}
.btn-disable {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-disable:hover {
  background-color: #092d53 !important;
  color: #ffffff !important;
}

@media (max-width: 767.98px) {
  .input-custom > label {
    font-size: 15px;
  }
  .detail-format {
    font-size: 11px;
  }
}
@media (min-width: 992px) and (max-width: 1200px) {
  .input-custom > div {
    /* margin-left: 25px; */
  }
  .input-custom > p {
    /* margin-left: 25px; */
  }
}
</style>
