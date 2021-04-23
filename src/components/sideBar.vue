<template>
  <div>
    <!--===============Dialog Cliente==================-->
    <v-dialog v-model="dialogClient" width="600">
      <v-card>
        <v-card-title>
          Clientes
          <v-btn color="#ededed" icon text @click="openForm">
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
              v-model="dtNasc"
              label="Data de Nascimento"
              v-mask="'##/##/####'"
              required
              @keyup="validate"
            ></v-text-field>

            <v-text-field
              v-model="cpf"
              label="CPF"
              v-mask="['###.###.###-##']"
              required
              @keyup="validate"
            ></v-text-field>

            <v-btn
              :disabled="valid"
              color="success"
              class="mr-4"
              @click="addArray(dialogSelecionado)"
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

              <v-list-item v-else :key="item.nomeCliente">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-html="item.nomeCliente"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-btn color="#ededed" icon text @click="deleteClient(index)">
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
          <v-btn color="#ededed" icon text @click="openForm">
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
              v-model="dtNasc"
              label="Cod.Fornecedor"
              required
              @keyup="validate"
            ></v-text-field>

            <v-text-field
              v-model="cnpj"
              label="CNPJ"
              required
              @keyup="validate"
            ></v-text-field>

            <v-btn
              :disabled="valid"
              color="success"
              class="mr-4"
              @click="addArray(dialogSelecionado)"
            >
              Salvar
            </v-btn>

            <v-btn color="error" @click="resetValidation"> Cancelar </v-btn>
          </v-form>
          <v-divider></v-divider>
        </v-container>
        <v-card max-width="100%" class="mx-auto">
          <v-list three-line>
            <template v-for="(item, index) in itemsForne">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item v-else :key="item.nomeForne">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-html="item.nomeForne"
                  ></v-list-item-title>
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
          <v-btn color="#ededed" icon @click="openForm">
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
              v-model="carro"
              label="Nome do carro"
              required
              @keyup="validate"
            ></v-text-field>
            <v-select
              v-model="clientsName"
              :items="clienteSelecionado"
              label="Selecione o nome do cliente"
              required
              @blur="validate"
            />
            <v-text-field
              v-model="placa"
              label="Placa"
              required
              @keyup="validate"
            ></v-text-field>

            <v-text-field
              v-model="ano"
              label="Ano"
              required
              @keyup="validate"
            ></v-text-field>

            <v-btn
              :disabled="valid"
              color="success"
              class="mr-4"
              @click="addArray(dialogSelecionado)"
            >
              Salvar
            </v-btn>

            <v-btn color="error" @click="resetValidation"> Cancelar </v-btn>
          </v-form>
          <v-divider></v-divider>
        </v-container>
        <v-card max-width="100%" class="mx-auto">
          <v-list three-line>
            <template v-for="(item, index) in itemsCarros">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item v-else :key="item.nomeCarro">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-html="item.nomeCarro"
                  ></v-list-item-title>
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
          <v-btn color="#ededed" icon @click="openForm">
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
              v-model="codPeca"
              label="Cod. Peca"
              required
              @keyup="validate"
            ></v-text-field>

            <v-btn
              :disabled="valid"
              color="success"
              class="mr-4"
              @click="addArray(dialogSelecionado)"
            >
              Salvar
            </v-btn>

            <v-btn color="error" @click="resetValidation"> Cancelar </v-btn>
          </v-form>
          <v-divider></v-divider>
        </v-container>
        <v-card max-width="100%" class="mx-auto">
          <v-list three-line>
            <template v-for="(item, index) in itemsPecas">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item v-else :key="item.nomePeca">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.nomePeca"></v-list-item-title>
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
import indexDb from "../indexedDB/indexdb";
import { mask } from "vue-the-mask";
export default {
  directives: { mask },
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

      itemsClient: [],
      itemsForne: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          nomeForne: "Wagner",
          subtitle: `Dt. Nascimento: Corsa, CNPJ: 000000.`,
        },
      ],
      itemsCarros: [
        {
          avatar:
            "https://fotos.jornaldocarro.estadao.com.br/wp-content/uploads/2020/07/27131755/Chevrolet-Celta-2014-1160x770.jpg",
          nomeCarro: "Celta Turbo",
          subtitle: `Ano: 2016, Placa: 000000.`,
        },
      ],
      itemsPecas: [
        {
          avatar:
            "https://www.razaoautomovel.com/wp-content/uploads/2019/07/Toyota-Supra_925x520_acf_cropped.jpg",
          nomePeca: "Cabecote de 2JZ",
          subtitle: `Carro: Toyota Supra, Cod: 000000.`,
        },
      ],
      valid: false,

      //form cliente
      name: "",
      cpf: "",
      dtNasc: "",
      //form Fornecedor
      cnpj: "",
      //form Carro
      carro: "",
      placa: "",
      ano: "",
      clientsName: "",
      clienteSelecionado: [],
      //form Peca
      codPeca: "",
      // fim forms

      ableForm: false,
      dialogSelecionado: undefined,
      //obj IndexDB itensClient
      itemsClientDB: {},
    };
  },
  mounted() {
    this.getDBs()
  },
  methods: {
    getDBs(){
      indexDb.getDataBase("clientes").then((clientes) => {
        this.itemsClientDB = clientes;
        this.itemsClientDB.forEach(f => {
        this.itemsClient.push({
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          nomeCliente: f.nome,
          subtitle: `Dt. Nascimento: ${f.dtNascimento}, CPF: ${f.cpf}`,
        })
      })
    });
  },
    sideBarButtons(item) {
      switch (item) {
        case 0:
          this.dialogClient = true;
          this.ableForm = false;
          this.dialogSelecionado = item;
          break;
        case 1:
          this.dialogForne = true;
          this.ableForm = false;
          this.dialogSelecionado = item;
          break;
        case 2:
          this.dialogCar = true;
          this.ableForm = false;
          this.selectClient();
          this.dialogSelecionado = item;
          break;
        case 3:
          this.dialogParts = true;
          this.ableForm = false;
          this.dialogSelecionado = item;
          break;
      }
    },
    openForm() {
      if (this.ableForm) {
        this.ableForm = false;
      } else {
        this.ableForm = true;
      }
    },
    deleteClient(index) {
      swal
        .fire({
          title: "Tem certeza que dejesa excluir?",
          icon: "warning",
          confirmButtonText: "Sim",
          showCancelButton: true,
          cancelButtonText: "Não",
        })
        .then((resultado) => {
          if (resultado.isConfirmed) {
            indexDb.deleteDataBase("clientes", this.itemsClientDB[index].id)
            this.itemsClient.splice(index, 1);
          }
        });
    },
    validate() {
      if (this.name !== "" && this.cpf !== "" && this.dtNasc !== "") {
        // cliente
        this.valid = false;
      } else if (this.name !== "" && this.cnpj !== "" && this.dtNasc !== "") {
        // fornecedor
        this.valid = false;
      } else if (
        this.carro !== "" &&
        this.ano !== "" &&
        this.placa !== "" &&
        this.clientsName !== ""
      ) {
        // Carro
        this.valid = false;
      } else if (this.name !== "" && this.carro !== "" && this.codPeca !== "") {
        // peca
        this.valid = false;
      } else {
        this.valid = true;
      }
    },
    resetValidation() {
      this.name = "";
      this.cpf = "";
      this.carro = "";
      this.ano = "";
      this.dtNasc = "";
      this.placa = "";
      this.clientsName = "";
      this.codPeca = "";
      this.cnpj = "";
      this.valid = true;
      this.ableForm = false;
    },
    addArray(dialogSelecionado) {
      switch (dialogSelecionado) {
        case 0:
          let DBobj = {
            id: this.itemsClientDB[this.itemsClientDB.length - 1].id + 1,
            nome: this.name,
            dtNascimento: this.dtNasc,
            cpf: this.cpf,
            carros: []
          }
          this.itemsClient.push({
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
            nomeCliente: this.name,
            subtitle: `Dt. Nascimento: ${this.dtNasc}, CPF: ${this.cpf}`,
          });
          indexDb.newDataBase('clientes', DBobj)
          this.itemsClientDB.push(DBobj)
          this.resetValidation();
          break;
        case 1:
          this.itemsForne.push({
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
            nomeForne: this.name,
            subtitle: `Dt. Nascimento: ${this.dtNasc}, CPF: ${this.cnpj}`,
          });
          this.resetValidation();
          break;
        case 2:
          this.itemsCarros.push({
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
            nomeCarro: `${this.carro} / ${this.clientsName}`,
            subtitle: `Ano: ${this.ano}, Placa: ${this.placa}`,
          });
          this.resetValidation();
          break;
        case 3:
          this.itemsPecas.push({
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
            nomePeca: this.name,
            subtitle: `Carro: ${this.carro}, Cod: ${this.codPeca}`,
          });
          this.resetValidation();
          break;
      }
    },
    selectClient() {
      this.itemsClient.forEach((elements) => {
        this.clienteSelecionado.push(elements.nomeCliente);
      });
    },
  },
};
</script>
<style>
.v-card__actions {
  padding: 0 !important;
}
.swal2-popup {
  font-family: "Roboto";
}
</style>
