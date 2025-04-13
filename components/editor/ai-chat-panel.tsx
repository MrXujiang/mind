"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, ChevronUp, ChevronDown, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Node, Edge } from "reactflow"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface AIChatPanelProps {
  onGenerateMindMap: (nodes: Node[], edges: Edge[]) => void
}

export function AIChatPanel({ onGenerateMindMap }: AIChatPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "你好！我是你的AI助手，可以帮你生成思维导图。请告诉我你想要创建什么样的思维导图？",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 自动滚动到最新消息
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // 处理消息发送
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // 模拟AI响应
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 根据用户输入生成思维导图
      if (input.includes("思维导图") || input.includes("mind map")) {
        // 简单的思维导图生成逻辑
        const centralTopic = input.replace(/请生成|思维导图|关于|的|mind map|please create|about/gi, "").trim()

        // 生成节点和边
        const nodes: Node[] = [
          {
            id: "1",
            type: "mindMap",
            data: { label: centralTopic || "中心主题" },
            position: { x: 250, y: 200 },
          },
        ]

        const subtopics = ["定义", "特点", "应用", "发展", "相关概念"]
        const edges: Edge[] = []

        subtopics.forEach((topic, index) => {
          const nodeId = (index + 2).toString()
          nodes.push({
            id: nodeId,
            type: "mindMap",
            data: {
              label: topic,
              color: ["blue", "green", "red", "yellow", "purple"][index % 5],
              shape: "card",
            },
            position: { x: 450, y: 100 + index * 100 },
          })

          edges.push({
            id: `e1-${nodeId}`,
            source: "1",
            target: nodeId,
          })
        })

        // 添加AI响应消息
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: `我已经为你生成了关于"${centralTopic}"的思维导图，包含5个主要分支。`,
          role: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])

        // 调用回调函数更新思维导图
        onGenerateMindMap(nodes, edges)
      } else {
        // 普通对话响应
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: "你可以尝试输入：请生成关于[主题]的思维导图。例如：请生成关于人工智能的思维导图。",
          role: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      }
    } catch (error) {
      console.error("Error generating response:", error)
      // 错误处理
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "抱歉，生成回复时出现了错误。请稍后再试。",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // 处理按键事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div
      className={cn(
        "ai-chat-panel border-t bg-background w-full transition-all",
        isExpanded ? "expanded" : "collapsed",
      )}
    >
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-primary" />
          <span className="font-medium">AI 助手</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>

      {isExpanded && (
        <>
          <div className="ai-chat-messages p-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("ai-message", message.role === "user" ? "user" : "assistant")}>
                {message.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t flex">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入消息..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} className="ml-2" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
