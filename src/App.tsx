import React from 'react';
import QuotePrototype from './components/product-proto-select';

/**
 * 主应用组件
 * 
 * @returns 渲染的应用界面
 */
export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50" data-testid="app">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-900 text-center">React测试框架演示</h1>
          <p className="mt-2 text-lg text-slate-600 text-center">这是一个完整的React测试环境，包含组件示例和测试用例</p>
        </div>
      </header>

      <main className="max-w-8xl mx-auto px-4 py-8">
        <section className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">报价配置原型组件</h2>
          <p className="text-slate-600 mb-6">这是一个复杂的报价配置组件，演示了状态管理、用户交互和复杂业务逻辑</p>
          <QuotePrototype />
        </section>
      </main>
    </div>
  );
};
