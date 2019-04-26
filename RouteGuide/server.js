const fs = require('fs');
const parseArgs = require('minimist');
const path = require('path');
const _ = require('lodash');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const routeguide = grpc.loadPackageDefinition(packageDefinition).routeguide;

const PROTO_PATH = __dirname + './route_guide.proto';

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

var COORD_FACTOR = 1e7;

/**
 * getFeature request handler. Gets a request with a point, and responds with a
 * feature object indicating whether there is a feature at that point.
 * @param {EventEmitter} call Call object for the handler to process
 * @param {function(Error, feature)} callback Response callback
 */
const getFeature = (call, callback) => {
    callback(null, (call) => {

    });
}



