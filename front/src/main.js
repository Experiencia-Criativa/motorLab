import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import moment from "moment";
import swal from "sweetalert2";
import { TheMask } from "vue-the-mask";
import {VMoney} from 'v-money'

Vue.config.productionTip = false;

new Vue({
  TheMask,
  router,
  vuetify,
  moment,
  swal,
  VMoney,
  render: (h) => h(App),
}).$mount("#app");
