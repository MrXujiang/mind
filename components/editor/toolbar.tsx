"use client"

import { Button } from "@/components/ui/button"
import { Plus, Trash2, Type, Palette, Circle, Square, CreditCard } from "lucide-react"
import type { Node } from "reactflow"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface ToolbarProps {
  selectedNode: Node | null
  onAddChild: (node: Node) => void
  onUpdateText: (nodeId: string, text: string) => void
  onDeleteNode: (nodeId: string) => void
  onUpdateNodeStyle: (nodeId: string, style: { color?: string; shape?: string }) => void
}

export function Toolbar({ selectedNode, onAddChild, onUpdateText, onDeleteNode, onUpdateNodeStyle }: ToolbarProps) {
  const [nodeText, setNodeText] = useState("")

  // 处理文本更新
  const handleTextUpdate = () => {
    if (selectedNode && nodeText) {
      onUpdateText(selectedNode.id, nodeText)
      setNodeText("")
    }
  }

  // 处理添加子节点
  const handleAddChild = () => {
    if (selectedNode) {
      onAddChild(selectedNode)
    }
  }

  // 处理删除节点
  const handleDeleteNode = () => {
    if (selectedNode) {
      onDeleteNode(selectedNode.id)
    }
  }

  // 处理颜色更新
  const handleColorChange = (color: string) => {
    if (selectedNode) {
      onUpdateNodeStyle(selectedNode.id, { color })
    }
  }

  // 处理形状更新
  const handleShapeChange = (shape: string) => {
    if (selectedNode) {
      onUpdateNodeStyle(selectedNode.id, { shape })
    }
  }

  return (
    <div className="bg-background border rounded-md shadow-sm p-2 flex flex-col gap-2">
      <Button variant="outline" size="icon" onClick={handleAddChild} disabled={!selectedNode} title="添加子节点">
        <Plus className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" disabled={!selectedNode} title="编辑文本">
            <Type className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-2">
            <h4 className="font-medium">编辑节点文本</h4>
            <Input placeholder="输入节点文本" value={nodeText} onChange={(e) => setNodeText(e.target.value)} />
            <Button size="sm" onClick={handleTextUpdate}>
              更新
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" disabled={!selectedNode} title="节点样式">
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-4">
            <h4 className="font-medium">节点样式</h4>

            <div className="space-y-2">
              <div className="text-sm">形状</div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleShapeChange("circle")}>
                  <Circle className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleShapeChange("rectangle")}
                >
                  <Square className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleShapeChange("card")}>
                  <CreditCard className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">颜色</div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="bg-blue-500 h-6 w-6 rounded-full p-0 m-0"
                  onClick={() => handleColorChange("blue")}
                />
                <Button
                  variant="outline"
                  className="bg-green-500 h-6 w-6 rounded-full p-0 m-0"
                  onClick={() => handleColorChange("green")}
                />
                <Button
                  variant="outline"
                  className="bg-red-500 h-6 w-6 rounded-full p-0 m-0"
                  onClick={() => handleColorChange("red")}
                />
                <Button
                  variant="outline"
                  className="bg-yellow-500 h-6 w-6 rounded-full p-0 m-0"
                  onClick={() => handleColorChange("yellow")}
                />
                <Button
                  variant="outline"
                  className="bg-purple-500 h-6 w-6 rounded-full p-0 m-0"
                  onClick={() => handleColorChange("purple")}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        size="icon"
        onClick={handleDeleteNode}
        disabled={!selectedNode}
        className="text-destructive hover:bg-destructive/10"
        title="删除节点"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
