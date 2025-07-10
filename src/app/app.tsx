import { Outlet } from "react-router-dom"

export function App() {


  return (
    <div className="flex flex-col min-h-screen bg-zinc-800 text-zinc-100">
      <Outlet />
    </div>
  )
}

//3 59