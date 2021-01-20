<template>
  <div
    class="factory-item"
    style="height:100%;"
  >
    <h2>Rack</h2>

    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <img
          src="../../img/cola.jpg"
          class="maom-image"
        />
        <font
          style="margin-left:5px"
          size="5"
        >{{cola}}</font>
      </li>
      <li class="list-group-item">
        <img
          src="../../img/raspberry.jpg"
          class="maom-image"
        />
        <font
          style="margin-left:5px;"
          size="5"
        >{{raspberry}}</font>
      </li>
      <li class="list-group-item">
        <img
          src="../../img/lemon.jpg"
          class="maom-image"
        />
        <font
          style="margin-left:5px;"
          size="5"
        >{{lemon}}</font>
      </li>
      <li class="list-group-item">
        <img
          src="../../img/strawberry.jpg"
          class="maom-image"
        />
        <font
          style="margin-left:5px;"
          size="5"
        >{{strawberry}}</font>
      </li>
      <li class="list-group-item">
        <img
          src="../../img/orange.jpg"
          class="maom-image"
        />
        <font
          style="margin-left:5px;"
          size="5"
        >{{orange}}</font>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      cola: 1,
      raspberry: 3,
      lemon: 5,
      strawberry: 10,
      orange: 78,
    };
  }
};
</script>