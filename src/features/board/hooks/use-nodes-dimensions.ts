import {
  type RefCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

export type nodeDimensions = {
  width: number
  height: number
}

export type NodesDimensionsMap = Record<string, nodeDimensions>

export const useNodesDimensions = () => {
  const [nodesDimensions, setNodesDimensions] = useState<NodesDimensionsMap>({})
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const nodeRef: RefCallback<Element> = useCallback((el) => {
    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        const nodesToUpdate = Object.fromEntries(
          entries
            .map((entry) => [
              (entry.target as HTMLElement).dataset.id,
              {
                width: entry.borderBoxSize[0].inlineSize,
                height: entry.borderBoxSize[0].blockSize,
              },
            ])
            .filter((entry) => !!entry[0])
        )

        setNodesDimensions((prev) => ({
          ...prev,
          ...nodesToUpdate,
        }))
      })
    }

    const resizeObserver = resizeObserverRef.current

    if (el) {
      resizeObserver.observe(el)
      return () => {
        setNodesDimensions((prev) => {
          const newNodesDimensions = { ...prev }
          delete newNodesDimensions[(el as HTMLElement).dataset.id ?? ""]
          return newNodesDimensions
        })
        resizeObserver.unobserve(el)
      }
    }
  }, [])

  useEffect(
    () => () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    },
    []
  )

  return {
    nodeRef,
    nodesDimensions,
  }
}
