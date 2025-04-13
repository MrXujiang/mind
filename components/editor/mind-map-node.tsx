"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { cn } from "@/lib/utils"

interface NodeData {
  label: string
  color?: string
  shape?: string
  onTextChange?: (id: string, text: string) => void
}

export function MindMapNode({ data, id, selected }: NodeProps<NodeData>) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(data.label || "")
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // 当data.label变化时更新本地状态
  useEffect(() => {
    setText(data.label || "")
  }, [data.label])

  // 处理双击编辑
  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  // 处理文本变化
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    // 自动调整高度
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  // 处理编辑完成
  const handleBlur = () => {
    setIsEditing(false)
    if (data.onTextChange && text !== data.label) {
      data.onTextChange(id, text)
    }
  }

  // 处理按键
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      setIsEditing(false)
      if (data.onTextChange && text !== data.label) {
        data.onTextChange(id, text)
      }
    }
  }

  // 自动聚焦输入框
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  // 根据形状应用不同的样式
  const getShapeStyles = () => {
    switch (data.shape) {
      case "circle":
        return "rounded-full aspect-square flex items-center justify-center"
      case "rectangle":
        return "rounded-none"
      case "card":
        return "card-node"
      default:
        return "rounded-md"
    }
  }

  // 根据颜色应用不同的样式
  const getColorStyles = () => {
    switch (data.color) {
      case "blue":
        return "bg-blue-100 border-blue-300"
      case "green":
        return "bg-green-100 border-green-300"
      case "red":
        return "bg-red-100 border-red-300"
      case "yellow":
        return "bg-yellow-100 border-yellow-300"
      case "purple":
        return "bg-purple-100 border-purple-300"
      default:
        return selected ? "border-primary bg-primary/10" : "border-border bg-background"
    }
  }

  return (
    <div
      className={cn(
        "px-4 py-2 border shadow-sm min-w-[100px] max-w-[250px] text-center",
        getShapeStyles(),
        getColorStyles(),
      )}
      onDoubleClick={handleDoubleClick}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      {isEditing ? (
        <textarea
          ref={inputRef}
          value={text}
          onChange={handleTextChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-none resize-none text-center"
          style={{ height: "auto" }}
        />
      ) : (
        <div className="text-sm font-medium break-words">{text}</div>
      )}
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  )
}
