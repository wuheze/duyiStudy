import Vue from "vue";
import Router from "vue-router";
import WeatherReport from "@/components/WeatherReport";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "WeatherReport",
      component: WeatherReport
    }
  ]
});
