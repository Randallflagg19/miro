import { useState } from "react"
import type { Point } from "../domain/point"

type NodeBase = {
  id: string
  type: string
}
type StickerNode = NodeBase & {
  type: "sticker"
  text: string
  x: number
  y: number
}

type ArrowNode = NodeBase & {
  type: "arrow"
  start: Point
  end: Point
}

type Node = StickerNode | ArrowNode

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "1",
      type: "sticker",
      text: "Hello",
      x: 100,
      y: 100,
    },
    {
      id: "2",
      type: "sticker",
      text: "Hello",
      x: 200,
      y: 200,
    },
    {
      id: "3",
      type: "arrow",
      start: { x: 110, y: 110 },
      end: { x: 210, y: 210 },
    },
  ])

  const addSticker = (data: { text: string; x: number; y: number }) => {
    setNodes((lastNodes) => [
      ...lastNodes,
      {
        id: crypto.randomUUID(),
        type: "sticker",
        ...data,
      },
    ])
  }

  const addArrow = (data: { start: Point; end: Point }) => {
    setNodes((lastNodes) => [
      ...lastNodes,
      {
        ...data,
        id: crypto.randomUUID(),
        type: "arrow",
      },
    ])
  }

  const updateStickerText = (id: string, text: string) => {
    setNodes((lastNodes) =>
      lastNodes.map((node) => (node.id === id ? { ...node, text } : node))
    )
  }

  const deleteNodes = (ids: string[]) => {
    setNodes((lastNodes) => lastNodes.filter((node) => !ids.includes(node.id)))
  }

  const updateNodesPositions = (
    positions: { id: string; x: number; y: number; type?: "start" | "end" }[]
  ) => {
    const record = Object.fromEntries(
      positions.map((p) => [`${p.id}${p.type ?? ""}`, p])
    )
    setNodes((lastNodes) =>
      lastNodes.map((node) => {
        if (node.type === "arrow") {
          const newPosition = record[`${node.id}start`]
          const newEndPosition = record[`${node.id}end`]

          return {
            ...node,
            start: newPosition ?? node.start,
            end: newEndPosition ?? node.end,
          }
        }
        if (node.type === "sticker") {
          const newPosition = record[node.id]
          if (newPosition) {
            return {
              ...node,
              x: newPosition.x,
              y: newPosition.y,
            }
          }
        }
        return node
      })
    )
  }

  return {
    nodes,
    addSticker,
    addArrow,
    updateStickerText,
    deleteNodes,
    updateNodesPositions,
  }
}

export type NodesModel = ReturnType<typeof useNodes>
