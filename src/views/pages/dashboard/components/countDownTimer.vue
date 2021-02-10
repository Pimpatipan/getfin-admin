<template>
  <div>
    <h1 class="mb-3 text-center f-20">{{ time }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      required: false,
      type: String,
    },
    endDate: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      time: "",
    };
  },
  created: async function () {
    await this.onPageLoad();
  },
  methods: {
    onPageLoad() {
      var countDownDate = new Date(this.endDate).getTime();
      var x = setInterval(() => {
        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (hours < 10) {
          hours = "0" + hours;
        }

        if (minutes < 10) {
          minutes = "0" + minutes;
        }

        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        this.time =
          days + "d : " + hours + "h : " + minutes + "m : " + seconds;

        distance--;

        if (distance < 0) {
          clearInterval(x);
        }
      }, 1000);
    },
  },
};
</script>