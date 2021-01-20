<template>
  <div class="factory-item" @click="showDetail">
    <h2 class="container">
      <label>{{ conv }}</label>
      <div
        v-bind:style="sensorBlocked ? 'background-color:black' : ''"
        @click.stop="sensorBlocked=!sensorBlocked"
        class="sensor"
      ></div>
      <div
        v-bind:style="sensorColor ? 'background-color:yellow' : ''"
        @click.stop="sensorColor=!sensorColor"
        class="sensor"
        title="Color sensor"
      ></div>
      <img v-if="status !== 'online'" src="../../img/warning.svg" title="node is offline" />
    </h2>
    <div class="container">
      <label>{{speed}}: {{unit}}</label>
      <button
        @click.stop="changeDirection"
        v-if="direction==='FORWARD'"
        class="image-button"
        title="Direction"
      >
        <img src="../../img/double-arrow-right.svg" width="35" />
      </button>
      <button
        @click.stop="changeDirection"
        v-if="direction!=='FORWARD'"
        class="image-button"
        title="Direction"
      >
        <img src="../../img/double-arrow-left.svg" width="35" />
      </button>
      <div>
        <input
          class="setpoint-input"
          @click.stop
          v-model.number="setpoint"
          placeholder="Setpoint"
          type="number"
          id="inputName"
          min="0"
          max="100"
        />
        <button @click.stop="setSetPoint">Set</button>
      </div>
    </div>
    <div class="container">
      <label>{{speed}}: {{unit}}</label>
      <button
        @click.stop="changeDirection"
        v-if="direction!=='FORWARD'"
        class="image-button"
        title="Direction"
      >
        <img src="../../img/double-arrow-right.svg" width="35" />
      </button>
      <button
        @click.stop="changeDirection"
        v-if="direction==='FORWARD'"
        class="image-button"
        title="Direction"
      >
        <img src="../../img/double-arrow-left.svg" width="35" />
      </button>
      <div>
        <input
          class="setpoint-input"
          @click.stop
          v-model.number="setpoint"
          placeholder="Setpoint"
          type="number"
          id="inputName"
          min="0"
          max="100"
        />
        <button @click.stop="setSetPoint">Set</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 60px;
}
input {
  min-width: 100px;
}
.container {
  display: inline-flex;
  align-items: center;
  margin-bottom: 5px;
}
.container > * {
  margin-right: 5px;
}
</style>

<script>
const manager = require("../opcua-manager");
let doubleClickDelay = require("../../client.config").doubleClickDelay;
import { dialogParameter } from "../main";
let lastClicked = 0;

export default {
  data: function() {
    return {
      speed: 0,
      unit: "RPM",
      status: null,
      setpoint: null,
      direction: null,
      sensorBlocked: false,
      sensorColor: false,
      manager: manager
    };
  },
  components: {
    speedometer: require("./Speedometer").default
  },
  props: ["conv"],
  methods: {
    showDetail: function() {
      let currentTime = Date.now();
      if (currentTime - lastClicked >= doubleClickDelay)
        lastClicked = currentTime;
      // double click to open the dialog
      else {
        dialogParameter.conv = this.conv;
        this.$dialog
          .alert(this.conv, {
            view: "conveyor-detail",
            html: true
          })
          .then(function(dialog) {
            console.log("closed");
          })
          .catch(function() {
            console.log("canceled");
          });
      }
    },
    setSetPoint: function(event) {
      this.manager.write(this.conv, "setpoint", this.setpoint);
    },
    startStop: function(event) {
      this.manager.call(this.conv, "start_stop");
    },
    changeDirection: function(event) {
      this.manager.call(this.conv, "fwd_rev");
    }
  },
  mounted() {
    this.manager.subscribe(`${this.conv}._status`, this, function(
      context,
      value
    ) {
      context.status = value;
    });
    // this.manager.subscribe(`${this.conv}.setpoint`, this, function(
    //   context,
    //   value
    // ) {
    //   context.setpoint = value;
    // });
    this.manager.subscribe(`${this.conv}.unit`, this, function(context, value) {
      context.unit = value;
    });
    this.manager.subscribe(`${this.conv}.speed`, this, function(
      context,
      value
    ) {
      context.speed = value;
    });
    this.manager.subscribe(`${this.conv}.direction`, this, function(
      context,
      value
    ) {
      context.direction = value;
    });
  }
};
</script>
