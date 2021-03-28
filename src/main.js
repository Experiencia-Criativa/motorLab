import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import moment from "moment";
import swal from "sweetalert2"
import {TheMask} from 'vue-the-mask'

Vue.config.productionTip = false;

new Vue({
  TheMask,
  router,
  vuetify,
  moment,
  swal,
  render: (h) => h(App),
}).$mount("#app");
