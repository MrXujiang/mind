import { DashboardHeader } from "@/components/dashboard/header"
import MindMapList from "@/components/dashboard/mind-map-list"
import { TemplateGallery } from "@/components/dashboard/template-gallery"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <DashboardHeader />

      <Tabs defaultValue="my-maps" className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="my-maps">我的导图</TabsTrigger>
          <TabsTrigger value="templates">模板</TabsTrigger>
          <TabsTrigger value="shared">已共享</TabsTrigger>
        </TabsList>
        <TabsContent value="my-maps" className="mt-6">
          <MindMapList />
        </TabsContent>
        <TabsContent value="templates" className="mt-6">
          <TemplateGallery />
        </TabsContent>
        <TabsContent value="shared" className="mt-6">
          <MindMapList shared />
        </TabsContent>
      </Tabs>
    </div>
  )
}
