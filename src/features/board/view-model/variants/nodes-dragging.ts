import type { ViewModel } from "./view-model-type"
import type { ViewModelParams } from "../view-model-params"
import { goToIdle } from "./idle"
import type { Point } from "../../domain/point"
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas"
import { vectorFromPoints } from "../../domain/point"

export type NodesDraggingViewState = {
  type: "nodes-dragging"
  startPoint: Point
  endPoint: Point
  nodesToMove: Set<string>
}

export function useNodesDraggingViewModel({
  nodesModel,
  setViewState,
  canvasRect,
}: ViewModelParams) {
  const getNodes = (state: NodesDraggingViewState) =>
    nodesModel.nodes.map((node) => {
      if (state.nodesToMove.has(node.id)) {
        const diff = vectorFromPoints(state.startPoint, state.endPoint)

        return {
          ...node,
          x: node.x + diff.x,
          y: node.y + diff.y,
          isSelected: true,
        }
      }
      return node
    })

  return (state: NodesDraggingViewState): ViewModel => {
    const nodes = getNodes(state)
    return {
      nodes,
      window: {
        onMouseMove: (e) => {
          const currentPoint = pointOnScreenToCanvas(
            {
              x: e.clientX,
              y: e.clientY,
            },
            canvasRect
          )
          setViewState({ ...state, endPoint: currentPoint })
        },
        onMouseUp: () => {
          const nodesToMove = nodes.filter((node) =>
            state.nodesToMove.has(node.id)
          )

          nodesModel.updateNodesPositions(nodesToMove)

          setViewState(
            goToIdle({
              selectedIds: state.nodesToMove,
            })
          )
        },
      },
    }
  }
}

export function goToNodesDragging({
  endPoint,
  startPoint,
  nodesToMove,
}: {
  endPoint: { x: number; y: number }
  startPoint: { x: number; y: number }
  nodesToMove: Set<string>
}): NodesDraggingViewState {
  return {
    type: "nodes-dragging",
    startPoint,
    endPoint,
    nodesToMove,
  }
}
