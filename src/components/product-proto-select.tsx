import React, { useEffect, useMemo } from "react";
import { seedGroups } from "./constants";
import { buildCatalog, buildNavStructure } from "./utils";
import { useMaterialSelection } from "./hooks/useMaterialSelection";
import { useAnchorNavigation } from "./hooks/useAnchorNavigation";
import { AnchorTree } from "./components/AnchorTree";
import { MaterialTable } from "./components/MaterialTable";
import { SelectionSummary } from "./components/SelectionSummary";

/**
 * 物料选配原型（仅选择页面）
 * - 左侧：两级树形锚点（一级=大类，二级=小类）
 * - 中间：物料区（固定表头 + 可滚列表；按二级小类直接列出物料）
 * - 右侧：已选清单（数量可加减；年费可叠加）
 * - 不含购物车/报价阶段；点击"完成选配"仅做占位（可接后端）
 */
export default function MaterialSelector() {
  const [groups] = React.useState(seedGroups);
  const catalog = useMemo(() => buildCatalog(groups), [groups]);
  const navStructure = useMemo(() => buildNavStructure(catalog), [catalog]);

  // 使用物料选择逻辑 Hook
  const {
    selected,
    checkedItems,
    addSel,
    removeSel,
    clearSel,
    toggleItemCheck,
    toggleAllCheck,
    summary
  } = useMaterialSelection(catalog);

  // 使用锚点导航逻辑 Hook
  const {
    expanded,
    setExpanded,
    activeC2,
    listRef,
    c2Refs,
    scrollToC2,
    setC2Ref
  } = useAnchorNavigation(navStructure);

  // 完成选配处理
  const handleDone = () => {
    const items = Object.entries(selected).filter(([, q]) => q > 0).length;
    alert(`已完成选配：${items} 条\n一次性：${summary.oneTime.toLocaleString("zh-CN", { style: "currency", currency: "CNY" })}\n年费：${summary.yearly.toLocaleString("zh-CN", { style: "currency", currency: "CNY" })}\n合计：${summary.total.toLocaleString("zh-CN", { style: "currency", currency: "CNY" })}`);
  };

  // ===== 渲染 =====
  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* 顶栏 */}
      <div className="sticky top-0 z-20 bg-white border-b px-4 py-3 flex items-center gap-2">
        <div className="text-lg font-semibold">物料选配</div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={handleDone} className="px-3 py-1.5 rounded-xl bg-blue-600 text-white hover:opacity-90">
            完成选配
          </button>
          <button onClick={clearSel} className="px-3 py-1.5 rounded-xl border hover:bg-slate-100">
            清空
          </button>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="w-full px-4 py-4 grid grid-cols-12 gap-4">
        {/* 左侧锚点树 */}
        <AnchorTree
          navStructure={navStructure}
          expanded={expanded}
          setExpanded={setExpanded}
          activeC2={activeC2}
          scrollToC2={scrollToC2}
        />

        {/* 中间物料表格 */}
        <MaterialTable
          navStructure={navStructure}
          catalog={catalog}
          checkedItems={checkedItems}
          selected={selected}
          toggleAllCheck={toggleAllCheck}
          toggleItemCheck={toggleItemCheck}
          addSel={addSel}
          removeSel={removeSel}
          setC2Ref={setC2Ref}
          listRef={listRef}
        />

        {/* 右侧选择汇总 */}
        <SelectionSummary
          selected={selected}
          catalog={catalog}
          summary={summary}
          onDone={handleDone}
        />
      </div>
    </div>
  );
}
