const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    'notes.proto',
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
});


const notes = grpc.loadPackageDefinition(packageDefinition).notes;

const client = new notes.NoteService('localhost:50051', grpc.credentials.createInsecure());

console.log(client.list);

client.list({}, (error, arr) => {
    if (!error) {
        console.log('successfully fetch List notes')
        console.log(arr)
    } else {
        console.error(error)
    }
});