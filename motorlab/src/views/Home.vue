<template>
  <div>
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
        :first-interval="8"
        :interval-count="16"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="60"
        @click:date="type === 'month' ? viewDay($event) : (type = 'month')"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import moment from "moment";
export default {
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
  }),
  beforeMount() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      this.events.push({
        name: "Nome do Evento",
        start: moment().format("YYYY-MM-DD hh:mm"),
        end: moment().format("YYYY-MM-DD hh:mm"),
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
  },
};
</script>

<style lang="scss"></style>
