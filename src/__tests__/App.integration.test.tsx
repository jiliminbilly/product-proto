import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../App';

/**
 * App组件的集成测试套件
 * 测试整个应用的交互流程
 */
describe('App组件集成测试', () => {
  /**
   * 测试应用的基本渲染
   */
  test('应该正确渲染应用标题和说明', () => {
    render(<App />);
    
    expect(screen.getByText('React测试框架演示')).toBeInTheDocument();
    expect(screen.getByText(/这是一个完整的React测试环境/)).toBeInTheDocument();
  });

  /**
   * 测试product-proto组件演示区域
   */
  test('应该正确渲染product-proto组件演示区域', () => {
    render(<App />);
    
    expect(screen.getByText('报价配置原型组件')).toBeInTheDocument();
    expect(screen.getByText(/这是一个复杂的报价配置组件/)).toBeInTheDocument();
  });

  /**
   * 测试测试说明区域
   */
  test('应该正确渲染测试说明区域', () => {
    render(<App />);
    
    expect(screen.getByText('测试说明')).toBeInTheDocument();
    expect(screen.getByText('运行测试')).toBeInTheDocument();
    expect(screen.getByText('测试文件结构')).toBeInTheDocument();
  });

  /**
   * 测试应用的整体布局和样式
   */
  test('应该具有正确的CSS类名和结构', () => {
    render(<App />);
    
    const app = screen.getByTestId('app');
    expect(app).toHaveClass('app');
    
    const header = app.querySelector('.app__header');
    expect(header).toBeInTheDocument();
    
    const main = app.querySelector('.app__main');
    expect(main).toBeInTheDocument();
    
    const sections = app.querySelectorAll('.app__section');
    expect(sections).toHaveLength(2); // 应该有2个section
  });

  /**
   * 测试product-proto组件的集成
   */
  test('应该正确集成product-proto组件', () => {
    render(<App />);
    
    // 检查product-proto组件是否正确渲染
    expect(screen.getByText('报价配置原型')).toBeInTheDocument();
    expect(screen.getByText('全部展开')).toBeInTheDocument();
    expect(screen.getByText('全部收起')).toBeInTheDocument();
    expect(screen.getByText('保存')).toBeInTheDocument();
    expect(screen.getByText('保存并退出')).toBeInTheDocument();
  });

  /**
   * 测试应用的可访问性
   */
  test('应该具有正确的测试ID', () => {
    render(<App />);
    
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });
});
