<template>
  <div id="app">
    <div>
      <div id="conveyor-app" class="supply"></div>
      <div id="sorting-app" class="sorting"></div>
      <div id="picking-app" class="picking"></div>
    </div>
  </div>
</template>

<script>
import { mountRootParcel } from "single-spa";
import { mountParcel } from "../main.js";
export default {
  name: "parcelPage",
  data: function() {
    return {
      mountConv: true,
      mountSorting: true,
      mountPicking: true
    };
  },
  mounted() {
    this.loadParcel();
  },
  methods: {
    loadParcel() {
      /*global System*/
      const elNames = ["conveyor-app", "sorting-app", "picking-app"];
      var domElements;
      elNames.forEach(element => {
        var domElement = document.getElementById(element);
        const parcel = mountParcel(() => System.import(element), {
          domElement
        });
        // const parcel = mountRootParcel(() => System.import(element), {
        //   domElement
        // });
      });
    }
  }
};
</script>



