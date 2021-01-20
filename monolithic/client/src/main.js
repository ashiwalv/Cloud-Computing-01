import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueSSE from 'vue-sse';
import routes from './routes';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueSSE);

// dialog
import VuejsDialog from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
Vue.use(VuejsDialog, {
    backdropClose: true,
});
// register detail views for dialog
import RobotDetail from './components/RobotDetail';
import ConveyorDetail from './components/ConveyorDetail';
Vue.dialog.registerComponent("robot-detail", RobotDetail);
Vue.dialog.registerComponent("conveyor-detail", ConveyorDetail);

import "./global.css";
const router = new VueRouter({ routes });
require('./opcua-manager').initialize(Vue);

export const dialogParameter = {};
console.log("initializing app");

new Vue({
    router,
    render: h => h(App),
    data: function () {
        return {
            userName: "abc",
        }
    }
}).$mount('#app');