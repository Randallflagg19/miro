import { Outlet } from "react-router-dom"

export function App() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-100 text-zinc-100">
      <Outlet />
    </div>
  )
}

//1 12
