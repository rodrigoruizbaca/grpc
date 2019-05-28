
const AWS = require('aws-sdk');
const _ = require('lodash');

const services = require('../static_codegen/pingpong_grpc_pb');
const grpc = require('grpc');

AWS.config.update({
    region: 'us-east-1'
});

module.exports = class LoadBalancer {
    constructor() {
        this.servicediscovery = new AWS.ServiceDiscovery();
        this.services = [];       
        this.next = 0;
    }

    refresh() {
        return this.servicediscovery.discoverInstances({
            NamespaceName: 'rbaca.grpc', /* required */
            ServiceName: 'grpc-discovery-service', /* required */
            HealthStatus: 'HEALTHY'
        }).promise().then(data => {
            data.Instances.forEach(s => {
                const url = `${s.Attributes.AWS_INSTANCE_IPV4}:${s.Attributes.AWS_INSTANCE_PORT}`;  
                const serviceName = s.Attributes.ECS_SERVICE_NAME;  
                const status = s.Attributes.AWS_INIT_HEALTH_STATUS;
                const client = new services.PingPongClient(url, grpc.credentials.createInsecure());
                const obj = {
                    url, serviceName, status, client
                }; 
                this.services.push(obj);            
            });
        });
    }

    getEndpoint(serviceName) {
        const possible = _.filter(this.services, ['serviceName', serviceName]);
        const idx = (this.next++) % possible.length;
        return possible[idx];
    } 

    list() {
        return this.services;
    }
 }