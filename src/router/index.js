import Vue from "vue";
import Router from "vue-router";
import HomePage from "../pages/HomePage.vue";
import selection from "../pages/selection.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: selection
    }
  ]
});
