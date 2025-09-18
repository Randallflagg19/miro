import type { Rect } from "../domain/rect"

export function SelectionWindow({ width, height, x, y }: Rect) {
  return (
    <div
      className="absolute inset-0 bg-blue-500/30 border-2 border-blue-500"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: width,
        height: height,
      }}
    ></div>
  )
}
