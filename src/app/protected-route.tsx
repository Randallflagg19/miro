import { ROUTES } from "@/shared/model/routes"
import { useSession } from "@/shared/model/session"
import { Navigate, Outlet, redirect } from "react-router-dom"
import { enableMocking } from "@/shared/api/mocks"

export const ProtectedRoute = () => {
  const { session } = useSession()

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />
  }

  return <Outlet />
}

export async function protectedLoader() {
  await enableMocking()

  const token = useSession.getState().refreshToken()

  if (!token) {
    return redirect(ROUTES.LOGIN)
  }

  return null
}
