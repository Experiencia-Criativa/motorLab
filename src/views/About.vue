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
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          color="#333"
          dark
          style="border-radius: 333"
        >
          <v-card-title class="text-h5">
            Seja bem-vindo ao MotorLab
          </v-card-title>
          <v-card-subtitle>Um sistema pensado para melhor funcionamento de sua oficina</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card
          color="#333"
          dark
          style="border-radius: 333"
        >
          <v-card-title class="text-h5">
            Clientes
          </v-card-title>

          <v-card-subtitle>Faça todo o cadastro e manutenção do seus clientes</v-card-subtitle>

          <v-card-actions>
            <v-btn text @click="sideBarButtons(0)">
              Clique aqui
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          color="#333"
          dark
          style="border-radius: 333"
        >
          <v-card-title class="text-h5">
            Carros
          </v-card-title>

          <v-card-subtitle>Faça todo o cadastro de veiculo do seus clientes hoje mesmo</v-card-subtitle>

          <v-card-actions>
            <v-btn text @click="sideBarButtons(1)">
              Clique aqui
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card
          color="#333"
          dark
          style="border-radius: 333"
        >
          <v-card-title class="text-h5">
            Utilização nos ultimos dias
          </v-card-title>
          <v-sparkline
          :fill="fill"
          :gradient="selectedGradient"
          :line-width="width"
          padding="10"
          smooth="20"
          :value="value"
          auto-draw
          ></v-sparkline>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card
          color="#333"
          dark
          style="border-radius: 333"
        >
         <v-card-title class="text-h5">
            Fornecedores
          </v-card-title>

          <v-card-subtitle>Faça todo o cadastro e manutenção do seus clientes</v-card-subtitle>

          <v-card-actions>
            <v-btn text @click="sideBarButtons(2)">
              Clique aqui
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          color="#333"
          dark
          style="border-radius: 333"
        >
         <v-card-title class="text-h5">
            Peças
          </v-card-title>

          <v-card-subtitle>Faça todo o cadastro e manutenção do seus clientes</v-card-subtitle>

          <v-card-actions>
            <v-btn text @click="sideBarButtons(3)">
              Clique aqui
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import swal from "sweetalert2";
import indexDb from "../indexedDB/indexdb";
import { mask } from "vue-the-mask";

const gradients = [
    ["#348f50", '#56b4d3'],
  ] 
  export default {
    directives: { mask },
    component: { swal },
    data: () => ({
      fill: true,
      selectedGradient: gradients[0],
      gradients,
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      width: 2,

      dialogClient: false,
      dialogForne: false,
      dialogCar: false,
      dialogParts: false,

      itemsClient: [],
      itemsForne: [],
      itemsCarros: [],
      itemsPecas: [],
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
    }),
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
          this.dialogCar = true;
          this.ableForm = false;
          this.selectClient();
          this.dialogSelecionado = item;
          break;
        case 2:
          this.dialogForne = true;
          this.ableForm = false;
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
      indexDb.deleteDataBase("clientes", this.itemsClientDB[index].id)
      this.itemsClient.splice(index, 1);
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
      let ult = this.itemsClientDB.length - 1
      switch (dialogSelecionado) {
        case 0:
          let DBobj = {
            id: this.itemsClientDB[ult].id + 1,
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
          this.itemsCarros.push({
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
            nomeCarro: `${this.carro} / ${this.clientsName}`,
            subtitle: `Ano: ${this.ano}, Placa: ${this.placa}`,
          });
          this.resetValidation();
          break;
        case 2:
          this.itemsForne.push({
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
            nomeForne: this.name,
            subtitle: `Dt. Nascimento: ${this.dtNasc}, CPF: ${this.cnpj}`,
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
  }
</script>

<style>
.col-6{
  padding: 15px 8px !important;
}
</style>
