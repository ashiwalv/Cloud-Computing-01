import './set-public-path';
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';

Vue.config.productionTip = false;


import VuejsDialogpicking from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import robotDetail from './components/RobotDetail';
Vue.use(VuejsDialogpicking, {
  backdropClose: true,
});

Vue.dialog.registerComponent("robot-detail", robotDetail);
export const dialogParameter = {};

require('./opcua-manager').initialize(Vue);
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h) => h(App),
    // el: '#app'
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
