import type { Rect } from "../../domain/rect"

export type ViewModelNode = {
  id: string
  text: string
  x: number
  y: number
  isSelected?: boolean
  isEditing?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onTextChange?: (text: string) => void
}
export type ViewModel = {
  nodes: ViewModelNode[]
  selectionWindow?: Rect
  layout?: {
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
  }
  canvas?: {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  }
  overlay?: {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void
  }
  window?: {
    onMouseUp?: (e: MouseEvent) => void
    onMouseMove?: (e: MouseEvent) => void
  }
  actions?: {
    addSticker?: {
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
      isActive?: boolean
    }
  }
}
