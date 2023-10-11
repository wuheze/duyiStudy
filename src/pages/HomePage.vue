<template>
  <div>
    <weather-report></weather-report>
  </div>
</template>

<script>
import weatherReport from "../components/WeatherReport.vue";
export default {
  name: "HomePage",
  components: { weatherReport }
};
</script>

<style scoped></style>
