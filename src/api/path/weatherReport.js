import { Get } from "../server";

export function getWeatherReport() {
  // 高德
  // return Get(
  //   "https://restapi.amap.com/v3/weather/weatherInfo?city=610113&key=8c4699b1561b89718140cbc13d883333"
  // );
  return Get(
    "https://devapi.qweather.com/v7/weather/now?key=bf2a2664a3f14460b9114901f46027c8&location=101110113"
  );
}
