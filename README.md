# Joy Grid - 游戏聚合平台

Joy Grid 是一个现代化的游戏聚合平台，提供各种类型的在线游戏，支持响应式设计，并针对 SEO 进行了优化。

## 功能特点

- 🎮 丰富的游戏库
- 📱 响应式设计，支持移动端和桌面端
- 🔍 智能搜索系统
- 🎯 个性化游戏推荐
- 📊 游戏评分和评论系统
- 🎥 游戏视频预览
- 🔒 用户系统（可选）

## 技术栈

- 前端：Next.js + React + TypeScript
- 样式：Tailwind CSS
- 后端：Node.js + Express
- 数据库：MongoDB
- 部署：Vercel

## 开始使用

### 环境要求

- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器
- MongoDB 数据库

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/yourusername/joy-grid.git
cd joy-grid
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 配置环境变量
创建 `.env.local` 文件并添加以下配置：
```env
MONGODB_URI=你的MongoDB连接字符串
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=你的NextAuth密钥
```

4. 运行开发服务器
```bash
npm run dev
# 或
yarn dev
```

5. 访问网站
打开浏览器访问 http://localhost:3000

## 项目结构

```
joy-grid/
├── components/          # React组件
│   ├── layout/         # 布局组件
│   └── game/           # 游戏相关组件
├── pages/              # 页面组件
├── public/             # 静态资源
├── styles/             # 样式文件
├── lib/                # 工具函数和API
└── types/              # TypeScript类型定义
```

## SEO 优化

- 使用语义化 HTML 标签
- 优化 meta 标签
- 实现响应式设计
- 优化图片加载
- 实现站点地图
- 添加结构化数据

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

- 网站：www.joy-grid.com
- 邮箱：contact@joy-grid.com
- Twitter：@joygrid 