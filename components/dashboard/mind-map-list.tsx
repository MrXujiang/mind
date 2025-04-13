"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Copy, Trash2, Share2, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useEffect, useState } from "react"

interface MindMap {
  id: string
  name: string
  updatedAt: string
  thumbnail: string
}

interface MindMapListProps {
  shared?: boolean
}

export function MindMapList({ shared = false }: MindMapListProps) {
  const [mindMaps, setMindMaps] = useState<MindMap[]>([])
  const { getAll, getItem } = useLocalStorage()

  // 从本地存储加载思维导图
  useEffect(() => {
    const maps = getAll()
      .filter((key) => key.startsWith("mindmap-"))
      .map((key) => {
        try {
          const data = getItem(key, {})
          return {
            id: key.replace("mindmap-", ""),
            name: data.name || "未命名思维导图",
            updatedAt: new Date().toLocaleDateString(),
            thumbnail: "/placeholder.svg?height=150&width=250",
          }
        } catch (e) {
          return null
        }
      })
      .filter(Boolean) as MindMap[]

    setMindMaps(maps)
  }, [getAll, getItem])

  // 如果没有思维导图
  if (mindMaps.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">
          {shared ? "没有共享的思维导图" : "您还没有创建思维导图"}
        </h3>
        <p className="text-muted-foreground mt-1">
          {shared 
            ? "当其他用户与您共享思维导图时，它们将显示在这里" 
            : "点击【新建思维导图】按钮开始创建"
          }
        </p>
        
        {!shared && (
          <Link href="/" className="mt-4 inline-block">\
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新建思维导图
            </Button>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mindMaps.map((map) => (
        <Card key={map.id} className="overflow-hidden">
          <Link href={`/?id=${map.id}`}>
            <div className="aspect-video relative overflow-hidden border-b">
              <Image
                src={map.thumbnail || "/tpl.png"}
                alt={map.name}
                fill
                className="object-contain transition-transform hover:scale-105"
              />
            </div>
          </Link>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium truncate">{map.name}</h3>
                <p className="text-xs text-muted-foreground">更新于 {map.updatedAt}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">打开菜单</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>重命名</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>复制</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    <span>分享</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>删除</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <div className="text-xs text-muted-foreground">{shared ? "由 用户名 共享" : "私有"}</div>
            <Link href={`/?id=${map.id}`}>
              <Button variant="ghost" size="sm">
                <Edit className="mr-2 h-3 w-3" />
                编辑
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default MindMapList
