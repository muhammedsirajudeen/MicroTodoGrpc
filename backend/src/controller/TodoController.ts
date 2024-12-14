import { Request, Response } from "express";
import client from "../grpcClient/client";
function addTodo(req: Request, res: Response) {
  try {
    const { status, date, priority, task } = req.body
    client.addTodo({ status, date, priority, task }, (error: Error | null, response: any) => {
      if (error) {
        console.error('Error:', error);
      } else {
        // console.log('Greeting:', response.message);
        res.status(201).json({ message: response.message,todo:response.todo })
      }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error from Controller' })
  }
}

function UpdateTodo(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { status, date, priority, task } = req.body

    client.updateToDo({ id, status, date, priority, task }, (error: Error | null, response: any) => {
      if (error) {
        console.error('Error:', error);
      } else {
        res.status(202).json({ message: response.message,todo:response.todo })
      }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error from Controller' })
  }
}

function DeleteToDo(req: Request, res: Response) {
  try {
    const { id } = req.params
    console.log(Object.keys(client))
    client.deleteTodo({ id: parseInt(id) }, (error: Error | null, response: any) => {
      if (error) {
        console.error('Error:', error);
      } else {
        res.status(200).json({ message: response.message,todo:response.todo })
      }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error from Controller' })
  }
}
function GetTodoById(req: Request, res: Response) {
  try {
    const {id}=req.params
    client.getTodoById({ id: parseInt(id) }, (error: Error | null, response: any) => {
      if (error) {
        console.error('Error:', error);
      } else {
        res.status(200).json({ message: response.message,todo:response.todo })
      }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error from Controller' })
  }
}

function AllTodos(req:Request,res:Response){
  try {
    client.AllTodos({}, (error: Error | null, response: any) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log(response.message)
        res.status(200).json({ message: response.message,todos:response.todos })
      }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Error from Controller'})
  }
}



export default {
  addTodo,
  UpdateTodo,
  DeleteToDo,
  GetTodoById,
  AllTodos
}