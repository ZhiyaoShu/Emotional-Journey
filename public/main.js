import Vue from "vue";
import App from "../src/component/App.vue";
import router from "../src/router-vue";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
