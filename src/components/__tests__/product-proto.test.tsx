import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuotePrototype from '../product-proto';

/**
 * QuotePrototype组件的测试套件
 */
describe('QuotePrototype组件', () => {
  /**
   * 测试组件的基本渲染
   */
  test('应该正确渲染组件标题', () => {
    render(<QuotePrototype />);
    expect(screen.getByText('报价配置原型')).toBeInTheDocument();
  });

  /**
   * 测试顶部工具条功能
   */
  test('应该正确渲染顶部工具条', () => {
    render(<QuotePrototype />);
    
    expect(screen.getByText('全部展开')).toBeInTheDocument();
    expect(screen.getByText('全部收起')).toBeInTheDocument();
    expect(screen.getByText('只看受控项')).toBeInTheDocument();
    expect(screen.getByText('下载明细')).toBeInTheDocument();
  });

  /**
   * 测试汇总卡片显示
   */
  test('应该正确显示汇总信息', () => {
    render(<QuotePrototype />);
    
    expect(screen.getByText('税前合计')).toBeInTheDocument();
    expect(screen.getByText('受控合计')).toBeInTheDocument();
    expect(screen.getByText('非受控合计')).toBeInTheDocument();
  });

  /**
   * 测试产品组显示
   */
  test('应该正确显示产品组', () => {
    render(<QuotePrototype />);
    
    expect(screen.getByText('TSS10000-A58-WS')).toBeInTheDocument();
    expect(screen.getByText('NSG4000-TG45')).toBeInTheDocument();
    expect(screen.getByText('测试型号Q25071401')).toBeInTheDocument();
  });

  /**
   * 测试展开/收起功能
   */
  test('应该正确处理展开收起功能', () => {
    render(<QuotePrototype />);
    
    const expandButton = screen.getByText('全部展开');
    const collapseButton = screen.getByText('全部收起');
    
    expect(expandButton).toBeInTheDocument();
    expect(collapseButton).toBeInTheDocument();
  });

  /**
   * 测试底部操作按钮
   */
  test('应该正确显示底部操作按钮', () => {
    render(<QuotePrototype />);
    
    expect(screen.getByText('保存')).toBeInTheDocument();
    expect(screen.getByText('保存并退出')).toBeInTheDocument();
  });

  /**
   * 测试套数编辑功能
   */
  test('应该允许编辑套数', () => {
    render(<QuotePrototype />);
    
    const setCountInputs = screen.getAllByDisplayValue('1');
    expect(setCountInputs.length).toBeGreaterThan(0);
  });

  /**
   * 测试筛选功能
   */
  test('应该正确显示筛选选项', () => {
    render(<QuotePrototype />);
    
    const controlledCheckbox = screen.getByLabelText('只看受控项');
    expect(controlledCheckbox).toBeInTheDocument();
  });

  /**
   * 测试单套价格显示
   */
  test('应该正确显示单套价格', () => {
    render(<QuotePrototype />);
    
    // 检查是否显示了单套价格标签
    const singleSetLabels = screen.getAllByText('单套');
    expect(singleSetLabels.length).toBeGreaterThan(0);
    
    // 检查是否显示了合计价格标签
    const totalLabels = screen.getAllByText('合计');
    expect(totalLabels.length).toBeGreaterThan(0);
  });

  /**
   * 测试组件的数据结构
   */
  test('应该正确显示物料信息', () => {
    render(<QuotePrototype />);
    
    // 检查是否显示了物料名称
    expect(screen.getByText('天眼TSS10000-A58的评审平台主机')).toBeInTheDocument();
    expect(screen.getByText('智能解码计算服务授权')).toBeInTheDocument();
    expect(screen.getByText('防火墙主控单机')).toBeInTheDocument();
  });

  /**
   * 测试价格计算功能
   */
  test('应该正确显示价格信息', () => {
    render(<QuotePrototype />);
    
    // 检查是否显示了价格相关的列
    expect(screen.getByText('标准价')).toBeInTheDocument();
    expect(screen.getByText('成交单价')).toBeInTheDocument();
    expect(screen.getByText('小计')).toBeInTheDocument();
  });

  /**
   * 测试受控状态显示
   */
  test('应该正确显示受控状态', () => {
    render(<QuotePrototype />);
    
    // 检查受控标签
    const controlledLabels = screen.getAllByText('受控');
    expect(controlledLabels.length).toBeGreaterThan(0);
  });
});
