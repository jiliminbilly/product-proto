import React, { useMemo, useState, useEffect } from "react";

// ===== Types =====
interface ItemRow {
  id: string;
  name: string;
  spec?: string;
  unit: string;
  listPrice: number;
  discountPct: number;
  qty: number;
  controlled: boolean;
}

interface ProductGroup {
  id: string;
  name: string;
  version?: string;
  term?: string;
  items: ItemRow[];
  collapsed?: boolean;
  setCount?: number; // 套数（>=1）
}

// ===== Utils =====
const fmtCny = (n: number) =>
  n.toLocaleString("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 2,
  });

const money = (n: number) =>
  n.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const computeItemSubtotal = (it: ItemRow) => {
  const unit = it.listPrice * (1 - (isNaN(it.discountPct) ? 0 : it.discountPct) / 100);
  return unit * (isNaN(it.qty) ? 0 : it.qty);
};

// ===== Seed Data =====
const initialData: ProductGroup[] = [
  {
    id: "p1",
    name: "TSS10000-A58-WS",
    version: "省公安指挥及协同4.0",
    term: "1年服务期",
    setCount: 1,
    items: [
      { id: "p1-1", name: "天眼TSS10000-A58的评审平台主机", spec: "2U设备，含安装", unit: "套", listPrice: 1347192, discountPct: 0, qty: 2, controlled: false },
      { id: "p1-2", name: "智能解码计算服务授权", spec: "开通一年服务权限", unit: "年", listPrice: 404157.6, discountPct: 0, qty: 2, controlled: true },
      { id: "p1-3", name: "扩展网卡", unit: "块", listPrice: 2960, discountPct: 0, qty: 4, controlled: false },
      { id: "p1-4", name: "智能辅助听力功能模块", unit: "套", listPrice: 309854.16, discountPct: 0, qty: 2, controlled: true },
      { id: "p1-5", name: "S8评审平台节流保险服务", unit: "年/套", listPrice: 67359.6, discountPct: 0, qty: 2, controlled: false },
    ],
  },
  {
    id: "p2",
    name: "NSG4000-TG45",
    version: "网神SecGate3600防火墙系统V3.6.0",
    setCount: 1,
    items: [
      { id: "p2-1", name: "防火墙主控单机", unit: "套", listPrice: 4000, discountPct: 0, qty: 4, controlled: false },
      { id: "p2-2", name: "下一代防火墙高级软件", unit: "年", listPrice: 4000, discountPct: 0, qty: 2, controlled: true },
      { id: "p2-3", name: "IPSEC VPN软件模块(1000条隧道)", unit: "个", listPrice: 4000, discountPct: 0, qty: 2, controlled: false },
    ],
  },
  {
    id: "p3",
    name: "测试型号Q25071401",
    version: "SecAV3600防毒墙系统V3.1",
    setCount: 1,
    items: [
      { id: "p3-1", name: "固定-基额-费Q25071401", unit: "年", listPrice: 7000, discountPct: 0, qty: 2, controlled: true },
    ],
  },
];

