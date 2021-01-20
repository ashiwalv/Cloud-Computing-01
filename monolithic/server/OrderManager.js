const databaseManager = require('./DatabaseManager');

let stateEnum = {
    waiting: "waiting", inprocess: "in process", canceled: "canceled", aborted: "aborted", done: "done", "hold": "on hold"
}

let orders = databaseManager.load();

exports.createOrder = function (order) {
    order.state = stateEnum.waiting;
    order.waitingTime = Date.now();
    order.id = orders.length + 1;
    console.log("received order:", order);
    orders.push(order);
    databaseManager.save(orders);
};

exports.getOrders = function (name) {
    if (!name) return orders;
    return orders.filter(o => o.name === name);
}

exports.cancelOrder = function (id) {
    let index = orders.findIndex(order => order.id == id && order.state === stateEnum.waiting);
    if (index < 0) return false;
    console.log("idx:", index);

    orders[index].state = stateEnum.canceled;
    orders[index].canceledTime = Date.now();
    databaseManager.save(orders);
    return true;
}
exports.abortOrder = function (id) {
    let index = orders.findIndex(order => order.id == id && order.state === stateEnum.inprocess);
    console.log("idx:", index);
    if (index < 0) return false;

    orders[index].state = stateEnum.aborted;
    orders[index].abortedTime = Date.now();
    databaseManager.save(orders);
    return true;
}
exports.holdOrder = function (id) {
    let index = orders.findIndex(order => order.id == id && order.state === stateEnum.inprocess);
    console.log("idx:", index);
    if (index < 0) return false;

    orders[index].state = stateEnum.hold;
    orders[index].holdTime = Date.now();
    databaseManager.save(orders);
    return true;
}