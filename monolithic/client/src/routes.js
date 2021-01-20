// import Home from './components/Home.vue';
import Hmi from './components/Hmi.vue';
import CustomerCreateOrder from './components/CustomerCreateOrder.vue';
import CustomerViewOrders from './components/CustomerViewOrders.vue';
import ProductionManagerViewOrders from './components/ProductionManagerViewOrders.vue';
import Performance from './components/Performance.vue';

const routes = [
    { path: '/', component: Hmi },
    { path: '/hmi', component: Hmi },
    { path: '/performance', component: Performance },
    { path: '/customer/createorder', component: CustomerCreateOrder },
    { path: '/customer/vieworders', component: CustomerViewOrders },
    { path: '/pm/vieworders', component: ProductionManagerViewOrders },
    
];

export default routes;