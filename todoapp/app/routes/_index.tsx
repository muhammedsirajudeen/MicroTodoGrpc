import type { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Microservice Todo Application" },
    { name: "description", content: "Welcome to our over engineered todolist!" },
  ];
};

// interface TodoList{
//   id:number
//   date:string
//   status:boolean
//   priority:string
//   task:string
// }

export default function Index() {
  useEffect(() => {
      const root = window.document.documentElement;
      root.classList.add("dark");
  }, []);
  return (
    <div className="block w-screen  items-center mt-52 justify-center">
      <h1 style={{fontSize:"5vw"}}  className="text-3xl text-center w-full font-bold">MICRO SERVICE APPLICATION..</h1>
      <p className="text-xl text-center mt-10  " > A simple microservice application a simple authenticator and a simple Todo Application</p>
    </div>
  );
}

