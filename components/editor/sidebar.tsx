"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { templates } from "@/lib/templates"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`border-r bg-background transition-all duration-300 ${isOpen ? "w-64" : "w-0"}`}>
      {isOpen && (
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-medium">模板</h3>
          </div>
          <ScrollArea className="flex-1">
            <div className="grid gap-4 p-4">
              {templates.map((template) => (
                <Link href={`/?template=${template.id}`} key={template.id}>
                  <div className="space-y-2 hover:opacity-80 transition-opacity cursor-pointer">
                    <div className="overflow-hidden rounded-md border">
                      <Image
                        src={template.thumbnail || "/placeholder.svg?height=100&width=150"}
                        alt={template.name}
                        width={150}
                        height={100}
                        className="object-cover w-full"
                      />
                    </div>
                    <div className="text-sm text-center">{template.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <div className="p-4">
            <Button variant="outline" size="sm" className="w-full">
              导入模板
            </Button>
          </div>
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "<" : ">"}
      </Button>
    </div>
  )
}
