<template>
  <div class="factory-item" ref="cont" @click="showRobotDetail">
    <h2>
      {{ title }}
      <input
        v-model.number="varposition"
        @click.stop
        type="range"
        min="0"
        max="950"
        value="0"
        @change="moveSlider()"
      />
    </h2>
    <svg
      :class="flipped ? 'flipped': ''"
      style="width:100%;height:100%; max-height:400px;"
      viewBox="0 0 400 1000"
    >
      <rect id="item" x="0" width="100%" :y="varposition" height="50" style="fill:gray">hello</rect>
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="1000"
        style="stroke:gray;stroke-width:20"
        stroke-dasharray="5"
      />
    </svg>
  </div>
</template>
<style scoped>
input[type="range"] {
  width: 100%;
}
.flipped {
  transform: scale(-1, 1);
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
      varposition: 100,
      xmax: 0,
      manager: manager
    };
  },
  props: {
    title: String,
    flipped: Boolean
  },
  methods: {
    showRobotDetail: function() {
      let currentTime = Date.now();
      if (currentTime - lastClicked >= doubleClickDelay)
        lastClicked = currentTime;
      // double click to open the dialog
      else {
        dialogParameter.title = this.title;
        this.$dialog
          .alert(this.title, {
            view: "robot-detail",
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
    moveSlider: function(event) {
      // console.log(this.$refs.cont)
      // var parent = document.document.getElementsByClassName("container");
    },
    recalibrate: function(event) {
      console.log("recalibrating");
      event.stopPropagation();
    },
    manualMode: function(event) {
      console.log("manual mode");
      event.stopPropagation();
    }
  },
  components: {
    speedometer: require("./Speedometer").default
  },
  computed: {
    color: function() {
      if (this.status !== "online") return "red";
      return this.state === "STARTED" ? "lightgreen" : "orange";
    }
  },
  mounted() {
    // console.log(this.$refs.cont.clientWidth);
  }
};
</script>