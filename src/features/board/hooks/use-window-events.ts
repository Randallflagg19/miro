import { useEffect, useLayoutEffect, useRef } from "react"
import type { ViewModel } from "../view-model/variants/view-model-type"

export function useWindowEvents(viewModel: ViewModel) {
  const viewModelRef = useRef(viewModel)

  useLayoutEffect(() => {
    viewModelRef.current = viewModel
  }, [viewModel])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      viewModelRef.current.window?.onMouseMove?.(e)
    }
    const onMouseUp = (e: MouseEvent) => {
      viewModelRef.current.window?.onMouseUp?.(e)
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [viewModelRef])
}
