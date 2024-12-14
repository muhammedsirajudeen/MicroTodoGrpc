import { Edit, Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "~/components/ui/dialog"
import TodoForm from "./TodoForm"
import { TodoList } from "~/routes/todo"

export default function TodoDialog({type,todolist}:{type:string,todolist?:TodoList}){
    return(
        <Dialog>
            <DialogTrigger className="bg-white text-black h-10 w-20 ml-4 rounded-lg flex items-center justify-center" >{type==="add"?<Plus/>:<Edit/>}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Enter Your Todo</DialogTitle>
                <DialogDescription>
                    Your Todo would be added in a database and would be saved and streamed back to you...
                </DialogDescription>
                </DialogHeader>
                <TodoForm todolist={todolist} />
            </DialogContent>
        </Dialog>


    )
}