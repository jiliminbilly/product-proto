/**
 * 组件测试的设置文件
 * 配置测试环境和全局设置
 */

// 模拟CSS模块
jest.mock('*.css', () => ({}));
jest.mock('*.scss', () => ({}));
jest.mock('*.sass', () => ({}));

// 模拟静态资源
jest.mock('*.svg', () => 'svg-mock');
jest.mock('*.png', () => 'png-mock');
jest.mock('*.jpg', () => 'jpg-mock');

// 全局测试设置
beforeAll(() => {
  // 设置测试环境
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// 清理函数
afterEach(() => {
  // 清理所有模拟
  jest.clearAllMocks();
  // 清理DOM
  document.body.innerHTML = '';
});


