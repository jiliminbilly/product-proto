import React from 'react';
import { NavStructure } from '../types';

interface AnchorTreeProps {
  navStructure: NavStructure[];
  expanded: Record<string, boolean>;
  setExpanded: (value: Record<string, boolean>) => void;
  activeC2: string;
  scrollToC2: (c2: string) => void;
}

/**
 * 锚点树组件
 * 左侧两级树形锚点（大类->小类）
 */
export const AnchorTree: React.FC<AnchorTreeProps> = ({
  navStructure,
  expanded,
  setExpanded,
  activeC2,
  scrollToC2
}) => {
  return (
    <div className="col-span-2">
      <div className="rounded-2xl border bg-white p-3 sticky top-[60px] max-h-[80vh] overflow-auto">
        {navStructure.map(({ cat1, cat2s }) => (
          <div key={cat1} className="mb-2">
            <button
              className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-50 border text-left ext-lg font-semibold"
              onClick={() => setExpanded((prev) => ({ ...prev, [cat1]: !prev[cat1] }))}
            >
              <span>{cat1}</span>
              <span className="text-slate-400">{expanded[cat1] ? "▾" : "▸"}</span>
            </button>
            {expanded[cat1] && (
              <div className="mt-1 pl-2 space-y-1">
                {cat2s.map((c2) => (
                  <button
                    key={c2}
                    onClick={() => scrollToC2(c2)}
                    className={
                      "w-full text-left px-2 py-1.5 rounded-md border text-sm font-semibold " +
                      (activeC2 === c2 ? "bg-blue-50 border-blue-500 text-blue-700" : "hover:bg-slate-100")
                    }
                  >
                    {c2}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
