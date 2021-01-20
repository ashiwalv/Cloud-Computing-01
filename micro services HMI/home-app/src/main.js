import Vue from 'vue'
import App from './App.vue'
import Router from "vue-router";
import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import singleSpaVue from 'single-spa-vue';
import ParcelPage from './components/parcelpage.vue'

Vue.config.productionTip = false

Vue.use(Router);
Vue.use(BootstrapVue)

export var mountParcel;

const router = new Router({
  routes: [

    {
      path: "/",
      name: "parcelPage",
      component: ParcelPage
    }
  ]
});

const singleSpa = singleSpaVue({
  Vue,
  appOptions: {
    render: (h) => h(App),
    router,
  }
});

export const bootstrap = [
  (props) => {
    mountParcel = props.mountParcel
    return Promise.resolve()
  }
];
export const mount = [
  singleSpa.mount
];
export const unmount = [
  singleSpa.unmount
];

// import './set-public-path';
// import Vue from 'vue';
// import singleSpaVue from 'single-spa-vue';
// import BootstrapVue from 'bootstrap-vue'

// import App from './App.vue';

// Vue.config.productionTip = false;

// Vue.use(BootstrapVue);

// export var mountParcel;
// const vueLifecycles = singleSpaVue({
//   Vue,
//   appOptions: {
//     render: (h) => h(App),
//   },
// });
// export const bootstrap = [
//   (props) => {
//     mountParcel = props.mountParcel;
//     return Promise.resolve();
//   }
// ]
// export const mount = [
//   vueLifecycles.mount
// ];
// export const unmount = [
//   vueLifecycles.unmount
// ];