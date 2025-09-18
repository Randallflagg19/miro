import { Button } from "@/shared/ui/kit/button"

export function ActionButton({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode
  isActive?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={
        isActive
          ? "bg-blue-500/30 hover:bg-blue-600/30 text-blue-500 hover:text-blue-600"
          : ""
      }
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
