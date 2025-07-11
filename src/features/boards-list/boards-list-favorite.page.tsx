import { useBoardsList } from "./model/use-boards-list"
import {
  BoardsListLayout,
  BoardsListLayoutHeader,
  BoardsListLayoutContent,
} from "./ui/boards-list-layout"
import { ViewModeToggle, type ViewMode } from "./ui/view-mode-toggle"
import { useState } from "react"
import { BoardItem } from "./compose/board-item"
import { BoardCard } from "./compose/board-card"
import { BoardsSidebar } from "./ui/boards-sidebar"

function BoardsListFavoritePage() {
  const boardsQuery = useBoardsList({
    isFavorite: true,
  })

  const [viewMode, setViewMode] = useState<ViewMode>("list")


  return (
    <BoardsListLayout
      sidebar={
        <BoardsSidebar />
      }
      header={
        <BoardsListLayoutHeader
          title="Избранные доски"
          description="Здесь вы можете управлять своими избранными досками"
          actions={
            <ViewModeToggle
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          }
        />
      }
    >
       <BoardsListLayoutContent
        isEmpty={boardsQuery.boards.length === 0}
        isPending={boardsQuery.isPending}
        isPendingNext={boardsQuery.isFetchingNextPage}
        cursorRef={boardsQuery.cursorRef}
        hasCursor={boardsQuery.hasNextPage}
        mode={viewMode}
        renderList={() => 
          boardsQuery.boards.map((board) => (
            <BoardItem  board={board} />
          ))
        }
        renderGrid={() => 
          boardsQuery.boards.map((board) => (
            <BoardCard board={board} />
          ))
        }
      />
     
    </BoardsListLayout>
  )
}

export const Component = BoardsListFavoritePage
