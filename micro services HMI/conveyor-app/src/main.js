import './set-public-path';
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

import VueSSE from 'vue-sse';
import App from './App.vue';

Vue.config.productionTip = false;
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(VueSSE);
//dialog
import VuejsDialogpicking from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
// Vue.use(VuejsDialogpicking, {
//   backdropClose: true,
// });

import ConveyorDetail from './components/ConveyorDetail';

Vue.dialog.registerComponent("conveyor-detail", ConveyorDetail);

export const dialogParameter = {};


require('./opcua-manager').initialize(Vue);

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h) => h(App),
    // el: '#app'
  },
  data: function () {
    return {
      userName: "abc",
    }
  }
})


export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;