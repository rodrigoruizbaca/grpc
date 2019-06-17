
const LoadBalancer = require('./loadbalancer/LoadBalancer');
const messages = require('./static_codegen/pingpong_pb');
const services = require('./static_codegen/pingpong_grpc_pb');
const grpc = require('grpc');


const doPing = (connection) => {

    const promise = new Promise((resolve, reject) => {
        connection.ping(new messages.Empty(), function (err, response) {
            if (err) {
                reject(err)
            } else {
                resolve(response.getMessage());
            }            
        });
    });
    return promise;
}

const main = async() => {
    const client = new services.PingPongClient('localhost:10000', grpc.credentials.createInsecure());
    while (true) {
        const res = await doPing(client);
        console.log(`Doing ping, response -> ${res}`);
        var waitTill = new Date(new Date().getTime() + 1 * 1000);
        while(waitTill > new Date()){}
    }
    /*loadBalancer = new LoadBalancer();

    await loadBalancer.refresh(true);
    while (true) {
        const conn = await loadBalancer.getEndpoint('grpc-pingpong-service');
        if (conn) {
            const client = conn.client;
            try {
                const res = await doPing(client);
                console.log(`Doing ping to ${conn.url}, response -> ${res}`);
            } catch (err) {
                console.log(`Error trying to call the service, refreshing the endpoints list`);
                await loadBalancer.refresh(true);
            } 
        } else {
            console.log(`No available endpoints at this moment`);
            await loadBalancer.refresh(true);
        }               
    }*/
}
main();