import type { Node, Edge } from "reactflow"

export const defaultNodes: Node[] = [
  {
    id: "1",
    type: "mindMap",
    data: { label: "中心主题" },
    position: { x: 250, y: 200 },
  },
  {
    id: "2",
    type: "mindMap",
    data: { label: "子主题 1" },
    position: { x: 450, y: 100 },
  },
  {
    id: "3",
    type: "mindMap",
    data: { label: "子主题 2" },
    position: { x: 450, y: 200 },
  },
  {
    id: "4",
    type: "mindMap",
    data: { label: "子主题 3" },
    position: { x: 450, y: 300 },
  },
  {
    id: "5",
    type: "mindMap",
    data: { label: "子主题 1.1" },
    position: { x: 650, y: 75 },
  },
  {
    id: "6",
    type: "mindMap",
    data: { label: "子主题 1.2" },
    position: { x: 650, y: 125 },
  },
]

export const defaultEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e1-4", source: "1", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e2-6", source: "2", target: "6" },
]
