import type { IdleViewState } from "."
import type { ViewModelParams } from "../../view-model-params"
import { goToEditSticker } from "../edit-sticker"

export function useGoToEditSticker(params: ViewModelParams) {
  const { setViewState } = params

  const handleNodeClick = (
    idleState: IdleViewState,
    nodeId: string,
    e: React.MouseEvent
  ) => {
    if (
      idleState.selectedIds.size === 1 &&
      idleState.selectedIds.has(nodeId) &&
      !e.ctrlKey &&
      !e.shiftKey
    ) {
      setViewState(goToEditSticker(nodeId))
      return { preventNext: true }
    }

    return { preventNext: false }
  }

  return {
    handleNodeClick,
  }
}
