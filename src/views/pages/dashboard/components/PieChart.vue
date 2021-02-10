<template>
  <div>
    <CChartPie
      :labels="labelField"
      :datasets="[
        {
          backgroundColor: colors,
          data: dataField,
        },
      ]"
      :options="options"
    ></CChartPie>
  </div>
</template>

<script>
import { CChartPie } from "@coreui/vue-chartjs";

export default {
  components: { CChartPie },
  props: {
    labelField: {
      required: false,
      type: Array,
    },
    dataField: {
      required: false,
      type: Array,
    },
  },
  data: function () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        pieceLabel: {
          mode: "percentage",
          precision: 1,
        },
      },
      colors:['#FF0000','#FF8C00','#FFD700','#00FF00','#00FFFF','#0000FF','#8B00FF','#800080','#FF1493','#FFC0CB']
    };
  },
  created: async function () {
    //await this.getRandomColor();
    // console.log(this.dataField);
    // console.log(this.labelField);
  },
  methods: {
    getRandomColor() {
      for (var i = 0; i < this.dataField.length; i++) {
        this.colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
      }
    },
  },
};
</script>