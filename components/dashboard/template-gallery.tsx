"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { templates } from "@/lib/templates"

export function TemplateGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden">
          <div className="aspect-video relative overflow-hidden border-b">
            <Image src={template.thumbnail || "/tpl.png"} alt={template.name} fill className="object-contain" />
          </div>
          <CardContent className="p-4">
            <div>
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Link href={`/?template=${template.id}`}>
                <Button size="sm">使用此模板</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
