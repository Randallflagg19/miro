import { setupWorker } from "msw/browser"
import { authHandlers } from "@/shared/api/mocks/handlers/auth.ts"
import { boardsHandlers } from "@/shared/api/mocks/handlers/boards.ts"

export const worker = setupWorker(...authHandlers, ...boardsHandlers)
