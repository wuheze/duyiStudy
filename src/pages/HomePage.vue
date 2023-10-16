<template>
  <div>
    <!--    <weather-report></weather-report>-->
    <Funnel></Funnel>
    <Ring></Ring>
    <Sankey></Sankey>
    <StackDiagram></StackDiagram>
    <Histogram></Histogram>
    <TreeMap></TreeMap>
    <WordCloud></WordCloud>
  </div>
</template>

<script>
import weatherReport from "../components/WeatherReport.vue";
import TreeMap from "../components/TreeMap.vue";
import WordCloud from "../components/WordCloud.vue";
import Histogram from "../components/Histogram.vue";
import StackDiagram from "../components/StackDiagram.vue";
import Sankey from "../components/Sankey.vue";
import Ring from "../components/Ring.vue";
import Funnel from "../components/Funnel.vue";
export default {
  name: "HomePage",
  components: {
    Funnel,
    Ring,
    Sankey,
    StackDiagram,
    Histogram,
    WordCloud,
    TreeMap
  }
};
</script>

<style scoped></style>
