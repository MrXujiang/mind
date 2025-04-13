"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { Edge, Node } from "reactflow"
import FileSaver from "file-saver"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface ExportPanelProps {
  onClose: () => void
  nodes: Node[]
  edges: Edge[]
}

export function ExportPanel({ onClose, nodes, edges }: ExportPanelProps) {
  const [format, setFormat] = useState("png")
  const [error, setError] = useState<string | null>(null)
  const exportRef = useRef<HTMLDivElement>(null)

  // 导出为图片或JSON
  const exportMindMap = async () => {
    try {
      setError(null)

      if (format === "json") {
        // 导出为JSON
        const jsonData = JSON.stringify({ nodes, edges }, null, 2)
        const blob = new Blob([jsonData], { type: "application/json" })
        FileSaver.saveAs(blob, "mindmap.json")
        onClose()
        return
      }

      // 使用ReactFlow的toObject方法创建一个简单的数据表示
      const mindMapData = {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: {
            label: node.data.label,
            color: node.data.color,
            shape: node.data.shape,
          },
        })),
        edges: edges,
      }

      // 创建一个简单的文本表示
      const textRepresentation =
        `思维导图: ${new Date().toLocaleString()}\n\n` +
        `节点数量: ${nodes.length}\n` +
        `连接数量: ${edges.length}\n\n` +
        `节点列表:\n${nodes.map((n) => `- ${n.data.label}`).join("\n")}`

      // 创建文本文件
      const blob = new Blob([textRepresentation], { type: "text/plain;charset=utf-8" })
      FileSaver.saveAs(blob, format === "png" ? "mindmap.txt" : "mindmap.svg")

      // 显示提示信息
      setError("由于技术限制，目前无法直接导出为图片格式。已将思维导图数据导出为文本文件。")
    } catch (error) {
      console.error("导出失败", error)
      setError("导出过程中发生错误，请稍后再试。")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>导出思维导图</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="png" onValueChange={setFormat}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="png">PNG</TabsTrigger>
            <TabsTrigger value="svg">SVG</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>

          <TabsContent value="png" className="mt-4">
            <p className="text-sm text-muted-foreground">导出为PNG图片格式，适合在各种平台分享和使用。</p>
          </TabsContent>

          <TabsContent value="svg" className="mt-4">
            <p className="text-sm text-muted-foreground">导出为SVG矢量图格式，可无损缩放，适合用于打印和编辑。</p>
          </TabsContent>

          <TabsContent value="json" className="mt-4">
            <p className="text-sm text-muted-foreground">导出为JSON数据格式，可用于备份或导入到其他支持的应用中。</p>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={exportMindMap}>导出</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
