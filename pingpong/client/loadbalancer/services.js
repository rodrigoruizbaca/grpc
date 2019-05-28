const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

var servicediscovery = new AWS.ServiceDiscovery();

servicediscovery.discoverInstances({
    NamespaceName: 'rbaca.grpc', /* required */
    ServiceName: 'grpc-discovery-service', /* required */
}).promise().then(data => {
    data.Instances.forEach(s => {
        console.log(s);
    });
});