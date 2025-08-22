import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

/**
 * 自定义渲染器，用于包装组件进行测试
 * 可以添加全局的providers、context等
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // 可以在这里添加自定义的测试选项
}

/**
 * 自定义渲染函数
 * 
 * @param ui - 要渲染的React元素
 * @param options - 渲染选项
 * @returns 渲染结果和工具函数
 */
export function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  // 这里可以添加全局的providers
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
}

/**
 * 模拟用户延迟操作
 * 
 * @param ms - 延迟时间（毫秒）
 * @returns Promise
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 模拟异步操作
 * 
 * @param result - 异步操作的结果
 * @param ms - 延迟时间（毫秒）
 * @returns Promise
 */
export const mockAsync = <T>(result: T, ms: number = 100): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(result), ms);
  });
};

/**
 * 创建模拟的事件处理函数
 * 
 * @returns 模拟的事件处理函数
 */
export const createMockHandler = () => {
  return jest.fn();
};

/**
 * 等待元素出现
 * 
 * @param queryFn - 查询函数
 * @param timeout - 超时时间（毫秒）
 * @returns Promise
 */
export const waitForElement = async (
  queryFn: () => Element | null,
  timeout: number = 5000
) => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const element = queryFn();
    if (element) {
      return element;
    }
    await delay(100);
  }
  
  throw new Error(`Element not found within ${timeout}ms`);
};

/**
 * 模拟键盘事件
 * 
 * @param element - 目标元素
 * @param key - 按键
 * @param options - 事件选项
 */
export const pressKey = (
  element: Element,
  key: string,
  options: KeyboardEventInit = {}
) => {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, ...options }));
  element.dispatchEvent(new KeyboardEvent('keyup', { key, ...options }));
};

/**
 * 模拟表单输入
 * 
 * @param element - 输入元素
 * @param value - 输入值
 */
export const typeInInput = (element: HTMLInputElement, value: string) => {
  element.value = value;
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
};

// 重新导出testing-library的常用函数
export * from '@testing-library/react';
export { customRender as render };


