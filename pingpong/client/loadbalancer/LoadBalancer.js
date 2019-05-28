
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

    async refresh() {
        console.log('Refreshing endpoints from discovery service');
        this.services = []; 
        try {
            const data = await this.servicediscovery.discoverInstances({
                NamespaceName: 'rbaca.grpc', /* required */
                ServiceName: 'grpc-discovery-service', /* required */
                HealthStatus: 'HEALTHY'
            }).promise();
            data.Instances.forEach(s => {
                const url = `${s.Attributes.AWS_INSTANCE_IPV4}:${s.Attributes.AWS_INSTANCE_PORT}`;  
                const serviceName = s.Attributes.ECS_SERVICE_NAME;  
                const status = s.Attributes.AWS_INIT_HEALTH_STATUS;
                const client = new services.PingPongClient(url, grpc.credentials.createInsecure());
                const endpoint = {
                    url, serviceName, status, client
                }; 
                if (!this.services[serviceName]) {
                    const service = {
                        next: 0,
                        endpoints: []
                    };
                    this.services[serviceName] = service;
                } 
                this.services[serviceName].endpoints.push(endpoint);
            });
        } catch (err) {

        } 
        
    }

    async start() {
        await loadBalancer.refresh();
        setInterval(async() => {await loadBalancer.refresh()}, 5000);
    }

    async getEndpoint(serviceName) {       
        while (true) {   
            const service = this.services[serviceName];      
            if (service && service.endpoints.length >= 2) {
                break;
            } else {
                console.log('No endpoints available, trying to fetch more...');
                await this.refresh();
            }
        }
        const service = this.services[serviceName]; 
        const endpoints = service.endpoints;
        const idx = (service.next++) % endpoints.length;
        return endpoints[idx];        
    } 

    list() {
        return this.services;
    }
 }