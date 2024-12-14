"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TodoController_1 = __importDefault(require("../controller/TodoController"));
const router = (0, express_1.Router)();
router.get('/todo', TodoController_1.default.AllTodos);
router.get('/todo/:id', TodoController_1.default.GetTodoById);
router.post('/todo', TodoController_1.default.addTodo);
router.put('/todo/:id', TodoController_1.default.UpdateTodo);
router.delete('/todo/:id', TodoController_1.default.DeleteToDo);
exports.default = router;
