<template>
  <div>
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
                maxlength="20"
                label="Nome"
                required
                @keyup="validate"
              ></v-text-field>

              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dtNasc"
                    label="Dt. Nascimento"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dtNasc"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                v-model="cpf"
                label="CPF"
                maxlength="20"
                v-mask="['###.###.###-##']"
                required
                @keyup="validate"
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                maxlength="40"
                required
                :rules="[rules.required, rules.email]"
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
                  <v-list-item-avatar color="#741b48">
                    <span style="color: white">
                      {{ item.nomeCliente.substring(0, 2).toUpperCase() }}
                    </span>
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
            Funcionários
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
                maxlength="20"
                label="Nome"
                required
                @keyup="validate"
              ></v-text-field>

              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dtNasc"
                    label="Dt. Nascimento"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dtNasc"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                v-model="cpf"
                label="CPF"
                maxlength="20"
                v-mask="['###.###.###-##']"
                required
                @keyup="validate"
              ></v-text-field>

              <v-text-field
                v-model="cargo"
                label="Cargo"
                maxlength="20"
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
              <template v-for="(item, index) in itemsFunc">
                <v-divider
                  v-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                ></v-divider>

                <v-list-item v-else :key="item.nomeFunc">
                  <v-list-item-avatar color="#741b48">
                    <span style="color: white">
                      {{ item.nomeFunc.substring(0, 2).toUpperCase() }}
                    </span>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      v-html="item.nomeFunc"
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
      <!--===============FIM Dialog Servicos==================-->
      <!--===============Dialog Veiculos=========================-->
      <v-dialog v-model="dialogCar" width="600">
        <v-card>
          <v-card-title>
            Veiculos
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
                v-model="modelo"
                label="Nome do modelo"
                maxlength="20"
                required
                @keyup="validate"
              ></v-text-field>

              <v-text-field
                v-model="placa"
                label="Placa"
                v-mask="['AAA-####']"
                required
                @keyup="validate"
              ></v-text-field>

              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="ano"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="ano"
                    label="Ano"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="ano" type="month" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancelar
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(ano)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <v-text-field
                v-model="chassi"
                label="Chassi"
                maxlength="17"
                required
                @keyup="validate"
              ></v-text-field>

              <v-text-field
                v-model="corVeiculo"
                label="Cor"
                maxlength="20"
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
                  <v-list-item-avatar color="#741b48">
                    <span style="color: white">
                      {{ item.nomeCarro.substring(0, 2).toUpperCase() }}
                    </span>
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
      <!--===============FIM Dialog Veiculos=========================-->
      <!--===============Dialog Serviços==============================-->
      <v-dialog v-model="dialogParts" width="600">
        <v-card>
          <v-card-title>
            Serviços
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
                v-model="servico"
                label="Nome"
                maxlength="20"
                required
                @keyup="validate"
              ></v-text-field>

              <v-text-field
                v-model="valorPH"
                label="Veiculo"
                maxlength="20"
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
              <template v-for="(item, index) in itemsServico">
                <v-divider
                  v-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                ></v-divider>

                <v-list-item v-else :key="item.nomeServico">
                  <v-list-item-avatar color="#741b48">
                    <span style="color: white">
                      {{ item.nomeServico.substring(0, 2).toUpperCase() }}
                    </span>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      v-html="item.nomeServico"
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
      <!--===============FIM Dialog Serviços==============================-->
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card color="#333" dark style="border-radius: 333">
              <v-card-title class="text-h5">
                Seja bem-vindo ao MotorLab
              </v-card-title>
              <v-card-subtitle
                >Um sistema pensado para melhor funcionamento de sua
                oficina</v-card-subtitle
              >
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card color="#333" dark style="border-radius: 333" height="200px">
              <v-card-title class="text-h5"> Clientes </v-card-title>

              <v-card-subtitle
                >Faça todo o cadastro e manutenção do seus
                clientes</v-card-subtitle
              >

              <v-card-actions>
                <v-btn text @click="sideBarButtons(0)"> Clique aqui </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card color="#333" dark style="border-radius: 333" height="200px">
              <v-card-title class="text-h5"> Veiculos </v-card-title>

              <v-card-subtitle
                >Faça todo o cadastro de veiculo do seus clientes hoje
                mesmo</v-card-subtitle
              >

              <v-card-actions>
                <v-btn text @click="sideBarButtons(1)"> Clique aqui </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card color="#333" dark style="border-radius: 333" height="200px">
              <v-card-title class="text-h5"> Funcionários </v-card-title>

              <v-card-subtitle
                >Faça todo o cadastro e manutenção do seus
                clientes</v-card-subtitle
              >

              <v-card-actions>
                <v-btn text @click="sideBarButtons(2)"> Clique aqui </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card color="#333" dark style="border-radius: 333" height="200px">
              <v-card-title class="text-h5"> Serviços </v-card-title>
              <v-card-subtitle
                >Faça todo o cadastro de seus serviços</v-card-subtitle
              >
              <v-card-actions>
                <v-btn text @click="sideBarButtons(3)"> Clique aqui </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import indexDb from "../indexedDB/indexdb";
import { mask } from "vue-the-mask";
import axios from "axios";

