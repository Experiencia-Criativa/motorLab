import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Agenda from "../views/Agenda.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/agenda",
    name: "Agenda",
    component: Agenda,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
