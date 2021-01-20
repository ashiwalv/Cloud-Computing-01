<template class="factory-item">
  <div>
    <h2 class="container">
      <label>{{ conv }}</label>
      <div
        v-bind:style="sensorBlocked ? 'background-color:black' : ''"
        @click.stop="sensorBlocked = !sensorBlocked"
        class="sensor"
      ></div>
      <div
        v-bind:style="sensorColor ? 'background-color:yellow' : ''"
        @click.stop="sensorColor = !sensorColor"
        class="sensor"
        title="Color sensor"
      ></div>
      <img v-if="status !== 'online'" src="../../img/warning.svg" title="node is offline" />
    </h2>

    <div class="wrapper">
      <div class="speedo1">
        <speedometer :maxValue="100" :value="speed"></speedometer>
      </div>
      <div class="direction1">
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
      </div>
      <div class="setpoint1">
        <input
          @click.stop
          class="setpoint-input"
          v-model.number="setpoint"
          placeholder="Setpoint"
          type="number"
          id="inputName"
          min="0"
          max="100"
        />
        <button @click.stop="setSetPoint">Set</button>
      </div>
      <div class="speedo2">
        <speedometer :maxValue="100" :value="speed"></speedometer>
      </div>

      <div class="direction2">
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
      </div>
      <div class="setpoint2">
        <input
          @click.stop
          class="setpoint-input"
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
.wrapper {
  display: grid;
  grid-template-columns: 350px 150px;
  grid-template-rows: 100px 100px 100px 100px;
}
.container {
  display: inline-flex;
  align-items: center;
  margin-bottom: 5px;
}
.container > * {
  margin-right: 5px;
}

.sensor {
  vertical-align: middle;
}
.setpoint-input {
  width: 100px;
}
.speedo1 {
  grid-column: 1;
  grid-row: 1/3;
}
.speedo2 {
  grid-column: 1;
  grid-row: 3/5;
}
.direction1 {
  grid-column: 2;
  margin: auto;
}
.direction2 {
  grid-column: 2;
  grid-row: 3;
  margin: auto;
}
.setpoint1 {
  grid-column: 2;
  grid-row: 2;
  text-align: center;
}
.setpoint2 {
  grid-column: 2;
  grid-row: 4;
  text-align: center;
}
</style>

<script>
const manager = require("../opcua-manager");
import { dialogParameter } from "../main";

export default {
  data: function() {
    return {
      speed: null,
      unit: null,
      state: null,
      status: null,
      setpoint: null,
      direction: null,
      sensorBlocked: false,
      sensorColor: false,
      conv: null,
      manager: manager
    };
  },
  components: {
    speedometer: require("./Speedometer").default
  },
  props: ["param"],
  methods: {
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
    if (this.param) this.conv = this.param;
    else this.conv = dialogParameter.conv;
    console.log("conv:", this.conv);
    this.manager.subscribe(`${this.conv}._status`, this, function(
      context,
      value
    ) {
      context.status = value;
    });
    this.manager.subscribe(`${this.conv}.state`, this, function(
      context,
      value
    ) {
      context.state = value;
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