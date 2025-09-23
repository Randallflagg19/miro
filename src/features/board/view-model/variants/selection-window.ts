import type { ViewModel } from "./view-model-type"
import type { ViewModelParams } from "../view-model-params"
import { goToIdle } from "./idle"
import {
  createRectFromDimensions,
  createRectFromPoints,
  isRectsIntersecting,
  type Rect,
} from "../../domain/rect"
import type { Point } from "../../domain/point"
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas"
import { selectItems } from "../../domain/selection"

export type SelectionWindowViewState = {
  type: "selection-window"
  startPoint: Point
  endPoint: Point
  initialSelectedIds: Set<string>
}

export function useSelectionWindowViewModel({
  nodesModel,
  setViewState,
  canvasRect,
  nodesDimensions,
  windowPositionModel,
}: ViewModelParams) {
  const getNodes = (state: SelectionWindowViewState, selectionRect: Rect) =>
    nodesModel.nodes.map((node) => {
      const nodeDimensions = nodesDimensions[node.id]

      const nodeRect =
        node.type === "sticker"
          ? createRectFromDimensions(node, nodeDimensions)
          : createRectFromPoints(node.start, node.end)

      return {
        ...node,
        isSelected:
          isRectsIntersecting(nodeRect, selectionRect) ||
          state.initialSelectedIds.has(node.id),
      }
    })

  return (state: SelectionWindowViewState): ViewModel => {
    const rect = createRectFromPoints(state.startPoint, state.endPoint)
    const nodes = getNodes(state, rect)
    return {
      selectionWindow: rect,
      nodes,
      window: {
        onMouseMove: (e) => {
          const currentPoint = pointOnScreenToCanvas(
            {
              x: e.clientX,
              y: e.clientY,
            },
            windowPositionModel.position,
            canvasRect
          )
          setViewState({ ...state, endPoint: currentPoint })
        },
        onMouseUp: () => {
          const nodesIdsInRect = nodes
            .filter((node) => node.isSelected)
            .map((node) => node.id)
          setViewState(
            goToIdle({
              selectedIds: selectItems(
                state.initialSelectedIds,
                nodesIdsInRect,
                "add"
              ),
            })
          )
        },
      },
    }
  }
}

export function goToSelectionWindow({
  endPoint,
  startPoint,
  initialSelectedIds,
}: {
  endPoint: { x: number; y: number }
  startPoint: { x: number; y: number }
  initialSelectedIds?: Set<string>
}): SelectionWindowViewState {
  return {
    type: "selection-window",
    startPoint,
    endPoint,
    initialSelectedIds: initialSelectedIds ?? new Set(),
  }
}
