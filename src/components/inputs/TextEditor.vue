<template>
  <div class="position-relative mb-4">
    <div :class="['text-editor-custom', { error: isValidate }]">
      <label>
        {{ textFloat }}
        <span v-if="isRequired" class="text-danger">*</span>
      </label>
      <!-- <froala @input="onDataChange" :tag="'textarea'" :config="config" :value="value"></froala> -->
      <editor ref="editor" :value="value" api-key="no-api-key" :init="init" />
    </div>
    <img :src="img" alt="logo-lang" v-if="img" class="logo-lang" />
    <div v-if="v && v.$error">
      <span class="text-error" v-if="v.required == false">กรุณากรอกข้อมูล</span>
    </div>
  </div>
</template>

<script>
// import VueFroala from "vue-froala-wysiwyg";
import Editor from "@tinymce/tinymce-vue";
// `new FroalaEditor('your_selector', {key: "ACTIVATION_KEY''})`
import axios from "axios";
import { async } from "q";

export default {
  name: "text-editor",
  components: { editor: Editor },
  props: {
    textFloat: {
      required: true,
      type: String
    },
    placeholder: {
      required: true,
      type: String
    },
    required: {
      required: false,
      type: Boolean
    },
    isRequired: {
      required: false,
      type: Boolean
    },
    pattern: {
      required: false,
      type: String
    },
    detail: {
      required: false,
      type: String
    },
    name: {
      required: false,
      type: String
    },
    value: {
      required: false,
      type: String
    },
    isDisplay: {
      required: false,
      type: Boolean
    },
    rows: {
      required: false,
      type: Number
    },
    isValidate: {
      required: false,
      type: Boolean
    },
    maxLength: {
      required: false,
      type: Number
    },
    img: {
      required: false,
      type: String
    },
    v: {
      required: false,
      type: Object
    }
  },
  data() {
    return {
      config: {
        //key: "SDB17hC8C4F4A3F3D3gxrmztdakH3fiD-17D2E2F2C1E4F1B2B8D7C7==",
        // apiKey: 'SDB17hC8C4F4A3F3D3gxrmztdakH3fiD-17D2E2F2C1E4F1B2B8D7C7==',
        events: {
          "image.inserted": async $img => {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = async () => {
              var recoveredBlob = xhr.response;
              var reader = new FileReader();
              reader.onload = async () => {
                var blobAsDataUrl = reader.result;
                var body = {
                  base64: blobAsDataUrl
                };
                let data = await this.$callApi(
                  "post",
                  `${this.$baseUrl}/api/image/WYSIWYG/save`,
                  null,
                  this.$headers,
                  body
                );
                $img[0].src = data.url + "#!";
              };
              var image = await reader.readAsDataURL(recoveredBlob);
            };
            xhr.open("GET", $img[0].src);
            xhr.send();
            //  xhr.abort();
          }
        },
        charCounterCount: true,
        toolbarInline: false,
        showOnMobile: true,
        heightMin: 400,
        fileUpload: false,
        imageUpload: true,
        imageDefaultAlign: null,
        imageDefaultDisplay: null,
        useClasses: false,
        imageMaxSize: 5 * 1024 * 1024,
        imageAllowedTypes: ["jpeg", "jpg", "png"],
        toolbarButtons: {
          moreText: {
            buttons: [
              "bold",
              "italic",
              "underline",
              "strikeThrough",
              "subscript",
              "superscript",
              "fontFamily",
              "fontSize",
              "textColor",
              "backgroundColor",
              "inlineClass",
              "inlineStyle",
              "clearFormatting"
            ]
          },
          moreParagraph: {
            buttons: [
              "alignLeft",
              "alignCenter",
              "formatOLSimple",
              "alignRight",
              "alignJustify",
              "formatOL",
              "formatUL",
              "paragraphFormat",
              "paragraphStyle",
              "lineHeight",
              "outdent",
              "indent",
              "quote"
            ]
          },
          moreRich: {
            buttons: [
              "insertLink",
              "insertImage",
              "insertVideo",
              "insertTable",
              "emoticons",
              "fontAwesome",
              "specialCharacters",
              "embedly",
              // "insertFile",
              "insertHR"
            ]
          },
          moreMisc: {
            buttons: [
              "undo",
              "redo",
              "fullscreen",
              // "print",
              // "getPDF",
              // "spellChecker",
              "selectAll",
              "html",
              "help"
            ],
            align: "right",
            buttonsVisible: 2
          }
        },
        fontFamily: {
          "Arial,Helvetica,sans-serif": "Arial",
          "Georgia,serif": "Georgia",
          "Impact,Charcoal,sans-serif": "Impact",
          "Tahoma,Geneva,sans-serif": "Tahoma",
          "'Times New Roman',Times,serif": "Times New Roman",
          "Verdana,Geneva,sans-serif": "Verdana",
          "Kanit-Bold": "Kanit Bold",
          "Kanit-SemiBold": "Kanit SemiBold",
          "Kanit-Medium": "Kanit Medium",
          "Kanit-Regular": "Kanit Regular",
          "Kanit-Light": "Kanit Light",
          "Kanit-Thin": "Kanit Thin"
        },
        videoUpload: false
      },
      init: {
        height: 500,
        init_instance_callback: editor => {
          editor.on("change", e => {
            //  console.log('the event object ', e);
            //  console.log('the editor object ', editor);
            //console.log('the content ', editor.getContent());
            this.$emit("onDataChange", editor.getContent());
          });
        },
        plugins: [
          "print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons"
        ],
        menubar: "file edit view insert format tools table help",
        toolbar:
          "bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
        toolbar_sticky: true,
        toolbar_mode: "sliding",
        quickbars_selection_toolbar:
          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        importcss_append: true,
        image_caption: true,
        font_formats:
          "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Kanit Regular=Kanit; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
        // content_style: " body { font-family: Kanit-Regular; }",
        content_style:
          "@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200;300&display=swap'); body { font-family: Kanit  }",
        templates: [
          {
            title: "New Table",
            description: "creates a new table",
            content:
              '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
          },
          {
            title: "Starting my story",
            description: "A cure for writers block",
            content: "Once upon a time..."
          },
          {
            title: "New list with dates",
            description: "New List with dates",
            content:
              '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
          }
        ],
        template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
        template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
        image_class_list: [{ title: "Responsive", value: "img-responsive" }],
        images_upload_handler: async (blobInfo, success, failure, progress) => {
          if (blobInfo.blob().size / 1024 / 1024 > 5) {
            failure("Maximun image size 5 MB");
            return;
          }
          var body = {
            base64: "data:image/jpeg;base64," + blobInfo.base64()
          };
          var config = {
            onUploadProgress: progressEvent => {
              progress((progressEvent.loaded / progressEvent.total) * 100);
            }
          };
          // this.axios
          //   .post(`${this.$baseUrl}/api/image/WYSIWYG/save`, body, config)
          //   .then((data) => {
          //     console.log("respondData", data);
          //     if (data.url != "") {
          //       success(data.url);
          //     } else {
          //       failure("Upload fail");
          //     }
          //   })
          //   .catch((e) => {
          //     failure(e);
          //   });

          let data = await this.$callApi(
            "post",
            `${this.$baseUrl}/api/image/save`,
            null,
            this.$headers,
            body
          );

          if (data.url != "") {
            success(data.detail.url);
          } else {
            failure("Upload fail");
          }
        }
      }
    };
  },
  methods: {
    onDataChange(val) {
      this.$emit("onDataChange", val);
    }
  }
};
</script>

<style scoped>
.text-editor-custom {
  color: #16274a;
  font-size: 16px;
  margin-bottom: 2px;
  font-weight: bold;
}
.text-editor-custom.error {
  border: 2px solid red !important;
}
.text-error {
  color: red;
}
</style>
