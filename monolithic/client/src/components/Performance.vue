<template>
  <div style="margin:10px;">
    <div style="margin-bottom: 10px;">
      Number of messages:
      <input
        type="text"
        v-model="count"
        placeholder="Number of messages"
        :disabled="disabled"
      />
      Number of test runs:
      <input
        type="text"
        v-model="runs"
        placeholder="Number of test runs"
        :disabled="disabled"
      />

      <button
        @click="getSSE"
        :disabled="disabled"
      >Get Server Sent Events</button>
    </div>
    <table
      v-if="results"
      class="table table-striped table-bordered"
    >
      <thead>
        <tr>
          <th>Messages</th>
          <th>Run</th>
          <th>Received</th>
          <th>Minimum delay (ms)</th>
          <th>Maximum delay (ms)</th>
          <th>Standard deviation (ms)</th>
          <th>Average delay (ms)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="result in results"
          :key="result.id"
        >
          <td>{{result.messages}}</td>
          <td>{{result.run}}</td>
          <td>{{result.received}}</td>
          <td>{{Math.min(...result.values)}}</td>
          <td>{{Math.max(...result.values)}}</td>
          <td>{{calculateStandardDeviation(result.values).toFixed(2)}}</td>
          <td>{{result.values ? (result.values.reduce((a,b) => a + b,0)/result.values.length).toFixed(2) : 0 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.wrapper > div {
  float: left;

  width: 450px;

  background-color: #dcdcdc;

  margin: 0 5px 5px 0;
}
</style>
<script>
const manager = require("../opcua-manager");

export default {
  mounted() {
  },
  data: function() {
    return {
      count: 10,
      runs: 10,
      disabled: false,
      results: []
    };
  },
  computed: {
    averageDelay: function() {
      if (this.receivedCount > 0)
        return parseInt(this.packetDelay / this.receivedCount);
      return 0;
    }
  },
  methods: {
    calculateStandardDeviation(array) {
      // https://stackoverflow.com/questions/7343890/standard-deviation-javascript
      const n = array.length;
      if (n == 0) return 0;
      const mean = array.reduce((a, b) => a + b) / n;
      return Math.sqrt(
        array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
      );
    },
    getSSE: async function() {
      this.disabled = true;
      this.results = [];
      let a = 1,
        b = 1;
      while (a < this.count) {
        let tmp = a;
        a = b;
        b += tmp;
        let result = {
          id: a,
          messages: a,
          values: []
        };
        this.results.push(result);
        for (let i = 0; i < this.runs; i++) {
          result.run = i + 1;
          result.received = 0;
          await this.startRun(result);
        }
      }

      this.disabled = false;
    },
    startRun: function(result) {
      return new Promise(resolve => {
        let started = false;
        manager.subscribePerformance(
          "performance",
          this,
          result.messages,
          (context, value) => {
            if (value === "start") {
              started = true;
            } else if (started) {
              result.received++;
              if (result.received >= result.messages) {
                result.values.push(new Date().getTime() - value);
                manager.close();
                started = false;
                resolve();
              }
            }
          }
        );
      });
    }
  }
};
</script>