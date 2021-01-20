<template>
  <div class="grid-container">
    <picking class="picking" title="Picking Robot" />
  </div>
</template>

<script>
import picking from "./components/Robot";

export default {
  name: "App",
  components: {
    picking
  }
};
</script>

<style>
</style>
