<template>
  <v-bottom-navigation v-model="value">
    <v-btn value="recent" @click="changeRoute(0)">
      <span>Agenda</span>

      <v-icon>event</v-icon>
    </v-btn>

    <v-btn value="favorites" @click="changeRoute(1)">
      <span>Inicio</span>

      <v-icon>home</v-icon>
    </v-btn>

    <v-btn value="nearby" @click="changeRoute(2)">
      <span>Sobre</span>

      <v-icon>info</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  data: () => ({ value: "recent" }),
  methods: {
    changeRoute(value) {
      switch (value) {
        case 0:
          this.$router.push('/')
          break;
        case 1:
          this.$router.push('/about')
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
