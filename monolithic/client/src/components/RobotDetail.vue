<template>
  <div class="factory-item">
    <h2 class="container"><label>{{title}}</label>
      <div
        v-bind:style="clampClosed ? 'background-color:black' : ''"
        @click.stop="clampClosed=!clampClosed"
        class="sensor"
        title="clamp  closed"
      ></div>
    </h2>
    <input
      v-model.number="firstAngle"
      @click.stop
      type="range"
      min="-90"
      max="90"
    />
    <input
      v-model.number="secondAngle"
      @click.stop
      type="range"
      min="-90"
      max="90"
    />
    <div style="">
      <svg
        width="100%"
        height="300"
        :viewBox="calculateViewBox"
      >
        <line
          x1="2"
          x2="2"
          y1="-150"
          y2="150"
          style="stroke:black; stroke-width:0.2;"
        />
        <line
          x1="-150"
          x2="150"
          :y1="height"
          :y2="height"
          style="stroke:black; stroke-width:0.2;"
        />
        <rect
          class="arm"
          id="item"
          :width="width"
          :height="height"
          :transform="rotateFirst"
        />
        <circle
          :cx="width/2"
          :cy="height"
          r="4"
        />
        <g :transform="translateSecond">
          <rect
            :width="height/3"
            :height="width/2"
            class="arm"
            :transform="transformLeftClaw"
          />
          <rect
            :width="height/3"
            :height="width/2"
            class="arm"
            :transform="transformRightClaw"
          />
          <rect
            :width="height"
            :height="width"
            class="arm"
          />
          <circle
            cy="2"
            r="4"
          />
        </g>
        <line
          x1="50"
          x2="50"
          y1="-50"
          y2="50"
          style="stroke:black; stroke-width:1;"
        />
      </svg>
    </div>
  </div>
</template>
<style scoped>
input[type="range"] {
  width: 100%;
}
.container {
  display: inline-flex;
  align-items: center;
  margin-bottom: 5px;
}
.container > * {
  margin-right: 5px;
}
.arm {
  fill: gray;
}
</style>
<script>
const manager = require("../opcua-manager");
import { dialogParameter } from "../main";
let lastClicked = 0;

export default {
  data: function() {
    return {
      firstAngle: 0,
      secondAngle: 0,
      xtranslate: 0,
      width: 4,
      height: 30,
      title: null,
      clampClosed: false,
      manager: manager
    };
  },
  computed: {
    calculateViewBox: function() {
      return `${-this.height} ${-this.height * 1.5} ${this.height * 3} ${this
        .height * 4}`;
    },
    rotateFirst: function() {
      return `rotate(${this.firstAngle} ${this.width / 2} ${this.height})`;
    },
    translateSecond: function() {
      let rotation = `rotate(${this.secondAngle} 0 ${this.width / 2})`;
      let x =
        this.width / 2 +
        this.height * Math.cos(((90 - this.firstAngle) / 360) * 2 * Math.PI);
      let y =
        -this.width / 2 +
        this.height -
        this.height * Math.sin(((90 - this.firstAngle) / 360) * 2 * Math.PI);
      return `translate(${x} ${y}) ${rotation}`;
    },
    transformLeftClaw: function() {
      let clawHeight = this.width / 4;
      let rotation = this.clampClosed ? "" : ` rotate(30 0 ${clawHeight / 2})`;
      return `translate(${this.height -
        this.width / 2},${clawHeight})${rotation}`;
    },
    transformRightClaw: function() {
      let clawHeight = this.width / 4;
      let rotation = this.clampClosed ? "" : ` rotate(-30 0 ${clawHeight / 2})`;
      return `translate(${this.height -
        this.width / 2},${clawHeight})${rotation}`;
    }
  },
  methods: {
    recalibrate: function(event) {
      console.log("recalibrating");
    },
    manualMode: function(event) {
      console.log("manual mode");
    }
  },
  mounted() {
    this.title = dialogParameter.title;
  }
};
</script>