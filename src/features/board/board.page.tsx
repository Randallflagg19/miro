import { Button } from "@/shared/ui/kit/button"
import { ArrowRightIcon, StickerIcon } from "lucide-react"
import { useNodes } from "./nodes"
import { useViewStateModel } from "./view-state-model"
import { useCanvasRect } from "./use-canvas-rect"
import { useEffect, useRef, type Ref } from "react"
import clsx from "clsx"
import { useViewModel } from "./view-model"

function BoardPage() {
  const nodesModel = useNodes()
  const viewStateLast = useViewStateModel()
  const focusLayoutRef = useLayoutFocus()
  const { canvasRef, canvasRect } = useCanvasRect()

  const viewModel = useViewModel({
    nodesModel,
    viewStateModel: viewStateLast,
    canvasRect,
  })

  return (
    <Layout ref={focusLayoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
      <Dots />
      <Canvas ref={canvasRef} onClick={viewModel.canvas?.onClick}>
        {viewModel.nodes.map((node) => (
          <Sticker
            key={node.id}
            text={node.text}
            x={node.x}
            y={node.y}
            selected={node.isSelected}
            onClick={node.onClick}
          />
        ))}
      </Canvas>
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
function useLayoutFocus() {
  const layoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (layoutRef.current) {
      layoutRef.current.focus()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        layoutRef.current?.focus()
      }
    }

    window.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [layoutRef])

  return layoutRef
}

export const Component = BoardPage

function Layout({
  children,
  ref,
  ...props
}: {
  children: React.ReactNode
  ref: Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="grow relative" tabIndex={0} ref={ref} {...props}>
      {children}
    </div>
  )
}

function Dots() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
  )
}

function Canvas({
  children,
  ref,
  ...props
}: {
  children: React.ReactNode
  ref: Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} ref={ref} className="absolute inset-0">
      {children}
    </div>
  )
}

function Sticker({
  text,
  x,
  y,
  onClick,
  selected,
}: {
  text: string
  x: number
  y: number
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  selected?: boolean
}) {
  return (
    <button
      className={clsx(
        "absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md",
        selected && "outline outline-2 outline-blue-500"
      )}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

function Actions({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white p-1 rounded-md shadow">
      {children}
    </div>
  )
}

function ActionButton({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode
  isActive?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={
        isActive
          ? "bg-blue-500/30 hover:bg-blue-600/30 text-blue-500 hover:text-blue-600"
          : ""
      }
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
