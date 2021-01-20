<template>
  <div class="grid-container">
    <sorting class="sorting" title="Sorting robot" :flipped="true" />
  </div>
</template>

<script>
import sorting from "./components/Robot";

export default {
  name: "App",
  components: {
    sorting
  }
};
</script>

<style>
</style>
