"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Home, Share2, Download } from "lucide-react"
import Link from "next/link"

interface EditorHeaderProps {
  mapName: string
  onMapNameChange: (name: string) => void
  onSave: () => void
  lastSaved: string | null
  onExport: () => void
}

export function EditorHeader({ mapName, onMapNameChange, onSave, lastSaved, onExport }: EditorHeaderProps) {
  return (
    <header className="border-b p-2 flex items-center justify-between bg-background">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <Home className="h-5 w-5" />
            <span className="sr-only">返回首页</span>
          </Button>
        </Link>
        <Input value={mapName} onChange={(e) => onMapNameChange(e.target.value)} className="w-64 h-9" />
        {lastSaved && <span className="text-xs text-muted-foreground">最后保存: {lastSaved}</span>}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onSave}>
          <Save className="h-4 w-4 mr-1" />
          保存
        </Button>

        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-1" />
          导出
        </Button>
        <Link href="https://mindlink.turntip.cn">
          <Button>
            AI智能文档
          </Button>
        </Link>
      </div>
    </header>
  )
}