const gradients = [["#ff512f", "#dd2476"]];
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
    itemsFunc: [],
    itemsCarros: [],
    itemsServico: [],
    valid: false,
    menu2: false,
    menu: false,

    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },

    //form cliente
    name: "",
    cpf: "",
    dtNasc: "",
    email: "",
    //form funcio
    cnpj: "",
    cargo: "",
    //form Veiculo
    modelo: "",
    placa: "",
    ano: "",
    chassi: "",
    corVeiculo: "",
    //form Serviço
    servico: "",
    valorPH: "",
    // fim forms

    ableForm: false,
    dialogSelecionado: undefined,
    //obj IndexDB itensClient
    itemsClientDB: [],
    itemsCarroDB: [],
    selectFunc: [],
    selectServ: [],
  }),
  async mounted() {
    try {
      await axios
        .get("http://localhost:3001/api/selectCliente")
        .then((response) => (this.itemsClientDB = response.data));
      await axios
        .get("http://localhost:3001/api/selectVeiculos")
        .then((response) => (this.itemsCarroDB = response.data));
      await axios
        .get("http://localhost:3001/api/selectFunc")
        .then((response) => (this.selectFunc = response.data));
      await axios
        .get("http://localhost:3001/api/selectServ")
        .then((response) => (this.selectServ = response.data));

    } catch (err) {
      console.log(err);
    } finally {
      this.mountListas();
    }
  },
  methods: {
    mountListas() {
      this.itemsClientDB.forEach((f) => {
        this.itemsClient.push({
          nomeCliente: f.nome,
          subtitle: `Dt. Nascimento: ${f.dtNascimento}, CPF: ${f.cpf}`,
        });
      });
      this.itemsCarroDB.forEach((f) => {
        this.itemsCarros.push({
          nomeCarro: f.modelo,
          subtitle: `Placa: ${f.placa}, Ano: ${f.ano}`,
        });
      });
      this.selectFunc.forEach((f) => {
        this.itemsFunc.push({
          nomeFunc: f.nome,
          subtitle: `Dt. Nascimento: ${f.dtNascimento}, CPF: ${f.cpf}`,
        });
      });
      this.selectServ.forEach((f) => {
        this.itemsServico.push({
          nomeServico: f.nome,
          subtitle: `Valor por Hora cobrado: ${f.valorPH}`,
        });
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
    async deleteClient(index) {
      let indexDb = this.itemsClientDB[index].id
      try {
        axios.post(`http://localhost:3001/api/deleteCliente`, {id: indexDb})
      } catch (error) {
        console.log(error)
      }
      this.itemsClientDB.splice(index, 1);
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
        this.chassi !== "" &&
        this.cor !== ""
      ) {
        // Veiculo
        this.valid = false;
      } else if (this.servico !== "" && this.valorPH !== "") {
        // peca
        this.valid = false;
      } else {
        this.valid = true;
      }
    },
    resetValidation() {
      this.name = "";
      this.cpf = "";
      this.modelo = "";
      this.ano = "";
      this.dtNasc = "";
      this.placa = "";
      this.clientsName = "";
      this.servico = "";
      this.valorPH = "";
      this.cnpj = "";
      this.cargo = "";
      this.email = "";
      this.chassi = "";
      this.corVeiculo = "";
      this.valid = true;
      this.ableForm = false;
    },
    addArray(dialogSelecionado) {
      // let ult = this.itemsClientDB.length - 1;
      // let ultCarros = this.itemsCarrosDB.length - 1;
      switch (dialogSelecionado) {
        case 0:
          this.itemsClient.push({
            nomeCliente: this.name,
            subtitle: `Dt. Nascimento: ${this.dtNasc}, CPF: ${this.cpf}`,
          });
          console.log(this.dtNasc);

          axios
            .post("http://localhost:3001/api/insertCliente", {
              name: this.name,
              cpf: this.cpf,
              dtNasc: this.dtNasc,
              email: this.email,
            })
            .then(function (response) {
              console.log(response);
            });

          // indexDb.newDataBase("clientes", DBobjClient);
          // this.itemsClientDB.push(DBobjClient);
          this.resetValidation();
          break;
        case 1:
          // let DBobjCarros = {
          //   id: this.itemsCarrosDB[ultCarros].id + 1,
          //   carro: this.modelo,
          //   clientsName: this.clientsName,
          //   placa: this.placa,
          //   ano: this.ano,
          // };

          this.itemsCarros.push({
            nomeCarro: `${this.carro}`,
            subtitle: `Ano: ${this.ano}, Placa: ${this.placa}`,
          });

          // let indexClientCarro = this.itemsClientDB.findIndex(
          //   (f) => f.nome === this.clientsName
          // );

          axios
            .post("http://localhost:3001/api/insertVeiculos", {
              modelo: this.modelo,
              ano: this.ano,
              placa: this.placa,
              chassi: this.chassi,
              cor: this.corVeiculo,
            })
            .then(function (response) {
              console.log(response);
            });

          // indexDb.adicionaCarroCliente(indexClientCarro, this.carro);

          // indexDb.newDataBase("carros", DBobjCarros);
          // this.itemsCarrosDB.push(DBobjCarros);
          this.resetValidation();

          break;
        case 2:
          axios
            .post("http://localhost:3001/api/insertFunc", {
              name: this.name,
              cpf: this.cpf,
              dtNasc: this.dtNasc,
              cargo: this.cargo,
            })
            .then(
              this.itemsFunc.push({
                nomeFunc: this.name,
                subtitle: `Dt. Nascimento: ${this.dtNasc}, CPF: ${this.cnpj}`,
              })
            );
          this.resetValidation();
          break;
        case 3:
          axios
            .post("http://localhost:3001/api/insertServico", {
              servico: this.servico,
              valorPH: this.valorPH,
            })
            .then(
              this.itemsServico.push({
                nomeServico: this.servico,
                subtitle: `Nome: ${this.servico}, Cod: ${this.valorPH}`,
              })
            );
          this.resetValidation();
          break;
      }
    },
  },
};
</script>

<style>
.col-6 {
  padding: 15px 8px !important;
}
</style>
