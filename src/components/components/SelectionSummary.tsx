import React from 'react';
import { CatalogItem, Summary } from '../types';
import { fmtCny } from '../utils';
import { seedGroups } from '../constants';

interface SelectionSummaryProps {
  selected: Record<string, number>;
  catalog: CatalogItem[];
  summary: Summary;
  onDone: () => void;
}

/**
 * 选择汇总组件
 * 右侧已选清单和汇总信息
 */
export const SelectionSummary: React.FC<SelectionSummaryProps> = ({
  selected,
  catalog,
  summary,
  onDone
}) => {
  return (
    <div className="col-span-2">
      <div className="rounded-2xl border bg-white p-3 sticky top-[60px]">
        <div className="font-medium mb-2">已选清单</div>
        <div className="space-y-2 max-h-[60vh] overflow-auto pr-1">
          {Object.entries(selected).filter(([, q]) => q > 0).length === 0 && (
            <div className="text-slate-400 text-sm">暂无选择</div>
          )}
          {Object.entries(selected)
            .filter(([, q]) => q > 0)
            .map(([key, q]) => {
              const [gid, iid] = key.split(":");
              const ci = catalog.find((x) => x.groupId === gid && x.itemId === iid)!;
              const line = ci.row.listPrice * q;
              return (
                <div key={key} className="border rounded-lg p-2">
                  <div className="text-sm font-medium">{ci.row.name}</div>
                  <div className="text-xs text-slate-500 mb-1">
                    {ci.row.period === "yearly" ? "年费" : "一次性"} ｜ {ci.row.unit} ｜ 归属：{seedGroups.find((g) => g.id === gid)?.name}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-slate-500">数量：{q}</div>
                    <div className="font-semibold">{fmtCny(line)}</div>
                  </div>
                </div>
              );
            })}
        </div>
        
        <div className="mt-3 h-px bg-slate-200" />
        <div className="text-sm text-slate-600 flex items-center justify-between mt-2">
          <span>一次性小计</span>
          <span className="font-medium">{fmtCny(summary.oneTime)}</span>
        </div>
        <div className="text-sm text-slate-600 flex items-center justify-between mt-1">
          <span>年费小计</span>
          <span className="font-medium">{fmtCny(summary.yearly)}</span>
        </div>
        <div className="text-sm text-slate-800 flex items-center justify-between mt-2">
          <span className="font-semibold">合计</span>
          <span className="font-semibold text-blue-700">{fmtCny(summary.total)}</span>
        </div>
        <button onClick={onDone} className="w-full mt-3 px-3 py-2 rounded-xl bg-blue-600 text-white hover:opacity-90">
          完成选配
        </button>
      </div>
    </div>
  );
};
