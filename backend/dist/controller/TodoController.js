"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../grpcClient/client"));
function addTodo(req, res) {
    try {
        const { status, date, priority, task } = req.body;
        client_1.default.addTodo({ status, date, priority, task }, (error, response) => {
            if (error) {
                console.error('Error:', error);
            }
            else {
                // console.log('Greeting:', response.message);
                res.status(201).json({ message: response.message, todo: response.todo });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error from Controller' });
    }
}
function UpdateTodo(req, res) {
    try {
        const { id } = req.params;
        const { status, date, priority, task } = req.body;
        client_1.default.updateToDo({ id, status, date, priority, task }, (error, response) => {
            if (error) {
                console.error('Error:', error);
            }
            else {
                res.status(202).json({ message: response.message, todo: response.todo });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error from Controller' });
    }
}
function DeleteToDo(req, res) {
    try {
        const { id } = req.params;
        console.log(Object.keys(client_1.default));
        client_1.default.deleteTodo({ id: parseInt(id) }, (error, response) => {
            if (error) {
                console.error('Error:', error);
            }
            else {
                res.status(200).json({ message: response.message, todo: response.todo });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error from Controller' });
    }
}
function GetTodoById(req, res) {
    try {
        const { id } = req.params;
        client_1.default.getTodoById({ id: parseInt(id) }, (error, response) => {
            if (error) {
                console.error('Error:', error);
            }
            else {
                res.status(200).json({ message: response.message, todo: response.todo });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error from Controller' });
    }
}
function AllTodos(req, res) {
    try {
        client_1.default.AllTodos({}, (error, response) => {
            if (error) {
                console.error('Error:', error);
            }
            else {
                console.log(response.message);
                res.status(200).json({ message: response.message, todos: response.todos });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error from Controller' });
    }
}
exports.default = {
    addTodo,
    UpdateTodo,
    DeleteToDo,
    GetTodoById,
    AllTodos
};
