<template>
  <div>
    <!--===============Dialog Cliente==================-->
    <v-dialog v-model="dialogClient" width="600">
      <v-card>
        <v-card-title>
          Clientes
          <v-btn color="#333" icon text @click="addClient">
            <v-icon> add </v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-container v-if="ableForm">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            style="padding: 20px"
          >
            <v-text-field
              v-model="name"
              label="Nome"
              required
              @keyup="validate"
            ></v-text-field>

            <v-text-field
              v-model="carro"
              label="Carro"
              required
              @keyup="validate"
            ></v-text-field>

            <v-text-field
              v-model="cpf"
              label="CPF"
              required
              @keyup="validate"
            ></v-text-field>

            <v-btn
              :disabled="valid"
              color="success"
              class="mr-4"
              @click="addArray"
            >
              Salvar
            </v-btn>

            <v-btn color="error" @click="resetValidation"> Cancelar </v-btn>
          </v-form>

          <v-divider></v-divider>
        </v-container>

        <v-card
          max-width="100%"
          max-height="100%"
          class="mx-auto"
          style="margin: 0 !important"
        >
          <v-list three-line>
            <template v-for="(item, index) in itemsClient">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item v-else :key="item.title">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-btn color="#333" icon text @click="deleteClient(index)">
                  <v-icon> delete </v-icon>
                </v-btn>
              </v-list-item>
            </template>
          </v-list>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--===============FIM Dialog Cliente==================-->
    <!--===============Dialog Fornecedor===================-->
    <v-dialog v-model="dialogForne" width="600">
      <v-card>
        <v-card-title>
          Fornecedores
          <v-btn color="#333" icon text @click="addForne">
            <v-icon> add </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card max-width="100%" class="mx-auto">
          <v-list three-line>
            <template v-for="(item, index) in itemsClient">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item v-else :key="item.title">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--===============FIM Dialog Fornecdor==================-->
    <!--===============Dialog Carros=========================-->
    <v-dialog v-model="dialogCar" width="600">
      <v-card>
        <v-card-title>
          Carros
          <v-btn color="#333" icon @click="addCar">
            <v-icon> add </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card max-width="100%" class="mx-auto">
          <v-list three-line>
            <template v-for="(item, index) in itemsClient">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item v-else :key="item.title">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--===============FIM Dialog Carros=========================-->
    <!--===============Dialog Peças==============================-->
    <v-dialog v-model="dialogParts" width="600">
      <v-card>
        <v-card-title>
          Peças
          <v-btn color="#333" icon @click="addParts">
            <v-icon> add </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card max-width="100%" class="mx-auto">
          <v-list three-line>
            <template v-for="(item, index) in itemsClient">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item v-else :key="item.title">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
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
import swal from "sweetalert2";
export default {
  component: { swal },
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

      itemsClient: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Felipe",
          subtitle: `Carro: Corsa, CPF: 000000.`,
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "Matheus",
          subtitle: `Carro: Sandero, CPF: 000000.`,
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Fernando",
          subtitle:
            'Carro: Etios, CPF: 000000.',
        },
      ],
      valid: false,
      name: "",
      cpf: "",
      carro: "",
      ableForm: false,
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
          this.dialogCar = true;
          break;
        case 3:
          console.log("Peças");
          this.dialogParts = true;
          break;
      }
    },
    addClient() {
      this.ableForm = true;
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
    deleteClient(index) {
      swal.fire({
        title: "Tem certeza que dejesa excluir?",
        icon: "warning",
        confirmButtonText: "Sim",
        showCancelButton: true,
        cancelButtonText: "Não",
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          this.itemsClient.splice(index, 1);
        }
      });
    },
    validate() {
      if (this.name !== "" && this.cpf !== "" && this.carro !== "") {
        this.valid = false;
      } else {
        this.valid = true;
      }
    },
    resetValidation() {
      (this.name = ""), (this.cpf = ""), (this.carro = ""), (this.valid = true);
      this.ableForm = false;
    },
    addArray() {
      this.itemsClient.push({
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: this.name,
        subtitle: `Carro: ${this.carro}, CPF: ${this.cpf}`,
      });
      this.resetValidation();
    },
  },
};
</script>
<style>
.v-card__actions {
  padding: 0 !important;
}
.swal2-popup {
    font-family: 'Roboto';
}
</style>
