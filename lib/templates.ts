import type { Node, Edge } from "reactflow"

// 定义模板数据结构
export interface Template {
  id: string
  name: string
  description?: string
  thumbnail: string
  data?: {
    nodes: Node[]
    edges: Edge[]
  }
}

// 默认模板
const defaultTemplate: Template = {
  id: "template-1",
  name: "默认",
  description: "基础思维导图模板",
  thumbnail: "/tpl.png",
  data: {
    nodes: [
      {
        id: "1",
        type: "mindMap",
        data: { label: "中心主题" },
        position: { x: 250, y: 200 },
      },
      {
        id: "2",
        type: "mindMap",
        data: { label: "子主题 1", color: "blue" },
        position: { x: 450, y: 100 },
      },
      {
        id: "3",
        type: "mindMap",
        data: { label: "子主题 2", color: "green" },
        position: { x: 450, y: 200 },
      },
      {
        id: "4",
        type: "mindMap",
        data: { label: "子主题 3", color: "red" },
        position: { x: 450, y: 300 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e1-4", source: "1", target: "4" },
    ],
  },
}

// 项目计划模板
const projectTemplate: Template = {
  id: "template-2",
  name: "项目计划",
  description: "用于规划和跟踪项目进度的思维导图模板",
  thumbnail: "/tpl.png",
  data: {
    nodes: [
      {
        id: "1",
        type: "mindMap",
        data: { label: "项目名称", shape: "rectangle" },
        position: { x: 250, y: 200 },
      },
      {
        id: "2",
        type: "mindMap",
        data: { label: "需求分析", color: "blue" },
        position: { x: 450, y: 100 },
      },
      {
        id: "3",
        type: "mindMap",
        data: { label: "设计", color: "purple" },
        position: { x: 450, y: 200 },
      },
      {
        id: "4",
        type: "mindMap",
        data: { label: "开发", color: "green" },
        position: { x: 450, y: 300 },
      },
      {
        id: "5",
        type: "mindMap",
        data: { label: "测试", color: "yellow" },
        position: { x: 450, y: 400 },
      },
      {
        id: "6",
        type: "mindMap",
        data: { label: "上线", color: "red" },
        position: { x: 450, y: 500 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e1-4", source: "1", target: "4" },
      { id: "e1-5", source: "1", target: "5" },
      { id: "e1-6", source: "1", target: "6" },
    ],
  },
}

// 学习笔记模板
const studyTemplate: Template = {
  id: "template-3",
  name: "学习笔记",
  description: "用于整理学习内容和知识点的思维导图模板",
  thumbnail: "/tpl.png",
  data: {
    nodes: [
      {
        id: "1",
        type: "mindMap",
        data: { label: "学习主题", shape: "circle" },
        position: { x: 250, y: 200 },
      },
      {
        id: "2",
        type: "mindMap",
        data: { label: "概念", color: "blue" },
        position: { x: 450, y: 100 },
      },
      {
        id: "3",
        type: "mindMap",
        data: { label: "原理", color: "green" },
        position: { x: 450, y: 200 },
      },
      {
        id: "4",
        type: "mindMap",
        data: { label: "应用", color: "purple" },
        position: { x: 450, y: 300 },
      },
      {
        id: "5",
        type: "mindMap",
        data: { label: "概念1", color: "blue" },
        position: { x: 650, y: 50 },
      },
      {
        id: "6",
        type: "mindMap",
        data: { label: "概念2", color: "blue" },
        position: { x: 650, y: 150 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e1-4", source: "1", target: "4" },
      { id: "e2-5", source: "2", target: "5" },
      { id: "e2-6", source: "2", target: "6" },
    ],
  },
}

// 头脑风暴模板
const brainstormTemplate: Template = {
  id: "template-4",
  name: "头脑风暴",
  description: "用于创意发散和头脑风暴的思维导图模板",
  thumbnail: "/tpl.png",
  data: {
    nodes: [
      {
        id: "1",
        type: "mindMap",
        data: { label: "创意主题", color: "yellow" },
        position: { x: 250, y: 200 },
      },
      {
        id: "2",
        type: "mindMap",
        data: { label: "想法 1", color: "blue" },
        position: { x: 450, y: 100 },
      },
      {
        id: "3",
        type: "mindMap",
        data: { label: "想法 2", color: "green" },
        position: { x: 450, y: 200 },
      },
      {
        id: "4",
        type: "mindMap",
        data: { label: "想法 3", color: "red" },
        position: { x: 450, y: 300 },
      },
      {
        id: "5",
        type: "mindMap",
        data: { label: "想法 4", color: "purple" },
        position: { x: 450, y: 400 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e1-4", source: "1", target: "4" },
      { id: "e1-5", source: "1", target: "5" },
    ],
  },
}

// 会议记录模板
const meetingTemplate: Template = {
  id: "template-5",
  name: "会议记录",
  description: "用于记录会议内容和决策的思维导图模板",
  thumbnail: "/tpl.png",
  data: {
    nodes: [
      {
        id: "1",
        type: "mindMap",
        data: { label: "会议主题", shape: "card" },
        position: { x: 250, y: 200 },
      },
      {
        id: "2",
        type: "mindMap",
        data: { label: "议程", color: "blue" },
        position: { x: 450, y: 100 },
      },
      {
        id: "3",
        type: "mindMap",
        data: { label: "讨论要点", color: "green" },
        position: { x: 450, y: 200 },
      },
      {
        id: "4",
        type: "mindMap",
        data: { label: "决策", color: "red" },
        position: { x: 450, y: 300 },
      },
      {
        id: "5",
        type: "mindMap",
        data: { label: "行动项", color: "purple" },
        position: { x: 450, y: 400 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e1-4", source: "1", target: "4" },
      { id: "e1-5", source: "1", target: "5" },
    ],
  },
}

// 目标管理模板
const goalTemplate: Template = {
  id: "template-6",
  name: "目标管理",
  description: "用于设定和跟踪个人或团队目标的思维导图模板",
  thumbnail: "/tpl.png",
  data: {
    nodes: [
      {
        id: "1",
        type: "mindMap",
        data: { label: "目标", shape: "card" },
        position: { x: 250, y: 200 },
      },
      {
        id: "2",
        type: "mindMap",
        data: { label: "短期目标", color: "blue" },
        position: { x: 450, y: 100 },
      },
      {
        id: "3",
        type: "mindMap",
        data: { label: "中期目标", color: "green" },
        position: { x: 450, y: 200 },
      },
      {
        id: "4",
        type: "mindMap",
        data: { label: "长期目标", color: "purple" },
        position: { x: 450, y: 300 },
      },
      {
        id: "5",
        type: "mindMap",
        data: { label: "里程碑", color: "yellow" },
        position: { x: 450, y: 400 },
      },
      {
        id: "6",
        type: "mindMap",
        data: { label: "关键绩效指标", color: "red" },
        position: { x: 450, y: 500 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e1-3", source: "1", target: "3" },
      { id: "e1-4", source: "1", target: "4" },
      { id: "e1-5", source: "1", target: "5" },
      { id: "e1-6", source: "1", target: "6" },
    ],
  },
}

export const templates: Template[] = [
  defaultTemplate,
  projectTemplate,
  studyTemplate,
  brainstormTemplate,
  meetingTemplate,
  goalTemplate,
]
