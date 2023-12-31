// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as echarts from "echarts";
import axios from "axios";
import VCharts from "v-charts";
Vue.prototype.$echarts = echarts;
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VCharts);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
