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
    setNodes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "sticker",
        ...data,
      },
    ])
  }

  return {
    nodes,
    addSticker,
  }
}

export type NodesModel = ReturnType<typeof useNodes>
