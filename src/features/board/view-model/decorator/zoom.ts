import { diffPoints } from "../../domain/point"
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas"
import type { ViewModel } from "../variants/view-model-type"
import type { ViewModelParams } from "../view-model-params"

export function useZoomDecorator({
  windowPositionModel,
  canvasRect,
}: ViewModelParams) {
  return (viewModel: ViewModel): ViewModel => {
    return {
      ...viewModel,
      window: {
        ...viewModel.window,
        onMouseWheel: (e) => {
          viewModel.window?.onMouseWheel?.(e)
          const delta = e.deltaY > 0 ? 0.9 : 1.1

          const currentPoint = pointOnScreenToCanvas(
            {
              x: e.clientX,
              y: e.clientY,
            },
            windowPositionModel.position,
            canvasRect
          )

          const newZoom = windowPositionModel.position.zoom * delta

          const newPoint = pointOnScreenToCanvas(
            {
              x: e.clientX,
              y: e.clientY,
            },
            {
              ...windowPositionModel.position,
              zoom: newZoom,
            },
            canvasRect
          )

          const mouseDiff = diffPoints(currentPoint, newPoint)

          windowPositionModel.setPosition({
            x: windowPositionModel.position.x - mouseDiff.x,
            y: windowPositionModel.position.y - mouseDiff.y,
            zoom: newZoom,
          })
        },
      },
    }
  }
}
