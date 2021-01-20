<template>
  <div>
    <h1>View orders for {{ name }}</h1>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="row" />
          <th
            scope="row"
            @click="sortBy('waitingTime')"
          >Created</th>
          <th
            scope="row"
            v-for="key in columns"
            :key="key"
            @click="sortBy(key)"
          >{{key | capitalize}}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
        >
          <td>
            <button
              class="btn btn-primary"
              @click="cancelOrder(order)"
              :disabled="order.state!='waiting'"
            >Cancel</button>
          </td>
          <td>{{order.waitingTime | formatDate}}</td>
          <td
            v-for="key in columns"
            :key="key"
          >{{order[key]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
const manager = require("../opcua-manager");
const utils = require("../utils");
export default {
  data: function() {
    return {
      name: null,
      orders: [],
      columns: ["state", "cola", "raspberry", "lemon", "strawberry", "orange"],
      sortOrders: {}
    };
  },
  methods: {
    getOrders: function() {
      manager.getOrders(this.name, orders => {
        console.log("received orders:", orders);
        this.orders = orders;
      });
    },
    sortBy: function(key) {
      let sortOrder = this.sortOrders[key] || 1;
      this.sortOrders[key] = sortOrder * -1;
      this.orders = this.orders.sort((a, b) => {
        a = a[key];
        b = b[key];
        console.log(a, b, key);
        return (a === b ? 0 : a > b ? 1 : -1) * sortOrder;
      });
    },
    cancelOrder: function(order) {
      manager.cancelOrder(order, () => {
        this.getOrders();
      });
    }
  },
  filters: {
    capitalize: str => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    formatDate: timestamp => {
      return utils.formatDate(timestamp);
    }
  },
  mounted() {
    this.name = this.$root.userName;
    this.getOrders();
  }
};
</script>