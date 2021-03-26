<template>
  <div>
    <v-dialog 
    v-model="verEventoDialog"
    width="600"
    :persistent="loading"
    @click:outside="!loading ? salvaEdicaoEvento() : 1"
    >
      <v-card
      :loading='loading'
      >
        <v-card-title>
          {{ nomeEventoTxt }}
        </v-card-title>
        <v-card-subtitle>
          {{ dataEventoEntTxt }}
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-container>
          <v-row
           style="padding: 0 25px; margin-top: 5px;"
           >
            <v-text-field
              :color="iconeColor"
              v-model="nomeEventoTxt"
              label="Nome do evento"
              :append-icon="iconeTp"
              @keyup="editaEvento"
            >
            </v-text-field>
          </v-row>
          <v-row
            style="padding: 0 15px"
          >
            <v-col>
              <v-text-field
                v-model="dataEventoEntTxt"
                label="Hora inicio evento"
                v-mask="['####-##-## ##:##']"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="dataEventoSaidaTxt"
                label="Hora final evento"
                v-mask="['####-##-## ##:##']"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-sheet tile height="54" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn outlined class="ma-2" color="grey darken-2" @click="setToday">
        Hoje
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title style="margin-top: 12px" v-if="$refs.calendar">
        {{ $refs.calendar.title }}
      </v-toolbar-title>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="750">
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
        @click:date="type === 'month' ? viewDay($event) : (type = 'month')"
        @click:event="verEvento"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import moment from "moment";
import {mask} from 'vue-the-mask'
export default {
  directives: {mask},
  data: () => ({
    focus: "",
    type: "day",
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
    nomeEventoTxt: '',
    dataEventoEntTxt: '',
    dataEventoSaidaTxt: '',
    iconeTp: '',
    iconeColor: '#7d7d7d',
    loading: false,
  }),
  beforeMount() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      this.events.push({
        name: "Raggi",
        start: moment().format("YYYY-MM-DD HH:MM"),
        end:   moment().format("YYYY-MM-DD HH:MM"),
        color: "rgb(218 12 12)",
        timed: 1,
      });
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = "";
    },
    verEvento(e) {
      this.iconeColor = '#7d7d7d'
      this.iconeTp = ''
      this.eventoSelecionado = e.event
      this.nomeEventoTxt = e.event.name
      this.dataEventoEntTxt = e.event.start
      this.dataEventoSaidaTxt = e.event.end
      this.verEventoDialog = true
    },
    editaEvento() {
      this.iconeColor = '#7d7d7d'
      this.iconeTp = ''
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.iconeColor = '#35f073'
        this.iconeTp = 'check_circle'
      }, 3000)
    },
    salvaEdicaoEvento() {
      let index = this.events.findIndex(f => f.name === this.eventoSelecionado.name)
      let eventos = {
        name: this.nomeEventoTxt,
        start: moment().format("YYYY-MM-DD HH:MM"),
        end:   moment().format("YYYY-MM-DD HH:MM"),
        color: "rgb(218 12 12)",
        timed: 1,
      }
      this.events.splice(index, 1, eventos)
    }
  },
};
</script>

<style>
.row + .row {
  margin-top: 0 !important ;
}
</style>
