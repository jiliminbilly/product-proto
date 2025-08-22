# React测试框架演示项目

这是一个完整的React测试环境，展示了如何使用Jest和React Testing Library来测试React组件。

## 🚀 项目特性

- **React 18** - 使用最新的React版本
- **TypeScript** - 完整的类型支持
- **Jest** - 强大的测试框架
- **React Testing Library** - React组件测试的最佳实践
- **Vite** - 快速的开发构建工具
- **完整的测试覆盖** - 包含组件测试示例

## 📦 安装依赖

```bash
npm install
```

## 🧪 运行测试

```bash
# 运行所有测试
npm test

# 监听模式运行测试
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage
```

## 🚀 开发模式

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
src/
├── components/           # React组件
│   ├── Button.tsx      # 按钮组件
│   ├── Counter.tsx     # 计数器组件
│   └── __tests__/      # 组件测试文件
│       ├── Button.test.tsx
│       └── Counter.test.tsx
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口点
├── setupTests.ts       # 测试环境配置
└── vite-env.d.ts      # Vite类型声明
```

## 🧩 组件说明

### Button组件
- 支持多种变体：primary、secondary、danger
- 支持多种尺寸：small、medium、large
- 支持禁用状态
- 完整的可访问性支持

### Counter组件
- 可配置的初始值、步进值
- 最大值和最小值限制
- 增加、减少、重置功能
- 状态管理演示

## 🧪 测试特性

- **组件渲染测试** - 验证组件是否正确渲染
- **用户交互测试** - 测试点击、输入等用户操作
- **状态变化测试** - 验证组件状态变化
- **边界条件测试** - 测试边界值和异常情况
- **可访问性测试** - 确保组件的可访问性

## 🔧 配置说明

### Jest配置
- 使用jsdom环境模拟浏览器环境
- 配置TypeScript支持
- 设置测试文件匹配模式
- 配置测试覆盖率收集

### TypeScript配置
- 支持React JSX
- 严格的类型检查
- 现代ES2020特性支持

### Vite配置
- React插件支持
- 开发服务器配置
- 构建优化设置

## 📚 学习资源

- [React Testing Library 官方文档](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest 官方文档](https://jestjs.io/docs/getting-started)
- [React 官方文档](https://react.dev/)

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License
