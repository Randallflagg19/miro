import { useSession } from "@/shared/model/session"
import { Button } from "@/shared/ui/kit/button"

export function AppHeader() {
  const { session, logout } = useSession()
  if (!session) {
    return null
  }
  return (
    <header className="bg-background border-b border-border/40 shadow-sm py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-semibold text-slate-800">Miro Copy</div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">{session.email}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            className="border-red-200 text-red-700 hover:bg-red-50 hover:bg-destructive/10"
          >
            Выйти
          </Button>
        </div>
      </div>
    </header>
  )
}
