
import './set-public-path';
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';

Vue.config.productionTip = false;



import VuejsDialogsorting from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
// Vue.use(VuejsDialogsorting, {
//   backdropClose: true,
// });
import sortingDetail from './components/RobotDetail';
Vue.dialog.registerComponent("sorting-detail", sortingDetail);
export const dialogParameter = {};

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h) => h(App),
    // el: '#app'
  },
});


export const name = "vue-parcel";

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;




// dialog
// import VuejsDialog from 'vuejs-dialog';
// import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js';
// import 'vuejs-dialog/dist/vuejs-dialog.min.css';
// Vue.use(VuejsDialog);
// // register detail views for dialog
// import RobotDetail from './components/RobotDetail';

// Vue.dialog.registerComponent("robot-detail", RobotDetail);




//import Vue from 'vue'
// import Home from './components/Home.vue'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import singleSpaVue from 'single-spa-vue';

// Vue.config.productionTip = false

// Vue.use(BootstrapVue)

// const singleSpa = singleSpaVue({
//   Vue,
//   appOptions: {
//     render: (h) => h(Home),
//     el: '#app'
//   }
// });

// /*const vueParcel = {
//   name: "vue-parcel",
//   bootstrap: singleSpa.bootstrap(),
//   mount: singleSpa.mount(),
//   unmount: singleSpa.unmount()
// }*/

// export const name = "vue-parcel";

// export const bootstrap = singleSpa.bootstrap;

// export const mount = singleSpa.mount;

// export const unmount = singleSpa.unmount;
