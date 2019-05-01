// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var notes_pb = require('./notes_pb.js');

function serialize_notes_Empty(arg) {
  if (!(arg instanceof notes_pb.Empty)) {
    throw new Error('Expected argument of type notes.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notes_Empty(buffer_arg) {
  return notes_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notes_Message(arg) {
  if (!(arg instanceof notes_pb.Message)) {
    throw new Error('Expected argument of type notes.Message');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notes_Message(buffer_arg) {
  return notes_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notes_NoteList(arg) {
  if (!(arg instanceof notes_pb.NoteList)) {
    throw new Error('Expected argument of type notes.NoteList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notes_NoteList(buffer_arg) {
  return notes_pb.NoteList.deserializeBinary(new Uint8Array(buffer_arg));
}


var NoteServiceService = exports.NoteServiceService = {
  list: {
    path: '/notes.NoteService/List',
    requestStream: false,
    responseStream: false,
    requestType: notes_pb.Empty,
    responseType: notes_pb.NoteList,
    requestSerialize: serialize_notes_Empty,
    requestDeserialize: deserialize_notes_Empty,
    responseSerialize: serialize_notes_NoteList,
    responseDeserialize: deserialize_notes_NoteList,
  },
  sayHello: {
    path: '/notes.NoteService/sayHello',
    requestStream: false,
    responseStream: false,
    requestType: notes_pb.Empty,
    responseType: notes_pb.Message,
    requestSerialize: serialize_notes_Empty,
    requestDeserialize: deserialize_notes_Empty,
    responseSerialize: serialize_notes_Message,
    responseDeserialize: deserialize_notes_Message,
  },
};

exports.NoteServiceClient = grpc.makeGenericClientConstructor(NoteServiceService);
