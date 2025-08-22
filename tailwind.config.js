/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 自定义颜色
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        },
        amber: {
          100: '#fef3c7',
          700: '#a16207',
        }
      },
      spacing: {
        // 自定义间距
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        // 自定义圆角
        '4xl': '2rem',
      },
      boxShadow: {
        // 自定义阴影
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [
    // 可以添加Tailwind插件
  ],
}
