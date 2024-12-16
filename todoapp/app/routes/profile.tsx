'use client'
import { useNavigate } from "@remix-run/react"
import { LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"

export default function Profile() {
    console.log(typeof window === "undefined")
    const [username, setUsername] = useState("")
    useEffect(() => {
        setUsername(typeof window === "undefined" ? "ss" : window.localStorage.getItem('username') ?? "")

    }, [])
    // const username=window?.localStorage?.getItem('username')
    const navigate=useNavigate()
    return (
        <div className="flex flex-col w-screen items-center justify-center"  >
            {/* <h1 className="text-3xl mt-20">PROFILE</h1> */}
            <Card className="mt-52 w-96 flex items-center justify-center flex-col" >
                <CardHeader>
                    <CardTitle>PROFILE</CardTitle>
                    <CardDescription>This is your profile section</CardDescription>
                </CardHeader>
                <CardContent>
                <Avatar className="w-32 h-32" >
                    <AvatarImage src="https://github.co/shadcn.png" />
                    <AvatarFallback className="text-3xl" >{username.split('').slice(0,2).join('').toUpperCase()}</AvatarFallback>
                </Avatar>

                </CardContent>
                <CardFooter className="mt-2 flex flex-col items-center justify-center" >
                    <p className="font-bold text-xl" ><span className="mr-8" >Welcome &#128110;</span>{username}</p>
                    <Button className="mt-6" onClick={()=>navigate('/login')} ><LogOut/></Button>
                </CardFooter>
            </Card>

        </div>
    )
}