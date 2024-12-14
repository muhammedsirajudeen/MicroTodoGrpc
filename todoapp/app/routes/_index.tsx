import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Microservice Todo Application" },
    { name: "description", content: "Welcome to our over engineered todolist!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
 
    </div>
  );
}

