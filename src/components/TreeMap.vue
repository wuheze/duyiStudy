<template>
  <div>
    <div id="treeMap"></div>
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
import { VeLine } from "v-charts/lib/index.esm";
export default {
  name: "TreeMap",
  components: {
    VeLine
  },
  data() {
    return {
      chartData: {
        columns: ["date", "sales"],
        rows: [
          { date: "1月1日", sales: 123 },
          { date: "1月2日", sales: 1223 },
          { date: "1月3日", sales: 2123 },
          { date: "1月4日", sales: 4123 },
          { date: "1月5日", sales: 3123 },
          { date: "1月6日", sales: 7123 }
        ]
      },
      chartData1: {
        columns: ["word", "count"],
        rows: this.getRows()
      }
    };
  },
  mounted() {
    this.echartsInit();
  },
  methods: {
    echartsInit() {
      var myChart = this.$echarts.init(document.getElementById("treeMap"));
      var option = {
        tooltip: {},
        series: [
          {
            type: "treemap",
            data: [
              {
                name: "分类一",
                value: 10,
                leafDepth: 2,
                children: [
                  {
                    name: "分类一里面的a",
                    value: 4
                  },
                  {
                    name: "分类一里面的b",
                    value: 6
                  }
                ]
              },
              {
                name: "分类二",
                value: 10
              },
              {
                name: "分类三",
                value: 10
              },
              {
                name: "分类四",
                value: 10
              },
              {
                name: "分类五",
                value: 10
              },
              {
                name: "分类六",
                value: 10
              },
              {
                name: "分类七",
                value: 10
              }
            ]
          }
        ]
      };

      myChart.setOption(option);
    },
    getRows() {
      return [
        {
          word: "visualMap",
          count: 22199
        },
        {
          word: "continuous",
          count: 10288
        },
        {
          word: "contoller",
          count: 620
        },
        {
          word: "series",
          count: 274470
        },
        {
          word: "gauge",
          count: 12311
        },
        {
          word: "detail",
          count: 1206
        },
        {
          word: "piecewise",
          count: 4885
        },
        {
          word: "textStyle",
          count: 32294
        },
        {
          word: "markPoint",
          count: 18574
        },
        {
          word: "pie",
          count: 38929
        },
        {
          word: "roseType",
          count: 969
        },
        {
          word: "label",
          count: 37517
        },
        {
          word: "emphasis",
          count: 12053
        },
        {
          word: "yAxis",
          count: 57299
        },
        {
          word: "name",
          count: 15418
        },
        {
          word: "type",
          count: 22905
        },
        {
          word: "gridIndex",
          count: 5146
        },
        {
          word: "normal",
          count: 49487
        },
        {
          word: "itemStyle",
          count: 33837
        },
        {
          word: "min",
          count: 4500
        },
        {
          word: "silent",
          count: 5744
        },
        {
          word: "animation",
          count: 4840
        },
        {
          word: "offsetCenter",
          count: 232
        },
        {
          word: "inverse",
          count: 3706
        },
        {
          word: "borderColor",
          count: 4812
        },
        {
          word: "markLine",
          count: 16578
        },
        {
          word: "line",
          count: 76970
        },
        {
          word: "radiusAxis",
          count: 6704
        },
        {
          word: "radar",
          count: 15964
        },
        {
          word: "data",
          count: 60679
        },
        {
          word: "dataZoom",
          count: 24347
        },
        {
          word: "tooltip",
          count: 43420
        },
        {
          word: "toolbox",
          count: 25222
        },
        {
          word: "geo",
          count: 16904
        },
        {
          word: "parallelAxis",
          count: 4029
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
#treeMap {
  width: 500px;
  height: 500px;
}
</style>
