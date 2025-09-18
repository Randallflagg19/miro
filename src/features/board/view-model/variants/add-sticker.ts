import type { ViewModel } from "./view-model-type"
import type { ViewModelParams } from "../view-model-params"
import { goToIdle } from "./idle"

export type AddStickerViewState = {
  type: "add-sticker"
}

export function useAddStickerViewModel({
  nodesModel,
  setViewState,
  canvasRect,
}: ViewModelParams) {
  return (): ViewModel => ({
    nodes: nodesModel.nodes,
    layout: {
      onKeyDown: (e) => {
        if (e.key === "s") {
          setViewState(goToIdle())
        }
      },
    },
    canvas: {
      onClick: (e) => {
        if (!canvasRect) return
        nodesModel.addSticker({
          text: "Default",
          x: e.clientX - canvasRect.x,
          y: e.clientY - canvasRect.y,
        })
        setViewState(goToIdle())
      },
    },
    actions: {
      addSticker: {
        isActive: true,
        onClick: () => {
          setViewState(goToIdle())
        },
      },
    },
  })
}

export function goToAddSticker(): AddStickerViewState {
  return { type: "add-sticker" }
}
