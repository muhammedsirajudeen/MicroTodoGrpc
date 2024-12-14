import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import path from "path"
import TodoService, { TodoRequest } from "../service/TodoService"

const protoPath = path.resolve(__dirname,"../proto/todo.proto")

interface ProtoDef {
    Todo: {
        service: grpc.ServiceDefinition
    }
}
interface Call{
    request:TodoRequest
}
interface CallId{
    request:{
        id:number
    }
}
type Callback=(a:null,message:{message:string,todo?:TodoRequest | {},todos?:TodoRequest[]})=>void

const packageDefinition = protoLoader.loadSync(protoPath, {})
const proto = grpc.loadPackageDefinition(packageDefinition).example as unknown as ProtoDef

async function addTodo(call: Call, callback: Callback) {
    const Todo=call.request as TodoRequest
    //interacting with the service
    const status=await TodoService.AddTodo(Todo)
    console.log(status)
    if(status){
        callback(null, { message: `Todo Added Successfully`,todo:status })
    }else{
        callback(null, { message: `Error While Adding Todo`,todo:{} })

    }
}
async function updateToDo(call:Call,callback:Callback){
    const Todo=call.request as TodoRequest
    //interacting with the service
    const status=await TodoService.UpdateTodo(Todo.id!,Todo)
    if(status){
        callback(null,{message:'Todo Updated Successfully',todo:status})
    }else{
        callback(null,{message:'Error while updating Todo'})
    }
}
async function deleteTodo(call:CallId,callback:Callback){
    const id=call.request.id as number
    const status=await TodoService.DeleteTodo(id)
    if(status){
        callback(null,{message:'Deleted Successfully',todo:status})
    }else{
        callback(null,{message:'Error deleting todo',todo:{}})
        
    }
    
}
async function getTodoById(call:CallId,callback:Callback){    
    const result=await TodoService.GetTodoById(call.request.id)
    console.log(result)
    if(result){
        callback(null,{message:'OK',todo:result})
    }else{
        callback(null,{message:'No Todo Found',todo:{}})
    }
}

async function allTodos(call:Call,callback:Callback){
    const result=await TodoService.AllTodos()
    if(result.length!==0){
        callback(null,{message:'OK',todos:result})
    }else{
        callback(null,{message:'Its empty',todos:result})
    }
}

const server = new grpc.Server()

server.addService(proto.Todo.service, { AddTodo: addTodo,UpdateToDo:updateToDo,DeleteTodo:deleteTodo,GetTodoById:getTodoById,AllTodos:allTodos })

const serverAddress = '127.0.0.1:50051';

server.bindAsync(serverAddress, grpc.ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
    if (err) {
        console.error(`Server failed to start: ${err}`);
        return;
    }
    console.log(`Server running at http://${serverAddress}`);
});