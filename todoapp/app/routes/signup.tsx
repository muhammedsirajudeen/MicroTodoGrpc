import AuthForm from "~/components/AuthForm";

export default function Signup(){
    return(
        <div className="flex mt-52 w-screen flex-col items-center justify-center">
            <h1 className="text-xl font-bold mb-2" >SIGNUP</h1>
            <AuthForm key={1} signup={true}/>
        </div>
    )
}