import type { ViewModel } from "./view-model-type"
import type { ViewModelParams } from "../view-model-params"
import { goToIdle } from "./idle"
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas"

export type AddStickerViewState = {
  type: "add-sticker"
}

export function useAddStickerViewModel({
  nodesModel,
  setViewState,
  canvasRect,
  windowPositionModel,
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
        const point = pointOnScreenToCanvas(
          {
            x: e.clientX,
            y: e.clientY,
          },
          windowPositionModel.position,
          canvasRect
        )
        nodesModel.addSticker({
          text: "Default",
          x: point.x,
          y: point.y,
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
