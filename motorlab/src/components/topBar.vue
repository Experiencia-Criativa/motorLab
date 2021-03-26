<template>
  <div>
    <v-app-bar color="#35f073" fixed dense dark>
      <v-toolbar-title>{{ pageName }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="i in pages" :key="i" @click="goTo(i)">
            <v-list-item-title>{{ i }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data: () => ({
    pageName: "Home",
    pages: ["Home", "About"],
  }),
  watch: {
    $route(to) {
      this.show = false;
      this.pageName = to.name;
    },
  },
  methods: {
    goTo(page) {
      if (page === "Home") {
        this.$router.push("/");
      } else {
        this.$router.push("/" + page);
      }
    },
  },
};
</script>
<style lang="scss"></style>
