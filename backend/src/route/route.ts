import { Router } from "express";
import TodoController from "../controller/TodoController";

const router = Router()

router.get('/todo',TodoController.AllTodos)
router.get('/todo/:id',TodoController.GetTodoById)
router.post('/todo', TodoController.addTodo)
router.put('/todo/:id',TodoController.UpdateTodo)
router.delete('/todo/:id',TodoController.DeleteToDo)

export default router


