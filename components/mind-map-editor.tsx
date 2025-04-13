"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  Panel,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow"
import "reactflow/dist/style.css"
import { EditorHeader } from "./editor/header"
import { Toolbar } from "./editor/toolbar"
import { MindMapNode } from "./editor/mind-map-node"
import { Sidebar } from "./editor/sidebar"
import { generateUniqueId } from "@/lib/utils"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { defaultNodes, defaultEdges } from "@/lib/default-data"
import { ExportPanel } from "./editor/export-panel"
import { useSearchParams } from "next/navigation"
import { templates } from "@/lib/templates"
import { AIChatPanel } from "./editor/ai-chat-panel"

const nodeTypes: NodeTypes = {
  mindMap: MindMapNode,
}

// 内部编辑器组件
function MindMapEditorInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [showExportPanel, setShowExportPanel] = useState(false)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [mapName, setMapName] = useState("未命名思维导图")
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const [mapId, setMapId] = useState<string | null>(null)
  const initialLoadRef = useRef(false)
  const reactFlowInstance = useReactFlow()

  // 保存到本地存储
  const { setItem, getItem } = useLocalStorage()

  // 加载思维导图数据 - 只在组件挂载时执行一次
  useEffect(() => {
    if (initialLoadRef.current) return
    initialLoadRef.current = true

    const id = searchParams.get("id")
    const templateId = searchParams.get("template")

    if (id) {
      setMapId(id)
      // 从本地存储加载
      const savedMap = getItem(`mindmap-${id}`)
      if (savedMap) {
        setNodes(savedMap.nodes || defaultNodes)
        setEdges(savedMap.edges || defaultEdges)
        setMapName(savedMap.name || "未命名思维导图")
      }
    } else if (templateId) {
      // 从模板加载
      const template = templates.find((t) => t.id === templateId)
      if (template && template.data) {
        setNodes(template.data.nodes || defaultNodes)
        setEdges(template.data.edges || defaultEdges)
        setMapName(`${template.name} - 副本`)

        // 为新模板生成一个唯一ID，但不立即更新URL
        const newId = generateUniqueId()
        setMapId(newId)
      }
    } else {
      // 新建思维导图
      const newId = generateUniqueId()
      setMapId(newId)
    }
  }, [searchParams, getItem, setNodes, setEdges])

  // 保存思维导图
  const saveMap = useCallback(() => {
    if (!mapId) return

    const now = new Date().toLocaleString()
    setItem(`mindmap-${mapId}`, { nodes, edges, name: mapName })
    setLastSaved(now)

    // 如果URL中没有id参数，则更新URL（仅执行一次）
    if (!searchParams.get("id") && mapId) {
      window.history.replaceState(null, "", `/?id=${mapId}`)
    }
  }, [nodes, edges, mapName, setItem, searchParams, mapId])

  // 添加新节点
  const addChildNode = useCallback(
    (parentNode: Node) => {
      const newNodeId = generateUniqueId()
      const position = { x: parentNode.position.x + 250, y: parentNode.position.y }

      const newNode: Node = {
        id: newNodeId,
        type: "mindMap",
        data: {
          label: "新节点",
          // 继承父节点的样式
          color: parentNode.data?.color,
          shape: parentNode.data?.shape,
        },
        position,
      }

      const newEdge: Edge = {
        id: `e${parentNode.id}-${newNodeId}`,
        source: parentNode.id,
        target: newNodeId,
      }

      setNodes((nds) => nds.concat(newNode))
      setEdges((eds) => eds.concat(newEdge))
    },
    [setNodes, setEdges],
  )

  // 处理节点选择
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  // 更新节点文本
  const updateNodeText = useCallback(
    (nodeId: string, text: string) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                label: text,
              },
            }
          }
          return node
        }),
      )
    },
    [setNodes],
  )

  // 更新节点样式
  const updateNodeStyle = useCallback(
    (nodeId: string, style: { color?: string; shape?: string }) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...style,
              },
            }
          }
          return node
        }),
      )
    },
    [setNodes],
  )

  // 删除节点
  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId))
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
      if (selectedNode?.id === nodeId) {
        setSelectedNode(null)
      }
    },
    [setNodes, setEdges, selectedNode],
  )

  // 连接边
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  // 自动保存 - 使用mapId作为依赖，确保mapId存在时才开始自动保存
  useEffect(() => {
    if (!mapId) return

    const interval = setInterval(() => {
      saveMap()
    }, 30000) // 每30秒自动保存

    return () => clearInterval(interval)
  }, [saveMap, mapId])

  // 处理AI生成的思维导图
  const handleGenerateMindMap = useCallback(
    (aiNodes: Node[], aiEdges: Edge[]) => {
      // 更新节点和边
      setNodes(aiNodes)
      setEdges(aiEdges)

      // 自动保存
      setTimeout(saveMap, 500)
    },
    [setNodes, setEdges, saveMap],
  )

  return (
    <div className="h-screen flex flex-col">
      <EditorHeader
        mapName={mapName}
        onMapNameChange={setMapName}
        onSave={saveMap}
        lastSaved={lastSaved}
        onExport={() => setShowExportPanel(true)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background />
            <Panel position="top-right">
              <Toolbar
                selectedNode={selectedNode}
                onAddChild={addChildNode}
                onUpdateText={updateNodeText}
                onDeleteNode={deleteNode}
                onUpdateNodeStyle={updateNodeStyle}
              />
            </Panel>
          </ReactFlow>
        </div>
      </div>
      <AIChatPanel onGenerateMindMap={handleGenerateMindMap} />
      {showExportPanel && <ExportPanel onClose={() => setShowExportPanel(false)} nodes={nodes} edges={edges} />}
    </div>
  )
}

// 包装组件，提供ReactFlow上下文
export function MindMapEditor() {
  return (
    <ReactFlowProvider>
      <MindMapEditorInner />
    </ReactFlowProvider>
  )
}
