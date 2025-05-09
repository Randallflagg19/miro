import { Navigate, Outlet, redirect } from "react-router-dom";
import { ROUTES } from "../routes";
import { useSession } from "./session";

export const protectedLoader = async () => {
  const token = await useSession.getState().getFreshToken();
  if (!token) {
    useSession.getState().logout();
    return redirect(ROUTES.LOGIN);
  }

  return null;
};

export function ProtectedRoute() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}
