import type { IdleViewState } from "."
import type { ViewModelParams } from "../../view-model-params"

export function useDeleteSelected({
  nodesModel,
  setViewState,
}: ViewModelParams) {
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

  const handleKeyDown = (
    viewState: IdleViewState,
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      deleteSelected(viewState)
    }
  }

  return {
    handleKeyDown,
  }
}
