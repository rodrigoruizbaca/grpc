const messages = require('./static_codegen/pingpong_pb');
const services = require('./static_codegen/pingpong_grpc_pb');
const grpc = require('grpc');

const ping = (call, callback) => {
    const reply = new messages.PingPongResponse();
    reply.setMessage('Pong');
    callback(null, reply);
}

function main() {
    var server = new grpc.Server();
    server.addService(services.PingPongService, {ping});
    server.bind('0.0.0.0:3000', grpc.ServerCredentials.createInsecure());
    console.log('Server running at http://0.0.0.0:3000');
    server.start();
  }
  
  main();