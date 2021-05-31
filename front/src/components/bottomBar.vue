<template>
  <div style="min-width: 100%">
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px" style="padding: 10px 20px">
        <div class="py-3">
          Um projeto realizado pelo grupo 5
          <br /><span>Integrantes:</span><br />
          <span
            >Bruno Hofmeister, Felipe Waltrick, Fernando Risso, Raggi Izar
            Neto</span
          >
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <v-bottom-navigation>
      <v-btn value="recent" @click="changeRoute(0)">
        <span>Agenda</span>

        <v-icon>event</v-icon>
      </v-btn>

      <v-btn value="favorites" @click="changeRoute(1)">
        <span>Inicio</span>

        <v-icon>home</v-icon>
      </v-btn>

      <v-btn value="nearby" @click="sheet = true">
        <span>Sobre</span>

        <v-icon>info</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
export default {
  data: () => ({
    sheet: false,
  }),
  methods: {
    changeRoute(value) {
      switch (value) {
        case 0:
          if (this.$route.path !== "/agenda") {
            this.$router.push("/agenda");
          }
          break;
        case 1:
          if (this.$route.path !== "/") {
            this.$router.push("/");
          }
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
