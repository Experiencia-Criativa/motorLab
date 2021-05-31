<template>
  <div>
    <div>
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
            <v-btn icon text class="iconRight heart">
              <v-icon size="26"
               @click="mudaIcon"> 
                {{ favIcon }}
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
                <v-select
                  v-model="formCliente"
                  label="Cliente"
                  :color="iconeColor"
                  :append-icon="iconeTp"
                  :items="cliente"
                  @change="veiculoCliente(formCliente)"
                  @keyup="editaEvento"
                >
                </v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="formCarro"
                  label="Carro"
                  :color="iconeColor"
                  :append-icon="iconeTp"
                  :items="carro"
                  @keyup="editaEvento"
                >
                </v-select>
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
          {{ type !== "month" ? "Dia" : "Mes" }}
        </v-btn>
        <v-btn outlined class="ma-2" color="white"> Favoritos </v-btn>
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
          :events="events"
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
import moment from "moment";
import { mask } from "vue-the-mask";
import indexDb from "../indexedDB/indexdb";
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
    carro: [],
    cliente: [],
    colorPicker: {},
    menu: false,
    noColor: "#FF0000",
    keyDialog: 0,
    favIcon: "favorite_border"
  }),
  beforeMount() {
    this.getEvents();
    this.getDB();
  },
  methods: {
    getDB() {
      indexDb.getDataBase("clientes").then((clientes) => {
        this.itemsClient = clientes;
        return this.itemsClient;
      });
    },
    getEvents() {
      this.events.push({
        name: "Raggi",
        start: moment().format("YYYY-MM-DD HH:MM"),
        end: moment().format("YYYY-MM-DD HH:MM"),
        color: "#ff2976",
        timed: 1,
        cliente: "Raggi Izar Neto",
        carro: "Celta",
        id: Math.floor(Math.random() * 10000000000),
        fav: false,
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
      this.iconeColor = "#7d7d7d";
      this.iconeTp = "";
      this.colorPicker.hex = e.event.color;
      this.eventoSelecionado = e.event;
      this.nomeEventoTxt = e.event.name;
      this.dataEventoEntTxt = e.event.start;
      this.dataEventoSaidaTxt = e.event.end;
      this.verEventoDialog = true;
      this.itemsClient.forEach((element) => {
        this.cliente.push(element.nome);
      });
      this.formCarro = e.event.carro;
      this.formCliente = e.event.cliente;
      this.veiculoCliente(this.formCliente);
      this.favIcon = e.event.fav ? "favorite" : "favorite_border";
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
    salvaEdicaoEvento() {
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
        carro: this.formCarro,
        id: Math.floor(Math.random() * 10000000000),
        fav: 0,
      };
      if (eventos.name !== "" && eventos.start !== "" && eventos.end !== "") {
        if (index === -1) {
          this.events.push(eventos);
        } else {
          this.events.splice(index, 1, eventos);
        }
      }
    },
    veiculoCliente(nomeCliente) {
      let clienteSelecionado = this.itemsClient.findIndex(
        (f) => f.nome === nomeCliente
      );
      // this.formCarro = this.itemsClient[clienteSelecionado].carro[0]
      this.carro = [];
      if (this.itemsClient[clienteSelecionado] !== undefined) {
        this.itemsClient[clienteSelecionado].carro.forEach((element) => {
          this.carro.push(element);
        });
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
      this.itemsClient.forEach((element) => {
        this.cliente.push(element.nome);
      });
      this.formCarro = "";
      this.formCliente = "";

      this.verEventoDialog = true;
    },
    mudaIcon() {
      this.eventoSelecionado.fav ?
        this.eventoSelecionado.fav = false :
        this.eventoSelecionado.fav = true
      
      this.favIcon = this.eventoSelecionado.fav ? "favorite" : "favorite_border";
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
