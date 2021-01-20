const axios = require("axios");
let serverAddress = require("../client.config").webserver;
if (!serverAddress.startsWith("http")) serverAddress = "http://" + serverAddress;
if (!serverAddress.endsWith("/")) serverAddress += "/";
let vueInstance = null, initializing;
let cache = {}

exports.initialize = function (vue, address = null, count = null) {
    if (!vueInstance) { // just get the vue instance from main, the real initializing can occur later
        vueInstance = vue;
    }
    else {
        initializing = true;
        if (!address) address = serverAddress;
        axios.get(address).then(() => {
            address = `${address}subscribe`
            if (count) address += "?count=" + count;
            console.log("initializing connection to:", address);
            vueInstance.SSE(address, {
                format: "json"
            }).then(sse => {
                console.log("initialized connection to:", address);
                sse.onError(e => {
                    console.log("connection interrupted");
                })
                this.connection = sse;
                initializing = false;
            });
        }).catch(() => {
            setTimeout(() => {
                console.log(`cannot connect to webserver: ${serverAddress}, retrying...`);
                this.initialize(vue, address, count);
            }, 3000);
        });
    }
}

exports.subscribe = function (event, context, callback) {
    if (!this.connection) {
        if (!initializing) {
            this.initialize();
        }
        setTimeout(() => {
            this.subscribe(event, context, callback);
        }, 10);
        return;
    }
    this.connection.subscribe(event, data => {
        cache[event] = data.value.value;
        callback(context, data.value.value);
    });
    if (cache[event]) callback(context, cache[event]);
}

exports.subscribePerformance = function (event, context, count, callback) {
    this.close();
    this.initialize(null, serverAddress + "performance/", count);
    setTimeout(() => {
        this.subscribe(event, context, callback);
    }, 10);

}

exports.write = function (node, property, value) {
    axios.post(`${serverAddress}write`, {
        "node": node,
        "property": property,
        "value": value
    });
}

exports.call = function (node, method) {
    axios.post(`${serverAddress}call`, {
        "node": node,
        "method": method
    });
}

exports.close = function () {
    if (this.connection) {
        console.log("closing connection");
        this.connection.close();
        this.connection = null;
    }
};

exports.createOrder = function (order) {
    axios.post(`${serverAddress}createOrder`, { "order": order });
}

exports.getOrders = function (name, callback) {
    axios.get(`${serverAddress}getOrders?name=${name}`).then(resp => {
        callback(resp.data);
    });
}

exports.cancelOrder = function (order, callback) {
    axios.post(`${serverAddress}cancelOrder`, { "id": order.id }).then(() => {
        callback();
    });
}

exports.abortOrder = function (order, callback) {
    axios.post(`${serverAddress}abortOrder`, { "id": order.id }).then(() => {
        callback();
    });
}

exports.holdOrder = function (order, callback) {
    axios.post(`${serverAddress}holdOrder`, { "id": order.id }).then(() => {
        callback();
    });
}
