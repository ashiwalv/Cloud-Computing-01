<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg">
      <!-- <router-link to="/" class="nav-link">Home</router-link> -->
      <router-link to="/customer/createorder" class="nav-link">Create order</router-link>
      <router-link to="/customer/vieworders" class="nav-link">View orders</router-link>
      <router-link to="/pm/vieworders" class="nav-link">Production manager</router-link>
      <router-link to="/hmi" class="nav-link">HMI</router-link>
      <router-link to="/performance" class="nav-link">Performance</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
  }
};
</script>