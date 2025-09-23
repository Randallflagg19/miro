import type { ViewModel } from "./view-model-type"
import type { ViewModelParams } from "../view-model-params"
import { goToIdle } from "./idle"
import type { Point } from "../../domain/point"
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas"
import { addPoints, vectorFromPoints } from "../../domain/point"

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
  windowPositionModel,
}: ViewModelParams) {
  const getNodes = (state: NodesDraggingViewState) =>
    nodesModel.nodes.map((node) => {
      if (state.nodesToMove.has(node.id)) {
        const diff = vectorFromPoints(state.startPoint, state.endPoint)

        if (node.type === "arrow") {
          return {
            ...node,
            start: addPoints(node.start, diff),
            end: addPoints(node.end, diff),
            isSelected: true,
          }
        }

        return {
          ...node,
          ...addPoints(node, diff),
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
            windowPositionModel.position,
            canvasRect
          )
          setViewState({ ...state, endPoint: currentPoint })
        },
        onMouseUp: () => {
          const nodesToMove = nodes
            .filter((node) => state.nodesToMove.has(node.id))
            .flatMap((node) => {
              if (node.type === "arrow") {
                return [
                  {
                    id: node.id,
                    x: node.start.x,
                    y: node.start.y,
                    type: "start" as const,
                  },
                  {
                    id: node.id,
                    x: node.end.x,
                    y: node.end.y,
                    type: "end" as const,
                  },
                ]
              }

              return [
                {
                  id: node.id,
                  x: node.x,
                  y: node.y,
                },
              ]
            })

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
