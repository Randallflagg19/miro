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
  windowPosition: WindowPosition
  overlay?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      {...props}
      onContextMenu={(e) => e.preventDefault()}
      className="absolute inset-0 select-none overflow-hidden"
    >
      {overlay}
      <div
        style={{
          transformOrigin: "left top",
          transform: `scale(${windowPosition.zoom}) translate(${-windowPosition.x}px, ${-windowPosition.y}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
