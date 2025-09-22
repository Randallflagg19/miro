import type { Ref } from "react"
import type { WindowPosition } from "../model/window-position"

export function Canvas({
  children,
  ref,
  windowPosition,
  overlay,
  ...props
}: {
  children: React.ReactNode
  ref: Ref<HTMLDivElement>
  windowPosition?: WindowPosition
  overlay?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      onContextMenu={(e) => e.preventDefault()}
      ref={ref}
      className="absolute inset-0 select-none overflow-hidden"
    >
      {overlay}
      <div
        style={{
          transform: `translate(${windowPosition?.x}px, ${windowPosition?.y}px) scale(${windowPosition?.zoom})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
