<template>
  <div>
    <CChartLine
      :datasets="datasets"
      :labels="labels"
      :options="options"
      class="panel-layout-chart"
    />
  </div>
</template>

<script>
import { CChartLine } from "@coreui/vue-chartjs";

export default {
  components: { CChartLine },
  props: {
    xData: {
      required: false,
      type: Array,
    },
    yData: {
      required: false,
      type: Array,
    },
  },
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Date",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              //type: 'logarithmic',
              scaleLabel: {
                display: false,
                labelString: "Index Returns",
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
      labels: [],
      datasets: [
        {
          fill: false,
          borderColor: "#FFD700",
          backgroundColor: "#FFD700",
          data: [],
        },
      ],
    };
  },
  watch: {
    xData: function () {
      this.labels = this.xData;
    },
    yData: function () {
      this.datasets[0].data = this.yData;
    },
  },
};
</script>

<style scoped>
::v-deep .chartjs-render-monitor {
  width: 400;
  height: 400;
}
::v-deep .panel-layout-chart {
  /* min-width: 600px; */
  height: 300px;
}

@media (max-width: 600px) {
  ::v-deep .panel-layout-chart {
    margin-top: 0px;
  }
}
</style>