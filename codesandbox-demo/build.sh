#!/bin/bash

echo "�� 开始构建报价配置原型演示项目..."

# 清理之前的构建
echo "🧹 清理之前的构建文件..."
npm run clean

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 构建生产版本
echo "🔨 构建生产版本..."
npm run build:prod

# 创建制品目录
echo "📁 创建制品目录..."
mkdir -p dist
cp -r build/* dist/

# 创建部署包
echo "📦 创建部署包..."
tar -czf quote-prototype-demo.tar.gz dist/

# 显示构建结果
echo "✅ 构建完成！"
echo "📊 构建统计："
echo "   - 构建目录: build/"
echo "   - 制品目录: dist/"
echo "   - 部署包: quote-prototype-demo.tar.gz"
echo ""
echo "🌐 本地预览: npm run preview"
echo "📁 制品位置: dist/"
