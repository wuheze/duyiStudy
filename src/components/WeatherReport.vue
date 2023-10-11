<template>
  <div class="weather-report">
    <!--    <div id="myChart" :style="{ width: '800px', height: '600px' }"></div>-->
    <div class="now-weather">
      <div class="now-temp">
        <div style="font-size: 16px;font-weight: 400">雁塔区</div>
        {{ nowTemp }}
      </div>
      <div class="other-info">
        <div class="icon">{{ nowText }}<i :class="'qi-' + nowIcon"></i></div>
        <div class="now-temp-interval">
          最低{{ nowTempMin }} 最高{{ nowTempMax }}
        </div>
      </div>
    </div>
    <div class="nearly-week-weather">
      <div v-for="item in tempInterval" style="width: 100px">
        <div class="weekday">{{ item.date }}</div>
        <div class="temp-icon"><i :class="'qi-' + item.iconDay"></i></div>
        <div class="interval">{{ item.tempMin }}/{{ item.tempMax }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../api";

export default {
  name: "WeatherReport",
  data() {
    return {
      // 当前温度
      nowTemp: "",
      // 当前天气状况图例
      nowIcon: "",
      // 当前天气文字描述
      nowText: "",
      // 当前最低温
      nowTempMin: 0,
      // 当前最高温
      nowTempMax: 0,
      // 近一周温度区间
      tempInterval: []
    };
  },
  mounted() {
    // api.getRealTimeWeather().then(res => {
    //   console.log(res);
    // });
    // api.getWeekWeather().then(res=>{
    //   console.log(res)
    // })
    this.init();
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
    },
    async init() {
      // 当前天气预报
      let now = api.getRealTimeWeather();
      // 近七日天气预报
      let nearlyWeek = api.getWeekWeather();
      try {
        const result = await Promise.all([now, nearlyWeek]);
        const weekDay = [
          "周日",
          "周一",
          "周二",
          "周三",
          "周四",
          "周五",
          "周六"
        ];
        console.log(result, "result");
        if (result[0].code === "200") {
          const now = result[0].now;
          this.nowTemp = now.temp + "°";
          this.nowText = now.text;
          this.nowIcon = now.icon;
        }
        if (result[1].code === "200") {
          const week = result[1].daily;
          week.forEach((item, index) => {
            if (index === 0) {
              this.nowTempMin = item.tempMin + "°";
              this.nowTempMax = item.tempMax + "°";
            } else {
              let date = new Date(Date.parse(item.fxDate));
              this.tempInterval.push({
                date: index === 1 ? "明天" : weekDay[date.getDay()],
                tempMin: item.tempMin,
                tempMax: item.tempMax,
                iconDay: item.iconDay,
                iconNight: item.iconNight
              });
            }
          });
          console.log(this.tempInterval);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.weather-report {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 600px;
  height: 200px;
  border: 1px solid tomato;
  border-radius: 20px;
  padding: 10px 15px;
  color: white;
  background-image: linear-gradient(45deg, #211e22 20%, #383a3e);
  .now-weather {
    display: flex;
    height: 100px;
    justify-content: space-between;
    .now-temp {
      font-size: 30px;
      font-weight: bold;
    }
    .other-info {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      .icon {
        text-align: right;
      }
      i {
        font-size: 28px;
        margin-left: 10px;
      }
    }
  }
  .nearly-week-weather {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
  }
}
</style>
