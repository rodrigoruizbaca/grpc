const messages = require('./static_codegen/notes_pb');
const services = require('./static_codegen/notes_grpc_pb');
const createClient = require('grpc-caller/lib/client');
const BaseRequest = require('grpc-caller/lib/request');
const Response = require('grpc-caller/lib/response');
const grpc = require('grpc');


const wrap = (client, metadata, options) => {
    const GRPCCaller = createClient(Object.getPrototypeOf(client));

    class Request extends BaseRequest { }

    const instance = new GRPCCaller(client, metadata, options);

    instance.Request = Request;
    instance.Request.prototype.client = instance;

    instance.Response = Response;

    return instance;
};

const interceptor = function(options, nextCall) {
    return new grpc.InterceptingCall(nextCall(options), {
        sendMessage: function(message, next) {
            console.log("Intercepting");
            next(message);
        }
    });
};

const execute = async () => {
    const client = new services.NoteServiceClient('localhost:50051', grpc.credentials.createInsecure());

    const wrapper = wrap(client, {}, { retry: 3, interceptors: [interceptor] });

    const request = new messages.Empty();

    const response = await wrapper.sayHello(request);

    console.log(response.getMessage());
};



execute().then(() => {});