
const AWS = require('aws-sdk');
const _ = require('lodash');
const moment = require('moment');
const services = require('../static_codegen/pingpong_grpc_pb');
const grpc = require('grpc');

const seconds = 5;

AWS.config.update({
    region: 'us-east-1'
});

module.exports = class LoadBalancer {
    constructor() {
        this.servicediscovery = new AWS.ServiceDiscovery();
        this.services = [];       
        this.next = 0;
        this.lastRefresh = moment();
    }

    async refresh(force = false) {        
        const now = moment();
        const duration = moment.duration(now.diff(this.lastRefresh));
        console.log(`duration ${duration.asSeconds()}`);
        if (duration.asSeconds() >= 10 || force) {
            console.log('Refreshing endpoints from discovery service');
            this.services = [];
            const params = {
                NamespaceName: 'rbaca.grpc', /* required */
                ServiceName: 'grpc-discovery-service', /* required */
                HealthStatus: 'HEALTHY'
            };         
            try { 
                const data = await this.servicediscovery.discoverInstances(params).promise();            
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
                this.lastRefresh = moment();
            } catch (err) {
                console.log(err);
            }
        }
    }

    /*async start() {
        await this.refresh(true);
        let timerId = setTimeout(function tick() {
            this.refresh();
            timerId = setTimeout(tick, 2000); 
        }, 5000);
    }*/

    async getEndpoint(serviceName) {   
        const service = this.services[serviceName];      
        if (service && service.endpoints.length > 0) {
            const endpoints = service.endpoints;
            const idx = (service.next++) % endpoints.length;
            if (service.endpoints.length < 2) {
                await this.refresh(true);
            }
            return endpoints[idx];
        } else {            
            return null;
        }                
    } 

    list() {
        return this.services;
    }
 }