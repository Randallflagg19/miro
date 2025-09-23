import {
  useAddStickerViewModel,
  type AddStickerViewState,
} from "./variants/add-sticker"
import { goToIdle, useIdleViewModel, type IdleViewState } from "./variants/idle"
import type { ViewModel } from "./variants/view-model-type"
import type { ViewModelParams } from "./view-model-params"
import { useState } from "react"
import {
  useSelectionWindowViewModel,
  type SelectionWindowViewState,
} from "./variants/selection-window"
import {
  useEditStickerViewModel,
  type EditStickerViewState,
} from "./variants/edit-sticker"
import {
  useNodesDraggingViewModel,
  type NodesDraggingViewState,
} from "./variants/nodes-dragging"
import {
  useWindowDraggingViewModel,
  type WindowDraggingViewState,
} from "./variants/window-dragging"
import { useZoomDecorator } from "./decorator/zoom"
import {
  useAddArrowViewModel,
  type AddArrowViewState,
} from "./variants/add-arrow"
import { useCommonActionsDecorator } from "./decorator/common-actions"
import {
  useDrawArrowViewModel,
  type DrawArrowViewState,
} from "./variants/draw-arrow"

export type ViewState =
  | AddArrowViewState
  | AddStickerViewState
  | EditStickerViewState
  | IdleViewState
  | SelectionWindowViewState
  | NodesDraggingViewState
  | WindowDraggingViewState
  | DrawArrowViewState

export function useViewModel(params: Omit<ViewModelParams, "setViewState">) {
  const [viewState, setViewState] = useState<ViewState>(() => goToIdle())

  const newParams = {
    ...params,
    setViewState,
  }

  const addStickerViewModel = useAddStickerViewModel(newParams)
  const addArrowViewModel = useAddArrowViewModel(newParams)
  const drawArrowViewModel = useDrawArrowViewModel(newParams)
  const editStickerViewModel = useEditStickerViewModel(newParams)
  const idleViewModel = useIdleViewModel(newParams)
  const selectionWindowViewModel = useSelectionWindowViewModel(newParams)
  const nodesDraggingViewModel = useNodesDraggingViewModel(newParams)
  const windowDraggingViewModel = useWindowDraggingViewModel(newParams)

  const zoomDecorator = useZoomDecorator(newParams)
  const commonActionsDecorator = useCommonActionsDecorator(newParams)

  let viewModel: ViewModel
  switch (viewState.type) {
    case "idle":
      viewModel = commonActionsDecorator(idleViewModel(viewState))
      break
    case "add-arrow":
      viewModel = commonActionsDecorator(addArrowViewModel())
      break
    case "draw-arrow":
      console.log("draw-arrow", viewState)
      viewModel = drawArrowViewModel(viewState)
      break
    case "add-sticker":
      viewModel = commonActionsDecorator(addStickerViewModel())
      break
    case "edit-sticker":
      viewModel = commonActionsDecorator(editStickerViewModel(viewState))
      break
    case "selection-window":
      viewModel = selectionWindowViewModel(viewState)
      break
    case "nodes-dragging":
      viewModel = nodesDraggingViewModel(viewState)
      break
    case "window-dragging":
      viewModel = windowDraggingViewModel(viewState)
      break
    default:
      throw new Error("Invalid view state")
  }
  return zoomDecorator(viewModel)
}