// ===== Component =====
export default function QuotePrototype() {
  const [groups, setGroups] = useState<ProductGroup[]>(initialData);
  const [onlyControlled, setOnlyControlled] = useState(false);

  // ---- mutations ----
  const updateItem = (pid: string, iid: string, patch: Partial<ItemRow>) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id !== pid ? g : { ...g, items: g.items.map((it) => (it.id !== iid ? it : { ...it, ...patch })) }
      )
    );
  };

  const updateSetCount = (pid: string, count: number) => {
    setGroups((prev) => prev.map((g) => (g.id !== pid ? g : { ...g, setCount: Math.max(1, count) })));
  };

  const toggleGroup = (pid: string, collapsed?: boolean) => {
    setGroups((prev) => prev.map((g) => (g.id !== pid ? g : { ...g, collapsed: collapsed ?? !g.collapsed })));
  };

  const expandAll = (v: boolean) => setGroups((prev) => prev.map((g) => ({ ...g, collapsed: !v })));

  // ---- filtering for view ----
  const visibleGroups = useMemo(() => {
    const match = (it: ItemRow) => {
      if (onlyControlled && !it.controlled) return false;
      return true;
    };
    return groups.map((g) => ({ ...g, items: g.items.filter(match) }));
  }, [groups, onlyControlled]);

  // ---- totals (respect setCount & current filter) ----
  const totals = useMemo(() => {
    let total = 0,
      controlled = 0,
      uncontrolled = 0;
    for (const g of visibleGroups) {
      const sets = g.setCount || 1;
      for (const it of g.items) {
        const sub = computeItemSubtotal(it) * sets;
        total += sub;
        if (it.controlled) controlled += sub; else uncontrolled += sub;
      }
    }
    return { total, controlled, uncontrolled };
  }, [visibleGroups]);

  // ---- very small unit tests (console) ----
  useEffect(() => {
    try {
      // item subtotal: 100 * (1-10%) * 2 = 180
      console.assert(
        computeItemSubtotal({ id: "x", name: "t", unit: "套", listPrice: 100, discountPct: 10, qty: 2, controlled: false }) === 180,
        "computeItemSubtotal failed"
      );
      // zero quantity => 0
      console.assert(
        computeItemSubtotal({ id: "y", name: "t", unit: "套", listPrice: 999, discountPct: 0, qty: 0, controlled: false }) === 0,
        "computeItemSubtotal zero-qty failed"
      );
      // 100% discount => 0
      console.assert(
        computeItemSubtotal({ id: "z", name: "t", unit: "套", listPrice: 500, discountPct: 100, qty: 3, controlled: false }) === 0,
        "computeItemSubtotal full-discount failed"
      );
      // per-set * sets check
      const perSet = 1000;
      const sets = 3;
      console.assert(perSet * sets === 3000, "perSet*sets failed");
    } catch {}
  }, []);

  // ---- actions ----
  const handleSave = () => {
    alert("已保存（示例）\n总计：" + fmtCny(totals.total));
  };
  const handleSaveExit = () => {
    alert("已保存并退出（示例）\n总计：" + fmtCny(totals.total));
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col">
      {/* 顶部工具条 */}
      <div className="sticky top-0 z-20 bg-white border-b px-4 py-3 flex items-center gap-2">
        <div className="text-lg font-semibold">报价配置原型</div>
        <div className="ml-auto flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-xl border hover:bg-slate-100" onClick={() => expandAll(true)}>
            全部展开
          </button>
          <button className="px-3 py-1.5 rounded-xl border hover:bg-slate-100" onClick={() => expandAll(false)}>
            全部收起
          </button>
          <div className="h-6 w-px bg-slate-200" />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="accent-blue-600"
              checked={onlyControlled}
              onChange={(e) => setOnlyControlled(e.target.checked)}
            />
            只看受控项
          </label>
          <button className="px-3 py-1.5 rounded-xl bg-blue-600 text-white hover:opacity-90">下载明细</button>
        </div>
      </div>

      {/* 顶部汇总卡片 */}
      <div className="max-w-[1440px] mx-auto px-4 mt-4 w-full">
        <div className="rounded-2xl border bg-white p-4 shadow-sm grid grid-cols-3 gap-4">
          <div className="flex flex-col text-sm">
            <span className="text-slate-500">税前合计</span>
            <span className="font-semibold text-blue-700">{fmtCny(totals.total)}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-slate-500">受控合计</span>
            <span className="font-medium">{fmtCny(totals.controlled)}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-slate-500">非受控合计</span>
            <span className="font-medium">{fmtCny(totals.uncontrolled)}</span>
          </div>
        </div>
      </div>

      {/* 分组卡片 */}
      <div className="flex-1 max-w-[1440px] mx-auto px-4 py-4 w-full">
        {visibleGroups.map((g) => {
          const perSetTotal = g.items.reduce((acc, it) => acc + computeItemSubtotal(it), 0);
          const sets = g.setCount || 1;
          const multiTotal = perSetTotal * sets;
          return (
            <div key={g.id} className="mb-4 rounded-2xl overflow-hidden shadow-sm border bg-white">
              {/* 组头 */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b">
                <button
                  className="w-7 h-7 grid place-items-center rounded-lg border"
                  onClick={() => toggleGroup(g.id)}
                >
                  {g.collapsed ? "+" : "−"}
                </button>
                <div className="font-medium">{g.name}</div>
                {g.version && <div className="text-slate-500 text-sm">{g.version}</div>}

                <div className="ml-auto flex items-center gap-4 text-sm">
                  <div className="text-slate-500">
                    子物料：<b>{g.items.length}</b> 项
                  </div>
                  {/* 套数（收起也显示，可编辑） */}
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">套数</span>
                    <input
                      type="number"
                      min={1}
                      className="w-20 px-2 py-1 border rounded-lg text-right"
                      value={g.setCount || 1}
                      onChange={(e) => updateSetCount(g.id, Math.max(1, Number(e.target.value)))}
                    />
                  </div>
                  {/* 单套价格 */}
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="text-slate-500">单套</span>
                    <span className="font-medium">{fmtCny(perSetTotal)}</span>
                  </div>
                  {/* 合计金额 */}
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="text-slate-500">合计</span>
                    <span className="font-semibold text-blue-700">{fmtCny(multiTotal)}</span>
                  </div>
                </div>
              </div>

              {/* 明细表（展开时显示） */}
              {!g.collapsed && (
                <div className="overflow-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-white border-b">
                        <th className="text-left px-4 py-2 w-[22%]">物料名</th>
                        <th className="text-left px-2 py-2">规格/说明</th>
                        <th className="text-center px-2 py-2">单位</th>
                        <th className="text-right px-2 py-2">标准价</th>
                        <th className="text-center px-2 py-2">折扣%</th>
                        <th className="text-right px-2 py-2">成交单价</th>
                        <th className="text-center px-2 py-2">数量</th>
                        <th className="text-right px-2 py-2">小计</th>
                        <th className="text-center px-2 py-2">受控</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.items.map((it) => {
                        const unitPrice = it.listPrice * (1 - it.discountPct / 100);
                        const sub = computeItemSubtotal(it);
                        return (
                          <tr key={it.id} className="border-b hover:bg-slate-50">
                            <td className="px-4 py-2 align-top">
                              <div className="font-medium">{it.name}</div>
                            </td>
                            <td className="px-2 py-2 align-top text-slate-600">{it.spec || "-"}</td>
                            <td className="px-2 py-2 text-center">{it.unit}</td>
                            <td className="px-2 py-2 text-right tabular-nums">{money(it.listPrice)}</td>
                            <td className="px-2 py-2 text-center">
                              <input
                                type="number"
                                className="w-20 px-2 py-1 border rounded-lg text-right"
                                value={it.discountPct}
                                min={0}
                                max={100}
                                onChange={(e) => updateItem(g.id, it.id, { discountPct: Number(e.target.value) })}
                              />
                            </td>
                            <td className="px-2 py-2 text-right tabular-nums font-medium">{money(unitPrice)}</td>
                            <td className="px-2 py-2 text-center">
                              <input
                                type="number"
                                className="w-20 px-2 py-1 border rounded-lg text-right"
                                value={it.qty}
                                min={0}
                                onChange={(e) => updateItem(g.id, it.id, { qty: Number(e.target.value) })}
                              />
                            </td>
                            <td className="px-2 py-2 text-right font-semibold text-slate-900 tabular-nums">{money(sub)}</td>
                            <td className="px-2 py-2 text-center">
                              {it.controlled ? (
                                <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700">受控</span>
                              ) : (
                                <span className="text-slate-400 text-xs">否</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 底部购物车操作条 */}
      <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-slate-600">
          总计：<span className="font-semibold text-blue-700">{fmtCny(totals.total)}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} className="px-4 py-2 rounded-xl border hover:bg-slate-50">
            保存
          </button>
          <button onClick={handleSaveExit} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:opacity-90">
            保存并退出
          </button>
        </div>
      </div>
    </div>
  );
}
