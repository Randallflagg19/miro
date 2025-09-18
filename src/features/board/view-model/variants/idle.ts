import type { ViewModel } from "./view-model-type"
import type { ViewModelParams } from "../view-model-params"
import { goToAddSticker } from "./add-sticker"
import {
  selectItems,
  type SelectionModifier,
  type Selection,
} from "../../domain/selection"
import { distanceFromPoints } from "../../domain/point"
import { goToSelectionWindow } from "./selection-window"
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas"
import { goToEditSticker } from "./edit-sticker"

export type IdleViewState = {
  type: "idle"
  selectedIds: Set<string>
  mouseDown?: {
    x: number
    y: number
  }
}

export function useIdleViewModel({
  nodesModel,
  setViewState,
  canvasRect,
}: ViewModelParams) {
  const select = (
    lastState: IdleViewState,
    ids: string[],
    modif: SelectionModifier
  ) => {
    setViewState({
      ...lastState,
      selectedIds: selectItems(lastState.selectedIds, ids, modif),
    })
  }

  const deleteSelected = (viewState: IdleViewState) => {
    if (viewState.selectedIds.size > 0) {
      const ids = Array.from(viewState.selectedIds)
      nodesModel.deleteNodes(ids)
      setViewState({
        ...viewState,
        selectedIds: new Set(),
      })
    }
  }

  return (idleState: IdleViewState): ViewModel => ({
    selectionWindow: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    nodes: nodesModel.nodes.map((node) => ({
      ...node,
      isSelected: idleState.selectedIds.has(node.id),
      onClick: (e) => {
        if (
          idleState.selectedIds.size === 1 &&
          idleState.selectedIds.has(node.id) &&
          !e.ctrlKey &&
          !e.shiftKey
        ) {
          setViewState(goToEditSticker(node.id))
          return
        }

        if (e.ctrlKey || e.shiftKey) {
          select(idleState, [node.id], "toggle")
        } else {
          select(idleState, [node.id], "replace")
        }
      },
    })),
    layout: {
      onKeyDown: (e) => {
        if (!e.ctrlKey && !e.shiftKey && !e.metaKey && !e.altKey) {
          const [id] = idleState.selectedIds.values()
          setViewState(goToEditSticker(id))
          return
        }

        if (e.key === "s") {
          setViewState(goToAddSticker())
        }

        if (e.key === "Delete" || e.key === "Backspace") {
          deleteSelected(idleState)
        }
      },
    },
    overlay: {
      onMouseDown: (e) => {
        setViewState({
          ...idleState,
          mouseDown: pointOnScreenToCanvas(
            {
              x: e.clientX,
              y: e.clientY,
            },
            canvasRect
          ),
        })
      },
      onMouseUp: () => {
        if (idleState.mouseDown) {
          setViewState({
            ...idleState,
            selectedIds: selectItems(idleState.selectedIds, [], "replace"),
          })
        }
      },
    },
    window: {
      onMouseMove: (e) => {
        if (idleState.mouseDown) {
          const currentPoint = pointOnScreenToCanvas(
            {
              x: e.clientX,
              y: e.clientY,
            },
            canvasRect
          )
          if (distanceFromPoints(idleState.mouseDown, currentPoint) > 5) {
            setViewState(
              goToSelectionWindow({
                startPoint: idleState.mouseDown,
                endPoint: currentPoint,
                initialSelectedIds: e.shiftKey
                  ? idleState.selectedIds
                  : undefined,
              })
            )
          }
        }
      },
      onMouseUp: () => {
        setViewState({
          ...idleState,
          mouseDown: undefined,
        })
      },
    },
    actions: {
      addSticker: {
        isActive: false,
        onClick: () => {
          setViewState(goToAddSticker())
        },
      },
    },
  })
}

export function goToIdle({
  selectedIds,
}: {
  selectedIds?: Selection
} = {}): IdleViewState {
  return { type: "idle", selectedIds: selectedIds ?? new Set() }
}
