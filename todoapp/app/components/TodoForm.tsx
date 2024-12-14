"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios"
import { Button } from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useToast } from "~/hooks/use-toast";
import { TodoList as TL } from "~/routes/todo";
// import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@radix-ui/react-select";
// Define the schema based on the TodoList interface
const formSchema = z.object({
    status: z.boolean(),
    priority: z.string().min(1, {
        message: "Priority is required.",
    }),
    task: z.string().min(3, {
        message: "Task description must be at least 3 characters.",
    }),
});

type TodoList = z.infer<typeof formSchema>;

export const backendUrl="http://localhost:3000"
export default function TodoForm({todolist}:{todolist:TL|undefined}) {
    const form = useForm<TodoList>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: todolist?.status ?? false,
            priority: todolist?.priority,
            task: todolist?.task,
        },
    });
    const {toast}=useToast()
    async function onSubmit(values: TodoList) {
        // Handle form submission
        console.log(values);
        if(todolist){
            console.log(todolist.id)
            const response=(await axios.put(`${backendUrl}/todo/${todolist.id}`,{
                status:values.status,
                task:values.task,
                priority:values.priority
            } as TodoList))
            if(response.status>=200){
                console.log(response.data.todo)
                setTimeout(()=>window.location.reload(),400)
                toast({variant:"default",title:"Added",color:"white",description:"updated  task successfully"})
            }else{
                toast({variant:"destructive",title:"Failed",color:"white",description:"task failed to update"})
            }
            return
        }
        const response=(await axios.post(`${backendUrl}/todo`,{
            status:values.status,
            task:values.task,
            priority:values.priority
        } as TodoList))
        if(response.status>=200){
            console.log(response.data.todo)
            setTimeout(()=>window.location.reload(),400)
            toast({variant:"default",title:"Added",color:"white",description:"task added successfully"})
        }else{
            toast({variant:"destructive",title:"Failed",color:"white",description:"task failed to add"})
        }


    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* Status Field */}
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>
                                Toggle to mark the task as completed.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Priority Field */}
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Task Field */}
                <FormField
                    control={form.control}
                    name="task"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Describe the task"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter the description of the task.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
