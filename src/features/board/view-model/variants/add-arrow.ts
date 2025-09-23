import type { ViewModel } from "./view-model-type"
import type { ViewModelParams } from "../view-model-params"
import { goToIdle } from "./idle"
import { goToDrawArrow } from "./draw-arrow"
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas"

export type AddArrowViewState = {
  type: "add-arrow"
}

export function useAddArrowViewModel({
  nodesModel,
  setViewState,
  windowPositionModel,
  canvasRect,
}: ViewModelParams) {
  return (): ViewModel => ({
    nodes: nodesModel.nodes.map((node) => {
      if (node.type === "sticker") {
        return {
          ...node,
          onMouseDown: (e: React.MouseEvent) => {
            const point = pointOnScreenToCanvas(
              { x: e.clientX, y: e.clientY },
              windowPositionModel.position,
              canvasRect
            )
            setViewState(goToDrawArrow(point, node.id))
          },
        }
      }
      return node
    }),
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          setViewState(goToIdle())
        }
      },
    },
    overlay: {
      onMouseDown: (e) =>
        setViewState(
          goToDrawArrow(
            pointOnScreenToCanvas(
              { x: e.clientX, y: e.clientY },
              windowPositionModel.position,
              canvasRect
            )
          )
        ),
    },
    actions: {
      addArrow: {
        isActive: true,
        onClick: () => setViewState(goToIdle()),
      },
    },
  })
}

export function goToAddArrow(): AddArrowViewState {
  return { type: "add-arrow" }
}
