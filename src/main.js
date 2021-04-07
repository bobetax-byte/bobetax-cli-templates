import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "regenerator-runtime/runtime";
import "core-js/stable";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
