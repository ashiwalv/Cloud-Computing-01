<template>
  <div>
    <h1>Create order</h1>

    <form>
      <div class="form-group">
        <label for="inputName" class="col-3 col-form-label">Name</label>
        <div class="col-3">
          <input v-model="order.name" @change="changeUserName" class="form-control" id="inputName" />
        </div>
      </div>
      <div class="form-group">
        <label for="inputCola" class="col-3 col-form-label">Cola</label>
        <div class="col-3">
          <input
            type="number"
            v-model.number="order.cola"
            min="0"
            :max="4"
            class="form-control"
            id="inputCola"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputRaspberry" class="col-3 col-form-label">Raspberry</label>
        <div class="col-3">
          <input
            type="number"
            v-model.number="order.raspberry"
            min="0"
            :max="4"
            class="form-control"
            id="inputRaspberry"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputLemon" class="col-3 col-form-label">Lemon</label>
        <div class="col-3">
          <input
            type="number"
            v-model.number="order.lemon"
            min="0"
            :max="4"
            class="form-control"
            id="inputLemon"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputStrawberry" class="col-3 col-form-label">Strawberry</label>
        <div class="col-3">
          <input
            type="number"
            v-model.number="order.strawberry"
            min="0"
            :max="4"
            class="form-control"
            id="inputStrawberry"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputOrange" class="col-3 col-form-label">Orange</label>
        <div class="col-3">
          <input
            type="number"
            v-model.number="order.orange"
            min="0"
            :max="4"
            class="form-control"
            id="inputOrange"
          />
        </div>
      </div>
      <div class="form-group">
        <div class="col-3">
          <button
            @click="createOrder"
            :disabled="!orderValid"
            class="btn btn-primary float-right"
          >Create order</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
const manager = require("../opcua-manager");

export default {
  data: function() {
    return {
      order: {
        name: null,
        cola: 0,
        raspberry: 0,
        lemon: 0,
        strawberry: 0,
        orange: 0
      }
    };
  },
  mounted() {
    this.order.name = this.$root.userName;
  },
  computed: {
    orderQuantity: function() {
      return (
        parseInt(this.order.cola) +
        parseInt(this.order.raspberry) +
        parseInt(this.order.lemon) +
        parseInt(this.order.strawberry) +
        parseInt(this.order.orange)
      );
    },  
    orderValid: function() {
      return (
        this.order.name && this.orderQuantity > 0 && this.orderQuantity <= 4
      );
    }
  },
  methods: {
    createOrder: function(event) {
      console.log("creating order");
      manager.createOrder(this.order);
    },
    changeUserName: function(event) {
      this.$root.userName = this.order.name;
    }
  }
};
</script>