<template>
  <div>
    <h1>
      Factory view
      <button
        @click="startStop"
        class="btn btn-default"
        title="Start/Stop"
      >
        <img
          src="../../img/power.svg"
          width="35"
        />
      </button>
      <label
        v-if="state!=='STARTED'"
        class="warning"
      >STOPPED</label>
    </h1>

    <div>
      <div class="grid-container">
        <div class="supply">
          <Conveyor conv="Supply" />
        </div>
        <div class="sorting">
          <Robot title="Sorting robot" :flipped="true"/>
        </div>
        <div class="picking">
          <Robot title="Picking robot" />
        </div>
        <div class="rack">
          <Rack />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.warning {
  color: orange;
  font-size: large;
  padding: 0 10px;
}
.supply {
  grid-column: 1/3;
}
.sorting {
  grid-column: 3;
  grid-row: 1/3;
}
.picking {
  grid-column: 1;
  grid-row: 2/4;
}
.rack {
  grid-column: 2;
  grid-row: 2/4;
}

.grid-container {
  display: grid;
  grid-gap: 5px;
  grid-template-rows: 200px 350px 200px;
  grid-template-columns: repeat(3, 250px);
  }

.grid-container > div {
  background-color: #DCDCDC;
  padding: 20px 0;
}
</style>

<script>
import Conveyor from "./Conveyor";
import Robot from "./Robot";
import Rack from "./Rack";
const manager = require("../opcua-manager");

export default {
  data: function() {
    return {
      // conv1: config.conv,
      state: null,
      manager: manager
    };
  },
  components: {
    Conveyor,
    Robot,
    Rack
  },
  mounted() {
    this.manager.subscribe(`Supply.state`, this, function(context, value) {
      context.state = value;
    });
  },
  beforeDestroy() {
    this.manager.close();
  },
  methods: {
    startStop: function(event) {
      this.manager.call("Supply", "start_stop");
    }
  }
};
</script>