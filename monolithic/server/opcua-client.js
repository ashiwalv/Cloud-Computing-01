var opcua = require("node-opcua");
var async = require("async");
const makeBrowsePath = opcua.makeBrowsePath;
var connections = {}
let keepAlive = []
initializing = [];
let maxRetries = 1;

function getSession(url, successCallback, errorCallback, retries = 0) {
    if (connections[url]) {
        successCallback(connections[url].session, connections[url].subscription);
        return;
    }
    if (initializing[url]) {
        if (retries < maxRetries) setTimeout(function () { getSession(url, successCallback, errorCallback, retries + 1) }, 1000);
        else if (retries == maxRetries && errorCallback) errorCallback();
        return;
    }
    initializing[url] = true;

    var client = new opcua.OPCUAClient();
    var endpointUrl = "opc.tcp://" + url;
    console.log("connecting to:", endpointUrl);

    async.series([
        // step 1 : connect to
        function (callback) {
            console.log("trying to connect to:", url);
            client.connect(endpointUrl, function (err) {
                if (err) {
                    console.log("cannot connect to endpoint:", endpointUrl);
                } else {
                    console.log("connected to:", endpointUrl);
                }
                callback(err);
            });
        },
        // step 2 : createSession
        function (callback) {
            console.log("trying to create session for:", url);
            client.createSession(function (err, session) {
                if (!err) {
                    the_subscription = new opcua.ClientSubscription(session, {
                        requestedPublishingInterval: 100,
                        requestedLifetimeCount: 10,
                        requestedMaxKeepAliveCount: 2,
                        publishingEnabled: true,
                        priority: 10
                    });
                    the_subscription.on("keepalive", function () {
                        keepAlive[url] = Date.now();
                    });
                    console.log("created session for: " + endpointUrl);
                    session.url = url;
                    connections[url] = { "session": session, "subscription": the_subscription };
                    successCallback(session, the_subscription);
                }
                callback(err);
            });
        }],
        function (err) {
            if (err) {
                console.error(err);
                if (errorCallback) errorCallback();
            }
            initializing[url] = false;
        },
    );
}

function readVariable(session, query, key, callback) {
    session.readVariableValue(query, function (err, dataValue) {
        if (!err) {
            callback(key, dataValue);
        } else {
            console.error("error in readVariable", err);
        }
    });
}

function getQuery(session, browsePath, callback) {
    browsePath = makeBrowsePath("RootFolder", browsePath);
    session.translateBrowsePath(browsePath, function (err, results) {
        if (err) {
            console.error("error in get query: " + err);
            if (connections[session.url]) connections[session.url].subscription.terminate();
            connections[session.url] = null;
        } else {
            if (results.targets) callback("" + results.targets[0].targetId);
        }
    });
}


exports.subscribe = function (key, url, browsePath, request, callback) {
    getSession(url, function (session, subscription) {
        getQuery(session, browsePath, function (query) {
            readVariable(session, query, key, callback);
            setTimeout(() => {
                readVariable(session, query, key, callback);
            }, 3000);

            // install monitored item
            var monitoredItem = subscription.monitor({
                nodeId: opcua.resolveNodeId(query),
                attributeId: opcua.AttributeIds.Value
            },
                {
                    samplingInterval: 100,
                    discardOldest: true,
                    queueSize: 10
                },
                opcua.read_service.TimestampsToReturn.Both
            );

            request.monitoredItems.push(monitoredItem);
            monitoredItem.on("changed", function (dataValue) {
                keepAlive[url] = Date.now(); // received a value => alive
                callback(key, dataValue);
            });
        });
    });
}
exports.unsubscribe = function (req) {
    if (req.monitoredItems) {
        req.monitoredItems.forEach(item => {
            try {
                item.terminate(e => { });
            }
            catch (e) { }
        });
        req.monitoredItems = [];
    }
}

exports.writeVariable = function (url, browsePath, value, callback) {
    getSession(url, function (session, subscription) {
        getQuery(session, browsePath, function (query) {
            var node = {
                nodeId: query,
                attributeId: opcua.AttributeIds.Value,
                indexRange: null,
                value: {
                    value: {
                        dataType: opcua.DataType.Int16,
                        value: value
                    }
                }
            };
            session.write(node, function (err, statusCode, diagnosticInfo) {
                if (!err) {
                    console.log(" write ok");
                    console.log(diagnosticInfo);
                    console.log(statusCode);
                } else console.error("error when writing variable: " + err);
            });
        });
    });
}
exports.callMethod = function (url, browsePathObject, browsePathMethod, callback) {
    getSession(url, function (session, subscription) {
        getQuery(session, browsePathObject, function (objectId) {
            getQuery(session, browsePathMethod, function (methodId) {
                var method = {
                    objectId: objectId,
                    methodId: methodId
                };
                session.call(method, function (err, result) {
                    if (err) console.error(err);
                    else console.log("method call successful");
                });
            });
        })
    });
};

exports.subscribeAndCheckNodeStatus = function (url, req, callback, errorCallback) { // calls the callback if the node is up
    getSession(url, function (session, subscription) {
        try {
            if (session) session.browse("RootFolder", function (err, browseResult) {
                if (!err) {
                    if (!req.failed) req.failed = [];
                    if (!req.monitoredItems) req.monitoredItems = [];
                    req.failed[url] = false;
                    callback();
                    checkNodeStatus(url, req, callback, errorCallback);
                }
                else {
                    console.error(url, "down");
                    handleError(url, req, callback, errorCallback);
                }
            });
        } catch (e) {
            console.error(url, "down");
            handleError(url, req, callback, errorCallback);
        }
    }, () => {
        handleError(url, req, callback, errorCallback);
    });
}

function checkNodeStatus(url, req, callback, errorCallback) {
    if (req.closed) return;
    let diff = (Date.now() - keepAlive[url]) / 1000;
    if (diff > 5 || req.failed[url]) {
        console.log("keepalive missing, trying to reconnect:", url);
        req.failed[url] = true;
        handleError(url, req, callback, errorCallback);
    } else {
        setTimeout(() => {
            checkNodeStatus(url, req, callback, errorCallback);
        }, 3000);
    }
}

function handleError(url, req, callback, errorCallback) {
    if (req.closed) return;
    connections[url] = null;
    errorCallback();
    setTimeout(() => {
        module.exports.subscribeAndCheckNodeStatus(url, req, callback, errorCallback);
    }, 300);
}
