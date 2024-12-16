import { useLoaderData } from "@remix-run/react"
import { Trash } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { useToast } from "~/hooks/use-toast"
import TodoDialog from "~/components/TodoDialog"
import axios from "axios"
import { backendUrl } from "~/components/TodoForm"
export interface TodoList{
    id:number
    status:boolean
    priority:string
    task:string
    date:string
}

export async function loader(){
    const url=process.env.TODO_URL!
    console.log('hey')
    const todolist=await (await fetch(`${url}/todo`)).json()
    return todolist.todos ?? [] as TodoList[]    
}
export default function Todo(){
    const {toast}=useToast()
    const TodolistData=useLoaderData() as TodoList[]
    const [TodoLists,setTodolists]=useState(TodolistData??[])
    const [todolisthere,setTodolist]=useState<TodoList>()
    async function deleteHandler(id:number){
        console.log(id)
        const response=(await axios.delete(`${backendUrl}/todo/${id}`))
        if(response.status>=200){

            setTodolists((prev)=>prev.filter((p)=>p.id!==id))
            toast({description:"deleted successfully",color:"black",title:'Deleted',variant:"destructive"})
        }else{
            toast({description:"Error",color:"black",title:'Deleted',variant:"destructive"})

        }

    }
    function editHandler(todolist:TodoList){
        setTodolist(todolist)
    }
    return (
        <div className="container text-black mx-auto px-4 py-8 w-screen flex flex-col items-center justify-center ml-44">
            <div className="flex " >
                <h1 className="text-center mb-12 font-black text-4xl tracking-tight text-white ">TODO LIST</h1>
                <TodoDialog type="add"/>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TodoLists.map((todolist) => (
              <Card 
                key={todolist.id} 
                className={`${todolist.status ? "bg-green-50" : "bg-red-50"} transition-all hover:shadow-lg`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate text-black">{todolist.task}</span>
                    <Badge className="text-black" variant={todolist.priority.toLowerCase() === "default" ? "destructive" : todolist.priority.toLowerCase() === "outline" ? "secondary" : null}>
                      {todolist.priority}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(todolist.date).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  {/* <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button> */}
                  <div   role="button" tabIndex={0} onKeyDown={()=>console.log('Placeholder')}  onClick={()=>editHandler(todolist)}>
                    <TodoDialog todolist={todolisthere} type=""/>
                  </div>
                  <Button size="sm" variant="outline" onClick={()=>deleteHandler(todolist.id)} >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )
}