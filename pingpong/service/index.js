const messages = require('./static_codegen/pingpong_pb');
const services = require('./static_codegen/pingpong_grpc_pb');
const grpc = require('grpc');

const getLocalIp = () => {
    var os = require('os');
    var ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                console.log(ifname, iface.address);
            }
            ++alias;
        });
    });
};

const ping = (call, callback) => {
    const reply = new messages.PingPongResponse();

    reply.setMessage('Pong from ' + process.env.SERVER_NAME);
    callback(null, reply);
}

function main() {
    var server = new grpc.Server();
    server.addService(services.PingPongService, {
        ping
    });
    server.bind('0.0.0.0:3000', grpc.ServerCredentials.createInsecure());
    console.log('Server running at http://0.0.0.0:3000');
    server.start();
}

main();