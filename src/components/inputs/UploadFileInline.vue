<template>
  <div>
    <div class="div-input row pl-3 px-3 mt-2">
      <div :class="['input-custom', { error: isValidate }, classLabelName]">
        <label class="mt-2">
          {{ textFloat }}
          <span v-if="isRequired" class="text-danger">*</span>
          <span>:</span>
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
              :value="fileName"
              :size="size"
              disabled
            />
            <font-awesome-icon
              icon="times-circle"
              class="text-secondary delete-icon pointer"
              v-if="fileName && !disabled"
              @click="deleteImage"
            />
          </div>
          <label class="mb-0 btn-main" :size="size">
            <input
              type="file"
              v-on:change="handleFileChange"
              :required="required"
              :name="name"
              ref="input"
              :disabled="disabled"
            />
            <font-awesome-icon
              icon="file-upload"
              color="white"
              class="bg-icon mr-2"
              :size="size"
            />
          </label>
        </div>
        <!-- <p class="detail-format">{{ text }}</p>
        <div v-if="v && v.$error">
          <span class="text-danger" v-if="v.required == false"
            >This field can’t be empty</span
          >
        </div>-->
      </div>

      <a
        :href="fileName"
        download
        v-if="section && fileName && fileName !== ''"
        :class="[classSection, 'text-underline text-primary pointer']"
        @click.prevent="downloadItem(fileName)"
        >ดาวน์โหลดเอกสาร</a
      >
    </div>
    <ModalAlertError ref="modalAlertError" :text="modalMessage" />
    <!-- <b-button
        type="button"
        class="btn-download-file"
        variant="link"
        @click.prevent="downloadItem(downloadPath)"
    >{{fileName}}</b-button>-->
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
    classSection: {
      required: false,
      type: String
    },
    section: {
      required: false,
      type: String
    },
    disabled: {
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
  methods: {
    handleFileChange(e) {
      this.hasError = false;
      this.error = "";
      var _validFileExtensions = this.type.file;
      if (this.format == "image") {
        _validFileExtensions = this.type.image;
      }
      this.value = e.target.files[0];
      if (e.target.files.length) {
        if (_validFileExtensions.indexOf(this.value.type) < 0) {
          (this.modalMessage = "ระบบไม่รองรับไฟล์สกุลนี้"),
            this.$refs.modalAlertError.show();
          return;
        } else if (
          this.value.size > 10000000 &&
          (this.format == "image" || this.format == "pdf")
        ) {
          (this.modalMessage = "ไฟล์นี้มีขนาดใหญ่เกินไป"),
            this.$refs.modalAlertError.show();
          return;
        } else if (
          this.value.size > 50000000 &&
          (this.format == "video" || this.format == "all")
        ) {
          (this.modalMessage = "ไฟล์นี้มีขนาดใหญ่เกินไป"),
            this.$refs.modalAlertError.show();
          return;
        } else if (this.value.size > 10000000 && this.format == "excel") {
          (this.modalMessage = "ไฟล์นี้มีขนาดใหญ่เกินไป"),
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
      // this.$emit("onFileChange", this.value);
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
  height: 35px;
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
  color: #16274a;
  font-size: 16px;
  margin-bottom: 2px;
  font-weight: bold;
}
input.custom-input {
  color: #16274a;
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
  height: 37px;
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
.delete-icon {
  position: absolute;
  right: 5%;
  top: 10px;
}
.text-secondary {
  color: gray;
}
@media (max-width: 767.98px) {
  .input-custom > label {
    font-size: 15px;
  }
  .detail-format {
    font-size: 11px;
  }
}
</style>
