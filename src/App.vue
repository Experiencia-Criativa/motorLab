<template>
  <v-app>
    <top-Bar style="z-index: 2" />
    <side-Bar class="sideBar" />
    <router-view class="router" />
    <bottom-bar class="bottomBar" />
  </v-app>
</template>

<script>
import sideBar from "./components/sideBar";
import topBar from "./components/topBar";
import bottomBar from "./components/bottomBar";
export default {
  components: { topBar, bottomBar, sideBar },
  computed: {
    theme() {
      return this.$vuetify.themes.dark ? "dark" : "light";
    },
  },
};
</script>
<style lang="scss">
.sideBar {
  position: fixed;
  left: 0px;
  top: 0px;
  height: 100%;
}
.router {
  padding: 55px 0px 10px 55px;
}
.bottomBar {
  position: fixed;
  bottom: 0px;
  z-index: 10;
}

::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar-button:start:decrement,
::-webkit-scrollbar-button:end:increment {
  display: none;
}
</style>
