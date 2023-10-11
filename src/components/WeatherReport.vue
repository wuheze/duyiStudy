<template>
  <div class="hello">
    <!--    <div id="myChart" :style="{ width: '800px', height: '600px' }"></div>-->
    It's raining <i class="qi-104"></i> and cold <i class="qi-901"></i>
  </div>
</template>

<script>
import { api } from "../api";

export default {
  name: "WeatherReport",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    api.getWeatherReport().then(res => {
      console.log(res);
    });
  },
  methods: {
    draw() {
      // 初始化echarts实例
      // let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      // var option = {
      //   //echarts官方示例代码
      //   title: {
      //     text: "ECharts 入门示例"
      //   },
      //   tooltip: {},
      //   xAxis: {
      //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      //   },
      //   yAxis: {},
      //   series: [
      //     {
      //       name: "销量",
      //       type: "bar",
      //       data: [5, 20, 36, 10, 10, 20]
      //     }
      //   ]
      // };
      //设置option
      // myChart.setOption(option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
}
</style>
