import { useState } from "react"

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

type Node = StickerNode

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

  const updateStickerText = (id: string, text: string) => {
    setNodes((lastNodes) =>
      lastNodes.map((node) => (node.id === id ? { ...node, text } : node))
    )
  }

  const deleteNodes = (ids: string[]) => {
    setNodes((lastNodes) => lastNodes.filter((node) => !ids.includes(node.id)))
  }

  return {
    nodes,
    addSticker,
    updateStickerText,
    deleteNodes,
  }
}

export type NodesModel = ReturnType<typeof useNodes>
