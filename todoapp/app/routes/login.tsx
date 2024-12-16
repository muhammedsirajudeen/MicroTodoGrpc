// import { useEffect } from "react";
import AuthForm from "~/components/AuthForm";
//wont change cuz its elastic ip
export default function Login(){

    return( 
        <div className="flex flex-col items-center justify-center w-screen  mt-52">
            <p className="mb-7 text-xl">LOGIN</p>
            <AuthForm key={2} signup={false}/>
            
        </div>
    )
}