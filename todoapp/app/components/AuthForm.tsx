"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@remix-run/react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { useToast } from "~/hooks/use-toast"
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),

})
export const AUTH_BACKEND_URL="http://43.204.251.65:4000"

export default function AuthForm({signup}:{signup?:boolean}) {
  // 1. Define your form.
  const {toast}=useToast()
  const navigate=useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password:""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(signup){
        const response=(await axios.post(`${AUTH_BACKEND_URL}/auth/signup`,values))
        if(response.data.message==="success"){
            toast({description:"Created User Successfully"})
            setTimeout(()=>navigate('/login'),1000)
        }else{
            toast({description:"User Creation Failed Failed",variant:"destructive"})
        }

        return
    }
    console.log(values)
    const response=(await axios.post(`${AUTH_BACKEND_URL}/auth/login`,values))
    if(response.data.message==="success"){
      window.localStorage.setItem('username',response.data.username)

      toast({description:"Authenticated Successfully"})
        setTimeout(()=>navigate('/profile'),1000)
    }else{
        toast({description:"Authentication Failed",variant:"destructive"})
    }
  }
  return(

  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="Enter your username" {...field} />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
        <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input placeholder="Enter your password" {...field} />
          </FormControl>
          <FormDescription>
            Please enter a strong password.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
  )
}
