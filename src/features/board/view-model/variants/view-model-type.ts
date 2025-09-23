import type { Rect } from "../../domain/rect"
import type { WindowPosition } from "../../model/window-position"
import type { Point } from "../../domain/point"

type ViewModelStickerNode = {
  id: string
  type: "sticker"
  text: string
  x: number
  y: number
  isSelected?: boolean
  noPointerEvents?: boolean
  isEditing?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onTextChange?: (text: string) => void
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onMouseUp?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

type ViewModelArrowNode = {
  id: string
  type: "arrow"
  start: Point
  end: Point
  isSelected?: boolean
  onClick?: (e: React.MouseEvent<SVGPathElement>) => void
  onMouseDown?: (e: React.MouseEvent<SVGPathElement>) => void
  onMouseUp?: (e: React.MouseEvent<SVGPathElement>) => void
}

export type ViewModelNode = ViewModelStickerNode | ViewModelArrowNode

export type ViewModel = {
  nodes: ViewModelNode[]
  selectionWindow?: Rect
  windowPosition?: WindowPosition
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
    onMouseWheel?: (e: WheelEvent) => void
  }
  actions?: {
    addSticker?: ViewModelAction
    addArrow?: ViewModelAction
  }
}

export type ViewModelAction = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  isActive?: boolean
}
