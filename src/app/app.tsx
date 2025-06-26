import { Outlet, useLocation } from "react-router-dom"
import { AppHeader } from "@/features/header"
import { ROUTES } from "@/shared/model/routes.ts"

export function App() {
  const location = useLocation()

  const isAuthPage =
    location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <AppHeader />}
      <Outlet />
    </div>
  )
}

//1 57
