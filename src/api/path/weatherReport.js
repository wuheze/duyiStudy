import { Get } from "../server";

// 七日天气预报
export function getWeekWeather() {
  // 高德实时天气预报
  // return Get(
  //   "https://restapi.amap.com/v3/weather/weatherInfo?city=610113&key=8c4699b1561b89718140cbc13d883333"
  // );

  // 和风天气七日天气预报
  return Get(
    "https://devapi.qweather.com/v7/weather/7d?key=bf2a2664a3f14460b9114901f46027c8&location=101110113"
  );
}

//实时天气预报
export function getRealTimeWeather(){
  // 和风天气实时天气预报
  return Get(
    "https://devapi.qweather.com/v7/weather/now?key=bf2a2664a3f14460b9114901f46027c8&location=101110113"
  );
}
