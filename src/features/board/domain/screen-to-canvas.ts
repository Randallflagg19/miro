export function pointOnScreenToCanvas(
  point: { x: number; y: number },
  canvasRect?: {
    x: number
    y: number
  }
) {
  if (!canvasRect) return point
  return { x: point.x - canvasRect.x, y: point.y - canvasRect.y }
}
