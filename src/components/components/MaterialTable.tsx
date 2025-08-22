import React from 'react';
import { NavStructure, CatalogItem } from '../types';
import { money } from '../utils';
import { seedGroups } from '../constants';

interface MaterialTableProps {
  navStructure: NavStructure[];
  catalog: CatalogItem[];
  checkedItems: Record<string, boolean>;
  selected: Record<string, number>;
  toggleAllCheck: () => void;
  toggleItemCheck: (key: string) => void;
  addSel: (gid: string, iid: string, delta?: number) => void;
  removeSel: (gid: string, iid: string) => void;
  setC2Ref: (c2: string, el: HTMLDivElement | null) => void;
  listRef: React.RefObject<HTMLDivElement>;
}

/**
 * 物料表格组件
 * 中间物料区（固定表头 + 可滚列表；按小类分组）
 */
export const MaterialTable: React.FC<MaterialTableProps> = ({
  navStructure,
  catalog,
  checkedItems,
  selected,
  toggleAllCheck,
  toggleItemCheck,
  addSel,
  removeSel,
  setC2Ref,
  listRef
}) => {
  return (
    <div className="col-span-8">
      <div className="rounded-2xl border bg-white overflow-hidden">
        {/* 表头（独立固定） */}
        <div className="grid grid-cols-12 text-sm bg-slate-50 border-b px-3 py-2 sticky top-[10px] z-10">
          <div className="col-span-1 text-center">
            <input
              type="checkbox"
              checked={catalog.length > 0 && catalog.every(ci => checkedItems[`${ci.groupId}:${ci.itemId}`])}
              onChange={toggleAllCheck}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
          </div>
          <div className="col-span-4">物料</div>
          <div className="col-span-2 text-right">标准价</div>
          <div className="col-span-2 text-center">单位</div>
          <div className="col-span-1 text-center">周期</div>
          <div className="col-span-2 text-center">加入</div>
        </div>
        
        {/* 列表体 */}
        <div ref={listRef} className="max-h-[70vh] overflow-auto">
          {navStructure.map(({ cat1, cat2s }) => (
            <div key={cat1} className="px-3 py-3">
              <div className="text-xs font-semibold text-slate-500 mb-2">{cat1}</div>
              {cat2s.map((c2) => (
                <div key={c2} ref={(el) => setC2Ref(c2, el)} className="mb-3">
                  <div className="text-[13px] font-medium text-slate-600 mb-1">{c2}</div>
                  {catalog
                    .filter((c) => c.cat2 === c2)
                    .map((ci) => {
                      const key = `${ci.groupId}:${ci.itemId}`;
                      const qty = selected[key] || 0;
                      return (
                        <div key={key} className="grid grid-cols-12 items-center border-b py-2">
                          <div className="col-span-1 text-center">
                            <input
                              type="checkbox"
                              checked={checkedItems[key] || false}
                              onChange={() => toggleItemCheck(key)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                          </div>
                          <div className="col-span-4">
                            <div className="font-medium">{ci.row.name}</div>
                            {ci.row.spec && <div className="text-xs text-slate-500">{ci.row.spec}</div>}
                            <div className="text-[11px] text-slate-400">归属产品：{seedGroups.find((g) => g.id === ci.groupId)?.name}</div>
                          </div>
                          <div className="col-span-2 text-right tabular-nums">{money(ci.row.listPrice)}</div>
                          <div className="col-span-2 text-center">{ci.row.unit}</div>
                          <div className="col-span-1 text-center">{ci.row.period === "yearly" ? "年费" : "一次性"}</div>
                          <div className="col-span-2">
                            <div className="flex justify-center items-center gap-1">
                              <button className="px-2 py-1 border rounded" onClick={() => removeSel(ci.groupId, ci.itemId)}>-</button>
                              <input
                                className="w-14 text-center border rounded px-2 py-1"
                                type="number"
                                min={0}
                                value={qty}
                                onChange={(e) => addSel(ci.groupId, ci.itemId, Number(e.target.value) - qty)}
                              />
                              <button className="px-2 py-1 border rounded" onClick={() => addSel(ci.groupId, ci.itemId, 1)}>+</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
