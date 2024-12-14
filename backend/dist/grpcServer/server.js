"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const path_1 = __importDefault(require("path"));
const TodoService_1 = __importDefault(require("../service/TodoService"));
const protoPath = path_1.default.resolve(__dirname, "../proto/todo.proto");
const packageDefinition = protoLoader.loadSync(protoPath, {});
const proto = grpc.loadPackageDefinition(packageDefinition).example;
async function addTodo(call, callback) {
    const Todo = call.request;
    //interacting with the service
    const status = await TodoService_1.default.AddTodo(Todo);
    console.log(status);
    if (status) {
        callback(null, { message: `Todo Added Successfully`, todo: status });
    }
    else {
        callback(null, { message: `Error While Adding Todo`, todo: {} });
    }
}
async function updateToDo(call, callback) {
    const Todo = call.request;
    //interacting with the service
    const status = await TodoService_1.default.UpdateTodo(Todo.id, Todo);
    if (status) {
        callback(null, { message: 'Todo Updated Successfully', todo: status });
    }
    else {
        callback(null, { message: 'Error while updating Todo' });
    }
}
async function deleteTodo(call, callback) {
    const id = call.request.id;
    const status = await TodoService_1.default.DeleteTodo(id);
    if (status) {
        callback(null, { message: 'Deleted Successfully', todo: status });
    }
    else {
        callback(null, { message: 'Error deleting todo', todo: {} });
    }
}
async function getTodoById(call, callback) {
    const result = await TodoService_1.default.GetTodoById(call.request.id);
    console.log(result);
    if (result) {
        callback(null, { message: 'OK', todo: result });
    }
    else {
        callback(null, { message: 'No Todo Found', todo: {} });
    }
}
async function allTodos(call, callback) {
    const result = await TodoService_1.default.AllTodos();
    if (result.length !== 0) {
        callback(null, { message: 'OK', todos: result });
    }
    else {
        callback(null, { message: 'Its empty', todos: result });
    }
}
const server = new grpc.Server();
server.addService(proto.Todo.service, { AddTodo: addTodo, UpdateToDo: updateToDo, DeleteTodo: deleteTodo, GetTodoById: getTodoById, AllTodos: allTodos });
const serverAddress = '127.0.0.1:50051';
server.bindAsync(serverAddress, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(`Server failed to start: ${err}`);
        return;
    }
    console.log(`Server running at http://${serverAddress}`);
});
