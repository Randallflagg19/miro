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

export type ViewState =
  | AddStickerViewState
  | EditStickerViewState
  | IdleViewState
  | SelectionWindowViewState
  | NodesDraggingViewState
  | WindowDraggingViewState

export function useViewModel(params: Omit<ViewModelParams, "setViewState">) {
  const [viewState, setViewState] = useState<ViewState>(() => goToIdle())

  const newParams = {
    ...params,
    setViewState,
  }

  const addStickerViewModel = useAddStickerViewModel(newParams)
  const editStickerViewModel = useEditStickerViewModel(newParams)
  const idleViewModel = useIdleViewModel(newParams)
  const selectionWindowViewModel = useSelectionWindowViewModel(newParams)
  const nodesDraggingViewModel = useNodesDraggingViewModel(newParams)
  const windowDraggingViewModel = useWindowDraggingViewModel(newParams)

  let viewModel: ViewModel
  switch (viewState.type) {
    case "add-sticker":
      viewModel = addStickerViewModel()
      break
    case "edit-sticker":
      viewModel = editStickerViewModel(viewState)
      break
    case "idle": {
      viewModel = idleViewModel(viewState)
      break
    }
    case "selection-window":
      viewModel = selectionWindowViewModel(viewState)
      break
    case "nodes-dragging":
      viewModel = nodesDraggingViewModel(viewState)
      break
    case "window-dragging":
      console.log("window-dragging", viewState)
      viewModel = windowDraggingViewModel(viewState)
      break
    default:
      throw new Error("Invalid view state")
  }
  return viewModel
}
