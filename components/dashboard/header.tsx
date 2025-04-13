"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">思维导图</h1>
        <p className="text-muted-foreground">管理和创建您的思维导图</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索思维导图..." className="pl-8 w-full md:w-[200px] lg:w-[300px]" />
        </div>

          <Link href="/">
              <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  新建思维导图
              </Button>
          </Link>

          <Link href="https://mindlink.turntip.cn">
              <Button>
                  AI智能文档
              </Button>
          </Link>


      </div>
    </div>
  )
}
