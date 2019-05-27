const messages = require('./static_codegen/pingpong_pb');
const services = require('./static_codegen/pingpong_grpc_pb');
const grpc = require('grpc');

function main() {
    const client = new services.PingPongClient('localhost:50051', grpc.credentials.createInsecure());
    client.ping(new messages.Empty(), function (err, response) {
        console.log(response.getMessage());
    });
}

main();