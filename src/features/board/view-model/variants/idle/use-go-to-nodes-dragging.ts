import { distanceFromPoints } from "@/features/board/domain/point"
import { pointOnScreenToCanvas } from "@/features/board/domain/screen-to-canvas"
import type { IdleViewState } from "."
import type { ViewModelParams } from "../../view-model-params"
import { goToNodesDragging } from "../nodes-dragging"

export function useGoToNodesDragging({
  canvasRect,
  setViewState,
  windowPositionModel,
}: ViewModelParams) {
  const handleWindowMouseMove = (idleState: IdleViewState, e: MouseEvent) => {
    if (
      idleState.mouseDown &&
      idleState.mouseDown.type === "node" &&
      !idleState.mouseDown.isRightClick
    ) {
      const currentPoint = pointOnScreenToCanvas(
        {
          x: e.clientX,
          y: e.clientY,
        },
        windowPositionModel.position,
        canvasRect
      )
      if (distanceFromPoints(idleState.mouseDown, currentPoint) > 5) {
        // iu change selectedIds if dragged node is selected
        const draggedNodeId = idleState.mouseDown.nodeId
        const isDraggedSelected = idleState.selectedIds.has(draggedNodeId)
        const nodesToMove = isDraggedSelected
          ? new Set(idleState.selectedIds)
          : new Set([draggedNodeId])

        setViewState(
          goToNodesDragging({
            startPoint: idleState.mouseDown,
            endPoint: currentPoint,
            nodesToMove,
          })
        )
      }
    }
  }

  return {
    handleWindowMouseMove,
  }
}
