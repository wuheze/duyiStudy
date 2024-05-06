<template>
  <div>
    <!--    <weather-report></weather-report>-->
    <!--    <svg-demo></svg-demo>-->
  </div>
</template>

<script>
import weatherReport from "../components/WeatherReport.vue";
import svgDemo from "../components/Svg.vue";
export default {
  name: "HomePage",
  components: {
    weatherReport,
    svgDemo
  }
};
</script>

<style scoped></style>
