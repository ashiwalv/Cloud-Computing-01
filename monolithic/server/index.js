var app = require('express')();
var http = require('http').createServer(app);
const client = require('./opcua-client');
var bodyParser = require('body-parser')
const config = require('./config.json');
const orderManager = require('./OrderManager');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

var OPCUAClient = require('./opcua-client');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/subscribe', function (req, res) {
    req.on('close', () => {
        req.closed = true;
        client.unsubscribe(req);
    });
    res.writeHead(200, {
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*"
    });
    for (let key in config) {
        node = config[key];
        let url = node["_url"];
        if (url) { // opcua connection
            client.subscribeAndCheckNodeStatus(url, req, () => {
                subscribe(key, node, url, req, res);
            }, () => {
                sendStatus(key, "offline", res);
            });
        }
    }
});

app.get('/performance/subscribe', function (req, res) {
    res.writeHead(200, {
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*"
    });
    res.write(`data: preparing performance run\n\n`);
    setTimeout(() => {
        res.write(`event: performance\n`);
        res.write(`data: ${JSON.stringify({ value: { value: "start" } })}\n\n`);
        let startTime = new Date().getTime();
        for (let i = 0; i < req.query.count; i++) {
            res.write(`event: performance\n`);
            res.write(`data: ${JSON.stringify({ value: { value: `${new Date().getTime()}` } })}\n\n`);
        }
    }, 300); // ensure that the client is ready to receive updates
});
app.get('/performance/', (req, res) => res.sendStatus(200));

app.post('/write', function (req, res) {
    let url = config[req.body.node]._url;
    let prop = req.body.property;
    let value = req.body.value;
    let browsePath = config[req.body.node][prop];
    client.writeVariable(url, browsePath, value);
    res.sendStatus(200);
});
app.post('/call', function (req, res) {
    let node = config[req.body.node];
    let method = node[req.body.method];
    console.log(`${node._url}; ${node.browsePath}; ${method}`);
    client.callMethod(node._url, node.browsePath, method);
    res.sendStatus(200);
});

// Orders
/////////
app.post('/createOrder', function (req, res) {
    orderManager.createOrder(req.body.order);
    res.sendStatus(200);
});

app.get('/getOrders', function (req, res) {
    let name = req.query.name;
    console.log("viewing orders for:", name);
    res.send(orderManager.getOrders(name));
});

app.post('/cancelOrder', function (req, res) {
    if (orderManager.cancelOrder(req.body.id))
        res.sendStatus(200);
    else
        res.sendStatus(400);
});

app.post('/abortOrder', function (req, res) {
    if (orderManager.abortOrder(req.body.id))
        res.sendStatus(200);
    else
        res.sendStatus(400);
});

app.post('/holdOrder', function (req, res) {
    console.log("receive hold order");
    if (orderManager.holdOrder(req.body.id))
        res.sendStatus(200);
    else
        res.sendStatus(400);
});



http.listen(3000, function () {
    console.log('listening on *:3000');
});

// private methods
///////////////////

function subscribe(key, node, url, req, res) {
    for (let prop in node) {
        if (prop != "_url") {
            client.subscribe(`${key}.${prop}`, url, node[prop], req, (event, data) => {
                //   console.log(`status-code: ${data.statusCode}, prop: ${key}.${prop}`);
                if (data.statusCode.value === 0) {
                    res.write(`event: ${event}\n`);
                    res.write(`data: ${JSON.stringify(data)}\n\n`);
                    sendStatus(key, "online", res);
                } else if (data.statusCode.value === 2150891520) { // bad node id, occurs when connection to node is lost
                    console.log(url, "is offline");
                    sendStatus(key, "offline", res);
                    req.failed[url] = true;
                }
            })
        }
    }
}

function sendStatus(node, status, res) {
    res.write(`event: ${node}._status\n`);
    res.write(`data: ${JSON.stringify({ value: { value: status } })}\n\n`);
}
