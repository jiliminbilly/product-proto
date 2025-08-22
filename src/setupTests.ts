/**
 * Jest测试环境设置文件
 * 配置testing-library的扩展和全局设置
 */
import '@testing-library/jest-dom';

// 全局测试设置
beforeEach(() => {
  // 清理DOM
  document.body.innerHTML = '';
});

afterEach(() => {
  // 清理所有定时器
  jest.clearAllTimers();
  // 清理所有模拟
  jest.clearAllMocks();
});


