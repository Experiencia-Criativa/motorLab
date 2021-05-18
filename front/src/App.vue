<template>
  <v-app>
    <top-Bar style="z-index: 2" />
    <router-view class="router" />
    <bottom-bar class="bottomBar" />
  </v-app>
</template>

<script>
import topBar from "./components/topBar";
import bottomBar from "./components/bottomBar";
export default {
  components: { topBar, bottomBar },
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
  margin: 45px 0;
  overflow-x: hidden;
}
.bottomBar {
  position: fixed;
  bottom: -2px !important;
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
