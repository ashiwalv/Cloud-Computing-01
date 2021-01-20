<template>
  <div>
    <h1 class="header">
      Factory view
      <button v-on:click="startstop" class="btn btn-default" title="Start/Stop">
        <img src="../img/power.svg" width="35" />
      </button>
      <label v-if="state!=='STARTED'" class="warning">STOPPED</label>
    </h1>
    <div class="grid-container">
      <div class="supply">
        <conv conv="Supply" />
      </div>
    </div>
  </div>
</template>

<script>
import conv from "./components/Conveyor";
const manager = require("./opcua-manager");
export default {
  name: "supply",
  data: function() {
    return {
      // conv1: config.conv,
      state: null,
      manager: manager
    };
  },
  components: {
    conv
  },
  mounted() {
    this.manager.subscribe(`Supply.state`, this, function(context, value) {
      context.state = value;
    });
  },
  methods: {
    startstop: function(event) {
      this.manager.call("Supply", "start_stop");
    }
  }
};
</script>

