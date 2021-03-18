<template>
    <v-app>
    <top-Bar/>
    <side-Bar class="sideBar"/>
    <router-view  class="router"/>
    <bottom-bar class="bottomBar"/>
  </v-app>
</template>

<script>
import sideBar from './components/sideBar'
import topBar from './components/topBar'
import bottomBar from './components/bottomBar'
export default {
  components: { topBar, bottomBar, sideBar },
    computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
  },
}
</script>
<style lang="scss">
.sideBar{
  position: fixed; 
  left: 0px; 
  top: 48px; 
  height: 100%
}
.router{
  padding: 10px 0px 10px 45px;
}
.bottomBar{
  position: fixed; 
  bottom: 0px
}
</style>