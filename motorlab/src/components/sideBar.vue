<template>
  <div>
    <!--===============Dialog Cliente==================-->
    <v-dialog
      v-model="dialogClient"
      width="600"
    >
      <v-card>
        <v-card-title>
          Clientes
          <v-btn
            color="#333" 
            icon 
            text 
            @click="addClient"
           >
            <v-icon> add </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--===============FIM Dialog Cliente==================-->
    <!--===============Dialog Fornecedor===================-->
    <v-dialog
      v-model="dialogForne" 
      width="600"
    >
      <v-card>
        <v-card-title>
          Fornecedores
          <v-btn 
           color="#333"
           icon 
           text 
           @click="addForne"
          >
            <v-icon> add </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!--===============FIM Dialog Fornecdor==================-->
<!--===============Dialog Carros=========================-->
    <v-dialog
      v-model="dialogCar" 
      width="600"
    >
      <v-card>
        <v-card-title>
          Carros
          <v-btn 
            color="#333" 
            icon 
            @click="addCar"
          >
            <v-icon> add </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!--===============FIM Dialog Carros=========================-->
<!--===============Dialog Peças==============================-->
    <v-dialog
      v-model="dialogParts" 
      width="600"
    >
      <v-card>
        <v-card-title>
          Peças
          <v-btn
           color="#333"
           icon
           @click="addParts"
          >
            <v-icon> add </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!--===============FIM Dialog Peças==============================-->
    <v-card style="border-radius: 0px; height: 100%">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="true"
        color="#444444"
        permanent
      >
        <v-list-item class="px-2" style="padding-top: 55px">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>John Leider</v-list-item-title>

          <v-btn icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <v-list>
          <v-list-item
            v-for="(item, k) in items"
            :key="item.title"
            link
            @click="sideBarButtons(k)"
          >
            <v-list-item-icon>
              <v-icon color="grey lighten-4">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-tooltip>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-tooltip>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Clientes", icon: "mdi-account" },
        { title: "Fornecedores", icon: "mdi-account-group-outline" },
        { title: "Veiculos", icon: "drive_eta" },
        { title: "Peças", icon: "handyman" },
      ],
      mini: true,
      dialogClient: false,
      dialogForne: false,
      dialogCar: false,
      dialogParts: false,
    };
  },
  methods: {
    sideBarButtons(item) {
      switch (item) {
        case 0:
          console.log("cliente");
          this.dialogClient = true;
          break;
        case 1:
          console.log("Fornecedore");
          this.dialogForne = true;
          break;
        case 2:
          console.log("Carros");
          this.dialogCar = true
          break;
        case 3:
          console.log("Peças");
          this.dialogParts = true
          break;
      }
    },
    addClient(e) {
      console.log(e);
    },
    addForne(e) {
      console.log(e);
    },
    addCar(e) {
      console.log(e);
    },
    addParts(e) {
      console.log(e);
    },
  },
};
</script>
<style lang="scss"></style>
