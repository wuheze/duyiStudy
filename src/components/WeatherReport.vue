<template>
  <div v-loading="loading">
    <div class="weather-report" @click.stop="openDetailWin">
      <div class="now-weather">
        <div class="now-temp">
          <div style="font-size: 16px;font-weight: 400">
            {{ weatherData.nowCity }}
          </div>
          {{ weatherData.nowTemp }}
        </div>
        <div class="other-info">
          <div class="icon">
            {{ weatherData.nowText
            }}<i :class="'qi-' + weatherData.nowIcon"></i>
          </div>
          <div class="now-temp-interval">
            最低{{ weatherData.nowTempMin }} 最高{{ weatherData.nowTempMax }}
          </div>
        </div>
      </div>
      <div class="nearly-week-weather">
        <div v-for="item in weatherData.tempInterval" style="font-size: 14px">
          <div class="weekday">{{ item.date }}</div>
          <div class="temp-icon"><i :class="'qi-' + item.iconDay"></i></div>
          <div class="interval">{{ item.tempMin }}~{{ item.tempMax }}</div>
        </div>
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
      weatherData: {
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
        nowCity: "",
        nowCityId: "",
        // 近一周温度区间
        tempInterval: [],
        // 上次更新时间
        lastUpdate: 0
      },
      loading: true,
      dialogVisible: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let localWeather = JSON.parse(localStorage.getItem("weather"));
      let nowDate = Date.now();
      if (
        localWeather &&
        (nowDate - localWeather.lastUpdate) / 1000 / 60 < 30
      ) {
        this.weatherData = localWeather;
        this.loading = false;
      } else {
        // 用户经纬度信息（贼不准）
        let coord = api.getUserCity();
        try {
          await coord.then(res => {
            let arr = res.rectangle
              .split(",")
              .join(";")
              .split(";");
            let x = (Number(arr[0]) + Number(arr[2])) / 2;
            let y = (Number(arr[1]) + Number(arr[3])) / 2;
            let location = x.toFixed(2) + "," + y.toFixed(2);
            let cityId = api.getCityId(location);
            cityId.then(async r => {
              this.weatherData.nowCity = r.location[0].adm2;
              this.weatherData.nowCityId = r.location[0].id;
              // 当前天气预报
              let now = api.getRealTimeWeather(this.weatherData.nowCityId);
              // 近七日天气预报
              let nearlyWeek = api.getWeekWeather(this.weatherData.nowCityId);
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
              if (result[0].code === "200") {
                const now = result[0].now;
                this.weatherData.nowTemp = now.temp + "°";
                this.weatherData.nowText = now.text;
                this.weatherData.nowIcon = now.icon;
              }
              if (result[1].code === "200") {
                const week = result[1].daily;
                week.forEach((item, index) => {
                  if (index === 0) {
                    this.weatherData.nowTempMin = item.tempMin + "°";
                    this.weatherData.nowTempMax = item.tempMax + "°";
                  } else {
                    let date = new Date(Date.parse(item.fxDate));
                    this.weatherData.tempInterval.push({
                      date: index === 1 ? "明天" : weekDay[date.getDay()],
                      tempMin: item.tempMin,
                      tempMax: item.tempMax,
                      iconDay: item.iconDay,
                      iconNight: item.iconNight
                    });
                    this.loading = false;
                  }
                });
              }
              this.weatherData.lastUpdate = Date.now();
              localStorage.setItem("weather", JSON.stringify(this.weatherData));
            });
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    openDetailWin() {
      this.dialogVisible = true;
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
  width: 400px;
  height: 170px;
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
    justify-content: space-between;
    text-align: center;
  }
}
</style>
