const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    'notes.proto',
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
});

const notesProto = grpc.loadPackageDefinition(packageDefinition).notes;


const server = new grpc.Server();


const arr = [
    { id: '1', title: 'Note 1', content: 'Content 1'},
    { id: '2', title: 'Note 2', content: 'Content 2'}
];

const list = (call, callback) => {
    callback(null, {notes: arr});
    
};

const sayHello = (call, callback) => {
    callback(null, {
        "message": "Hello World!"
    });
    
};

server.addService(notesProto.NoteService.service, {
    list,
    sayHello
});


server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://127.0.0.1:50051');
server.start();