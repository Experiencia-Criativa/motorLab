<template>
  <div>
    <div>
      <v-dialog width="500" v-model="historico">
        <v-card>
          <v-card-title> Historico </v-card-title>
          <v-list three-line>
            <template v-for="(item, index) in events">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item v-else :key="item.name">
                <v-list-item-avatar color="#741b48">
                  <span style="color: white">
                    {{ item.name.substring(0, 2).toUpperCase() }}
                  </span>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title> {{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Inicio do evento {{ item.start }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Fim do evento {{ item.end }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="verEventoDialog"
        width="600"
        :persistent="loading"
        @click:outside="!loading ? salvaEdicaoEvento() : 1"
      >
        <v-card :loading="loading">
          <v-card-title>
            {{ nomeEventoTxt === "" ? "Novo Evento" : nomeEventoTxt }}
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-width="200"
              offset-x
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  :color="
                    colorPicker.hex == undefined ? noColor : colorPicker.hex
                  "
                  size="25"
                  v-bind="attrs"
                  v-on="on"
                >
                  fiber_manual_record
                </v-icon>
              </template>
              <v-card>
                <v-color-picker
                  v-model="colorPicker"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="164"
                ></v-color-picker>
              </v-card>
            </v-menu>
            <v-btn
              icon
              text
              class="iconRight heart"
              :style="{ display: criando ? 'none' : '' }"
            >
              <v-icon size="26" @click="mudaIcon">
                {{ favIcon ? "favorite" : "favorite_border" }}
              </v-icon>
            </v-btn>
            <v-btn
              icon
              text
              class="iconRight"
              @click="deletarEvento(eventoSelecionado)"
            >
              <v-icon size="26"> delete </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle>
            {{
              dataEventoEntTxt === ""
                ? "Insira a data do evento"
                : dataEventoEntTxt
            }}
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-container>
            <v-row style="padding: 0 25px; margin-top: 5px">
              <v-text-field
                :color="iconeColor"
                v-model="nomeEventoTxt"
                label="Nome do evento"
                :append-icon="iconeTp"
                @keyup="editaEvento"
              >
              </v-text-field>
            </v-row>
            <v-row style="padding: 0 15px">
              <v-col>
                <v-text-field
                  :color="iconeColor"
                  v-model="dataEventoEntTxt"
                  label="Hora inicio evento"
                  v-mask="['####-##-## ##:##']"
                  :append-icon="iconeTp"
                  @keyup="editaEvento"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  :color="iconeColor"
                  v-model="dataEventoSaidaTxt"
                  label="Hora final evento"
                  v-mask="['####-##-## ##:##']"
                  :append-icon="iconeTp"
                  @keyup="editaEvento"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row style="padding: 0 15px">
              <v-col>
                <v-text-field
                  v-model="formCliente"
                  label="Cliente"
                  :color="iconeColor"
                  :append-icon="iconeTp"
                  @keyup="editaEvento"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formCarro"
                  label="Veículo"
                  :color="iconeColor"
                  :append-icon="iconeTp"
                  @keyup="editaEvento"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row style="padding: 0 15px">
              <v-col>
                <v-text-field
                  v-model="formFunc"
                  label="Cliente"
                  :color="iconeColor"
                  :append-icon="iconeTp"
                  @keyup="editaEvento"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formServ"
                  label="Veículo"
                  :color="iconeColor"
                  :append-icon="iconeTp"
                  @keyup="editaEvento"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <v-sheet title height="54" class="d-flex">
        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn outlined class="ma-2" color="white" @click="setToday">
          Hoje
        </v-btn>
        <v-btn
          outlined
          class="ma-2"
          color="white"
          @click="type === 'month' ? (type = 'day') : (type = 'month')"
        >
          {{ type !== "month" ? "Mes" : "Dia" }}
        </v-btn>
        <v-btn
          :outlined="!filtrando"
          class="ma-2"
          color="white"
          :style="{ color: filtrando ? 'black' : 'black' }"
          @click="filtrando ? (filtrando = false) : (filtrando = true)"
        >
          Favoritos
        </v-btn>
        <v-btn outlined class="ma-2" color="white">
          <a
            target="__blank"
            style="outline: none; color: white; text-decoration: none"
            href="OS.pdf"
            >Relatório</a
          >
        </v-btn>
        <v-btn outlined class="ma-2" color="white" @click="historico = true">
          historico
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title style="margin-top: 12px" v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-btn icon class="ma-2" @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet height="775">
        <v-calendar
          ref="calendar"
          v-model="focus"
          :weekdays="weekday"
          :first-interval="1"
          :interval-count="24"
          :type="type"
          :events="filtrando ? favoritos : events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="60"
          @click:date="type === 'day' ? agendarEvento($event) : viewDay($event)"
          @click:event="verEvento"
        ></v-calendar>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mask } from "vue-the-mask";
export default {
  directives: { mask },
  data: () => ({
    focus: "",
    type: "month",
    types: ["month", "week", "day"],
    mode: "stack",
    modes: ["stack", "column"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    events: [],
    eventoSelecionado: [],
    verEventoDialog: false,
    nomeEventoTxt: "",
    dataEventoEntTxt: "",
    dataEventoSaidaTxt: "",
    iconeTp: "",
    iconeColor: "#7d7d7d",
    loading: false,
    itemsClient: {},
    formCliente: "",
    formCarro: "",
    formServ: '',
    formFunc: '',
    carro: [],
    cliente: [],
    colorPicker: {},
    menu: false,
    noColor: "#FF0000",
    keyDialog: 0,
    favoritos: [],
    favIcon: false,
    filtrando: false,
    criando: false,
    historico: false,
    // DB
    selectClient: [],
    selectVeiculos: [],
    selectFunc: [],
    selectServ: [],
    selectEvents: [],
  }),
  async beforeMount() {
    try {
      await axios
        .get("http://localhost:3001/api/selectCliente")
        .then((response) => (this.selectClient = response.data));
      await axios
        .get("http://localhost:3001/api/selectVeiculos")
        .then((response) => (this.selectVeiculos = response.data));
      await axios
        .get("http://localhost:3001/api/selectFunc")
        .then((response) => (this.selectFunc = response.data));
      await axios
        .get("http://localhost:3001/api/selectServ")
        .then((response) => (this.selectServ = response.data));
      await axios
        .get("http://localhost:3001/api/selectEvents")
        .then((response) => (this.selectEvents = response.data));
    } catch (err) {
      console.log(err);
    } finally {
      this.mountEvent()
    }
  },
  methods: {
    mountEvent() {
      this.events = []
      this.selectEvents.forEach((f) => {
        this.events.push({
          id: f.id,
          name: f.nome,
          start: f.inicio,
          end: f.fim,
          color: f.cor,
          timed: 1,
          cliente: f.nomeCliente,
          modelo: f.modelo,
          funcionario: f.nomeFunc,
          servico: f.nomeServ,
          favoritos: f.favorito
        });
      });
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = "";
    },
    verEvento(e) {
      this.verificaFavorito(e.event);
      this.criando = false;
      this.iconeColor = "#7d7d7d";
      this.iconeTp = "";
      this.colorPicker.hex = e.event.color;
      this.eventoSelecionado = e.event;
      this.nomeEventoTxt = e.event.name;
      this.dataEventoEntTxt = e.event.start;
      this.dataEventoSaidaTxt = e.event.end;
      this.verEventoDialog = true;
      this.formCarro = e.event.modelo;
      this.formCliente = e.event.cliente;
      this.formFunc = e.event.funcionario;
      this.formServ = e.event.servico;
    },
    editaEvento(e) {
      this.iconeColor = "#7d7d7d";
      this.iconeTp = "";
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.iconeColor = "#35f073";
        this.iconeTp = "check_circle";
      }, 3000);
      if (e.code === "Enter") {
        this.verEventoDialog = false;
        this.salvaEdicaoEvento();
      }
    },
    async salvaEdicaoEvento() {
      let index = this.events.findIndex(
        (f) => f.id === this.eventoSelecionado.id
      );
      let eventos = {
        name: this.nomeEventoTxt,
        start: this.dataEventoEntTxt,
        end: this.dataEventoSaidaTxt,
        color: this.colorPicker.hex,
        timed: 1,
        cliente: this.formCliente,
        modelo: this.formCarro,
        // funcionario: f.nomeFunc,
        // servico: f.nomeServ
      };
      if (eventos.name !== "" && eventos.start !== "" && eventos.end !== "") {
        if (index === -1) {
          try {
            await axios
              .post("http://localhost:3001/api/insertEvent", {
                nome: this.nomeEventoTxt,
                cor: this.colorPicker.hex,
                inicio: this.dataEventoEntTxt,
                fim: this.dataEventoSaidaTxt,
              })
          } catch (error) {
            console.log(error);
          } finally {
            await axios
              .get("http://localhost:3001/api/selectEvents")
              .then((response) => (this.selectEvents = response.data));
              this.mountEvent()
          }
        } else {
          this.events.splice(index, 1, eventos);
        }
      }
    },
    // marcar Evento

    agendarEvento(e) {
      this.iconeColor = "#7d7d7d";
      this.iconeTp = "";
      this.colorPicker.hex = "#ff0000";
      this.eventoSelecionado = "";
      this.nomeEventoTxt = "";
      this.dataEventoEntTxt = e.date;
      this.dataEventoSaidaTxt = e.date;
      this.formCarro = "";
      this.formCliente = "";
      this.favIcon = false;
      this.criando = true;
      this.verEventoDialog = true;
    },
    mudaIcon() {
      if (this.eventoSelecionado !== "") {
        if (!this.favIcon) {
          this.favoritos.push(this.eventoSelecionado);
          this.favIcon = true;
        } else {
          let index = this.favoritos.findIndex(
            (f) => f.id === this.eventoSelecionado.id
          );
          this.favoritos.splice(index, 1);
          this.favIcon = false;
        }
      }
    },
    verificaFavorito(event) {
      let index = this.favoritos.findIndex((f) => f.id === event.id);
      if (index != -1) {
        this.favIcon = true;
      } else {
        this.favIcon = false;
      }
    },
    deletarEvento(e) {
      let Index = this.events.findIndex((f) => f.name === e.name);
      this.events.splice(Index, 1);
      this.verEventoDialog = false;
    },
  },
};
</script>

<style>
.row + .row {
  margin-top: 0 !important ;
}
.theme--dark.v-calendar-weekly .v-calendar-weekly__day {
  border-right: #404040 1px solid !important;
  border-bottom: #404040 1px solid !important;
  color: #ffffff;
}
.theme--dark.v-calendar-weekly .v-calendar-weekly__head-weekday {
  border-right: #404040 1px solid !important;
  color: #ffffff !important;
}
.theme--dark.v-calendar-weekly {
  background-color: #303030 !important;
  border-top: #404040 1px solid !important;
  border-left: #404040 1px solid !important;
}
.theme--dark.v-calendar-daily .v-calendar-daily__day-interval {
  border-top: #4a4a4a 1px solid !important;
}
.theme--dark.v-calendar-daily .v-calendar-daily_head-day {
  border-right: #4a4a4a 1px solid !important;
  border-bottom: #4a4a4a 1px solid !important;
  color: #ffffff;
}
.theme--dark.v-calendar-daily {
  background-color: #303030;
  border-left: #4a4a4a 1px solid !important;
  border-top: #4a4a4a 1px solid !important;
}
.theme--dark.v-calendar-daily .v-calendar-daily__day {
  border-right: none !important;
  border-bottom: none !important;
}
.theme--dark.v-calendar-events .v-event-timed {
  border: 0px solid !important;
}
.iconRight {
  position: absolute;
  right: 20px;
  top: 24px;
}
.heart {
  right: 55px !important;
}
</style>
