
const LoadBalancer = require('./loadbalancer/LoadBalancer');
const messages = require('./static_codegen/pingpong_pb');


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
    loadBalancer = new LoadBalancer();
    await loadBalancer.refresh();
    while (true) {
        const conn = await loadBalancer.getEndpoint('grpc-pingpong-service');
        const client = conn.client;
        try {
            const res = await doPing(client);
            console.log(`Doing ping to ${conn.url}, response -> ${res}`);
        } catch (err) {
            console.log(`Error trying to call the service, refreshing the endpoints list`);
            await loadBalancer.refresh();
        }        
    }
}
main();