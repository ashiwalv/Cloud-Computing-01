<template>
    <vue-speedometer
      :minValue="0"
      :maxValue="limit"
      :value="computedValue"
      needleTransition="easeElastic"
      :needleTransitionDuration="1000"
      :segmentColors="['gray', 'darkgray', 'lightgray']"
      :height="200"
      :currentValueText="currentValueText"
    />
</template>

<script>
import VueSpeedometer from "vue-speedometer";

export default {
  components: { VueSpeedometer },
  props: {
    maxValue: Number,
    value: Number
  },
  computed: {
    limit: function() {
      return this.maxValue ? this.maxValue : 100;
    },
    computedValue: function() {
      return this.value == 0 ? 0.001 : this.value; // control does not like going back to zero
    },
    currentValueText: function() {
      return this.value > 0.001 ? "${value}" : "0"
    }
  }
};
</script>