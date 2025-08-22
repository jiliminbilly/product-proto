import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';

/**
 * React应用的入口点
 * 渲染主应用组件到DOM
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
