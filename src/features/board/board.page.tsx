import { ArrowRightIcon, StickerIcon } from "lucide-react"
import { useNodes } from "./model/nodes"
import { useCanvasRect } from "./hooks/use-canvas-rect"
import { useViewModel } from "./view-model/use-view-model"
import { useWindowEvents } from "./hooks/use-window-events"
import { SelectionWindow } from "./ui/selection-window"
import { Overlay } from "./ui/overlay"
import { Layout } from "./ui/layout"
import { Dots } from "./ui/dots"
import { Canvas } from "./ui/canvas"
import { Sticker } from "./ui/sticker"
import { ActionButton } from "./ui/action-button"
import { Actions } from "./ui/actions"
import { useLayoutFocus } from "./hooks/use-layout-focus"
import { useNodesDimensions } from "./hooks/use-nodes-dimensions"
import { useWindowPositionModel } from "./model/window-position"

function BoardPage() {
  const nodesModel = useNodes()
  const windowPositionModel = useWindowPositionModel()
  const focusLayoutRef = useLayoutFocus()
  const { canvasRef, canvasRect } = useCanvasRect()
  const { nodeRef, nodesDimensions } = useNodesDimensions()

  const viewModel = useViewModel({
    nodesModel,
    canvasRect,
    nodesDimensions,
  })

  useWindowEvents(viewModel)

  console.log("viewModel.windowPosition", viewModel.windowPosition)

  return (
    <Layout ref={focusLayoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
      <Dots />
      <Canvas
        overlay={
          <Overlay
            onClick={viewModel.overlay?.onClick}
            onMouseDown={viewModel.overlay?.onMouseDown}
            onMouseUp={viewModel.overlay?.onMouseUp}
          />
        }
        windowPosition={
          viewModel.windowPosition || windowPositionModel.position
        }
        ref={canvasRef}
        onClick={viewModel.canvas?.onClick}
      >
        {viewModel.nodes.map((node) => (
          <Sticker key={node.id} {...node} ref={nodeRef} />
        ))}
      </Canvas>
      {viewModel.selectionWindow && (
        <SelectionWindow {...viewModel.selectionWindow} />
      )}
      <Actions>
        <ActionButton
          isActive={viewModel.actions?.addSticker?.isActive}
          onClick={viewModel.actions?.addSticker?.onClick}
        >
          <StickerIcon />
        </ActionButton>
        <ActionButton isActive={false} onClick={() => {}}>
          <ArrowRightIcon />
        </ActionButton>
      </Actions>
    </Layout>
  )
}

export const Component = BoardPage
