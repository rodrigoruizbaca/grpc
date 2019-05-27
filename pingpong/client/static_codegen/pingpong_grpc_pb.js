// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var pingpong_pb = require('./pingpong_pb.js');

function serialize_pingpoong_Empty(arg) {
  if (!(arg instanceof pingpong_pb.Empty)) {
    throw new Error('Expected argument of type pingpoong.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pingpoong_Empty(buffer_arg) {
  return pingpong_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pingpoong_PingPongResponse(arg) {
  if (!(arg instanceof pingpong_pb.PingPongResponse)) {
    throw new Error('Expected argument of type pingpoong.PingPongResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pingpoong_PingPongResponse(buffer_arg) {
  return pingpong_pb.PingPongResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PingPongService = exports.PingPongService = {
  // Sends a greeting
  ping: {
    path: '/pingpoong.PingPong/ping',
    requestStream: false,
    responseStream: false,
    requestType: pingpong_pb.Empty,
    responseType: pingpong_pb.PingPongResponse,
    requestSerialize: serialize_pingpoong_Empty,
    requestDeserialize: deserialize_pingpoong_Empty,
    responseSerialize: serialize_pingpoong_PingPongResponse,
    responseDeserialize: deserialize_pingpoong_PingPongResponse,
  },
};

exports.PingPongClient = grpc.makeGenericClientConstructor(PingPongService);
