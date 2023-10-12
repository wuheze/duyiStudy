import { Get } from "../server";

// 七日天气预报
export function getWeekWeather(location) {
  // 高德实时天气预报
  // return Get(
  //   "https://restapi.amap.com/v3/weather/weatherInfo?city=610113&key=8c4699b1561b89718140cbc13d883333"
  // );

  // 和风天气七日天气预报
  return Get(
    `https://devapi.qweather.com/v7/weather/7d?key=bf2a2664a3f14460b9114901f46027c8&location=${location}`
  );
}

//实时天气预报
export function getRealTimeWeather(location) {
  // 和风天气实时天气预报
  return Get(
    `https://devapi.qweather.com/v7/weather/now?key=bf2a2664a3f14460b9114901f46027c8&location=${location}`
  );
}

// 获取用户当前城市名称
export function getUserCity() {
  // 高德获取当前城市
  return Get(
    "https://restapi.amap.com/v3/ip?key=8c4699b1561b89718140cbc13d883333"
  );
}

export function getCityId(city) {
  return Get(
    `https://geoapi.qweather.com/v2/city/lookup?key=bf2a2664a3f14460b9114901f46027c8&location=${city}`
  );
}
