import { ROUTES } from "../shared/model/routes.ts"
import { createBrowserRouter, redirect } from "react-router-dom"
import { App } from "./app.tsx"
import { Providers } from "@/app/providers.tsx"
import { protectedLoader, ProtectedRoute } from "./protected-route.tsx"
import { AppHeader } from "@/features/header"

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        loader: protectedLoader,
        element: (
          <>
            <AppHeader />
            <ProtectedRoute />
          </>
        ),
        children: [
          {
            path: ROUTES.BOARDS,
            lazy: () => import("@/features/boards-list/boards-list.page"),
          },
          {
            path: ROUTES.BOARD,
            lazy: () => import("@/features/board/board.page"),
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page.tsx"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/auth/register.page.tsx"),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.BOARDS),
      },
    ],
  },
])
