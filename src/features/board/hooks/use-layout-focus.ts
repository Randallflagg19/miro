import { useEffect, useRef } from "react"

export function useLayoutFocus() {
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
